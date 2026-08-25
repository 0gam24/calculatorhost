// [revenue-lever: indexing+traffic] 배당기준일·배당락일 차이·매수마감·배당소득세(투자자 롱테일 흡수)
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

const URL = 'https://calculatorhost.com/guide/dividend-record-date-ex-dividend-2026/';
const DATE_PUBLISHED = '2026-08-26';
const DATE_MODIFIED = '2026-08-26';

export const metadata: Metadata = {
  title: '배당기준일 배당락일 차이 2026, 언제까지 사야 배당받나',
  description:
    '배당을 받으려면 배당기준일 2영업일 전, 즉 배당락일 바로 전 영업일까지 주식을 사야 합니다. 배당락일에 팔아도 배당은 나오며, 배당금에서는 15.4%가 원천징수됩니다. 상법 §354와 소득세법 기준으로 정리했습니다.',
  keywords: [
    '배당기준일',
    '배당락일',
    '배당 언제까지 사야',
    '배당락',
    '배당소득세 15.4%',
    '배당기준일 배당락일 차이',
    '상법 354조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '배당기준일 배당락일 차이 2026, 언제까지 사야 배당받나' }],
    title: '배당기준일 vs 배당락일, 언제까지 사야 배당받나 (2026)',
    description: '배당 받으려면 배당락일 전 영업일까지 매수. 배당락일에 팔아도 배당 수령. 배당소득세 15.4% 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '배당기준일 배당락일 차이 2026, 언제 사야 배당받나',
    description: '배당락일 전 영업일까지 매수, 배당락일 매도해도 배당 수령, 15.4% 원천징수. 상법 §354.',
  },
};

const FAQ_ITEMS = [
  {
    question: '배당기준일과 배당락일은 무엇이 다른가요?',
    answer:
      '배당기준일은 배당받을 주주를 확정하는 날이고, 배당락일은 그 권리가 사라지는 날입니다. 배당기준일에 주주명부에 올라 있어야 배당을 받는데(상법 §354), 배당락일부터 산 사람은 그 배당의 주주명부 등재에 못 들어갑니다. 보통 배당락일은 배당기준일 바로 전 영업일입니다.',
  },
  {
    question: '배당을 받으려면 언제까지 사야 하나요?',
    answer:
      '배당기준일 2영업일 전까지 매수 체결해야 합니다. 우리나라 주식 결제는 체결일 포함 2영업일 뒤(T+2)에 이뤄지므로, 배당기준일에 주주가 되려면 그 이틀 전에 사야 결제가 기준일에 맞춰집니다. 이 날이 바로 배당락일의 전 영업일입니다. 배당락일 당일에 사면 배당을 못 받습니다.',
  },
  {
    question: '배당락일에 주식을 팔아도 배당을 받나요?',
    answer:
      '네, 받습니다. 배당기준일에 주주로 확정되면 권리가 이미 생긴 것이라, 배당락일 아침에 바로 팔아도 배당금은 나중에 지급됩니다. 즉 배당만 챙기고 싶다면 배당락일 전 영업일까지 사서 배당락일에 팔아도 배당 수령에는 문제가 없습니다. 다만 배당락으로 주가가 떨어질 수 있다는 점은 감안해야 합니다.',
  },
  {
    question: '배당락일에는 왜 주가가 떨어지나요?',
    answer:
      '배당받을 권리가 사라진 만큼 이론적으로 주가가 조정되기 때문입니다. 회사에서 배당으로 현금이 빠져나가므로, 배당락일에는 전날 종가에서 예상 배당금만큼 기준가격을 낮춰 거래를 시작합니다. 이를 배당락이라고 합니다. 다만 실제 등락은 시장 수급에 따라 이론가와 다르게 움직일 수 있습니다.',
  },
  {
    question: '배당금에서 세금은 얼마나 떼나요?',
    answer:
      '배당소득에는 15.4%가 원천징수됩니다. 소득세 14%에 지방소득세 1.4%를 더한 값입니다. 증권사가 배당 지급 시 자동으로 떼고 나머지를 지급하므로, 연간 금융소득이 2,000만원 이하라면 이 원천징수로 납세가 끝납니다.',
  },
  {
    question: '금융소득이 2,000만원을 넘으면 어떻게 되나요?',
    answer:
      '초과분이 다음 해 5월 종합소득세 신고 때 다른 소득과 합산돼 누진과세됩니다. 이자와 배당을 합친 연간 금융소득이 2,000만원을 넘으면 금융소득종합과세 대상이 되어, 근로·사업소득 등과 합산해 최고 세율까지 적용될 수 있습니다. 2,000만원 이하는 15.4% 분리과세로 종결됩니다.',
  },
  {
    question: '분기 배당은 기준일이 여러 번인가요?',
    answer:
      '네, 분기 배당을 하는 회사는 분기마다 배당기준일이 따로 있습니다. 예를 들어 1분기 배당기준일이 3월 말이면 그에 맞는 배당락일과 매수 마감일이 정해지고, 2분기·3분기·연말에도 각각 기준일이 생깁니다. 각 분기 배당을 받으려면 해당 분기 기준일 2영업일 전까지 보유해야 합니다.',
  },
  {
    question: '요즘 배당액을 먼저 알고 살 수 있다는데 사실인가요?',
    answer:
      '일부 기업이 배당절차를 개선해 기준일보다 배당액을 먼저 확정하는 방식을 도입하고 있습니다. 과거에는 연말에 주주를 확정하고 이듬해 봄에 배당액을 정해 깜깜이 투자라는 지적이 있었는데, 이를 개선해 배당액을 먼저 공시하고 이후 기준일을 두는 회사가 늘고 있습니다. 다만 회사마다 채택 여부가 다르므로 개별 공시로 확인하세요.',
  },
];

export default function DividendRecordDateExDividend2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '배당기준일 배당락일 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '배당기준일 배당락일 차이 2026, 언제까지 사야 배당받나',
    description:
      '배당기준일과 배당락일의 차이, 배당을 받기 위한 매수 마감(T+2), 배당락 주가 조정, 배당소득세 15.4%와 금융소득종합과세까지 정리한 투자자 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['배당기준일', '배당락일', '배당소득세', '금융소득종합과세', 'T+2'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '배당기준일 배당락일 2026',
    description: '배당기준일·배당락일 차이, 매수 마감, 배당소득세 정리.',
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
                    { name: '배당기준일 배당락일 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주식 투자자 · 8분 읽기 · 2026-08-26</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  배당기준일 배당락일 차이 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 언제까지 사야 배당받나</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  배당주를 처음 사는 사람이 가장 헷갈려 하는 것이 언제까지 사야 배당을 받느냐입니다. 배당기준일 당일에 사면 늦고, 배당락일에 팔면 배당을 못 받을까 걱정합니다. 이 가이드는 배당기준일과 배당락일의 차이, 매수 마감 시점, 배당락으로 인한 주가 조정, 그리고 배당금에서 떼는 세금까지 초보 투자자 눈높이로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배당기준일과 배당락일은 무엇이 다른가요?</h2>
                <p>
                  배당기준일은 배당받을 주주를 확정하는 날이고, 배당락일은 그 권리가 사라지는 날입니다. 회사는 특정 날짜에 주주명부에 올라 있는 사람에게 배당을 주는데, 그 날짜가 배당기준일입니다. 이 기준일 제도의 근거가 상법 §354(주주명부의 폐쇄와 기준일)입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 배당기준일: 배당받을 주주를 확정하는 날(상법 §354)
                    <br />
                    · 배당락일: 배당 권리가 사라진 채 거래가 시작되는 날(보통 기준일 전 영업일)
                    <br />
                    · 매수 마감: 배당기준일 2영업일 전(T+2 결제), 곧 배당락일의 전 영업일까지
                    <br />
                    · 세금: 배당금에서 15.4% 원천징수(소득세 14% + 지방소득세 1.4%)
                  </p>
                </div>
                <p>
                  다만, 배당락일과 기준일의 간격은 결제 제도와 휴일에 따라 조금씩 달라지므로 개별 종목 공시로 정확한 날짜를 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배당을 받으려면 언제까지 사야 하나요?</h2>
                <p>
                  배당기준일 2영업일 전까지 매수 체결해야 합니다. 우리나라 주식 결제는 체결일을 포함해 2영업일 뒤에 끝나는 T+2 방식이라, 배당기준일에 주주명부에 오르려면 그 이틀 전에는 사야 결제가 기준일에 맞춰집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 배당기준일이 3월 31일(화)인 종목</p>
                  <p className="text-sm text-text-secondary">
                    · 3월 27일(금): 매수 마감일. 이 날까지 사야 3월 31일에 결제 완료
                    <br />
                    · 3월 30일(월): 배당락일. 이 날 사면 배당 권리 없음
                    <br />
                    · 3월 31일(화): 배당기준일. 주주명부 확정
                    <br />
                    <span className="text-xs text-text-tertiary">주말이 끼면 실제 마감일이 앞당겨지므로 달력을 반드시 확인하세요.</span>
                  </p>
                </div>
                <p>
                  예외: 배당락일 당일이나 그 이후에 사면 이번 배당은 받지 못합니다. 하루 차이로 배당 여부가 갈리므로 매수 마감일을 놓치지 마세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배당락일에 팔아도 배당을 받나요?</h2>
                <p>
                  네, 받습니다. 배당기준일에 주주로 확정되면 배당받을 권리가 이미 생긴 것이므로, 배당락일 아침에 곧바로 팔아도 배당금은 나중에 정상 지급됩니다. 그래서 배당만 노린다면 배당락일 전 영업일까지 사서 배당락일에 매도하는 전략도 가능합니다.
                </p>
                <p>
                  다만, 배당락으로 주가가 배당금만큼 낮게 시작하는 점을 감안해야 합니다. 배당을 받아도 주가가 그만큼 빠지면 총자산은 크게 달라지지 않을 수 있어, 배당락 회복 여부까지 보고 판단하는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배당금에서 세금은 얼마나 떼나요?</h2>
                <p>
                  배당소득에는 15.4%가 원천징수됩니다. 소득세 14%(소득세법 §129)에 지방소득세 1.4%를 더한 값으로, 증권사가 배당 지급 시 자동으로 떼고 나머지를 계좌에 넣어 줍니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 배당금 100만원을 받는 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 원천징수: 100만원 × 15.4% = 15.4만원
                    <br />
                    · 실수령: 100만원 − 15.4만원 = 84.6만원
                    <br />
                    · 연 금융소득 2,000만원 이하면 이 원천징수로 납세 종결
                    <br />
                    <span className="text-xs text-text-tertiary">계좌에는 세금을 뗀 84.6만원이 들어옵니다.</span>
                  </p>
                </div>
                <p>
                  다만, 이자와 배당을 합친 연 금융소득이 2,000만원을 넘으면 초과분이 종합과세 대상이 되어 세 부담이 커질 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">금융소득 2,000만원을 넘으면 어떻게 되나요?</h2>
                <p>
                  초과분이 다음 해 5월 종합소득세 신고 때 합산 과세됩니다. 연간 이자와 배당의 합이 2,000만원을 넘으면 금융소득종합과세 대상이 되어, 초과 금액을 근로·사업소득 등과 합쳐 누진세율(최고 45%)로 다시 계산합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 금융소득 규모별 과세 방식</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">연 금융소득</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세 방식</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">추가 신고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2,000만원 이하</td>
                        <td className="p-3">15.4% 분리과세</td>
                        <td className="p-3">불필요(원천징수로 종결)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2,000만원 초과</td>
                        <td className="p-3">초과분 종합과세</td>
                        <td className="p-3">5월 종합소득세 신고</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만, 종합과세 대상이라도 2,000만원까지는 15.4%로 계산하고 초과분만 합산하므로, 전액이 최고세율로 과세되는 것은 아닙니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/guide/dividend-income-tax-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">배당소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">배당소득세 계산과 종합과세 기준을 자세히.</p>
                  </Link>
                  <Link href="/guide/financial-income-comprehensive-vs-separate-taxation/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">금융소득 종합과세 vs 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">2,000만원 경계에서 세 부담이 어떻게 갈리는지.</p>
                  </Link>
                  <Link href="/guide/interest-income-tax-15-4-percent-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">이자소득세 15.4%</div>
                    <p className="mt-1 text-sm text-text-secondary">예적금 이자에서 떼는 세금 구조를 이해하세요.</p>
                  </Link>
                  <Link href="/guide/etf-tax-domestic-overseas-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">ETF 세금 국내·해외</div>
                    <p className="mt-1 text-sm text-text-secondary">ETF 분배금과 매매차익 과세를 비교하세요.</p>
                  </Link>
                  <Link href="/guide/isa-account-tax-benefit-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">ISA 세제 혜택</div>
                    <p className="mt-1 text-sm text-text-secondary">배당·이자를 비과세·분리과세로 담는 계좌.</p>
                  </Link>
                  <Link href="/category/finance/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 금융 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">예금·적금·투자 관련 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 특정 종목 매매를 권유하지 않습니다. 배당락일·기준일은 종목별 공시로, 세율과 종합과세 기준은 세법 개정으로 달라질 수 있으므로 실제 투자와 신고는 증권사·국세청 안내로 확인하세요. 본 콘텐츠는 2026-08-26 기준이며, 인용한 법조항은 <strong>상법 §354(주주명부의 폐쇄와 기준일), 소득세법 §17(배당소득), §129(원천징수세율)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.krx.co.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">한국거래소</a>.
                </p>
              </section>

              <ShareButtons title="배당기준일 배당락일 차이 2026 가이드" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
