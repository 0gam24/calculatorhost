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

// 북극성 수익 레버: [revenue-lever: indexing+traffic] (신규 색인 표면 + 검색 의도 흡수)

const URL = 'https://calculatorhost.com/guide/national-pension-lump-sum-refund-2026/';
const DATE_PUBLISHED = '2026-07-24';
const DATE_MODIFIED = '2026-07-24';

export const metadata: Metadata = {
  title: '국민연금 반환일시금 2026, 조건·금액·반납 정리 | calculatorhost',
  description:
    '국민연금 반환일시금은 60세에 가입기간 10년을 못 채웠거나 국적상실·국외이주 시 낸 보험료에 이자를 더해 돌려받는 급여입니다. 지급 조건, 금액 계산, 반납 제도, 청구 시효를 국민연금법 §77 기준으로 정리했습니다.',
  keywords: [
    '국민연금 반환일시금',
    '국민연금 일시금 수령',
    '국민연금 60세 10년',
    '반환일시금 반납',
    '국민연금 국적상실',
    '국민연금 돌려받기',
    '국민연금법 77조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '국민연금 반환일시금 2026, 조건·금액·반납 정리' }],
    title: '국민연금 반환일시금 2026, 낸 보험료 이자까지 돌려받는 법',
    description: '60세 가입 10년 미만·국적상실·국외이주 시 지급. 금액 계산과 반납으로 연금 복원하는 법까지 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '국민연금 반환일시금 2026, 조건·금액·반납',
    description: '60세 가입 10년 미만·국적상실·국외이주 시 지급. 보험료 + 이자. 국민연금법 §77.',
  },
};

const FAQ_ITEMS = [
  {
    question: '국민연금 반환일시금은 언제 받을 수 있나요?',
    answer:
      '가입자 자격을 더 이상 유지할 수 없을 때만 지급됩니다(국민연금법 §77). 대표적으로 60세가 되었는데 가입기간이 10년 미만이라 연금(노령연금)을 받을 수 없는 경우, 가입자였던 사람이 사망했는데 유족연금 대상이 아닌 경우, 국적을 상실하거나 국외로 이주하는 경우입니다.',
  },
  {
    question: '반환일시금은 얼마를 받나요?',
    answer:
      '본인이 낸 연금보험료(직장가입자는 회사가 부담한 몫 포함)에 이자를 더한 금액을 받습니다. 이자는 보험료를 낸 달의 다음 달부터 지급 사유가 생긴 달까지의 기간에 대해, 그 기간에 적용된 3년 만기 정기예금 이자율을 적용해 계산합니다. 즉 낸 돈에 그동안의 이자가 붙는 구조입니다.',
  },
  {
    question: '60세에 10년을 못 채웠으면 무조건 일시금인가요?',
    answer:
      '아닙니다. 선택지가 있습니다. 60세가 되어도 가입기간이 10년에 조금 못 미치면, 임의계속가입으로 보험료를 더 내 10년을 채운 뒤 매월 연금으로 받는 방법이 있습니다. 오래 살수록 연금이 유리한 경우가 많으므로, 반환일시금과 임의계속가입 중 어느 쪽이 나은지 국민연금공단과 상담해 보는 것이 좋습니다.',
  },
  {
    question: '반환일시금을 받으면 그동안의 가입 이력은 사라지나요?',
    answer:
      '네, 반환일시금을 받으면 그 기간의 가입 이력은 정산되어 사라집니다. 다만 이후 다시 국민연금 가입자가 되면, 받았던 반환일시금에 이자를 더해 반납(반납금)함으로써 과거 가입 이력을 복원할 수 있습니다(국민연금법 §78).',
  },
  {
    question: '반납하면 어떤 점이 좋나요?',
    answer:
      '과거 가입기간이 복원되면 그 기간이 노령연금 산정에 포함되어 연금액이 늘어날 수 있습니다. 특히 과거에는 소득대체율이 더 높았기 때문에, 예전 가입 이력을 복원하면 지금 새로 가입하는 것보다 연금이 더 유리해지는 경우가 있습니다. 반납금은 분할해서 낼 수도 있습니다.',
  },
  {
    question: '반환일시금은 언제까지 청구해야 하나요?',
    answer:
      '반환일시금을 받을 권리는 지급 사유가 발생한 날부터 5년간 행사하지 않으면 시효로 소멸합니다(국민연금법 §115). 다만 국외이주 등 특정 사유는 별도 규정이 적용될 수 있으므로, 사유가 생기면 미루지 말고 국민연금공단에 청구 절차를 확인하세요.',
  },
  {
    question: '세금이 붙나요?',
    answer:
      '반환일시금은 소득세법상 기타소득 등으로 과세될 수 있으며, 지급 시 원천징수가 이뤄지는 경우가 있습니다. 다만 과세 방식은 지급 사유와 개인 상황에 따라 다르므로, 구체적인 세금은 국민연금공단과 국세청(홈택스) 안내로 확인하는 것이 정확합니다.',
  },
  {
    question: '국외이주로 받은 뒤 다시 국내로 돌아오면요?',
    answer:
      '국외이주·국적상실로 반환일시금을 받은 뒤 다시 국내에 거주하며 가입자가 되면, 반납 제도를 통해 과거 이력을 복원할 수 있습니다. 반납 가능 여부와 금액은 개인별 이력에 따라 다르므로 국민연금공단에 확인하세요.',
  },
];

export default function NationalPensionLumpSumRefund2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '국민연금 반환일시금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '국민연금 반환일시금 2026, 낸 보험료 이자까지 돌려받는 법',
    description:
      '국민연금 반환일시금의 지급 조건(60세 10년 미만·사망·국적상실·국외이주), 금액 계산, 반납을 통한 가입기간 복원, 청구 시효를 국민연금법 §77·§78 기준으로 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['국민연금 반환일시금', '일시금 수령', '60세 10년', '반납', '국민연금법 77조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '국민연금 반환일시금 2026',
    description:
      '국민연금 반환일시금의 지급 조건·금액·반납·청구 시효 정리.',
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
                    { name: '국민연금 반환일시금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">은퇴·국민연금 가입자 · 7분 읽기 · 2026-07-24</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  국민연금 반환일시금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">낸 보험료 이자까지 돌려받는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  국민연금을 오래 붓지 못한 채 60세가 되면, 매월 나오는 연금 대신 한 번에 목돈으로 돌려받는 반환일시금을 떠올리게 됩니다. 그런데 아무 때나 받을 수 있는 건 아니고, 금액 계산도 헷갈립니다. 이 가이드는 반환일시금을 언제·얼마·어떻게 받는지, 그리고 나중에 반납해 연금을 복원하는 방법까지 국민연금법 조문 기준으로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-national-pension-lump-sum-refund-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">반환일시금이란 무엇인가요?</h2>
                <p>
                  반환일시금은 국민연금 가입자 자격을 더 이상 유지할 수 없을 때, 그동안 낸 보험료에 이자를 더해 한 번에 돌려주는 급여입니다(국민연금법 §77). 매월 받는 노령연금과 달리 목돈을 일시에 받습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한눈 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    지급 사유: 60세 가입 10년 미만, 사망(유족연금 미해당), 국적상실·국외이주.
                    <br />
                    금액: 낸 보험료(사용자 부담분 포함) + 이자.
                    <br />
                    청구 시효: 지급 사유 발생일부터 5년 (국민연금법 §115).
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 반환일시금 지급 사유 (국민연금법 §77)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">사유</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">설명</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">60세 도달</td>
                        <td className="p-3">가입기간 10년 미만으로 노령연금 불가</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">사망</td>
                        <td className="p-3">유족연금 지급 대상이 아닌 경우</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">국적상실·국외이주</td>
                        <td className="p-3">더 이상 국내 가입자 자격을 유지할 수 없는 경우</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 단순히 회사를 그만두거나 소득이 없어진 것만으로는 반환일시금을 받을 수 없습니다. 위 사유에 해당해야 하며, 그 전까지는 가입 이력이 그대로 유지됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">반환일시금은 얼마를 받나요?</h2>
                <p>
                  받는 금액은 그동안 낸 연금보험료 총액에 이자를 더해 정합니다. 직장가입자였다면 회사가 부담한 보험료도 포함됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>원금:</strong> 본인 + 사용자가 낸 연금보험료 총액.</li>
                  <li><strong>이자:</strong> 보험료 납부 다음 달부터 지급 사유 발생 달까지, 그 기간의 3년 만기 정기예금 이자율 적용.</li>
                  <li><strong>이자율 예시:</strong> 2026년 적용 3년 만기 정기예금 이자율은 약 2.2% 수준(연도별 변동).</li>
                </ul>
                <p>
                  다만 이자는 매월 적용 이자율로 누적 계산되므로, 정확한 금액은 국민연금공단이 산정합니다. 예상액은 공단 홈페이지나 지사에서 확인할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">60세에 10년을 못 채웠으면 어떻게 하나요?</h2>
                <p>
                  60세가 되어 가입기간이 10년(120개월)에 못 미치면, 두 갈래 선택이 있습니다. 반환일시금으로 목돈을 받거나, 임의계속가입으로 더 내서 연금으로 바꾸는 것입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 반환일시금 vs 임의계속가입 (60세 10년 미만)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">반환일시금</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">임의계속가입</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">받는 방식</td>
                        <td className="p-3">목돈 일시 수령</td>
                        <td className="p-3">10년 채운 뒤 매월 연금</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">장수 시 유불리</td>
                        <td className="p-3">오래 살면 상대적으로 불리</td>
                        <td className="p-3">오래 살수록 유리</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">추가 부담</td>
                        <td className="p-3">없음</td>
                        <td className="p-3">부족한 기간만큼 보험료 추가 납부</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 어느 쪽이 유리한지는 남은 가입 기간, 건강·수명 전망, 목돈의 필요성에 따라 다릅니다. 결정 전 국민연금공단에 두 경우의 예상액을 함께 문의해 비교하는 것이 안전합니다.
                </p>
              </section>

              <AdSlot slot="guide-national-pension-lump-sum-refund-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">반납하면 무엇이 좋나요?</h2>
                <p>
                  과거에 반환일시금을 받았더라도, 다시 가입자가 되면 받은 금액에 이자를 더해 반납해 과거 가입 이력을 되살릴 수 있습니다(국민연금법 §78).
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>효과:</strong> 복원된 가입기간이 노령연금 산정에 포함되어 연금액 증가.</li>
                  <li><strong>과거 이력의 이점:</strong> 예전에는 소득대체율이 더 높아, 옛 이력을 복원하면 유리한 경우가 있음.</li>
                  <li><strong>납부 방법:</strong> 반납금은 일시 또는 분할 납부 가능(이자 가산).</li>
                </ul>
                <p>
                  다만 반납이 항상 이득인 것은 아니며, 반납금 규모와 늘어나는 연금액을 비교해야 합니다. 예상 증가액은 공단에서 시뮬레이션으로 확인할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">반환일시금 계산·판단 사례</h2>
                <p>
                  단순화한 예시로 흐름을 살펴보겠습니다. 실제 이자는 월별 이자율로 누적되므로 금액은 공단 산정 기준과 다를 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 60세, 가입 7년(84개월), 월 보험료 20만원</p>
                  <p className="text-sm text-text-secondary">
                    · 낸 보험료 원금(본인+사용자): 20만원 × 84개월 = 1,680만원
                    <br />
                    · 이자 가산 후: 원금 1,680만원 + 그간의 이자
                    <br />
                    · 판정: 10년 미만이라 노령연금 불가 → <strong>반환일시금 대상(또는 임의계속가입 선택)</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 국외이주로 반환일시금 수령 후 귀국·재가입</p>
                  <p className="text-sm text-text-secondary">
                    · 과거 수령액 800만원 → 귀국 후 재가입
                    <br />
                    · 800만원 + 이자를 반납 → 과거 가입기간 복원
                    <br />
                    · 효과: 복원 기간이 연금 산정에 포함되어 <strong>노령연금액 상승</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 60세, 가입 9년 6개월(114개월)</p>
                  <p className="text-sm text-text-secondary">
                    · 10년까지 6개월 부족
                    <br />
                    · 임의계속가입으로 6개월치 보험료 추가 납부 → 10년 충족
                    <br />
                    · 판정: <strong>반환일시금 대신 매월 연금 수령 가능</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">경계: 10년(120개월)을 채우느냐가 일시금과 연금을 가르는 분기점입니다.</span>
                  </p>
                </div>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/national-pension-voluntary-subscription-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 임의계속가입</div>
                    <p className="mt-1 text-sm text-text-secondary">10년을 채워 연금으로 받는 방법을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-expected-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 예상수령액 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">가입기간별 예상 연금액을 가늠해 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-additional-payment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 추납 제도</div>
                    <p className="mt-1 text-sm text-text-secondary">빈 기간을 메워 가입기간을 늘리는 방법.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-early-deferred-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 조기·연기수령</div>
                    <p className="mt-1 text-sm text-text-secondary">수령 시기를 앞당기거나 늦추는 선택을 비교하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/retirement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">은퇴자금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">필요 노후자금을 계산해 계획을 세워 보세요.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로·연금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">국민연금·퇴직·4대보험 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 연금 조언이 아닙니다. 반환일시금 금액과 이자, 반납금, 과세 여부는 개인 가입 이력과 지급 사유, 연도별 이자율에 따라 달라집니다. 결정 전 국민연금공단(nps.or.kr)에서 본인 기준 예상액을 확인하세요. 본 콘텐츠는 2026-07-24 기준이며 법령·이자율 개정 시 업데이트됩니다. 근거 법조항은 <strong>국민연금법 §77(반환일시금), §78(반납금), §115(소멸시효)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.nps.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국민연금공단</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="국민연금 반환일시금 2026 가이드"
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
