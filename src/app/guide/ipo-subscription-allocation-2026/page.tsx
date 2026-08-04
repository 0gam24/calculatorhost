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

const URL = 'https://calculatorhost.com/guide/ipo-subscription-allocation-2026/';
const DATE_PUBLISHED = '2026-08-05';
const DATE_MODIFIED = '2026-08-05';

export const metadata: Metadata = {
  title: '공모주 청약 균등·비례배정 2026, 증거금·환불일 계산법',
  description:
    '공모주 청약은 균등배정과 비례배정으로 나뉩니다. 최소 청약수량만 넣으면 균등 물량을 나눠 받고, 남은 물량은 청약 수량 비례로 배정됩니다. 증거금 50%, 환불일, 중복청약 금지까지 초보자용으로 정리했습니다.',
  keywords: [
    '공모주 청약',
    '균등배정 비례배정',
    '공모주 청약증거금',
    '공모주 환불일',
    '공모주 경쟁률',
    '중복청약 금지',
    '공모주 배정 방식',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '공모주 청약 균등·비례배정 2026, 증거금·환불일 계산법' }],
    title: '공모주 청약 균등·비례배정 2026',
    description: '균등배정과 비례배정 차이, 증거금 50%, 환불일(마감 후 영업일 +2일), 중복청약 금지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '공모주 청약 균등·비례배정 2026',
    description: '균등·비례배정 구조와 증거금·환불·중복청약 규칙을 초보자용으로 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '공모주 청약이 무엇인가요?',
    answer:
      '상장을 앞둔 회사가 일반 투자자에게 새 주식을 나눠주는 절차입니다. 회사가 증시에 상장하기 전, 공모가와 청약 기간을 정해 증권사를 통해 주식을 배정받도록 하는 것이 공모주 청약입니다. 청약한다고 원하는 만큼 다 받는 것은 아니고, 균등배정과 비례배정 방식으로 나눠 받습니다.',
  },
  {
    question: '균등배정과 비례배정은 무엇이 다른가요?',
    answer:
      '균등배정은 최소 수량만 넣으면 누구나 똑같이, 비례배정은 많이 넣을수록 더 받는 방식입니다. 균등배정은 최소 청약단위 이상 청약한 사람들에게 물량을 균등하게 나눠주고, 비례배정은 균등 배정 후 남은 물량을 각자의 청약 수량과 경쟁률에 비례해 배정합니다. 그래서 소액 투자자는 균등, 자금이 큰 투자자는 비례에서 유리합니다.',
  },
  {
    question: '청약증거금은 얼마를 넣어야 하나요?',
    answer:
      '보통 청약 금액의 50%입니다. 예를 들어 공모가 2만원짜리를 10주 청약하면 청약 금액은 20만원이고, 그 절반인 10만원을 증거금으로 계좌에 넣어 둡니다. 증거금률은 종목·증권사에 따라 다를 수 있으므로 청약 공고를 확인하세요. 배정받지 못한 몫의 증거금은 나중에 돌려받습니다.',
  },
  {
    question: '증거금 환불은 언제 되나요?',
    answer:
      '보통 청약 마감일 이후 영업일 기준 2일 뒤 환불됩니다. 배정받은 주식 대금을 뺀 나머지 증거금이 청약한 증권사 계좌로 자동 입금됩니다. 경쟁률이 높아 배정 수량이 적을수록 환불액이 커집니다. 정확한 환불일은 종목별 청약 일정에 표시됩니다.',
  },
  {
    question: '경쟁률이 높으면 몇 주나 받나요?',
    answer:
      '균등배정 몫은 경쟁률과 무관하게 받고, 비례 몫은 경쟁률이 높을수록 줄어듭니다. 인기 종목은 청약 경쟁률이 수백에서 수천 대 1까지 올라가는데, 이 경우 비례배정으로는 큰 자금을 넣어야 1주를 받습니다. 반면 균등배정은 최소 청약만 해도 청약자 수로 나눈 몫을 받으므로, 소액 참여자에게 실질적인 기회가 됩니다.',
  },
  {
    question: '여러 증권사에 중복청약을 할 수 있나요?',
    answer:
      '한 공모주는 한 증권사에서만 청약할 수 있습니다. 2021년 6월 이후 증권신고서를 제출한 공모주는 여러 증권사 중복청약이 제한됩니다. 다만 한 종목의 주관·인수 증권사가 여러 곳이면 그중 한 곳을 골라 청약해야 하므로, 어느 증권사에 배정 물량이 많은지 확인해 선택하는 것이 좋습니다.',
  },
  {
    question: '청약하려면 무엇이 필요한가요?',
    answer:
      '해당 공모주를 주관·인수하는 증권사의 계좌가 필요합니다. 청약 전에 그 증권사 계좌를 개설하고, 종목에 따라 청약 마감 전까지 일정 기간 계좌를 유지해야 하는 조건이 있을 수 있습니다. 청약 기간, 최소 청약단위, 증거금률, 배정 물량은 증권신고서와 청약 공고에서 확인합니다.',
  },
  {
    question: '상장 첫날 팔아야 하나요?',
    answer:
      '정답은 없으며 판단과 손익은 본인 책임입니다. 상장일 시초가와 종가는 종목마다 크게 다르고, 오를 수도 내릴 수도 있습니다. 이 글은 청약 구조를 설명하는 정보 제공 목적이며 특정 종목의 매매 시점을 권하지 않습니다. 공모가, 기관 수요예측 결과, 시장 상황을 종합해 스스로 판단하세요.',
  },
];

export default function IpoSubscriptionAllocation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '공모주 청약 균등·비례배정' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '공모주 청약 균등·비례배정 2026, 증거금·환불일 계산법 완전 정리',
    description:
      '공모주 청약의 균등배정과 비례배정 구조, 청약증거금 50%, 환불일(마감 후 영업일 +2일), 중복청약 금지 규칙과 배정 계산 사례를 초보자용으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['공모주 청약', '균등배정', '비례배정', '청약증거금', '중복청약'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '공모주 청약 균등·비례배정 2026',
    description:
      '공모주 균등·비례배정 구조와 증거금·환불·중복청약 규칙, 배정 계산 사례 정리.',
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
                    { name: '공모주 청약 균등·비례배정' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">공모주 투자자 · 8분 읽기 · 2026-08-05</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  공모주 청약 균등·비례배정 2026
                  <br />
                  <span className="text-2xl text-text-secondary">증거금·환불일·중복청약 규칙</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 글은 공모주 청약을 처음 해보거나 배정 방식이 헷갈리는 투자자를 위해 씁니다. &quot;10주 넣었는데 왜 2주만 배정됐지?&quot;, &quot;증거금은 얼마 넣고 언제 돌려받지?&quot; 같은 실전 궁금증을 균등배정과 비례배정 구조로 풀어드립니다. 청약 절차, 증거금 계산, 환불일, 중복청약 금지 규칙까지 순서대로 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-ipo-subscription-allocation-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 공모주 청약은 어떻게 배정되나요?</h2>
                <p>
                  일반청약 물량은 균등배정과 비례배정 두 갈래로 나뉩니다. 균등배정은 최소 청약단위 이상 청약한 사람에게 물량을 똑같이 나눠주고, 비례배정은 균등 배정 후 남은 물량을 청약 수량에 비례해 나눕니다. 이 구조 덕분에 소액 투자자도 최소한의 몫을 받을 기회가 생깁니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>균등배정: 최소 청약단위만 넣으면 청약자 수로 나눈 몫을 받음</li>
                    <li>비례배정: 남은 물량을 청약 수량·경쟁률에 비례해 배정</li>
                    <li>청약증거금: 보통 청약금액의 50%</li>
                    <li>환불: 청약 마감 후 영업일 기준 2일 뒤 자동 입금</li>
                    <li>중복청약: 2021년 6월 이후 공모주는 한 증권사에서만 가능</li>
                  </ul>
                </div>
                <p>
                  일반청약 물량 중 최소 절반 이상을 균등배정에 배분하도록 하는 것이 현재의 기본 틀입니다. 세부 비율은 종목·증권사 공고에 따라 다릅니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 균등배정과 비례배정의 차이는 무엇인가요?</h2>
                <p>
                  한마디로 균등은 &quot;참여만 하면 똑같이&quot;, 비례는 &quot;넣은 만큼 더&quot;입니다. 자금 규모에 따라 유리한 방식이 다릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 균등배정 vs 비례배정 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">균등배정</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비례배정</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">배정 기준</td>
                        <td className="p-3">청약자 수로 균등 분배</td>
                        <td className="p-3">청약 수량·경쟁률 비례</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">유리한 대상</td>
                        <td className="p-3">소액 투자자</td>
                        <td className="p-3">자금 규모 큰 투자자</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">필요 조건</td>
                        <td className="p-3">최소 청약단위 이상</td>
                        <td className="p-3">많은 청약 수량(증거금)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">경쟁률 영향</td>
                        <td className="p-3">작음(참여자 수에 좌우)</td>
                        <td className="p-3">큼(높을수록 배정 감소)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 균등 물량도 청약자가 너무 많으면 1인당 1주도 안 되게 쪼개져 추첨으로 배정되는 경우가 있습니다. 인기 종목일수록 균등 몫도 줄어든다는 점을 감안하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배정·증거금 계산 사례</h2>
                <p>
                  숫자로 보면 배정 구조가 명확해집니다. 아래는 이해용 예시로, 실제 배정은 종목별 물량과 경쟁률에 따라 달라집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 증거금 계산 (공모가 2만원, 10주 청약)</p>
                  <p className="text-sm text-text-secondary">
                    · 청약 금액 = 2만원 × 10주 = 20만원
                    <br />
                    · 증거금(50%) = 20만원 × 50% = <strong>10만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 청약 시점에 10만원만 있으면 10주 청약 가능(나머지는 배정 후 정산·환불).</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 균등배정 (균등 물량 50만주, 청약자 25만명)</p>
                  <p className="text-sm text-text-secondary">
                    · 1인당 균등 배정 = 50만주 ÷ 25만명 = <strong>2주</strong>
                    <br />
                    · 최소 청약단위만 넣어도 2주 확보(경쟁률 무관)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 균등은 청약자 수가 적을수록 1인당 배정이 늘어남.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 비례배정 (경쟁률 1,000 대 1 가정)</p>
                  <p className="text-sm text-text-secondary">
                    · 비례 배정 = 청약 수량 ÷ 경쟁률
                    <br />
                    · 1,000주 청약 시: 1,000 ÷ 1,000 = 약 1주
                    <br />
                    · 100주 청약 시: 100 ÷ 1,000 = 0.1주(사실상 균등 몫만)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 경쟁률이 높으면 비례로 1주 받는 데도 큰 청약 수량이 필요.</span>
                  </p>
                </div>
                <p className="mt-4">
                  예외: 소수점 이하 배정분은 추첨이나 우선순위 규칙으로 처리됩니다. 증권사마다 단수주 처리 방식이 다를 수 있으니 공고를 확인하세요.
                </p>
              </section>

              <AdSlot slot="guide-ipo-subscription-allocation-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공모주 청약 단계별 절차</h2>
                <p>
                  청약은 다음 순서로 진행됩니다. 청약 기간이 보통 이틀로 짧아 일정 관리가 중요합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>1단계 계좌 준비:</strong> 해당 공모주를 주관·인수하는 증권사 계좌를 미리 개설합니다.
                  </li>
                  <li>
                    <strong>2단계 공고 확인:</strong> 증권신고서와 청약 공고에서 공모가, 청약 기간, 최소 청약단위, 증거금률, 배정 물량을 확인합니다.
                  </li>
                  <li>
                    <strong>3단계 청약·증거금 납입:</strong> 청약 수량을 정하고 증거금을 계좌에 넣어 청약합니다.
                  </li>
                  <li>
                    <strong>4단계 배정·환불:</strong> 경쟁률에 따라 배정이 확정되고, 마감 후 영업일 2일 뒤 남은 증거금이 환불됩니다.
                  </li>
                  <li>
                    <strong>5단계 상장·매매:</strong> 상장일부터 시장에서 매매할 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 종목에 따라 계좌 개설 후 일정 기간 유지 요건이나 청약 한도가 있을 수 있으니, 청약 전 공고의 조건을 꼼꼼히 확인하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/domestic-stock-major-shareholder-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국내주식 대주주 양도세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">국내주식 매도 시 과세되는 대주주 요건 정리.</p>
                  </Link>
                  <Link
                    href="/guide/dividend-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배당소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">배당금에 붙는 세금과 원천징수 구조.</p>
                  </Link>
                  <Link
                    href="/guide/isa-account-tax-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">ISA 계좌 세제혜택 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">투자 수익 비과세·분리과세 한도 활용법.</p>
                  </Link>
                  <Link
                    href="/calculator/averaging-down/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주식 물타기 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">추가 매수 시 평균단가를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/overseas-stock-capital-gains-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">해외주식 양도소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">해외주식 매매차익 250만원 공제와 세율.</p>
                  </Link>
                  <Link
                    href="/guide/category/investment/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 투자 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">주식·배당·평단 관련 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 공모주 청약 구조를 설명하는 정보 제공 목적이며, 특정 종목의 매수·매도를 권하지 않습니다. 투자 판단과 그에 따른 손익은 전적으로 본인 책임입니다. 균등·비례배정 비율, 증거금률, 청약 한도, 환불 일정은 종목과 증권사에 따라 다르므로, 청약 전 증권신고서와 청약 공고를 반드시 확인하세요. 관련 제도는 <strong>자본시장과 금융투자업에 관한 법률</strong> 및 금융투자협회 인수업무 규정을 따르며, 세부 배정 방식은 개정될 수 있습니다. 본 콘텐츠는 2026-08-05 기준입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://kind.krx.co.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">한국거래소 상장공시시스템(KIND)</a>,{' '}
                  <a href="https://dart.fss.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">금융감독원 전자공시시스템(DART)</a>.
                </p>
              </section>

              <ShareButtons
                title="공모주 청약 균등·비례배정 2026 가이드"
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
