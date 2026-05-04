import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/averaging-down-vs-loss-cut/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: '물타기 vs 손절 vs 비중조절 — 언제 무엇을 선택하나 (2026) | calculatorhost',
  description:
    '하락 종목을 만났을 때 평단을 낮추는 물타기, 즉시 매도하는 손절, 단계적 매도하는 비중조절. 3가지 전략의 의사결정 기준과 시뮬레이션을 정리합니다.',
  keywords: ['물타기', '손절', '비중조절', '평단', '주식 전략', '코인 전략', '추매'],
  alternates: { canonical: URL },
  openGraph: {
    title: '물타기 vs 손절 vs 비중조절 — 언제 무엇을 선택하나',
    description: '하락장에서의 3가지 전략 의사결정 기준.',
    url: URL,
    type: 'article',

    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '물타기 vs 손절 vs 비중조절',
    description: '하락 종목 대응 3가지 전략의 의사결정 기준.',

  },
};

const FAQ_ITEMS = [
  {
    question: '물타기가 항상 손절보다 좋은가요?',
    answer:
      '아니요. 물타기는 "하락 원인이 일시적"이고 "장기 회복 신뢰도가 높을 때"만 유효합니다. 기업 펀더멘털 악화(매출 감소, 부채 급증, 산업 쇠퇴)나 코인 프로젝트 실패(러그풀, 해킹) 같은 구조적 문제면 물타기는 손실만 키웁니다.',
  },
  {
    question: '손절 기준은 어떻게 정하나요?',
    answer:
      '대표적인 두 가지 방식: ① 손실률 기준 (-7%, -10%, -15% 등 미리 정한 비율) ② 기술적 기준 (지지선 이탈, 추세 전환 신호). 어떤 방식이든 "감정 개입 전 미리 정해두는 것"이 핵심. 일단 매수 후 "조금만 더 기다려보자"는 가장 위험한 사고.',
  },
  {
    question: '비중조절(부분 매도)은 어떤 상황에 유리한가요?',
    answer:
      '"종목 자체는 신뢰하지만 단기 변동성이 너무 크다" 또는 "총 자산에서 한 종목 비중이 너무 커졌다" 할 때. 일부 익절·손절로 비중을 줄여 심리적 부담을 낮추고, 잔여분으로 추가 상승·회복 가능성을 유지하는 전략입니다.',
  },
  {
    question: '코인 물타기는 주식 물타기와 무엇이 다른가요?',
    answer:
      '계산 공식은 동일(가중평균 평단)이지만 시장 구조가 매우 다릅니다. 코인은 ① 24시간 거래·변동성 ±50% 흔함 ② 펀더멘털 평가 어려움 ③ 거래소 리스크(해킹, 파산) 추가. 따라서 코인 물타기는 더 짧은 차수·더 작은 비중으로 분산하는 것이 안전합니다.',
  },
  {
    question: '물타기에 얼마까지 자금을 투입해야 하나요?',
    answer:
      '한 종목 비중을 전체 투자 자산의 5~10% 이상으로 늘리지 않는 것이 일반적 원칙. 물타기를 하더라도 추가 자금이 이 비중을 넘지 않도록 사전 한도를 정하세요. "물탈 자금이 없는 상태"에서의 추가 매수는 절대 금물 — 추가 하락 시 옵션이 사라집니다.',
  },
  {
    question: '비중조절을 위해 분할매도 계산기를 어떻게 쓰나요?',
    answer:
      'calculatorhost의 분할매도 계산기에서 평단·보유 수량을 입력하고, 차수별 매도가/수량을 설정하면 차수별 실현손익(수수료·거래세 차감)이 즉시 계산됩니다. "+5%·+10%·+20%" 빠른 설정으로 평단 대비 목표 수익률에서 매도가를 자동 환산할 수 있어 시나리오 비교에 유용합니다.',
  },
];

export default function AveragingDownVsLossCutPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '물타기 vs 손절 vs 비중조절' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '물타기 vs 손절 vs 비중조절 — 언제 무엇을 선택하나 (2026)',
    description: '하락 종목 대응 3가지 전략의 의사결정 기준과 시뮬레이션.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['물타기', '손절', '비중조절', '주식 전략', '코인 전략'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '물타기 vs 손절 vs 비중조절 — 언제 무엇을 선택하나 (2026)',
    description: '하락 종목을 만났을 때 평단을 낮추는 물타기, 즉시 매도하는 손절, 단계적 매도하는 비중조절. 3가지 전략의 의사결정 기준과 시뮬레이션을 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />

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
                    { name: '물타기 vs 손절 vs 비중조절' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  투자 · 8분 읽기 · 2026-05-03
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  물타기 vs 손절 vs 비중조절 — 언제 무엇을 선택하나
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  하락 종목을 만났을 때 우리는 항상 3가지 선택지를 마주합니다.
                  평단을 낮추는 <strong>물타기</strong>, 즉시 매도하는 <strong>손절</strong>,
                  단계적으로 비중을 조절하는 <strong>비중조절</strong>. 각각 언제 유리한지,
                  의사결정 기준과 시뮬레이션을 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-strategy-top" format="horizontal" />

              <section aria-label="요약 비교" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  3가지 전략 한눈에 보기
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <caption className="sr-only">3가지 하락 대응 전략 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th scope="col" className="py-2 pr-4 font-semibold">전략</th>
                        <th scope="col" className="py-2 pr-4 font-semibold">언제</th>
                        <th scope="col" className="py-2 font-semibold">리스크</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4 font-medium text-text-primary">물타기</td>
                        <td className="py-2 pr-4">하락 원인이 일시적·시장 과반응</td>
                        <td className="py-2">추가 하락 시 손실 가중</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4 font-medium text-text-primary">손절</td>
                        <td className="py-2 pr-4">펀더멘털 악화·미리 정한 손실률 도달</td>
                        <td className="py-2">반등 시 기회비용</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-medium text-text-primary">비중조절</td>
                        <td className="py-2 pr-4">종목 신뢰는 유지 + 비중·심리 부담 ↓</td>
                        <td className="py-2">결정 회피로 흐를 위험</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 물타기를 선택하는 기준</h2>
                <p className="text-text-secondary leading-relaxed">
                  물타기는 "이 종목이 곧 회복할 것"이라는 강한 신념이 전제. 신념의 근거는
                  ① 펀더멘털(매출·이익·산업 전망)이 변하지 않았는데 시장이 과반응 ②
                  거시 환경(금리, 환율, 정치) 일시 충격 ③ 동종 업종 전반 동시 하락(개별
                  종목 문제 아님) — 이 세 가지가 명확할 때.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  <strong>물타기 금지 시그널</strong>: ① 분기 실적 발표 후 가이던스 하향
                  ② 부채비율·이자보상배율 악화 ③ 산업 자체 쇠퇴(예: 디스크 → SSD) ④
                  코인 프로젝트 보안 사고·운영진 잠적·러그풀 의혹.
                </p>
                <div className="rounded-lg bg-bg-raised p-4 text-sm">
                  <strong className="text-text-primary">시뮬레이션</strong>
                  <p className="mt-2 text-text-secondary">
                    50,000원 100주 매수 후 30% 하락(35,000원). 35,000원에 100주 추가 매수 →
                    평단 42,500원 (-15%). 회복까지 필요 상승률 21.4% (35,000→42,500).
                    물타기 없으면 회복 필요 상승률 42.9% (35,000→50,000).{' '}
                    <Link href="/calculator/averaging-down/" className="text-primary-600 underline dark:text-primary-500">
                      직접 계산해보기
                    </Link>
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 손절을 선택하는 기준</h2>
                <p className="text-text-secondary leading-relaxed">
                  손절은 "이 종목의 추가 하락 가능성이 회복 가능성보다 크다"는 판단이
                  서면 즉시 실행. 가장 흔한 두 가지 트리거:
                </p>
                <ul className="ml-5 list-disc space-y-2 text-text-secondary">
                  <li>
                    <strong>손실률 기준</strong>: 매수 전 미리 정한 손실률(-7%, -10%, -15%
                    등)에 도달하면 자동 매도. 감정 개입 차단이 가장 큰 효과.
                  </li>
                  <li>
                    <strong>기술적 기준</strong>: 주요 지지선 이탈, 이동평균선 데드크로스,
                    거래량 동반 급락 등 추세 전환 신호.
                  </li>
                </ul>
                <p className="text-text-secondary leading-relaxed">
                  <strong>손절 후 심리</strong>: "팔자마자 반등하면?"이라는 후회는 손절의
                  최대 적. 이를 방지하려면 손절 후 일정 기간(1~2주) 해당 종목을 보지 않는
                  것이 도움이 됩니다. 결과 시점 비교가 아니라 "그 시점의 의사결정이
                  올바랐는가"로 평가하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 비중조절(부분 매도)을 선택하는 기준</h2>
                <p className="text-text-secondary leading-relaxed">
                  비중조절은 "종목은 여전히 신뢰하지만 한 종목 비중이 너무 커졌다" 또는
                  "단기 변동성이 너무 부담스럽다" 할 때. 50% 매도하고 50% 보유처럼
                  부분적으로 정리하면:
                </p>
                <ul className="ml-5 list-disc space-y-2 text-text-secondary">
                  <li><strong>장점</strong>: 일부 손실(또는 익절) 확정으로 심리적 부담 ↓, 잔여분으로 회복·상승 여지 유지</li>
                  <li><strong>단점</strong>: "결정 회피"로 흐르면 결국 시장 흐름에 끌려가게 됨</li>
                </ul>
                <div className="rounded-lg bg-bg-raised p-4 text-sm">
                  <strong className="text-text-primary">시뮬레이션</strong>
                  <p className="mt-2 text-text-secondary">
                    50,000원 200주 보유 → 35,000원에서 50% 매도(100주). 실현손익 -150만 원
                    확정, 잔여 100주 평단은 50,000원 그대로.{' '}
                    <Link href="/calculator/split-sell/" className="text-primary-600 underline dark:text-primary-500">
                      분할매도 계산기로 시뮬레이션
                    </Link>
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">의사결정 플로우차트</h2>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm text-text-secondary leading-loose">
                  <p>
                    <strong className="text-text-primary">Q1.</strong> 펀더멘털(또는 프로젝트)이 변했는가?
                    <br />
                    → 예 → <strong>손절</strong> (이유 명확하면 빠를수록 좋음)
                    <br />
                    → 아니오 → Q2로
                  </p>
                  <p className="mt-3">
                    <strong className="text-text-primary">Q2.</strong> 추가 매수할 자금 여유가 충분한가?
                    (현재 비중이 5~10% 미만)
                    <br />
                    → 예 → <strong>물타기</strong>
                    <br />
                    → 아니오 → Q3로
                  </p>
                  <p className="mt-3">
                    <strong className="text-text-primary">Q3.</strong> 단기 변동성에 흔들려 의사결정이 어렵다.
                    <br />
                    → <strong>비중조절</strong> (50% 정리해 부담 줄이고 50% 유지)
                  </p>
                </div>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-4 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  ⚠️ 주의사항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>• 본 가이드는 투자 권유가 아니며, 모든 투자 결정은 본인의 책임입니다.</li>
                  <li>• 물타기·손절·비중조절은 모두 손실 가능성을 내포하며, 어떤 전략도 수익을 보장하지 않습니다.</li>
                  <li>• 종목별 펀더멘털 분석은 본인의 책임이며, 본 사이트는 구체 종목 추천을 하지 않습니다.</li>
                </ul>
              </section>

              <section
                aria-label="관련 도구"
                className="card"
              >
                <h2 className="mb-3 text-lg font-semibold">관련 계산기</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/averaging-down/" className="text-primary-600 underline dark:text-primary-500">
                      물타기 계산기
                    </Link>{' '}
                    — 평단 하향 + 회복 필요 상승률 시뮬레이션
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/split-buy/" className="text-primary-600 underline dark:text-primary-500">
                      분할매수 계산기
                    </Link>{' '}
                    — 균등분할·차수별 가중평균
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/split-sell/" className="text-primary-600 underline dark:text-primary-500">
                      분할매도 계산기
                    </Link>{' '}
                    — 차수별 실현손익(세후)
                  </li>
                  <li>
                    →{' '}
                    <Link href="/glossary/" className="text-primary-600 underline dark:text-primary-500">
                      투자 용어사전
                    </Link>
                  </li>
                </ul>
              </section>

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.krx.co.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">
                    한국거래소
                  </a>{' '}
                  투자자 교육,{' '}
                  <a href="https://www.fss.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">
                    금융감독원
                  </a>{' '}
                  투자자 보호.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED}
                </p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
