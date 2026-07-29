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

const URL = 'https://calculatorhost.com/guide/national-pension-voluntary-continued-enrollment-2026/';
const DATE_PUBLISHED = '2026-07-30';
const DATE_MODIFIED = '2026-07-30';

export const metadata: Metadata = {
  title: '국민연금 임의계속가입 2026, 60세 이후 65세까지 늘리기',
  description:
    '국민연금 임의계속가입은 60세 이후에도 65세 전까지 가입을 이어가 최소 가입기간을 채우거나 연금액을 늘리는 제도입니다. 신청 자격·기한과 보험료 전액 본인부담, 유리한 경우를 국민연금법 §13 기준으로 정리했습니다.',
  keywords: [
    '국민연금 임의계속가입',
    '60세 이후 국민연금',
    '국민연금 가입기간 연장',
    '임의계속가입 신청',
    '노령연금 늘리기',
    '국민연금법 13조',
    '국민연금 65세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '국민연금 임의계속가입 2026, 60세 이후 65세까지 늘리기' }],
    title: '국민연금 임의계속가입 2026, 60세 이후 65세까지 늘리기',
    description: '60세 이후에도 65세 전까지 가입을 이어가 최소 가입기간을 채우거나 연금액을 늘리는 제도. 자격·기한·보험료를 국민연금법 §13 기준으로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '국민연금 임의계속가입 2026, 60세 이후 65세까지 늘리기',
    description: '가입기간 10년을 못 채웠거나 연금을 더 받고 싶다면 60세 이후에도 가입 연장이 가능합니다. 국민연금법 §13.',
  },
};

const FAQ_ITEMS = [
  {
    question: '국민연금 임의계속가입이 무엇인가요?',
    answer:
      '임의계속가입은 60세가 되어 국민연금 의무가입 자격이 끝난 뒤에도 본인이 원하면 65세 전까지 가입을 이어가는 제도입니다(국민연금법 §13). 가입기간이 부족해 연금을 못 받는 사람이 최소 기간을 채우거나, 이미 받을 자격이 있어도 가입기간을 늘려 연금액을 키우고 싶을 때 활용합니다.',
  },
  {
    question: '누가 신청할 수 있나요?',
    answer:
      '국민연금 가입자였던 사람으로 60세에 도달했거나 노령연금 수급권을 얻은 사람이 신청할 수 있습니다. 다만 60세 이후 반환일시금을 이미 받았거나, 가입기간 전체가 미납 또는 납부예외 상태인 경우에는 신청이 제한됩니다. 외국인 가입자도 요건을 갖추면 신청할 수 있습니다.',
  },
  {
    question: '언제까지 신청해야 하나요?',
    answer:
      '만 65세 생일 전날까지 신청할 수 있습니다. 60세가 되었다고 자동으로 가입이 이어지는 것이 아니라 본인이 직접 신청해야 하며, 원하는 시점에 수시로 신청할 수 있습니다. 60세 자격 상실 이후 시간이 지나도 65세 전이면 신청 가능하지만, 늦게 시작하면 채울 수 있는 기간이 줄어드니 서두르는 것이 좋습니다.',
  },
  {
    question: '보험료는 얼마를 내나요?',
    answer:
      '보험료율 9%를 전액 본인이 부담합니다. 직장에 다닐 때는 회사와 절반씩 나눠 4.5%만 냈지만, 임의계속가입은 사업장 가입이 아니므로 9% 전액을 본인이 냅니다. 기준소득월액은 본인이 신고한 소득을 바탕으로 정해지며, 그에 따라 매월 낼 보험료가 결정됩니다.',
  },
  {
    question: '가입기간 10년을 못 채웠는데 임의계속가입이 도움이 되나요?',
    answer:
      '큰 도움이 됩니다. 노령연금을 매달 받으려면 최소 가입기간 10년(120개월)을 채워야 합니다. 60세까지 이 기간을 못 채우면 연금 대신 그동안 낸 돈에 이자를 더한 반환일시금만 받게 됩니다. 임의계속가입으로 부족한 개월수를 채우면, 목돈이 아니라 평생 매달 받는 연금으로 전환할 수 있어 노후 안정성이 크게 높아집니다.',
  },
  {
    question: '이미 연금 받을 자격이 되는데도 계속 가입하면 유리한가요?',
    answer:
      '연금액을 늘리고 싶다면 유리할 수 있습니다. 가입기간이 길수록, 낸 보험료가 많을수록 노령연금액이 커집니다. 다만 더 내는 보험료 대비 늘어나는 연금액과 본인의 기대수명, 당장의 현금 흐름을 함께 따져야 합니다. 건강하고 오래 받을 것으로 예상되면 유리하지만, 당장 생활비가 빠듯하다면 신중히 판단하세요.',
  },
  {
    question: '임의가입과 임의계속가입은 어떻게 다른가요?',
    answer:
      '임의가입은 의무가입 대상이 아닌 사람(전업주부 등)이 60세 전에 자발적으로 가입하는 것이고, 임의계속가입은 60세로 의무가입이 끝난 사람이 65세 전까지 가입을 이어가는 것입니다. 둘 다 자발적 가입이지만 대상과 시기가 다릅니다. 이미 가입 이력이 있는 60세 이상이라면 임의계속가입이 해당됩니다.',
  },
  {
    question: '중간에 그만둘 수 있나요?',
    answer:
      '가능합니다. 임의계속가입은 본인의 선택이므로 언제든 탈퇴 신청을 할 수 있습니다. 다만 목표한 가입기간을 채우기 전에 그만두면 연금 수급 요건을 못 채울 수 있으므로, 최소 가입기간 달성이 목적이라면 목표 개월수를 채운 뒤 탈퇴 여부를 결정하는 것이 좋습니다. 자세한 상담은 국민연금공단에서 받으세요.',
  },
];

export default function NationalPensionVoluntaryContinuedEnrollment2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '국민연금 임의계속가입 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '국민연금 임의계속가입 2026, 60세 이후 65세까지 늘리기',
    description:
      '국민연금 임의계속가입의 신청 자격·기한(65세 전날까지), 보험료 9% 전액 본인부담, 최소 가입기간 채우기와 연금액 증액 활용을 국민연금법 §13 기준으로 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['국민연금', '임의계속가입', '가입기간 연장', '노령연금', '60세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '국민연금 임의계속가입 2026',
    description: '국민연금 임의계속가입 자격·기한·보험료와 유리한 경우 정리.',
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
                    { name: '국민연금 임의계속가입 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">은퇴 준비층·장년층 · 8분 읽기 · 2026-07-30</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  국민연금 임의계속가입 2026
                  <br />
                  <span className="text-2xl text-text-secondary">60세 이후 65세까지 연금 늘리기</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 60세가 가까워졌지만 국민연금 가입기간이 부족하거나, 연금을 조금이라도 더 받고 싶은 장년층과 은퇴 준비자를 위한 것입니다. 60세가 되면 국민연금 의무가입은 끝나지만, 임의계속가입을 신청하면 65세 전까지 가입을 이어가 최소 가입기간을 채우거나 연금액을 키울 수 있습니다. 누가 언제까지 신청하는지, 보험료는 얼마인지, 어떤 경우에 유리한지 국민연금법 조항과 함께 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-national-pension-voluntary-continued-enrollment-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임의계속가입은 어떤 제도인가요?</h2>
                <p>
                  임의계속가입은 60세가 되어 국민연금 의무가입 자격을 잃은 뒤에도, 본인이 희망하면 65세가 되기 전까지 가입을 이어가는 제도입니다(국민연금법 §13). 60세 도달로 가입이 끝나면 더 낼 수 없는 것이 원칙이지만, 이 제도를 통해 가입기간을 늘릴 길을 열어 둔 것입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>대상: 60세에 도달한 국민연금 가입자(였던 자)</li>
                    <li>기간: 65세 생일 전날까지 가입 연장 가능</li>
                    <li>목적: 최소 가입기간 10년 채우기 또는 연금액 증액</li>
                    <li>보험료: 9% 전액 본인 부담</li>
                    <li>근거: 국민연금법 §13(임의계속가입자)</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">왜 60세 이후에도 가입을 이어갈까요?</h2>
                <p>
                  이유는 크게 두 가지입니다. 노령연금을 매달 받으려면 가입기간이 최소 10년(120개월)이어야 하는데, 이를 못 채운 사람에게는 부족분을 채우는 마지막 기회가 되고, 이미 자격이 되는 사람에게는 연금액을 늘리는 수단이 됩니다.
                </p>
                <p>
                  가입기간이 10년에 못 미치면 연금이 아니라 그동안 낸 보험료에 이자를 더한 반환일시금을 한 번에 받고 끝납니다. 반면 임의계속가입으로 10년을 채우면, 목돈 대신 평생 매달 나오는 노령연금으로 바뀝니다. 오래 살수록 총 수령액 차이가 커지므로, 부족한 개월수가 얼마 남지 않았다면 채우는 편이 대체로 유리합니다.
                </p>
                <p>
                  다만 이미 10년을 넘긴 사람이 연금액을 늘리려고 계속 가입하는 경우에는, 추가로 내는 보험료 대비 늘어나는 연금이 충분한지, 당장의 생활비에 무리가 없는지를 함께 따져야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신청 자격과 기한은 어떻게 되나요?</h2>
                <p>
                  신청 자격은 60세에 도달했거나 노령연금 수급권을 취득한 국민연금 가입자(였던 자)입니다. 신청 기한은 65세 생일 전날까지이며, 원하는 때 수시로 신청할 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 임의계속가입 신청 요건 (국민연금법 §13)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신청 대상</td>
                        <td className="p-3">60세 도달 가입자(였던 자)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">신청 기한</td>
                        <td className="p-3">65세 생일 전날까지</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">보험료</td>
                        <td className="p-3">9% 전액 본인 부담</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">신청 제외</td>
                        <td className="p-3">반환일시금 수령, 전액 미납·납부예외</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 60세 이후 이미 반환일시금을 받았거나, 가입기간 전체가 미납 또는 납부예외인 경우에는 신청이 제한됩니다. 본인이 대상인지 헷갈리면 국민연금공단(1355)에 문의해 가입 이력을 확인하세요.
                </p>
              </section>

              <AdSlot slot="guide-national-pension-voluntary-continued-enrollment-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임의계속가입 vs 추후납부, 무엇을 고를까요?</h2>
                <p>
                  가입기간을 늘리는 방법에는 임의계속가입 외에 추후납부(추납)도 있습니다. 과거 납부예외 기간의 보험료를 나중에 메워 가입기간으로 인정받는 제도로, 둘의 성격이 다릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 임의계속가입 vs 추후납부 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">임의계속가입</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">추후납부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">방식</td>
                        <td className="p-3">60세 이후 계속 납부</td>
                        <td className="p-3">과거 미납 기간 메움</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">늘어나는 기간</td>
                        <td className="p-3">앞으로 낸 개월수</td>
                        <td className="p-3">과거 납부예외 개월수</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">활용 시점</td>
                        <td className="p-3">60세 이후 신청</td>
                        <td className="p-3">가입 중(주로 60세 전)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  정리하자면, 과거 납부예외 기간이 있다면 추후납부로 그 기간을 먼저 살리고, 그래도 가입기간이 부족하거나 연금을 더 키우고 싶다면 임의계속가입으로 앞으로의 기간을 이어가는 조합이 일반적입니다. 본인 상황에 맞는 조합은 국민연금공단 상담으로 설계하는 것이 정확합니다.
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
                    <div className="font-semibold text-primary-500">국민연금 예상 수령액</div>
                    <p className="mt-1 text-sm text-text-secondary">가입기간과 소득으로 예상 연금액을 가늠하세요.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-voluntary-subscription-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 임의가입</div>
                    <p className="mt-1 text-sm text-text-secondary">전업주부 등 자발적 가입 제도와의 차이를 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-additional-payment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 추후납부</div>
                    <p className="mt-1 text-sm text-text-secondary">과거 미납 기간을 메워 가입기간을 늘리는 법.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-early-deferred-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 조기·연기수령</div>
                    <p className="mt-1 text-sm text-text-secondary">수령 시기를 당기거나 늦출 때의 손익을 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-lump-sum-refund-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 반환일시금</div>
                    <p className="mt-1 text-sm text-text-secondary">가입기간을 못 채웠을 때 받는 목돈의 조건.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">연금·세금·금융 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 연금 상담이 아닙니다. 임의계속가입의 유불리는 개인의 가입기간, 소득, 기대수명, 현금 흐름에 따라 크게 달라지므로, 신청 전 국민연금공단(1355)에서 본인 이력을 확인하고 상담받으세요. 보험료율·기준소득월액 상한 등 세부 수치는 개정될 수 있습니다. 본 콘텐츠는 2026-07-30을 기준으로 작성되었으며, 관련 법령 개정 시 즉시 업데이트됩니다. 근거 법령: <strong>국민연금법 §13(임의계속가입자)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nps.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국민연금공단</a>.
                </p>
              </section>

              <ShareButtons
                title="국민연금 임의계속가입 2026 가이드"
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