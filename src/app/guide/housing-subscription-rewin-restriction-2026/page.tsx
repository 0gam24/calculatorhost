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

const URL = 'https://calculatorhost.com/guide/housing-subscription-rewin-restriction-2026/';
const DATE_PUBLISHED = '2026-07-30';
const DATE_MODIFIED = '2026-07-30';

export const metadata: Metadata = {
  title: '청약 재당첨 제한 2026, 당첨되면 몇 년 묶이나',
  description:
    '청약에 당첨되면 지역·주택 유형에 따라 최장 10년간 다시 당첨될 수 없습니다. 재당첨 제한 기간, 세대원 전원 적용 원칙, 계약 포기해도 남는 제한을 주택공급규칙 §54 기준으로 정리했습니다.',
  keywords: [
    '청약 재당첨 제한',
    '재당첨 제한 기간',
    '청약 당첨 제한',
    '투기과열지구 재당첨',
    '청약 세대원 제한',
    '주택공급에 관한 규칙 54조',
    '청약 당첨 후 포기',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '청약 재당첨 제한 2026, 당첨되면 몇 년 묶이나' }],
    title: '청약 재당첨 제한 2026, 당첨되면 몇 년 묶이나',
    description: '당첨 시 지역·유형별 최장 10년 제한. 세대원 전원 적용, 계약 포기해도 남는 제한을 주택공급규칙 §54 기준으로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '청약 재당첨 제한 2026, 당첨되면 몇 년 묶이나',
    description: '청약 당첨은 끝이 아니라 시작. 최장 10년 재당첨 제한과 세대원 전원 적용 규칙을 정리했습니다.',
  },
};

const FAQ_ITEMS = [
  {
    question: '청약에 당첨되면 다시는 청약할 수 없나요?',
    answer:
      '영구히 막히는 것은 아니지만 일정 기간 재당첨이 제한됩니다. 주택공급에 관한 규칙 §54에 따라, 규제지역이나 분양가상한제 주택 등에 당첨되면 지역과 주택 유형에 따라 정해진 기간 동안 다른 청약에 당첨될 수 없습니다. 제한 기간이 지나면 다시 청약할 수 있습니다.',
  },
  {
    question: '재당첨 제한 기간은 정확히 몇 년인가요?',
    answer:
      '지역과 주택 성격에 따라 다르며 최장 10년입니다. 통상 투기과열지구에서 당첨되면 10년, 조정대상지역에서 당첨되면 7년의 재당첨 제한이 적용됩니다. 분양가상한제 적용 주택 등도 별도의 제한 기간이 있습니다. 다만 규제지역 지정과 세부 기간은 정책에 따라 바뀌므로 청약 시점에 청약홈에서 확인해야 합니다.',
  },
  {
    question: '계약을 포기하면 재당첨 제한도 사라지나요?',
    answer:
      '아닙니다. 재당첨 제한은 계약 여부와 관계없이 당첨 사실만으로 적용됩니다. 당첨된 뒤 계약을 하지 않거나 포기해도 이미 당첨자로 분류되어 제한이 그대로 남습니다. 마음에 들지 않는 단지라도 일단 당첨되면 제한이 걸리므로, 청약 전에 정말 계약할 단지인지 신중히 판단해야 합니다.',
  },
  {
    question: '남편이 당첨되면 아내도 청약을 못 하나요?',
    answer:
      '그럴 수 있습니다. 재당첨 제한은 당첨자 본인뿐 아니라 같은 세대에 속한 세대구성원 전원에게 적용됩니다. 즉 배우자나 세대원이 규제지역 주택에 당첨되면, 나머지 세대원도 제한 기간 동안 청약 당첨이 막힙니다. 세대 단위로 관리되므로 가족 중 누가 청약할지 미리 전략을 세우는 것이 좋습니다.',
  },
  {
    question: '무순위 청약(줍줍)도 재당첨 제한이 있나요?',
    answer:
      '주택 유형과 공급 방식에 따라 다릅니다. 일부 무순위·잔여세대 공급은 재당첨 제한 적용 대상에서 제외되거나 완화되는 경우가 있으나, 규제지역이나 분양가상한제 주택은 제한이 적용될 수 있습니다. 무순위 청약이라고 무조건 제한이 없다고 단정하지 말고, 해당 모집공고와 청약홈 안내를 반드시 확인하세요.',
  },
  {
    question: '재당첨 제한과 청약통장 사용은 어떻게 다른가요?',
    answer:
      '둘은 별개입니다. 재당첨 제한은 일정 기간 당첨 자체를 막는 규제이고, 청약통장은 당첨되면 사용(효력 소멸)되어 다시 가입해 가점을 쌓아야 합니다. 또한 전매제한(당첨 후 일정 기간 매도 금지)도 재당첨 제한과 다른 규제이므로, 세 가지를 구분해서 이해해야 청약 계획을 세울 수 있습니다.',
  },
  {
    question: '내가 재당첨 제한 대상인지 어떻게 확인하나요?',
    answer:
      '청약홈(applyhome.co.kr)에서 청약자격 확인 메뉴로 본인과 세대원의 당첨 이력 및 제한 여부를 조회할 수 있습니다. 과거 당첨 사실을 잊고 청약했다가 부적격 처리되면 그 자체로 또 다른 제한을 받을 수 있으므로, 청약 전 반드시 자격을 조회하는 습관을 들이세요.',
  },
  {
    question: '재당첨 제한을 어기고 당첨되면 어떻게 되나요?',
    answer:
      '부적격 당첨으로 처리되어 당첨이 취소됩니다. 나아가 부적격 사유에 따라 일정 기간 청약 자격이 추가로 제한될 수 있습니다. 제한 기간 중 무심코 청약해 당첨되면 오히려 불이익이 커지므로, 제한이 걸린 상태에서는 청약을 삼가고 기간이 끝난 뒤 도전하는 것이 안전합니다.',
  },
];

export default function HousingSubscriptionRewinRestriction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '청약 재당첨 제한 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '청약 재당첨 제한 2026, 당첨되면 몇 년 묶이나',
    description:
      '청약 재당첨 제한 기간(지역·유형별 최장 10년), 세대원 전원 적용, 계약 포기해도 남는 제한, 확인 방법을 주택공급에 관한 규칙 §54 기준으로 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['청약 재당첨 제한', '재당첨 제한 기간', '투기과열지구', '세대원', '청약홈'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '청약 재당첨 제한 2026',
    description: '청약 재당첨 제한 기간과 세대원 적용 원칙, 계약 포기해도 남는 제한 정리.',
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
                    { name: '청약 재당첨 제한 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">청약 대기자 · 8분 읽기 · 2026-07-30</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  청약 재당첨 제한 2026
                  <br />
                  <span className="text-2xl text-text-secondary">당첨되면 몇 년 묶이나</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 청약을 준비 중이거나 이미 당첨 경험이 있는 무주택 실수요자를 위한 것입니다. 청약 당첨은 끝이 아니라 재당첨 제한이라는 새로운 규제의 시작입니다. 당첨되면 지역과 주택 유형에 따라 최장 10년간 다시 당첨될 수 없고, 계약을 포기해도 이 제한은 사라지지 않으며, 심지어 세대원 전원에게 적용됩니다. 얼마나 오래 묶이는지, 어떤 함정이 있는지 주택공급 규칙과 함께 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-housing-subscription-rewin-restriction-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">재당첨 제한이란 무엇인가요?</h2>
                <p>
                  재당첨 제한은 청약에 당첨된 사람이 일정 기간 다른 청약에 당첨될 수 없도록 막는 규제입니다(주택공급에 관한 규칙 §54). 소수의 사람이 인기 단지를 반복 당첨해 실수요자의 기회를 빼앗는 것을 막기 위한 장치로, 규제지역이나 분양가상한제 주택 등 특정 유형에 당첨되면 걸립니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>제한 기간: 지역·유형별 최장 10년 (투기과열 10년, 조정 7년 등)</li>
                    <li>적용 시점: 당첨 사실만으로 적용 (계약 포기해도 유지)</li>
                    <li>적용 범위: 당첨자 본인 + 세대구성원 전원</li>
                    <li>근거: 주택공급에 관한 규칙 §54</li>
                    <li>확인: 청약홈 청약자격 조회</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">제한 기간은 몇 년인가요?</h2>
                <p>
                  당첨된 주택이 어느 지역, 어떤 유형이냐에 따라 제한 기간이 달라집니다. 규제 강도가 셀수록 제한 기간이 깁니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 지역·유형별 재당첨 제한 기간 (주택공급에 관한 규칙 §54, 일반 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">당첨 주택 구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">재당첨 제한 기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">투기과열지구 주택</td>
                        <td className="p-3"><strong>당첨일부터 10년</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">조정대상지역 주택</td>
                        <td className="p-3"><strong>당첨일부터 7년</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">분양가상한제·공공택지 등</td>
                        <td className="p-3">유형별 별도 기간</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">일반지역(비규제) 일반 분양</td>
                        <td className="p-3">제한 없음 또는 완화</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 규제지역(투기과열지구·조정대상지역) 지정은 정부 부동산 정책에 따라 수시로 바뀌고, 최근에는 규제지역이 대폭 해제된 시기도 있었습니다. 위 기간은 일반적 기준이며, 실제 당첨 주택에 적용되는 정확한 제한 기간은 반드시 청약홈과 해당 단지 입주자모집공고에서 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">계약을 포기해도 제한이 남나요?</h2>
                <p>
                  남습니다. 이 부분이 가장 많이들 오해하는 함정입니다. 재당첨 제한은 당첨 사실 그 자체로 발생하며, 이후 계약을 하지 않거나 계약을 해지해도 이미 당첨자로 기록되어 제한이 그대로 유지됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 마음에 안 드는 단지에 당첨된 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 투기과열지구 A단지 청약 당첨
                    <br />
                    · 위치·평형이 마음에 들지 않아 계약 포기
                    <br />
                    · 결과: 당첨 사실은 남아 <strong>당첨일부터 10년</strong> 재당첨 제한
                    <br />
                    <span className="text-xs text-text-tertiary">교훈: 계약할 확신이 없는 단지에는 애초에 청약하지 않는 것이 정답.</span>
                  </p>
                </div>
                <p className="mt-4">
                  따라서 청약은 실제로 계약하고 입주할 의사가 확실한 단지에만 넣어야 합니다. 시세차익만 노리고 여러 단지에 무분별하게 청약했다가 원하지 않는 단지에 당첨되면, 정작 살고 싶은 단지가 나왔을 때 제한에 걸려 청약조차 못 하는 상황이 벌어집니다.
                </p>
              </section>

              <AdSlot slot="guide-housing-subscription-rewin-restriction-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세대원 전원에게 적용된다고요?</h2>
                <p>
                  그렇습니다. 재당첨 제한은 당첨자 개인이 아니라 세대 단위로 관리됩니다. 같은 세대에 속한 배우자나 세대원이 규제지역 주택에 당첨되면, 나머지 세대원도 제한 기간 동안 청약 당첨이 막힙니다.
                </p>
                <p>
                  이 때문에 부부가 각자 청약통장을 가지고 있어도, 한 사람이 당첨되면 다른 사람은 제한 기간 동안 사실상 당첨될 수 없습니다. 가족 중 누가 먼저 청약에 도전할지, 어떤 단지에 넣을지를 세대 전체 차원에서 전략적으로 결정해야 하는 이유입니다.
                </p>
                <p>
                  예외: 세대 분리 시점과 방식에 따라 적용 범위가 달라질 수 있으나, 청약 직전에 형식적으로만 세대를 분리하는 것은 인정되지 않을 수 있습니다. 세대 구성과 관련한 판단은 청약홈 자격 조회와 사업주체(시행사) 문의로 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전매제한·청약통장과 어떻게 다른가요?</h2>
                <p>
                  청약 규제는 이름이 비슷해 헷갈리기 쉽습니다. 재당첨 제한, 전매제한, 청약통장 효력은 서로 다른 개념이므로 구분해서 이해해야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 청약 관련 3대 규제 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">재당첨 제한</td>
                        <td className="p-3">일정 기간 다시 당첨될 수 없음(§54)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">전매제한</td>
                        <td className="p-3">당첨 후 일정 기간 분양권 매도 금지</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">청약통장 효력</td>
                        <td className="p-3">당첨 시 통장 사용, 재가입해 가점 재적립</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  정리하자면, 당첨 한 번으로 재당첨 제한(당첨 자체 제한), 전매제한(매도 제한), 청약통장 소멸(가점 초기화)이 동시에 작동할 수 있습니다. 세 가지를 함께 고려해야 청약 전략에서 손해를 피할 수 있습니다.
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
                    <p className="mt-1 text-sm text-text-secondary">무주택기간·부양가족·통장가입기간 가점을 계산하세요.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-score-84-points-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약가점 84점 만점 구조</div>
                    <p className="mt-1 text-sm text-text-secondary">가점 항목별 만점 조건과 전략을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-first-priority-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약 1순위 조건 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">1순위가 되기 위한 통장·무주택 요건 정리.</p>
                  </Link>
                  <Link
                    href="/guide/presale-right-acquisition-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">분양권 취득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">당첨 후 분양권에 붙는 취득세를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-monthly-25-recognition-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약통장 월 25만원 인정</div>
                    <p className="mt-1 text-sm text-text-secondary">납입 인정액 상향과 소득공제 활용법.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금·부동산 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">취득세·양도세·재산세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 청약 상담이 아닙니다. 재당첨 제한 기간, 규제지역 지정, 무순위·특별공급 적용 여부는 정부 정책과 단지별 모집공고에 따라 달라지므로, 청약 전 청약홈과 입주자모집공고에서 반드시 확인하세요. 실제 자격 판정은 세대 구성 등 개별 사정에 따라 달라질 수 있습니다. 본 콘텐츠는 2026-07-30을 기준으로 작성되었으며, 관련 규정 개정 시 즉시 업데이트됩니다. 근거 규정: <strong>주택공급에 관한 규칙 §54(재당첨 제한)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.applyhome.co.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">청약홈(한국부동산원)</a>,{' '}
                  <a href="https://www.molit.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국토교통부</a>.
                </p>
              </section>

              <ShareButtons
                title="청약 재당첨 제한 2026 가이드"
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