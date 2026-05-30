import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { GuideHeader } from '@/components/guide/GuideHeader';
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

const URL = 'https://calculatorhost.com/guide/voluntary-filing-june-50-percent-reduction-2026/';
const DATE_PUBLISHED = '2026-05-31';
const DATE_MODIFIED = '2026-05-31';

export const metadata: Metadata = {
  title: '자진신고 6월 50% 감면 가이드 2026 | 종소세 마감 후 가산세 절반',
  description:
    '5월 31일 마감 지난 종합소득세, 6월 1일~30일 자진신고로 가산세 50% 감면(1개월 내). 산출세액 500만→가산세 50만(정상 100만). 무신고가산세 20% vs 자진신고 감면. 국세기본법 §48. 6월 신고 완벽 가이드.',
  keywords: [
    '자진신고 감면',
    '자진신고 50% 감면',
    '6월 1일 종소세',
    '마감 후 신고',
    '국세기본법 48',
    '무신고가산세 감면',
    '종소세 늦은 신고',
    '6월 30일 신고 기한',
    '자진신고 가산세 절반',
    '신고기한 초과 감면',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '자진신고 6월 50% 감면 | 종소세 마감 후 가산세 절반 | calculatorhost',
    description:
      '5월 31일을 지났다면 6월이 기회. 자진신고로 가산세 50% 감면받기. 산출세액 500만→가산세 50만. 국세기본법 §48.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '자진신고 6월 50% 감면 2026 | 가산세 절반 | calculatorhost',
    description: '5월 31일 마감 후 6월 신고로 가산세 50% 감면. 산출세액 500만→가산세 50만.',
  },
};

const FAQ_ITEMS = [
  {
    question: '5월 31일을 지났는데 6월에 신고해도 괜찮을까요?',
    answer:
      '맞습니다. 5월 31일 신고기한을 넘었어도 세무조사 통지를 받기 전에 자발적으로 신고하면 "자진신고"로 인정되어 가산세가 감면됩니다(국세기본법 §48). 6월 1일~30일에 신고하면 1개월 이내 자진신고 감면으로 50% 감면을 받을 수 있습니다.',
  },
  {
    question: '자진신고 감면이 정확히 몇 %인가요?',
    answer:
      '신고기한 후 경과 기간에 따라 다릅니다. 신고기한 이후 1개월 내: 50% 감면 / 1개월~3개월 내: 30% 감면 / 3개월~6개월 내: 20% 감면 / 6개월~1년 6개월 내: 10% 감면(국세기본법 §48). 6월 신고 시 가장 큰 혜택인 50% 감면을 받습니다.',
  },
  {
    question: '가산세는 무신고가산세인가요?',
    answer:
      '그렇습니다. 신고기한을 넘기고 신고하지 않으면 "무신고"로 처리되어 무신고가산세 20%가 부과됩니다(국세기본법 §47의2). 하지만 자진신고로 감면받으면 이 20%가 50% 깎여서 10%만 납부하게 되는 것입니다.',
  },
  {
    question: '산출세액 500만 원일 때 정확히 얼마를 내나요?',
    answer:
      '산출세액 500만 원이면 무신고가산세 20% = 100만 원이 부과됩니다. 하지만 6월에 자진신고하면 50% 감면 적용되어 가산세는 50만 원만 내고, 세금과 함께 총 550만 원을 납부합니다. 정상 신고 시보다 50만 원 절약.',
  },
  {
    question: '자진신고와 단순히 늦은 신고는 다른 건가요?',
    answer:
      '크게 다릅니다. 자진신고는 세무조사 통지를 받기 전 자발적으로 신고하는 것입니다(국세기본법 §14 실질과세 원칙). 만약 나중에 세무조사 통지를 받으면 자진신고 감면을 받을 수 없고 가산세 20% 전부를 내야 합니다.',
  },
  {
    question: '7월에 신고하면 몇 % 감면을 받나요?',
    answer:
      '7월 신고는 신고기한(5월 31일) 이후 1개월을 초과하여 1개월~3개월 사이에 해당합니다. 따라서 30% 감면만 받을 수 있습니다. 6월 중에 신고하는 것이 최대 혜택인 50% 감면을 받을 수 있습니다.',
  },
  {
    question: '자진신고하면 납부지연가산세도 감면되나요?',
    answer:
      '자진신고 감면은 무신고가산세(국세기본법 §47의2)에만 적용됩니다. 신고는 했지만 세금을 내지 않으면 부과되는 납부지연가산세(국세기본법 §47의4, 일 0.022%)는 별도이므로, 세금 부분은 자진신고와 동시에 함께 납부하는 것이 좋습니다.',
  },
  {
    question: '온라인으로 자진신고 신청을 어디서 하나요?',
    answer:
      '홈택스(hometax.go.kr) 또는 국세청 모바일 앱에서 "신고" → "종합소득세" → "신고서 작성"으로 진행하면 됩니다. 직접 신고 시 신고서 접수 후 자동으로 신고기한 초과 여부 판정되고, 자진신고 감면 조건 충족 시 시스템이 자동 적용합니다.',
  },
];

export default function VoluntaryFilingJune50PercentReduction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '자진신고 6월 50% 감면' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '자진신고 6월 50% 감면 가이드 2026 | 종합소득세 마감 후 가산세 절반',
    description:
      '5월 31일 신고기한을 넘겼어도 6월 중 자진신고로 가산세 50% 감면(1개월 이내). 산출세액 500만→가산세 50만(정상 100만). 무신고가산세 20% vs 자진신고 감면. 국세기본법 §48·§47의2. 6월 신고 완벽 계산·단계별 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['자진신고', '감면', '가산세', '종합소득세', '국세기본법', '무신고'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자진신고 6월 50% 감면 가이드 2026',
    description:
      '5월 31일 종합소득세 신고기한 초과? 6월 1일~30일 자진신고로 가산세 50% 감면 혜택. 산출세액별 정확한 가산세 계산·신고 단계·주의사항·FAQ 완벽 정리.',
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
              <GuideHeader
                breadcrumbItems={[
                  { name: '홈', href: '/' },
                  { name: '가이드', href: '/guide/' },
                  { name: '자진신고 6월 50% 감면' },
                ]}
                category="세금"
                readingMinutes={10}
                publishedDate="2026-05-31"
                title="자진신고 6월 50% 감면 가이드 2026"
                subtitle="— 종소세 마감 후 가산세 절반"
                lead={`5월 31일 종합소득세 신고기한을 넘겼어도 늦지 않습니다. 6월 중 자진신고로 가산세의 50%를 감면받을 수 있습니다. 산출세액 500만 원이면 정상 가산세 100만 원에서 50만 원으로 줄어듭니다. 국세기본법 §48(자진신고 감면)의 가장 큰 혜택을 받는 마지막 기회입니다.`}
              />

              <AdSlot slot="guide-voluntary-filing-june-top" format="horizontal" />

              {/* 정의 + 핵심 수치 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">자진신고란 무엇인가?</h2>
                <p data-speakable className="text-base text-text-secondary leading-relaxed">
                  자진신고는 신고기한을 놓쳤지만, 세무조사 통지를 받기 전에 자발적으로 세금을 신고하고 납부하는 행위입니다(국세기본법 §48). 세무조사를 당하기 전에 자진신고하면 무신고가산세를 20%에서 50%~90% 깎아주는 감면 혜택을 받습니다. 특히 신고기한 이후 1개월 이내 자진신고 시 50% 감면으로 가장 큰 이득을 볼 수 있습니다.
                </p>

                <div className="bg-bg-card p-4 rounded-lg border border-border-base">
                  <p className="text-sm font-semibold text-text-primary mb-3">자진신고 감면율 (기한 경과별)</p>
                  <table className="w-full text-sm">
                    <caption className="sr-only">신고기한 초과 후 자진신고 감면율 테이블</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left py-2 px-2 font-semibold">신고기한 이후 경과</th>
                        <th scope="col" className="text-right py-2 px-2 font-semibold">감면율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="py-2 px-2">1개월 내</td>
                        <td className="text-right py-2 px-2 text-highlight-500 font-bold">50%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="py-2 px-2">1개월~3개월 내</td>
                        <td className="text-right py-2 px-2">30%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="py-2 px-2">3개월~6개월 내</td>
                        <td className="text-right py-2 px-2">20%</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2">6개월~1년 6개월 내</td>
                        <td className="text-right py-2 px-2">10%</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-text-secondary mt-3">출처: 국세기본법 §48 (자진신고 감면)</p>
                </div>

                <div className="bg-highlight-500/10 p-4 rounded-lg border-l-4 border-highlight-500">
                  <p className="font-semibold text-text-primary text-sm mb-1">핵심 수치</p>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>6월 30일까지 신고 시 50% 감면 적용</li>
                    <li>산출세액 500만 → 가산세 100만 → 50% 감면 → 50만만 부담</li>
                    <li>세무조사 통지 받기 전만 자진신고 감면 가능 (§48 §14)</li>
                  </ul>
                </div>
              </section>

              {/* 무신고가산세 vs 자진신고 비교 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">무신고가산세와 자진신고 감면의 차이</h2>
                <p data-speakable className="text-base text-text-secondary leading-relaxed">
                  종합소득세를 신고하지 않으면 "무신고"로 처리되어 무신고가산세 20%가 부과됩니다(국세기본법 §47의2). 예를 들어 산출세액이 500만 원이면 가산세는 100만 원입니다. 하지만 세무조사 통지 받기 전에 자진신고하면 이 가산세를 감면받을 수 있습니다. 6월 중 신고는 신고기한 1개월 이내에 해당하므로 최대 50% 감면을 받아 가산세를 50만 원으로 줄일 수 있습니다.
                </p>

                <div className="bg-bg-card p-4 rounded-lg border border-border-base">
                  <p className="text-sm font-semibold text-text-primary mb-3">산출세액별 가산세 비교</p>
                  <table className="w-full text-sm">
                    <caption className="sr-only">산출세액별 무신고가산세와 자진신고 감면 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left py-2 px-2 font-semibold">산출세액</th>
                        <th scope="col" className="text-right py-2 px-2 font-semibold">무신고가산세 20%</th>
                        <th scope="col" className="text-right py-2 px-2 font-semibold">자진신고 50% 감면</th>
                        <th scope="col" className="text-right py-2 px-2 font-semibold">절약액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="py-2 px-2">300만 원</td>
                        <td className="text-right py-2 px-2">60만 원</td>
                        <td className="text-right py-2 px-2">30만 원</td>
                        <td className="text-right py-2 px-2 font-bold text-highlight-500">30만 원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="py-2 px-2">500만 원</td>
                        <td className="text-right py-2 px-2">100만 원</td>
                        <td className="text-right py-2 px-2">50만 원</td>
                        <td className="text-right py-2 px-2 font-bold text-highlight-500">50만 원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="py-2 px-2">1,000만 원</td>
                        <td className="text-right py-2 px-2">200만 원</td>
                        <td className="text-right py-2 px-2">100만 원</td>
                        <td className="text-right py-2 px-2 font-bold text-highlight-500">100만 원</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2">2,000만 원</td>
                        <td className="text-right py-2 px-2">400만 원</td>
                        <td className="text-right py-2 px-2">200만 원</td>
                        <td className="text-right py-2 px-2 font-bold text-highlight-500">200만 원</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-text-secondary mt-3">주의: 위 비교는 6월 30일까지 신고 시 50% 감면 적용 기준입니다.</p>
                </div>

                <div className="bg-danger-500/10 p-4 rounded-lg border-l-4 border-danger-500">
                  <p className="font-semibold text-text-primary text-sm mb-1">다만, 주의하세요</p>
                  <p className="text-sm text-text-secondary">
                    자진신고 감면은 세무조사 통지를 받기 전에만 적용됩니다. 만약 국세청에서 세무조사 통지를 받으면 그 이후 신고는 자진신고로 인정되지 않으며, 가산세 20% 전액을 내야 합니다(국세기본법 §14 실질과세 원칙).
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-voluntary-filing-june-mid" format="rectangle" />

              {/* 신고 단계별 가이드 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">자진신고 단계별 신고 방법</h2>
                <p data-speakable className="text-base text-text-secondary leading-relaxed">
                  자진신고는 어렵지 않습니다. 홈택스 또는 국세청 모바일 앱에서 신고서를 작성하고 제출하면 됩니다. 시스템이 자동으로 신고기한 초과 여부를 판정하고, 자진신고 감면 조건을 충족하면 자동 적용됩니다.
                </p>

                <div className="space-y-3">
                  <div className="bg-bg-card p-4 rounded-lg border border-border-base">
                    <p className="text-sm font-semibold text-text-primary mb-2">1단계: 홈택스 접속</p>
                    <p className="text-sm text-text-secondary">
                      hometax.go.kr에 접속하거나 국세청 모바일 앱을 실행합니다. 공동인증서 또는 카카오 인증으로 로그인합니다.
                    </p>
                  </div>

                  <div className="bg-bg-card p-4 rounded-lg border border-border-base">
                    <p className="text-sm font-semibold text-text-primary mb-2">2단계: 신고서 선택</p>
                    <p className="text-sm text-text-secondary">
                      메뉴에서 "신고" → "종합소득세" → "신고서 작성"을 선택합니다. 2025년도 또는 2026년도 신고서를 선택하면 됩니다.
                    </p>
                  </div>

                  <div className="bg-bg-card p-4 rounded-lg border border-border-base">
                    <p className="text-sm font-semibold text-text-primary mb-2">3단계: 소득 입력</p>
                    <p className="text-sm text-text-secondary">
                      사업소득, 근로소득, 기타소득, 금융소득 등 해당하는 소득을 입력합니다. 공제액(기본공제, 자녀공제, 의료비 등)도 함께 입력합니다.
                    </p>
                  </div>

                  <div className="bg-bg-card p-4 rounded-lg border border-border-base">
                    <p className="text-sm font-semibold text-text-primary mb-2">4단계: 신고 제출</p>
                    <p className="text-sm text-text-secondary">
                      신고서를 제출하면 신고가 접수됩니다. 신고 접수 이후 신고기한 초과 판정되고, 자진신고 감면이 자동 적용됩니다. 신고 후 즉시 납부하면 납부지연가산세를 피할 수 있습니다.
                    </p>
                  </div>
                </div>

                <div className="bg-highlight-500/10 p-4 rounded-lg border-l-4 border-highlight-500">
                  <p className="font-semibold text-text-primary text-sm mb-1">팁</p>
                  <p className="text-sm text-text-secondary">
                    신고와 동시에 납부도 함께하는 것이 좋습니다. 세금을 내지 않으면 납부지연가산세(일 0.022% — 국세기본법 §47의4)가 추가로 부과되기 때문입니다. 자진신고 감면은 무신고가산세에만 적용되므로 주의하세요.
                  </p>
                </div>
              </section>

              {/* 6월 신고 vs 7월 이후 신고 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">왜 6월 30일까지 신고해야 할까?</h2>
                <p data-speakable className="text-base text-text-secondary leading-relaxed">
                  자진신고 감면율은 신고기한(5월 31일) 이후 경과 기간에 따라 결정됩니다. 6월 중 신고는 1개월 이내이므로 50% 감면을 받지만, 7월에 신고하면 1개월을 초과하여 30% 감면만 받을 수 있습니다. 같은 금액의 가산세라도 6월에 신고하는 것이 훨씬 유리합니다.
                </p>

                <div className="bg-bg-card p-4 rounded-lg border border-border-base">
                  <p className="text-sm font-semibold text-text-primary mb-3">월별 자진신고 감면율 비교</p>
                  <table className="w-full text-sm">
                    <caption className="sr-only">신고 월별 자진신고 감면율 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left py-2 px-2 font-semibold">신고 월</th>
                        <th scope="col" className="text-left py-2 px-2 font-semibold">기한 경과</th>
                        <th scope="col" className="text-right py-2 px-2 font-semibold">감면율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base bg-highlight-500/5">
                        <td className="py-2 px-2 font-bold text-highlight-500">6월</td>
                        <td className="py-2 px-2">1개월 내</td>
                        <td className="text-right py-2 px-2 font-bold text-highlight-500">50%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="py-2 px-2">7월</td>
                        <td className="py-2 px-2">1개월 초과~3개월 내</td>
                        <td className="text-right py-2 px-2">30%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="py-2 px-2">8월~9월</td>
                        <td className="py-2 px-2">3개월 초과~6개월 내</td>
                        <td className="text-right py-2 px-2">20%</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2">10월 이후</td>
                        <td className="py-2 px-2">6개월 이상</td>
                        <td className="text-right py-2 px-2">10%</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-text-secondary mt-3">신고기한: 2026년 5월 31일</p>
                </div>

                <p className="text-base text-text-secondary leading-relaxed">
                  예를 들어 산출세액 1,000만 원인 경우, 6월 신고 시 가산세 200만 원 → 50% 감면 → 100만 원 납부. 7월 신고 시 가산세 200만 원 → 30% 감면 → 140만 원 납부. 단 1개월 차이로 40만 원 더 내야 합니다.
                </p>

                <div className="bg-danger-500/10 p-4 rounded-lg border-l-4 border-danger-500">
                  <p className="font-semibold text-text-primary text-sm mb-1">다만, 주의하세요</p>
                  <p className="text-sm text-text-secondary">
                    감면율이 높을수록 좋지만, 절대로 "신고 안 함"을 선택하면 안 됩니다. 세무조사 통지를 받으면 그 이후 신고는 자진신고로 인정되지 않아 가산세 20% 전액을 내야 합니다. 일찍 신고할수록 감면 혜택이 크다는 뜻이므로 지금 당장 신고하세요.
                  </p>
                </div>
              </section>

              {/* 실제 시뮬레이션 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">실제 사례로 계산해보기</h2>
                <p data-speakable className="text-base text-text-secondary leading-relaxed">
                  구체적인 사례로 자진신고 감면이 어떻게 적용되는지 살펴봅시다. 각 사례는 6월 중 신고 기준입니다.
                </p>

                <div className="space-y-4">
                  {/* 사례 A */}
                  <div className="bg-bg-card p-5 rounded-lg border border-border-base">
                    <p className="font-semibold text-text-primary mb-3">사례 A: 산출세액 500만 원 (6월 15일 신고)</p>
                    <div className="space-y-2 text-sm text-text-secondary">
                      <div className="flex justify-between">
                        <span>산출세액</span>
                        <span className="font-semibold">500만 원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>무신고가산세 20%</span>
                        <span className="font-semibold">100만 원</span>
                      </div>
                      <div className="flex justify-between border-t border-border-base pt-2">
                        <span>자진신고 감면 50%</span>
                        <span className="font-semibold text-highlight-500">-50만 원</span>
                      </div>
                      <div className="flex justify-between border-t border-border-base pt-2">
                        <span className="font-semibold">최종 가산세</span>
                        <span className="font-bold text-lg text-text-primary">50만 원</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">총 납부액 (세금 + 가산세)</span>
                        <span className="font-bold text-lg text-text-primary">550만 원</span>
                      </div>
                    </div>
                    <p className="text-xs text-text-secondary mt-3 pt-3 border-t border-border-base">
                      신고기한: 5월 31일 / 경과 기간: 15일 (1개월 이내) / 감면율: 50%
                    </p>
                  </div>

                  {/* 사례 B */}
                  <div className="bg-bg-card p-5 rounded-lg border border-border-base">
                    <p className="font-semibold text-text-primary mb-3">사례 B: 산출세액 1,000만 원 (8월 신고)</p>
                    <div className="space-y-2 text-sm text-text-secondary">
                      <div className="flex justify-between">
                        <span>산출세액</span>
                        <span className="font-semibold">1,000만 원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>무신고가산세 20%</span>
                        <span className="font-semibold">200만 원</span>
                      </div>
                      <div className="flex justify-between border-t border-border-base pt-2">
                        <span>자진신고 감면 20% (3개월 이내)</span>
                        <span className="font-semibold text-danger-500">-40만 원</span>
                      </div>
                      <div className="flex justify-between border-t border-border-base pt-2">
                        <span className="font-semibold">최종 가산세</span>
                        <span className="font-bold text-lg text-text-primary">160만 원</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">총 납부액 (세금 + 가산세)</span>
                        <span className="font-bold text-lg text-text-primary">1,160만 원</span>
                      </div>
                    </div>
                    <p className="text-xs text-text-secondary mt-3 pt-3 border-t border-border-base">
                      신고기한: 5월 31일 / 경과 기간: 약 70일 (3개월 이내) / 감면율: 20%
                    </p>
                  </div>

                  {/* 사례 C */}
                  <div className="bg-bg-card p-5 rounded-lg border border-border-base">
                    <p className="font-semibold text-text-primary mb-3">사례 C: 산출세액 2,000만 원 (12월 신고)</p>
                    <div className="space-y-2 text-sm text-text-secondary">
                      <div className="flex justify-between">
                        <span>산출세액</span>
                        <span className="font-semibold">2,000만 원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>무신고가산세 20%</span>
                        <span className="font-semibold">400만 원</span>
                      </div>
                      <div className="flex justify-between border-t border-border-base pt-2">
                        <span>자진신고 감면 10% (6개월 초과)</span>
                        <span className="font-semibold text-danger-500">-40만 원</span>
                      </div>
                      <div className="flex justify-between border-t border-border-base pt-2">
                        <span className="font-semibold">최종 가산세</span>
                        <span className="font-bold text-lg text-text-primary">360만 원</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">총 납부액 (세금 + 가산세)</span>
                        <span className="font-bold text-lg text-text-primary">2,360만 원</span>
                      </div>
                    </div>
                    <p className="text-xs text-text-secondary mt-3 pt-3 border-t border-border-base">
                      신고기한: 5월 31일 / 경과 기간: 약 215일 (6개월 이상) / 감면율: 10%
                    </p>
                  </div>
                </div>

                <div className="bg-highlight-500/10 p-4 rounded-lg border-l-4 border-highlight-500">
                  <p className="font-semibold text-text-primary text-sm mb-1">시뮬레이션 결론</p>
                  <p className="text-sm text-text-secondary">
                    같은 산출세액 2,000만 원이어도 6월 신고 시 가산세 100만 원 vs 12월 신고 시 가산세 360만 원으로 무려 260만 원 차이가 발생합니다. 늦을수록 감면 혜택이 줄어들므로, 지금 당장 신고하는 것이 가장 현명합니다.
                  </p>
                </div>
              </section>

              {/* FAQ 섹션 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">자주 묻는 질문</h2>
                <FaqSection items={FAQ_ITEMS} />
              </section>

              {/* 관련 계산기·가이드 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">관련 계산기 및 가이드</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="p-4 bg-bg-card rounded-lg border border-border-base hover:border-primary-500 transition-colors"
                  >
                    <p className="font-semibold text-text-primary mb-1">프리랜서 종합소득세 계산기</p>
                    <p className="text-sm text-text-secondary">
                      사업소득·기타소득 구분, 필요경비율 자동 계산, 실수령액 확인
                    </p>
                  </Link>
                  <Link
                    href="/guide/income-tax-late-filing-penalty-2026/"
                    className="p-4 bg-bg-card rounded-lg border border-border-base hover:border-primary-500 transition-colors"
                  >
                    <p className="font-semibold text-text-primary mb-1">종합소득세 무신고 가산세 2026</p>
                    <p className="text-sm text-text-secondary">
                      무신고가산세 20% 계산, 부정행위 40% 가산세, 신고 방법
                    </p>
                  </Link>
                  <Link
                    href="/guide/income-tax-correction-claim-5-year-2026/"
                    className="p-4 bg-bg-card rounded-lg border border-border-base hover:border-primary-500 transition-colors"
                  >
                    <p className="font-semibold text-text-primary mb-1">경정청구 5년 기한 완벽 가이드</p>
                    <p className="text-sm text-text-secondary">
                      과납 환급, 신고 오류 수정, 세무조사 이의
                    </p>
                  </Link>
                  <Link
                    href="/guide/income-tax-installment-payment-2026/"
                    className="p-4 bg-bg-card rounded-lg border border-border-base hover:border-primary-500 transition-colors"
                  >
                    <p className="font-semibold text-text-primary mb-1">종합소득세 분납 신청 기한 및 방법</p>
                    <p className="text-sm text-text-secondary">
                      분납 가능 금액, 분납이자, 신청 방법
                    </p>
                  </Link>
                  <Link
                    href="/guide/may-comprehensive-income-tax/"
                    className="p-4 bg-bg-card rounded-lg border border-border-base hover:border-primary-500 transition-colors"
                  >
                    <p className="font-semibold text-text-primary mb-1">5월 종합소득세 신고 완벽 가이드</p>
                    <p className="text-sm text-text-secondary">
                      신고 대상, 증빙 준비, 소득 신고 방법
                    </p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="p-4 bg-bg-card rounded-lg border border-border-base hover:border-primary-500 transition-colors"
                  >
                    <p className="font-semibold text-text-primary mb-1">세금 계산기 전체</p>
                    <p className="text-sm text-text-secondary">
                      양도세, 취득세, 재산세, 상속세, 증여세 등
                    </p>
                  </Link>
                </div>
              </section>

              {/* 면책조항 및 AI 보조 표기 */}
              <section className="mt-12 pt-8 border-t border-border-base space-y-4">
                <p className="text-sm text-text-secondary">
                  <strong>면책조항:</strong> 본 가이드는 2026년 5월 31일 현재 종합소득세 신고 규정을 기반으로 작성되었습니다. 세법은 국세청 고시에 따라 수시로 변경될 수 있으므로, 실제 신고 전 국세청 홈택스 또는 세무 전문가 상담을 권장합니다. 인용한 법조항: 국세기본법 §48(자진신고 감면), §47의2(무신고가산세), §47의4(납부지연가산세), §14(실질과세 원칙).
                </p>
                <p className="text-sm text-text-secondary">
                  <strong>AI 보조 작성:</strong> 본 콘텐츠는 AI 보조 작성 후 운영자 검수를 거쳐 발행되었습니다(Google AI Content Policy 준수).
                </p>
                <p className="text-sm text-text-secondary">
                  <strong>업데이트:</strong> 2026년 5월 31일 작성
                </p>
              </section>

              <ShareButtons
                title="자진신고 6월 50% 감면 가이드 2026"
                url={URL}
                description="5월 31일 마감 후 6월 신고로 가산세 50% 감면. 산출세액 500만→가산세 50만."
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
