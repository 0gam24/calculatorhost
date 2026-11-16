// [revenue-lever: traffic]
import type { Metadata } from 'next';
import { GuideCalculatorCta } from '@/components/guide/GuideCalculatorCta';
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

const URL = 'https://calculatorhost.com/guide/january-vehicle-tax-prepayment/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-11-16';

export const metadata: Metadata = {
  title: '자동차세 연납 할인 2026, 1월 신청 약 4.6% 공제',
  description:
    '자동차세 연납은 1월에 내면 연세액의 약 4.58%를 공제받습니다. 3월·6월·9월에도 가능하지만 공제가 줄어듭니다.',
  keywords: [
    '자동차세 연납',
    '자동차세 1월',
    '자동차세 연납 공제',
    '자동차세 미리납부',
    '위택스 자동차세',
    '자동차세 카드 무이자',
    '연납 신청',
    '지방세법 128조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    type: 'article',

    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',

  },
};

const FAQ_ITEMS = [
  {
    question: '자동차세 연납 공제율은 정확히 몇 %인가요?',
    answer:
      '연 5% 금리를 남은 기간에 비례해 공제하는 방식입니다(지방세법 §128③, 시행령 §125). 1월 신청은 연세액 × 334/365 × 5%로 연세액 대비 약 4.58%, 3월은 약 3.77%, 6월·9월은 하반기분만 적용돼 연세액 대비 각각 약 2.5%와 1.25%입니다. 정확한 값은 자동차세 계산기에서 확인할 수 있습니다.',
  },
  {
    question: '자동차세 연납은 어디서 신청하나요?',
    answer:
      '위택스(wetax.go.kr)가 가장 편리하고 24시간 가능합니다. 그 밖에 자동차세 미리납부 앱, 시·군·구청 방문, 은행 창구에서도 신청할 수 있습니다. 서울은 ETAX, 경기·인천 등 지자체별 별도 앱도 운영됩니다.',
  },
  {
    question: '연납 후 차량 매도하면 환급받나요?',
    answer:
      '네, 일할로 계산해 환급받습니다. 매도일 기준으로 미경과 일수에 해당하는 세액을 돌려받으며, 위택스에서 자동 처리되거나 시·군·구청 신청으로 진행됩니다. 환급 처리에는 보통 1~2개월이 걸립니다.',
  },
  {
    question: '신용카드 무이자 할부 가능한가요?',
    answer:
      '네, 카드사별로 2~6개월 무이자 할부가 제공됩니다. 결제 수수료 약 0.8%는 본인 부담이며, 위택스나 카드사 앱에서 신청할 수 있습니다. 하나·신한·KB·삼성 등 주요 카드사 모두 지원하고, 카드사 이벤트(캐시백)와 결합하면 추가 절약이 가능합니다.',
  },
  {
    question: '연납 신청 안 하면 언제 내나요?',
    answer:
      '연납 미신청 시 6월 16~30일 제1기분과 12월 16~31일 제2기분으로 반씩 나눠 납부합니다. 다만 연세액 10만원 이하이면 6월에 전액 일괄 고지됩니다. 1월 연납 대비 연세액의 약 4.58%만큼 공제를 받지 못하는 셈입니다.',
  },
  {
    question: '경차도 연납 공제를 받나요?',
    answer:
      '네, 모든 차량이 대상입니다. 1000cc 경차는 연세액이 약 104,000원이므로 1월 신청 시 공제가 약 4,750원 수준이지만, 위택스에서 1분이면 신청할 수 있어 챙기는 쪽이 유리합니다.',
  },
  {
    question: '자동차세 연납 신청 후 취소·변경 가능한가요?',
    answer:
      '신청 후 납부 전이면 취소할 수 있습니다. 납부 후에는 매도·말소 등 사유가 있을 때만 환급 신청으로 돌려받을 수 있고, 차량 보유 중 단순 취소는 어렵습니다.',
  },
  {
    question: '배기량별 1월 연납 공제액은 얼마인가요?',
    answer:
      '예: 1000cc 경차는 연세액 104,000원에서 1월 공제 약 4,750원, 1600cc 아반떼는 291,200원에서 약 13,310원, 2000cc 쏘나타는 520,000원에서 약 23,790원, 3000cc G80은 780,000원에서 약 35,680원이 공제됩니다. 각 세목(자동차세·지방교육세)별로 "남은 기간 × 5% 금리"를 곱한 뒤 10원 미만을 절사한 값입니다.',
  },
] as const;

export default function JanuaryVehicleTaxPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '자동차세 연납 할인' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '자동차세 연납 할인 가이드 2026, 1월 약 4.58% 공제',
    description: '자동차세 연납은 연 5% 금리를 남은 기간에 비례해 공제하는 방식입니다. 1월 신청은 약 4.58%, 3월 약 3.77%, 6월·9월은 하반기분만 적용됩니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['자동차세 연납', '연납 공제', '위택스', '지방세법 128조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자동차세 연납 할인 가이드 2026',
    description: '자동차세 연납 공제는 연 5% 금리를 남은 기간에 비례해 적용됩니다. 1월 신청은 연세액 대비 약 4.58%, 3월 약 3.77%, 6월·9월은 하반기분만 공제됩니다.',
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
                    { name: '자동차세 연납 할인' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·자동차 · 6분 읽기 · 2026-11-16</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  자동차세 연납 할인 가이드 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 1월 신청 약 4.58% 공제, 3·6·9월에도 신청 가능</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  자동차세는 1년에 6월·12월 2회 분할 납부가 기본이지만, 1월·3월·6월·9월에 남은 세액을
                  미리 내면 공제가 적용됩니다(지방세법 §128③, 시행령 §125). 공제는 <strong>연 5% 금리를 남은 기간에
                  비례해</strong> 적용하기 때문에 1월 신청이 연세액 대비 약 4.58%로 가장 크고, 3월 약 3.77%,
                  6월·9월은 하반기분만 공제됩니다. 위택스에서 1분 신청, 신용카드 무이자 할부도 가능합니다.
                </p>
              </header>
              <GuideCalculatorCta slug="january-vehicle-tax-prepayment" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <ul className="space-y-1.5 text-sm" data-speakable>
                  <li><strong>1월 신청</strong>: 연세액 × 334/365 × 5%, 연세액 대비 약 4.58% 공제</li>
                  <li><strong>3월 신청</strong>: 연세액 × 275/365 × 5%, 약 3.77%</li>
                  <li><strong>6월 신청</strong>: 하반기분 × 5%, 연세액 대비 약 2.5%(상반기분은 6월 정기 납부)</li>
                  <li><strong>9월 신청</strong>: 하반기분 × 92/184 × 5%, 연세액 대비 약 1.25%</li>
                  <li><strong>신청처</strong>: 위택스(wetax.go.kr) 또는 자동차세 미리납부 앱</li>
                  <li><strong>신용카드</strong>: 2~6개월 무이자 할부 가능, 수수료 약 0.8% 본인 부담</li>
                  <li><strong>매도 시</strong>: 일할 환급(위택스 자동 처리 또는 지자체 신청)</li>
                </ul>
              </section>

              <section aria-label="공제율표" className="card">
                <h2 className="mb-3 text-xl font-bold">연납 공제율(지방세법 §128③, 시행령 §125)</h2>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                  <p className="text-text-primary font-semibold mb-2">공제 방식: 연 5% 금리 × 남은 기간</p>
                  <p className="text-text-secondary mb-3">자동차세와 지방교육세 각각에 "남은 기간 ÷ 365(또는 184) × 5%"를 곱해 공제액을 산출하고, 세목별로 10원 미만을 절사합니다. 1월은 2월 1일부터 12월 31일까지 334일이 남아 있어 공제율이 가장 큽니다.</p>
                  <p className="text-text-secondary">본 계산기의 "연납 할인 적용" 옵션을 체크하면 배기량과 신청 월을 기준으로 실시간 공제액을 확인할 수 있습니다.</p>
                </div>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left font-semibold text-text-primary">신청 월별 연납 공제율</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left" scope="col">신청 월</th>
                        <th className="px-3 py-2 text-left" scope="col">공제 공식</th>
                        <th className="px-3 py-2 text-right" scope="col">연세액 대비 공제율</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-bold">1월</td>
                        <td className="px-3 py-2">연세액 × 334/365 × 5%</td>
                        <td className="px-3 py-2 text-right font-semibold text-primary-700 dark:text-primary-300">약 4.58%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">3월</td>
                        <td className="px-3 py-2">연세액 × 275/365 × 5%</td>
                        <td className="px-3 py-2 text-right">약 3.77%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">6월</td>
                        <td className="px-3 py-2">하반기분 × 5% (상반기분은 6월 정기 납부)</td>
                        <td className="px-3 py-2 text-right">약 2.5%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">9월</td>
                        <td className="px-3 py-2">하반기분 × 92/184 × 5%</td>
                        <td className="px-3 py-2 text-right">약 1.25%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-text-tertiary">
                  신청·납부는 1월, 3월, 6월, 9월 네 번 가능합니다. 지자체에 따라 자동이체 추가 공제가 있을 수 있습니다.
                </p>
              </section>

              <section aria-label="2027년 1월 연납 기간" className="card">
                <h2 className="mb-3 text-xl font-bold">2027년 1월 연납은 언제까지 신청하나요?</h2>
                <p className="text-sm text-text-secondary" data-speakable>
                  2027년 1월 연납은 1월 16일부터 신고·납부할 수 있고, 마지막 날인 1월 31일이 일요일이라
                  2월 1일(월)까지 낼 수 있습니다.
                </p>
                <p className="mt-3 text-sm text-text-secondary">
                  지방세법 시행령 §125③은 1월 연납 기간을 1월 16일부터 1월 31일까지로 정합니다. 기한이
                  토요일이나 일요일이면 그 다음 날이 기한이 됩니다(지방세기본법 §24①). 다만, 지자체
                  고지서와 위택스에 표시된 납부기한이 기준이니 실제 날짜는 고지서에서 확인하세요.
                </p>
                <p className="mt-3 text-sm text-text-secondary">
                  공제에 쓰는 이자율은 시행령 §125⑥에 연도 구분 없이 100분의 5로 정해져 있습니다
                  (국가법령정보센터 현행 본문, 2026-11-16 확인). 이 조항이 연말에 개정되지 않으면 2027년
                  1월 연납도 5%를 남은 기간에 비례해 공제합니다. 이 글의 공제액 예시는 2026년 기준이고,
                  2027년 정확한 금액은 1월 고지서로 확인하세요.
                </p>
              </section>

              <section aria-label="배기량별 1월 연납 공제" className="card">
                <h2 className="mb-3 text-xl font-bold">배기량별 자동차세와 1월 연납 공제 예시</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left font-semibold text-text-primary">1월 연납 신청 시 세목별 공제액</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left" scope="col">대표 차종</th>
                        <th className="px-3 py-2 text-right" scope="col">배기량</th>
                        <th className="px-3 py-2 text-right" scope="col">연 자동차세(본세+교육세)</th>
                        <th className="px-3 py-2 text-right" scope="col">1월 공제 합계</th>
                        <th className="px-3 py-2 text-right" scope="col">실제 납부액</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">경차(모닝)</td>
                        <td className="px-3 py-2 text-right">1000cc</td>
                        <td className="px-3 py-2 text-right tabular-nums">104,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums">4,750원</td>
                        <td className="px-3 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">99,250원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">아반떼</td>
                        <td className="px-3 py-2 text-right">1600cc</td>
                        <td className="px-3 py-2 text-right tabular-nums">291,200원</td>
                        <td className="px-3 py-2 text-right tabular-nums">13,310원</td>
                        <td className="px-3 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">277,890원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">쏘나타</td>
                        <td className="px-3 py-2 text-right">2000cc</td>
                        <td className="px-3 py-2 text-right tabular-nums">520,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums">23,790원</td>
                        <td className="px-3 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">496,210원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">그랜저</td>
                        <td className="px-3 py-2 text-right">2500cc</td>
                        <td className="px-3 py-2 text-right tabular-nums">650,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums">29,730원</td>
                        <td className="px-3 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">620,270원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">G80·카니발</td>
                        <td className="px-3 py-2 text-right">3000cc</td>
                        <td className="px-3 py-2 text-right tabular-nums">780,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums">35,680원</td>
                        <td className="px-3 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">744,320원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-text-tertiary">
                  각 세목(자동차세·지방교육세)별로 "남은 기간 × 5% 금리"를 곱한 뒤 10원 미만을 절사해 더한 값입니다.{' '}
                  <Link href="/calculator/vehicle-tax/" className="text-primary-600 underline dark:text-primary-500">
                    자동차세 계산기
                  </Link>
                  에서 본인 차량 값으로 바로 계산할 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">신청 방법, 위택스 3단계 (가장 간편)</h2>
                <ol className="space-y-3 text-sm">
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 1. 위택스 로그인</strong>
                    <p className="text-text-secondary">
                      <a href="https://www.wetax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">위택스(wetax.go.kr)</a> 접속 → 공동인증서·간편인증·PASS 로그인. 모바일은 "스마트 위택스" 앱.
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 2. 자동차세 연납 메뉴 진입</strong>
                    <p className="text-text-secondary">
                      "납부" → "자동차세 미리납부" → 본인 차량 자동 조회. 차량번호 정확한지 확인.
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 3. 결제</strong>
                    <p className="text-text-secondary">
                      ① 신용카드 (무이자 할부 선택) ② 계좌이체 ③ 간편결제 (카카오·네이버페이). 영수증
                      자동 발급 + 메일 송부. 처리 즉시 완료.
                    </p>
                  </li>
                </ol>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4 text-sm">
                  <strong className="text-text-primary">신용카드 무이자 할부 활용 팁</strong>
                  <ul className="mt-2 space-y-1 text-text-secondary">
                    <li>• <strong>카드사별 무이자 기간</strong>: 하나·신한·KB·삼성 등 주요 카드 모두 2~6개월 무이자 지원</li>
                    <li>• <strong>수수료</strong>: 약 0.8% 본인 부담(60만원 기준 약 4,800원)</li>
                    <li>• <strong>이벤트 결합</strong>: 카드사별 캐시백·마일리지 이벤트와 결합 가능</li>
                    <li>• <strong>현금흐름</strong>: 정기 납부(6월·12월) 대신 1월 무이자 할부로 월별 분산 가능</li>
                  </ul>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>• 공제 방식과 금리는 지방세법 §128③·시행령 §125에 따릅니다. 세부 운영 지침은 지자체에 따라 다를 수 있으니 위택스 안내를 확인하세요.</li>
                  <li>• 신청 후 차량 매도·말소 시 환급 신청이 필요합니다(위택스 자동 처리 또는 지자체 신청).</li>
                  <li>• 카드 결제 수수료 약 0.8%는 본인 부담입니다. 무이자 할부와 결합하면 실질 부담이 줄어듭니다.</li>
                  <li>• 3월·6월·9월에도 연납을 신청할 수 있지만 공제율은 1월이 가장 큽니다.</li>
                </ul>
              </section>

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 도구</h2>
                <ul className="space-y-2 text-sm">
                  <li>→ <Link href="/calculator/vehicle-tax/" className="text-primary-600 underline dark:text-primary-500">자동차세 계산기, 본인 차종 정확한 세액·연납 절감액</Link></li>
                  <li>→ <Link href="/guide/vehicle-tax-june-payment-annual-discount-2026/" className="text-primary-600 underline dark:text-primary-500">자동차세 제1기 6월 납부 가이드, 연납 놓쳤을 때의 정기분 납부·차령경감</Link></li>
                  <li>→ <Link href="/guide/vehicle-individual-consumption-tax-deadline-2026-june/" className="text-primary-600 underline dark:text-primary-500">자동차 개별소비세 인하 종료 가이드, 7월부터 기본세율 5% 환원</Link></li>
                  <li>→ <Link href="/guide/tax-calendar-2026/" className="text-primary-600 underline dark:text-primary-500">2026 세금 캘린더, 모든 세금 일정</Link></li>
                </ul>
              </section>

              <ShareButtons title="자동차세 연납 할인 가이드 2026" url={URL} description="자동차세 연납은 연 5% 금리를 남은 기간에 비례해 공제하는 방식. 1월 신청은 약 4.58% 공제." />

              <section aria-label="출처 및 면책" className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary">
                <p className="mb-2">
                  <strong>법적 근거</strong>: 지방세법 §128③(자동차세 연납 공제) · 시행령 §125 · §127①(세율) · §151(지방교육세). 참고:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국가법령정보센터</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">위택스 자동차세 미리납부 안내</a>.
                </p>
                <p>
                  <strong>면책</strong>: 본 가이드는 정보 제공 목적입니다. 지자체별 운영 지침에 따라 세부 사항이 다를 수 있으므로 실제 납부 전 위택스 또는 관할 시·군·구청에서 확인하시기 바랍니다.
                </p>
                <p><strong>업데이트</strong>: {DATE_MODIFIED}</p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
