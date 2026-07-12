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

const URL = 'https://calculatorhost.com/guide/pension-income-tax-withholding-2026/';
const DATE_PUBLISHED = '2026-07-13';
const DATE_MODIFIED = '2026-07-13';

export const metadata: Metadata = {
  title: '연금소득세 2026, 사적연금 1500만원 분리과세와 연령별 3.3~5.5%',
  description:
    '연금저축·IRP 사적연금은 연 1,500만원까지 연령별 3.3~5.5% 저율 분리과세됩니다. 1,500만원 초과 시 종합과세와 16.5% 분리과세 선택, 절세 수령 전략을 소득세법 §20의3으로 정리합니다.',
  keywords: [
    '연금소득세',
    '사적연금 1500만원',
    '연금저축 세금',
    'IRP 연금 세율',
    '연금소득 분리과세',
    '연령별 연금소득세율',
    '소득세법 20조의3',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '연금소득세 2026 사적연금 1500만원 분리과세 연령별 세율' }],
    title: '연금소득세 2026, 사적연금 1500만원 분리과세 완전정리',
    description: '연금저축·IRP 연 1,500만원까지 연령별 3.3~5.5% 저율과세. 초과 시 종합과세 또는 16.5% 분리과세 선택.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '연금소득세 2026, 사적연금 1500만원 분리과세',
    description: '연금저축·IRP 연 1,500만원까지 연령별 3.3~5.5%. 초과 시 종합·16.5% 분리과세 선택. 소득세법 §20의3.',
  },
};

const FAQ_ITEMS = [
  {
    question: '사적연금 1,500만원 기준이 정확히 무엇인가요?',
    answer:
      '연금저축·IRP 등 사적연금 수령액이 연 1,500만원 이하면 저율 분리과세로 끝납니다(소득세법 §64의4). 2024년부터 종전 1,200만원에서 1,500만원으로 상향됐습니다. 이 한도 안에서는 나이에 따라 3.3~5.5%만 떼고 별도 종합소득세 신고가 필요 없습니다.',
  },
  {
    question: '연금소득세율이 나이에 따라 다른가요?',
    answer:
      '네, 확정기간형 사적연금은 수령 시작 연령이 낮을수록 세율이 높습니다(소득세법 §129). 55~69세는 5.5%, 70~79세는 4.4%, 80세 이상은 3.3%입니다(지방소득세 포함). 늦게 받을수록 세율이 낮아지므로 수령 시기를 늦추면 절세됩니다.',
  },
  {
    question: '연 1,500만원을 넘으면 어떻게 되나요?',
    answer:
      '사적연금 수령액이 연 1,500만원을 초과하면 전액에 대해 종합과세와 16.5% 분리과세 중 하나를 선택합니다(소득세법 §64의4). 다른 소득이 많으면 16.5% 분리과세가 유리하고, 소득이 적으면 종합과세로 낮은 누진세율을 적용받는 게 나을 수 있습니다.',
  },
  {
    question: '국민연금도 이 1,500만원에 포함되나요?',
    answer:
      '아닙니다. 1,500만원 한도는 연금저축·IRP 등 사적연금에만 적용됩니다. 국민연금 같은 공적연금은 별도로 간이세액표에 따라 원천징수되고 종합과세 대상입니다. 사적연금과 공적연금은 과세 방식이 완전히 다르니 분리해서 계산해야 합니다.',
  },
  {
    question: '종신형 연금은 세율이 더 낮나요?',
    answer:
      '네, 종신형(사망 시까지 수령) 연금보험은 세율이 더 유리합니다. 55~79세는 4.4%, 80세 이상은 3.3%가 적용됩니다. 확정기간형이 55~69세에 5.5%인 것과 비교하면, 종신형을 선택하면 같은 연령대에서 세율이 낮아집니다.',
  },
  {
    question: '연금을 한 번에 찾으면 세금이 어떻게 되나요?',
    answer:
      '연금 형태가 아니라 일시금으로 찾으면 연금소득이 아닌 기타소득으로 16.5%가 과세됩니다. 연금계좌 세액공제를 받았던 원금과 운용수익을 연금 외 방식으로 수령하면 저율 연금소득세 혜택을 잃습니다. 가급적 연금 형태로 나눠 받는 것이 세금에 유리합니다.',
  },
  {
    question: '1,500만원을 넘기지 않으려면 어떻게 하나요?',
    answer:
      '수령 기간을 늘려 연간 수령액을 1,500만원 이하로 조절하면 됩니다. 예를 들어 연 2,000만원을 10년 받는 대신 연 1,300만원을 15년으로 나누면 저율 분리과세를 유지할 수 있습니다. 연금개시 시점에 수령 기간과 금액을 설계하는 것이 핵심입니다.',
  },
  {
    question: '연금소득도 연말정산이나 종합소득세 신고를 하나요?',
    answer:
      '사적연금이 연 1,500만원 이하로 분리과세로 끝났다면 별도 신고가 필요 없습니다. 다만 1,500만원 초과로 종합과세를 선택했거나 공적연금 외 다른 소득이 있다면 다음해 5월 종합소득세 신고를 해야 합니다. 국민연금공단·금융회사가 보내는 연금소득 원천징수영수증을 확인하세요.',
  },
];

export default function PensionIncomeTaxWithholding2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '연금소득세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '연금소득세 2026, 사적연금 1500만원 분리과세 완전정리',
    description:
      '연금저축·IRP 사적연금의 연 1,500만원 저율 분리과세, 연령별 3.3~5.5% 세율, 초과 시 종합·16.5% 분리과세 선택, 수령 시기 절세 전략을 소득세법 §20의3·§64의4 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['연금소득세', '사적연금', '연금저축', 'IRP', '분리과세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '연금소득세 2026',
    description:
      '사적연금 1,500만원 저율 분리과세, 연령별 3.3~5.5%, 초과 시 종합·16.5% 선택 정리.',
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
                    { name: '연금소득세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">은퇴 준비층 · 8분 읽기 · 2026-07-13</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  연금소득세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">사적연금 1500만원 분리과세와 연령별 세율</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  연금저축과 IRP를 열심히 쌓아온 분들이 정작 수령 단계에서 세금을 걱정합니다. 다행히 사적연금은 연 1,500만원까지 나이에 따라 3.3~5.5%만 떼는 저율 분리과세라 부담이 크지 않습니다. 이 가이드는 그 1,500만원 한도의 의미, 연령별 세율 차이, 한도를 넘겼을 때의 선택지, 그리고 수령 기간을 조절해 세금을 줄이는 방법을 소득세법 조문으로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-pension-income-tax-withholding-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연금소득세는 어떻게 매겨지나</h2>
                <p>
                  연금소득은 공적연금(국민연금 등)과 사적연금(연금저축·IRP 등)으로 나뉩니다(소득세법 §20의3). 이 중 세액공제를 받았던 사적연금은 수령할 때 연금소득세를 냅니다. 핵심은 연 1,500만원이라는 한도로, 이 안에서는 저율 분리과세로 간단히 끝납니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">2024년 한도 상향</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    사적연금 분리과세 한도가 2024년부터 연 1,200만원에서 1,500만원으로 올랐습니다(소득세법 §64의4).
                    <br />
                    → 연 1,500만원 이하: 연령별 3.3~5.5% 분리과세로 종결
                    <br />
                    → 연 1,500만원 초과: 전액 종합과세 또는 16.5% 분리과세 선택
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 1,500만원 한도는 세액공제를 받은 연금계좌 납입액과 운용수익에서 나오는 연금액을 기준으로 합니다. 이미 세금을 낸 원금(세액공제 안 받은 납입분)에서 나오는 연금은 과세 대상이 아니니 혼동하지 마세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연령별 세율은 왜 다른가</h2>
                <p>
                  사적연금 원천징수 세율은 수령자 나이가 많을수록 낮아집니다(소득세법 §129). 오래 살수록 연금이 노후생활의 핵심이 되므로 세부담을 줄여주는 취지입니다. 늦게 받기 시작할수록 세율이 낮으니 수령 시기 결정에 중요한 변수입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 사적연금 연령별 원천징수 세율 (소득세법 §129, 지방소득세 포함)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">수령 연령</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">확정기간형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">종신형</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">55세 이상~69세</td>
                        <td className="p-3"><strong>5.5%</strong></td>
                        <td className="p-3">4.4%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">70세 이상~79세</td>
                        <td className="p-3"><strong>4.4%</strong></td>
                        <td className="p-3">4.4%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">80세 이상</td>
                        <td className="p-3"><strong>3.3%</strong></td>
                        <td className="p-3">3.3%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 종신형은 사망 시까지 받는 대신 중도 해지·인출이 제한됩니다. 세율이 낮다고 무조건 유리한 게 아니라, 목돈이 필요할 가능성과 함께 따져봐야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">한도 안팎 세금 계산 사례</h2>
                <p>
                  1,500만원 한도를 기준으로 세금이 어떻게 달라지는지 사례로 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 65세, 연금저축 연 1,200만원 (한도 이내)</p>
                  <p className="text-sm text-text-secondary">
                    · 사적연금 수령액: 1,200만원 (1,500만원 이하)
                    <br />
                    · 적용 세율: 55~69세 확정기간형 5.5%
                    <br />
                    · 연금소득세: 1,200만원 × 5.5% = <strong>66만원</strong>
                    <br />
                    · 분리과세로 종결, 종합소득세 신고 불필요
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 한도 이내면 저율로 간단히 끝난다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 72세, IRP 연 1,400만원 (한도 이내, 고령)</p>
                  <p className="text-sm text-text-secondary">
                    · 사적연금 수령액: 1,400만원 (1,500만원 이하)
                    <br />
                    · 적용 세율: 70~79세 4.4%
                    <br />
                    · 연금소득세: 1,400만원 × 4.4% = <strong>61.6만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 나이가 많을수록 세율이 낮아 같은 금액도 세금이 준다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 63세, 연금저축 연 2,000만원 (한도 초과)</p>
                  <p className="text-sm text-text-secondary">
                    · 사적연금 수령액: 2,000만원 (1,500만원 초과)
                    <br />
                    · 선택 A 분리과세: 2,000만원 × 16.5% = 330만원
                    <br />
                    · 선택 B 종합과세: 다른 소득과 합산해 6.6~49.5% 누진세율 적용
                    <br />
                    · 다른 소득이 적으면 종합과세가, 많으면 16.5% 분리과세가 유리
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 초과분이 아니라 전액 기준으로 선택. 수령 기간을 늘려 한도 이내로 낮추는 게 최선.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-pension-income-tax-withholding-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공적연금과 무엇이 다른가</h2>
                <p>
                  국민연금 같은 공적연금은 사적연금의 1,500만원 한도와 무관합니다. 공적연금은 매월 간이세액표에 따라 원천징수되고 다음해 1월 연말정산 후 종합과세됩니다(소득세법 §20의3). 두 연금은 과세 체계가 완전히 다르므로 따로 계산해야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 공적연금 vs 사적연금 과세 비교 (소득세법 §20의3)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공적연금(국민연금)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">사적연금(연금저축·IRP)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">원천징수</td>
                        <td className="p-3">간이세액표</td>
                        <td className="p-3">연령별 3.3~5.5%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">분리과세 한도</td>
                        <td className="p-3">해당 없음(종합과세)</td>
                        <td className="p-3">연 1,500만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">정산</td>
                        <td className="p-3">연말정산(1월)</td>
                        <td className="p-3">한도 이내 분리과세로 종결</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 공적연금도 다른 소득과 합쳐 종합과세되므로, 은퇴 후 사업·근로·금융 소득이 있으면 5월 종합소득세 신고 대상이 될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">연금 수령에서 놓치기 쉬운 함정</h2>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>일시금 인출:</strong> 연금 형태가 아니라 목돈으로 찾으면 저율 연금소득세가 아니라 기타소득 16.5%가 적용돼 세금이 크게 늘어납니다.
                  </li>
                  <li>
                    <strong>연금수령한도 초과:</strong> 연금개시 후 정해진 연금수령한도를 넘겨 인출하면 초과분은 연금외수령으로 보아 불리하게 과세됩니다.
                  </li>
                  <li>
                    <strong>건강보험료:</strong> 사적연금은 대체로 건보료 산정 소득에서 제외되지만, 종합과세되는 공적연금·다른 소득은 지역가입자 보험료에 반영될 수 있습니다.
                  </li>
                </ul>
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
                    <div className="font-semibold text-primary-500">연금저축·IRP 세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">납입 단계 최대 900만원 세액공제 정리.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-expected-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 예상 수령액 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">가입 기간별 노령연금 예상액 계산.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-early-deferred-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 조기·연기연금</div>
                    <p className="mt-1 text-sm text-text-secondary">감액 6%, 증액 7.2% 손익분기 비교.</p>
                  </Link>
                  <Link
                    href="/guide/housing-pension-reverse-mortgage-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주택연금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">집을 담보로 매월 연금받는 역모기지.</p>
                  </Link>
                  <Link
                    href="/guide/retirement-income-tax-deferral-irp-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">퇴직소득세 IRP 이연</div>
                    <p className="mt-1 text-sm text-text-secondary">퇴직금을 IRP로 받아 세금 미루기.</p>
                  </Link>
                  <Link
                    href="/calculator/retirement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">은퇴자금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">노후 필요자금과 연금 충당률 시뮬.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무·재무 조언이 아닙니다. 연금 수령 방식, 세율 적용, 종합·분리과세 선택은 개인의 연금 종류·연령·다른 소득에 따라 달라지므로 금융회사·국세청과 확인하세요. 본 콘텐츠는 2026-07-13 기준으로 작성되었으며, 소득세법 개정 시 업데이트됩니다. 인용 조문: <strong>소득세법 §20의3(연금소득), §64의4(연금소득 세액계산 특례), §129(원천징수세율)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="연금소득세 2026 가이드"
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
