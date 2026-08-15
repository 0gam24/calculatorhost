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

// [revenue-lever: indexing+traffic]
// indexing: 신규 슬러그 색인 표면 확장, 내부 링크 mesh 6개(청약가점·무주택기간·납입인정·주택청약저축공제·청약허브·금융허브).
// traffic: 2026-09-30 전환 마감 시즌 "청약예금 종합저축 전환"·"청약통장 갈아타기"·"청약부금 전환 방법" 롱테일 흡수(주택공급규칙).

const URL = 'https://calculatorhost.com/guide/housing-subscription-account-conversion-2026/';
const DATE_PUBLISHED = '2026-08-16';
const DATE_MODIFIED = '2026-08-16';

export const metadata: Metadata = {
  title: '청약통장 전환 2026, 9월 30일 마감 갈아타기 방법',
  description:
    '청약저축·청약예금·청약부금을 주택청약종합저축으로 바꾸면 공공과 민영을 모두 청약할 수 있습니다. 전환 기한이 2026년 9월 30일로 연장됐고, 기존 납입금액과 가입기간은 그대로 인정됩니다. 전환 대상, 방법, 유의점을 정리했습니다.',
  keywords: [
    '청약통장 전환',
    '청약예금 종합저축 전환',
    '청약부금 전환',
    '주택청약종합저축',
    '청약통장 갈아타기',
    '청약저축 전환 기한',
    '주택공급에 관한 규칙',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '청약통장 전환 2026, 9월 30일 마감' }],
    title: '청약통장 전환 2026, 9월 30일 마감 갈아타기 방법',
    description: '청약예금·부금·저축을 주택청약종합저축으로. 2026-09-30 마감, 납입액·가입기간 그대로 인정.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '청약통장 전환 2026, 9월 30일 마감 갈아타기 방법',
    description: '주택청약종합저축으로 전환하면 공공·민영 모두 청약 가능. 마감 2026-09-30.',
  },
};

const FAQ_ITEMS = [
  {
    question: '청약통장 전환 기한이 언제까지인가요?',
    answer:
      '2026년 9월 30일까지입니다. 당초 한시적으로 허용됐던 전환 기간이 가입자가 많이 남아 있는 점을 고려해 1년 더 연장됐습니다. 이 기한이 지나면 전환이 다시 가능할지 보장되지 않으므로, 전환을 고려한다면 기한 안에 결정하는 것이 안전합니다.',
  },
  {
    question: '어떤 통장을 전환할 수 있나요?',
    answer:
      '청약저축, 청약예금, 청약부금을 주택청약종합저축으로 전환할 수 있습니다. 이들은 과거 유형별로 청약 대상이 나뉘어 있던 통장입니다. 주택청약종합저축은 이 셋을 통합한 형태로, 현재 신규 가입은 종합저축만 가능합니다.',
  },
  {
    question: '전환하면 그동안 넣은 돈과 가입기간은 어떻게 되나요?',
    answer:
      '그대로 인정됩니다. 청약예금·부금·저축을 주택청약종합저축으로 전환해도 기존 납입금액과 가입기간이 이어집니다. 처음부터 다시 시작하는 것이 아니라 통장 종류만 바꾸는 개념에 가깝습니다. 다만 세부 순위 산정은 청약하려는 주택 유형 기준을 따르므로 확인이 필요합니다.',
  },
  {
    question: '전환하면 무엇이 좋아지나요?',
    answer:
      '청약 범위가 넓어집니다. 과거 청약예금은 민영주택, 청약저축은 공공주택으로 청약 대상이 갈렸습니다. 주택청약종합저축으로 전환하면 공공과 민영을 모두 청약할 수 있어 선택지가 늘어납니다. 공공분양 기회를 살리려는 사람에게 특히 의미가 있습니다.',
  },
  {
    question: '전환은 어디서, 어떻게 하나요?',
    answer:
      '가입한 은행에서 합니다. 청약통장을 개설한 주택도시기금 수탁은행 창구나 비대면(앱·인터넷뱅킹)으로 전환을 신청할 수 있습니다. 다만 아주 오래전(2000년 3월 26일 이전) 가입한 통장은 영업점 방문으로만 전환되는 경우가 있으므로, 은행에 먼저 확인하세요.',
  },
  {
    question: '전환하면 손해 보는 경우도 있나요?',
    answer:
      '경우에 따라 신중해야 합니다. 특정 유형 청약에만 유리했던 기존 통장 조건이 있거나, 목표하는 주택 유형이 이미 명확하다면 전환이 늘 유리한 것은 아닙니다. 예금 예치금 기준, 순위 인정 방식이 유형별로 다르므로 본인의 청약 목표를 먼저 정하고 은행·청약홈에서 조건을 대조한 뒤 결정하세요.',
  },
  {
    question: '전환하면 소득공제 혜택도 이어지나요?',
    answer:
      '요건을 갖추면 주택청약종합저축 납입액 소득공제를 받을 수 있습니다. 무주택 세대주 등 조건과 연 납입 한도 내에서 공제가 적용됩니다. 다만 공제 요건과 한도는 조세특례제한법과 매년 기준에 따르므로, 전환 후 무주택 세대주 등록과 납입증명서 발급 여부를 함께 확인하는 것이 좋습니다.',
  },
  {
    question: '지금 청약을 준비 중인데 전환해도 되나요?',
    answer:
      '청약 목표에 따라 다릅니다. 공공과 민영을 모두 열어 두고 싶다면 전환이 유리할 수 있습니다. 다만 곧 특정 유형에 청약할 예정이라면 전환 직후 순위·예치금 기준 변동 여부를 반드시 청약홈과 은행에서 확인한 뒤 진행하세요. 청약 임박 시점의 전환은 특히 신중해야 합니다.',
  },
];

export default function HousingSubscriptionAccountConversion2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '청약통장 전환 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '청약통장 전환 2026, 9월 30일 마감 갈아타기 방법',
    description:
      '청약저축·청약예금·청약부금을 주택청약종합저축으로 전환하는 방법과 2026년 9월 30일 마감, 납입금액·가입기간 인정 여부, 유의점을 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['청약통장 전환', '주택청약종합저축', '청약예금', '청약부금', '청약저축'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '청약통장 전환 2026',
    description:
      '청약예금·부금·저축을 주택청약종합저축으로 전환하는 방법과 2026-09-30 마감, 유의점 정리.',
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
                    { name: '청약통장 전환 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">청약 대기자 · 7분 읽기 · 2026-08-16</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  청약통장 전환 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 9월 30일 마감, 갈아타기 방법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  오래된 청약저축, 청약예금, 청약부금을 가지고 있다면 지금이 갈아탈 시점입니다. 이들을 주택청약종합저축으로 전환하면 공공과 민영주택을 모두 청약할 수 있고, 전환 기한은 2026년 9월 30일로 연장됐습니다. 이 가이드는 청약 대기자를 위해 전환 대상, 방법, 그리고 전환이 늘 유리한 것은 아닌 경우까지 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">청약통장 전환이 무엇인가요?</h2>
                <p>
                  옛 청약통장을 통합형 주택청약종합저축으로 바꾸는 것입니다. 과거에는 청약저축(공공주택용), 청약예금(민영주택용), 청약부금(민영 소형용)으로 통장이 나뉘어 있었습니다. 주택청약종합저축은 이 셋을 하나로 합친 형태로, 지금 새로 만들 수 있는 청약통장은 종합저축뿐입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 한 줄</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    청약저축·예금·부금 → 주택청약종합저축으로 전환. 기존 납입금액과 가입기간은 이어지고, 청약 가능한 주택 범위가 공공+민영으로 넓어집니다. 마감은 2026년 9월 30일.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전환 마감은 언제까지인가요?</h2>
                <p>
                  2026년 9월 30일까지입니다. 원래 한시적으로 허용됐던 전환 기간이, 아직 기존 통장을 가진 가입자가 많다는 점을 고려해 1년 더 연장됐습니다. 이 날짜가 지난 뒤에도 전환이 열려 있을지는 보장되지 않습니다.
                </p>
                <p>
                  따라서 옛 청약통장을 종합저축으로 바꿀 생각이 조금이라도 있다면, 기한이 남았을 때 조건을 확인하고 결정하는 편이 안전합니다. 전환 여부는 되돌리기 어려운 결정일 수 있으므로 서두르되 신중히 따져야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전환하면 무엇이 좋아지나요?</h2>
                <p>
                  청약할 수 있는 집의 범위가 넓어집니다. 아래 표처럼 기존 통장은 청약 대상이 갈려 있었지만, 종합저축은 둘 다 열립니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 전환 전후 청약 가능 범위 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">통장</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공공주택</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">민영주택</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">청약저축</td>
                        <td className="p-3">가능</td>
                        <td className="p-3">불가</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">청약예금·부금</td>
                        <td className="p-3">불가</td>
                        <td className="p-3">가능</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>주택청약종합저축(전환 후)</strong></td>
                        <td className="p-3"><strong>가능</strong></td>
                        <td className="p-3"><strong>가능</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  특히 공공분양에도 도전하고 싶은 사람에게 전환의 의미가 큽니다. 다만 순위 인정과 예치금 기준은 청약하려는 주택 유형에 따라 다르게 적용되므로, 넓어진 선택지가 곧바로 당첨 확률 상승을 뜻하는 것은 아닙니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">그동안 낸 돈과 가입기간은 어떻게 되나요?</h2>
                <p>
                  그대로 이어집니다. 전환해도 기존 납입금액과 가입기간이 인정되므로, 오래 부어 온 통장의 가치를 잃지 않습니다. 통장 종류만 바꾸는 개념에 가깝습니다.
                </p>
                <p>
                  다만 세부 순위 산정은 청약하려는 주택 유형 기준을 따릅니다. 예를 들어 민영주택은 지역·면적별 예치금 기준을, 공공주택은 납입 횟수와 인정 금액을 봅니다. 전환 후 내 통장이 목표 유형에서 어떤 순위로 인정되는지 청약홈에서 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전환은 어떻게 신청하나요?</h2>
                <p>
                  가입한 은행에서 신청합니다. 절차는 간단합니다.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>내 청약통장이 청약저축·예금·부금 중 무엇인지 확인</li>
                  <li>목표 주택 유형(공공·민영)을 정하고 전환 이득 판단</li>
                  <li>통장 개설 은행 창구 또는 비대면(앱·인터넷뱅킹)으로 전환 신청</li>
                  <li>전환 후 순위·예치금·소득공제 요건을 청약홈에서 재확인</li>
                </ol>
                <p className="mt-4">
                  다만 2000년 3월 26일 이전에 가입한 아주 오래된 통장은 영업점 방문으로만 전환되는 경우가 있습니다. 비대면이 안 되면 창구로 방문하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전환이 늘 유리한가요?</h2>
                <p>
                  아닙니다. 목표가 명확하면 오히려 기존 통장이 나을 수 있습니다. 전환은 되돌리기 어렵기 때문에, 다음 경우에는 특히 신중해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>목표 유형이 확정된 경우:</strong> 특정 민영 또는 공공만 노린다면 굳이 바꿀 필요가 적을 수 있음</li>
                  <li><strong>청약이 임박한 경우:</strong> 전환 직후 순위·예치금 기준 변동 여부를 반드시 확인</li>
                  <li><strong>기존 통장 조건이 유리한 경우:</strong> 과거 조건이 특정 청약에 더 맞을 수 있음</li>
                </ul>
                <p className="mt-4">
                  결론적으로 전환은 선택지를 넓히는 카드일 뿐, 모두에게 정답은 아닙니다. 본인의 청약 목표를 먼저 정하고 은행과 청약홈에서 조건을 대조한 뒤 결정하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/housing-subscription/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약가점 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">무주택기간·부양가족·가입기간 점수를 계산하세요.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-no-house-period-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">무주택 기간 산정 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">청약가점의 핵심, 무주택 기간 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-savings-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약저축 소득공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">납입액 소득공제 요건과 한도를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/private-housing-subscription-deposit-amount-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">민영주택 예치금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">지역·면적별 청약 예치금 기준.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-score-84-points-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약가점 만점 84점 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">가점 항목별 만점 구조를 이해하세요.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 금융 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">대출·예적금·청약 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 청약·금융 조언이 아닙니다. 전환 마감일, 순위 인정, 예치금 기준, 소득공제 요건은 제도 변경에 따라 달라질 수 있으므로 가입 은행과 청약홈, 국토교통부 안내로 반드시 확인하세요. 전환은 되돌리기 어려운 결정일 수 있으니 본인의 청약 목표를 먼저 정하고 조건을 대조한 뒤 진행하시기 바랍니다. 본 콘텐츠는 2026-08-16 기준으로 작성됐으며, 관련 규정(주택공급에 관한 규칙) 개정 시 즉시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.applyhome.co.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">청약홈(한국부동산원)</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://nhuf.molit.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">주택도시기금</a>.
                </p>
              </section>

              <ShareButtons
                title="청약통장 전환 2026, 9월 30일 마감 갈아타기 방법 가이드"
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
