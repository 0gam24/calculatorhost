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

const URL = 'https://calculatorhost.com/guide/national-pension-divorce-split-2026/';
const DATE_PUBLISHED = '2026-07-27';
const DATE_MODIFIED = '2026-07-27';

export const metadata: Metadata = {
  title: '국민연금 분할연금 2026, 이혼하면 배우자 연금 나눠 받는 법',
  description:
    '이혼하면 전 배우자의 국민연금을 나눠 받을 수 있습니다. 혼인기간 5년 이상 등 4가지 요건, 1/2 균분 원칙, 선청구 제도, 5년 소멸시효를 국민연금법 제64조 기준으로 정리했습니다.',
  keywords: [
    '국민연금 분할연금',
    '이혼 국민연금 분할',
    '분할연금 요건',
    '분할연금 청구',
    '분할연금 선청구',
    '국민연금 나눠받기',
    '국민연금법 64조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '국민연금 분할연금 2026, 이혼하면 배우자 연금 나눠 받는 법' }],
    title: '국민연금 분할연금 2026, 이혼 시 배우자 연금 나눠 받는 법',
    description: '혼인기간 5년 이상 등 4요건, 1/2 균분, 선청구, 5년 소멸시효를 국민연금법 제64조 기준으로 총정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '국민연금 분할연금 2026, 이혼 시 나눠 받는 법',
    description: '혼인기간 5년 이상 등 요건과 선청구·소멸시효를 국민연금법 제64조 기준으로 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '분할연금이 정확히 무엇인가요?',
    answer:
      '분할연금은 이혼한 배우자가 상대방의 국민연금 노령연금 중 혼인기간에 해당하는 부분을 나눠 받는 제도입니다(국민연금법 §64). 혼인기간 동안 국민연금 보험료를 낸 것은 부부가 함께 노후를 준비한 것으로 보아, 이혼 후 그 기여분을 배우자에게도 인정해주는 취지입니다. 전업주부처럼 본인 국민연금 가입 이력이 없어도 요건을 갖추면 받을 수 있습니다.',
  },
  {
    question: '분할연금을 받으려면 어떤 요건이 필요한가요?',
    answer:
      '네 가지를 모두 충족해야 합니다. (1) 배우자의 국민연금 가입기간 중 혼인기간이 5년 이상일 것 (2) 배우자와 이혼했을 것 (3) 전 배우자였던 사람이 노령연금 수급권자일 것 (4) 본인이 출생연도별 연금 지급개시연령(61세부터 65세)에 도달할 것입니다. 네 요건이 모두 갖춰진 때 분할연금 수급권이 발생합니다.',
  },
  {
    question: '연금을 얼마씩 나눠 받나요?',
    answer:
      '원칙적으로 전 배우자의 노령연금액 중 혼인기간에 해당하는 부분을 1/2씩 균등하게 나눕니다. 다만 2016년 12월 30일 이후 지급사유가 발생한 경우부터는 당사자 간 협의나 법원의 재판으로 분할 비율을 달리 정할 수 있습니다. 협의·재판으로 정한 비율이 있으면 그 비율이 우선 적용됩니다.',
  },
  {
    question: '아직 연금 받을 나이가 안 됐는데 미리 신청할 수 있나요?',
    answer:
      '가능합니다. 이혼의 효력이 발생한 날부터 3년 이내에 분할연금을 미리 청구하는 선청구 제도가 있습니다(국민연금법 §64의3). 선청구를 해두면 나중에 요건이 모두 충족됐을 때 실제 지급이 시작됩니다. 이혼 후 시간이 지나 전 배우자와 연락이 어려워지기 전에 선청구로 권리를 확보해두는 것이 안전합니다.',
  },
  {
    question: '분할연금은 언제까지 청구해야 하나요?',
    answer:
      '분할연금 수급권이 발생한 때부터 5년 이내에 청구해야 합니다. 이 기간을 넘기면 제척기간이 만료되어 청구할 수 없게 됩니다. 요건을 갖췄는데 청구를 미루면 권리 자체가 사라질 수 있으므로, 지급개시연령에 도달했다면 서둘러 국민연금공단에 청구하세요.',
  },
  {
    question: '전 배우자가 재혼하거나 사망하면 분할연금은 어떻게 되나요?',
    answer:
      '일단 분할연금 수급권을 취득하면, 이후 전 배우자가 재혼하거나 사망해도 본인의 분할연금 수급권은 그대로 유지됩니다. 분할연금은 본인의 고유한 권리로 확정되기 때문입니다. 반대로 본인이 재혼하더라도 분할연금은 계속 받을 수 있습니다.',
  },
  {
    question: '나도 국민연금을 받고 있는데 분할연금을 또 받을 수 있나요?',
    answer:
      '네. 본인의 노령연금과 분할연금은 별개의 권리이므로 함께 받을 수 있습니다. 본인이 가입해 쌓은 노령연금에 더해, 전 배우자로부터 분할받는 몫이 추가됩니다. 다만 구체적인 병급 조정 규정이 있으므로 정확한 금액은 국민연금공단에서 확인하는 것이 좋습니다.',
  },
  {
    question: '혼인기간에 별거나 가출 기간도 포함되나요?',
    answer:
      '분할 대상이 되는 혼인기간에서 실질적으로 혼인관계가 없었던 기간(별거·가출 등)은 제외될 수 있습니다. 당사자 협의나 법원 판결로 실질 혼인기간이 정해지면 그 기간을 기준으로 분할합니다. 다툼이 있으면 이혼 소송 단계에서 연금 분할 비율과 혼인기간을 함께 정리하는 것이 분쟁을 줄입니다.',
  },
];

export default function NationalPensionDivorceSplit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '국민연금 분할연금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '국민연금 분할연금 2026, 이혼하면 배우자 연금 나눠 받는 법',
    description:
      '이혼 시 전 배우자의 국민연금을 나눠 받는 분할연금의 4가지 요건, 1/2 균분 원칙, 선청구 제도, 5년 소멸시효를 국민연금법 제64조 기준으로 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['국민연금', '분할연금', '이혼', '선청구', '국민연금법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '국민연금 분할연금 2026',
    description: '이혼 시 전 배우자 국민연금을 나눠 받는 분할연금의 요건과 청구 방법을 정리한 가이드.',
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
                    { name: '국민연금 분할연금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">이혼·은퇴 준비층 · 8분 읽기 · 2026-07-27</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  국민연금 분할연금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">이혼하면 배우자 연금 나눠 받는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  오랜 결혼생활 끝에 이혼하면 노후 준비가 한순간에 흔들립니다. 특히 배우자만 국민연금을 냈다면 내 노후 소득은 어떻게 되는지 불안할 수밖에 없습니다. 국민연금 분할연금은 이런 상황에서 전 배우자의 연금 중 혼인기간에 해당하는 몫을 나눠 받게 해주는 제도입니다. 이 가이드는 분할연금의 요건, 비율, 선청구와 소멸시효를 국민연금법 제64조 기준으로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-national-pension-divorce-split-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분할연금이란 무엇인가요?</h2>
                <p>
                  분할연금은 이혼한 사람이 전 배우자의 국민연금 노령연금 중 혼인기간에 해당하는 부분을 나눠 받는 제도입니다(국민연금법 §64). 혼인기간 동안 낸 국민연금 보험료를 부부가 함께 노후를 준비한 결과로 보아, 이혼 후 그 기여분을 배우자에게도 인정해주는 것입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">이런 분에게 특히 중요합니다</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 결혼 기간 동안 배우자만 국민연금을 낸 전업주부
                    <br />
                    · 본인 국민연금 가입 이력이 짧거나 없는 이혼 당사자
                    <br />
                    · 황혼 이혼으로 노후 소득 재설계가 필요한 중장년층
                  </p>
                </div>
                <p className="mt-4">
                  다만 분할연금은 자동으로 지급되지 않습니다. 요건이 충족돼도 본인이 직접 국민연금공단에 청구해야 받을 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분할연금 수급 요건 4가지</h2>
                <p>
                  분할연금을 받으려면 다음 네 가지 요건을 모두 갖춰야 합니다. 하나라도 빠지면 아직 수급권이 발생하지 않습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 분할연금 수급 요건 (국민연금법 §64)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">요건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">혼인기간</td>
                        <td className="p-3">배우자 가입기간 중 혼인기간이 5년 이상</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">이혼</td>
                        <td className="p-3">전 배우자와 이혼한 상태</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">상대방 연금</td>
                        <td className="p-3">전 배우자가 노령연금 수급권자</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">본인 연령</td>
                        <td className="p-3">출생연도별 지급개시연령(61세부터 65세) 도달</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 혼인기간이 5년 이상이어야 하므로, 혼인기간이 짧으면 분할연금 대상이 아닙니다. 또 실질적으로 혼인관계가 없었던 별거·가출 기간은 혼인기간에서 제외될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연금은 얼마씩 나누나요? 1/2 균분과 협의 조정</h2>
                <p>
                  분할연금액은 원칙적으로 전 배우자의 노령연금액 중 혼인기간에 해당하는 부분을 1/2씩 균등하게 나눈 금액입니다. 즉 전체 연금이 아니라 혼인기간에 대응하는 부분만 분할 대상입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 혼인기간에 해당하는 연금이 월 80만원인 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 전 배우자 노령연금 중 혼인기간 해당분: 월 80만원
                    <br />
                    · 기본 분할(1/2): 80만원 곱하기 50% = <strong>월 40만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">협의·재판으로 비율을 60:40 등으로 달리 정하면 그 비율이 적용됩니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 2016년 12월 30일 이후 지급사유가 발생한 경우부터는 당사자 간 협의나 법원 재판으로 분할 비율을 달리 정할 수 있습니다(국민연금법 §64의2). 이혼 소송에서 재산분할과 함께 연금 분할 비율을 정해두면 이후 다툼을 줄일 수 있습니다.
                </p>
              </section>

              <AdSlot slot="guide-national-pension-divorce-split-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">아직 연금 나이가 안 됐다면? 선청구 제도</h2>
                <p>
                  이혼은 했지만 아직 지급개시연령이 안 됐다면 선청구 제도를 활용하세요. 이혼의 효력이 발생한 날부터 3년 이내에 분할연금을 미리 청구해두는 제도입니다(국민연금법 §64의3).
                </p>
                <p className="mt-4">
                  선청구를 해두면 나중에 네 가지 요건이 모두 충족됐을 때 실제 지급이 시작됩니다. 이혼 후 시간이 지나면 전 배우자와 연락이 끊기거나 소재 파악이 어려워질 수 있으므로, 권리를 잊지 않도록 선청구로 미리 확보해두는 것이 안전합니다.
                </p>
                <p className="mt-4">
                  예외: 선청구는 이혼 효력 발생일부터 3년이라는 기한이 있습니다. 이 기간을 넘기면 선청구 자체가 불가능하니, 이혼 직후 국민연금공단에 문의해 선청구 가능 여부를 확인하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">청구 기한과 수급권 유지</h2>
                <p>
                  분할연금 수급권은 자격이 발생한 때부터 5년 이내에 청구하지 않으면 제척기간이 만료되어 청구할 수 없게 됩니다. 요건을 갖췄다면 지급개시연령 도달 후 미루지 말고 청구해야 합니다.
                </p>
                <p className="mt-4">
                  일단 분할연금 수급권을 취득하면, 이후 전 배우자가 재혼·사망하더라도 본인의 분할연금은 그대로 유지됩니다. 본인이 재혼해도 마찬가지입니다. 분할연금은 본인의 고유한 권리로 확정되기 때문입니다. 청구는 국민연금공단 지사 방문 또는 우편·팩스로 할 수 있으며, 이혼 사실을 확인할 수 있는 서류가 필요합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/national-pension-expected-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 예상수령액</div>
                    <p className="mt-1 text-sm text-text-secondary">가입기간·소득으로 예상 노령연금을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-early-deferred-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 조기·연기수령</div>
                    <p className="mt-1 text-sm text-text-secondary">받는 시기를 앞당기거나 늦출 때의 감액·증액.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-voluntary-subscription-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 임의가입</div>
                    <p className="mt-1 text-sm text-text-secondary">소득이 없어도 국민연금에 가입해 노후를 준비하는 법.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-lump-sum-refund-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 반환일시금</div>
                    <p className="mt-1 text-sm text-text-secondary">가입기간이 짧을 때 일시금으로 돌려받는 조건.</p>
                  </Link>
                  <Link
                    href="/calculator/retirement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">은퇴자금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">노후에 필요한 목표 자금을 시뮬레이션해보세요.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 금융 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">대출·예적금·연금 관련 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 법률·연금 조언이 아닙니다. 분할연금 수급 요건·비율·금액은 혼인기간과 협의·재판 내용에 따라 달라지므로, 정확한 내용은 국민연금공단(1355) 또는 관할 지사에서 반드시 확인하세요. 본 콘텐츠는 2026-07-27 기준으로 작성되었으며 법령 개정 시 업데이트됩니다. 근거 법령은 국민연금법 §64(분할연금 수급권자), §64의2(분할 비율), §64의3(분할연금 선청구)입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nps.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국민연금공단</a>.
                </p>
              </section>

              <ShareButtons
                title="국민연금 분할연금 2026, 이혼하면 배우자 연금 나눠 받는 법"
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
