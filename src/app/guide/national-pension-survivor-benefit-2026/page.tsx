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

const URL = 'https://calculatorhost.com/guide/national-pension-survivor-benefit-2026/';
const DATE_PUBLISHED = '2026-07-29';
const DATE_MODIFIED = '2026-07-29';

export const metadata: Metadata = {
  title: '국민연금 유족연금 2026, 수급요건과 지급률 40·50·60%',
  description:
    '국민연금 가입자나 수급자가 사망하면 생계를 함께하던 유족에게 유족연금이 지급됩니다. 가입기간 10년 미만 40%, 20년 이상 60% 지급률과 유족 순위, 본인 노령연금과 겹칠 때 선택 규칙을 국민연금법 기준으로 정리했습니다.',
  keywords: [
    '국민연금 유족연금',
    '유족연금 지급률',
    '유족연금 수급요건',
    '유족연금 얼마',
    '유족연금 재혼',
    '노령연금 중복',
    '국민연금법 74조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '국민연금 유족연금 2026, 수급요건과 지급률 40·50·60%' }],
    title: '국민연금 유족연금 2026, 누가 얼마나 받나',
    description: '지급률 40·50·60%, 유족 순위, 노령연금과 겹칠 때 선택 규칙을 국민연금법으로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '국민연금 유족연금 2026, 수급요건과 지급률',
    description: '가입기간별 40·50·60% 지급률과 유족 순위, 노령연금 중복 조정을 국민연금법 §72·§74·§56으로 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '유족연금은 누구에게 지급되나요?',
    answer:
      '국민연금 가입자, 노령연금 수급권자, 장애등급 2급 이상 장애연금 수급권자 등이 사망하면 생계를 함께하던 유족에게 지급됩니다(국민연금법 §72). 가입자의 경우 일정한 보험료 납부 요건을 충족해야 하며, 가입기간 1년 미만인 사람이 질병·부상으로 사망하면 가입 중 생긴 질병·부상으로 인한 사망만 인정됩니다.',
  },
  {
    question: '유족 중 누가 먼저 받나요?',
    answer:
      '가장 앞선 순위 한 사람에게 지급됩니다(국민연금법 §73). 순위는 배우자, 자녀(25세 미만 또는 장애등급 2급 이상), 부모(60세 이상 또는 장애), 손자녀(19세 미만 또는 장애), 조부모(60세 이상 또는 장애) 순입니다. 앞선 순위자가 있으면 뒷순위자는 받지 못합니다.',
  },
  {
    question: '유족연금은 얼마나 받나요?',
    answer:
      '사망자의 가입기간에 따라 기본연금액의 일정 비율에 부양가족연금액을 더해 지급합니다(국민연금법 §74). 가입기간 10년 미만이면 40%, 10년 이상 20년 미만이면 50%, 20년 이상이면 60%입니다. 다만 노령연금 수급자가 사망한 경우 유족연금액은 사망자가 받던 노령연금액을 넘지 못합니다.',
  },
  {
    question: '본인 노령연금과 유족연금을 둘 다 받을 수 있나요?',
    answer:
      '둘 다 전액 받을 수는 없고 하나를 선택해야 합니다(국민연금법 §56 중복급여의 조정). 본인의 노령연금을 선택하면 유족연금액의 30%를 노령연금에 더해 지급하고, 유족연금을 선택하면 유족연금만 받습니다. 어느 쪽이 유리한지는 각 연금액에 따라 다르므로 비교가 필요합니다.',
  },
  {
    question: '재혼하면 유족연금이 없어지나요?',
    answer:
      '배우자인 수급권자가 재혼하면 유족연금 수급권이 소멸됩니다(국민연금법 §75). 재혼 사실을 신고하지 않고 계속 받으면 부당수급으로 환수되므로 반드시 신고해야 합니다. 자녀·손자녀는 파양되거나 정해진 연령을 초과하면 수급권을 잃습니다.',
  },
  {
    question: '배우자 유족연금이 계속 지급되나요?',
    answer:
      '배우자가 받는 유족연금은 일정 기간 지급 후, 소득이 있는 업무에 종사하는 경우 등에는 일정 나이에 이를 때까지 지급이 정지될 수 있습니다. 다만 장애가 있거나 일정 연령 미만의 자녀를 양육하는 경우 등에는 계속 지급됩니다. 구체적 정지·재개 요건은 국민연금공단에서 확인하세요.',
  },
  {
    question: '유족연금과 근로소득이 있으면 깎이나요?',
    answer:
      '유족연금 자체는 소득이 있다고 해서 금액이 삭감되지는 않습니다. 다만 배우자 수급권자의 경우 소득이 있는 업무에 종사하면 일정 기간 지급이 정지되는 규정이 적용될 수 있습니다. 노령연금과 달리 유족연금은 별도의 소득 활동 감액표를 적용하지는 않습니다.',
  },
  {
    question: '유족연금은 어떻게 신청하나요?',
    answer:
      '사망자의 유족이 국민연금공단 지사를 방문하거나 우편·온라인으로 청구합니다. 사망진단서, 가족관계증명서, 청구인 신분증, 통장 사본 등이 필요합니다. 수급권은 발생일로부터 소멸시효가 있으므로 사망 후 되도록 빨리 청구하는 것이 안전합니다.',
  },
];

export default function NationalPensionSurvivorBenefit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '국민연금 유족연금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '국민연금 유족연금 2026, 수급요건과 지급률 40·50·60%',
    description:
      '국민연금 유족연금의 수급요건과 유족 순위, 가입기간별 지급률(40·50·60%), 본인 노령연금과의 중복 조정, 재혼 시 수급권 소멸을 국민연금법 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['국민연금', '유족연금', '지급률', '유족 순위', '중복급여 조정'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '국민연금 유족연금 2026',
    description:
      '국민연금 유족연금의 수급요건, 유족 순위, 지급률, 노령연금 중복 조정을 정리한 가이드.',
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
                    { name: '국민연금 유족연금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">유족·은퇴 준비층 · 8분 읽기 · 2026-07-29</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  국민연금 유족연금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">수급요건과 지급률 40·50·60%</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 국민연금에 가입한 배우자나 부모를 갑작스레 잃은 유족, 그리고 노후를 준비하며 연금 사망 보장을 확인하려는 분을 위한 것입니다. 유족연금은 누가 받을 수 있는지, 가입기간에 따라 얼마를 받는지, 본인의 노령연금과 겹치면 어떻게 되는지에 따라 실제 수령액이 크게 달라집니다. 헷갈리기 쉬운 순위와 중복 조정 규칙을 국민연금법 조항과 함께 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-national-pension-survivor-benefit-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">유족연금은 누구에게 지급되나요?</h2>
                <p>
                  국민연금 가입자나 노령연금·장애연금 수급자가 사망하면 생계를 함께하던 유족에게 지급됩니다(국민연금법 §72). 다만 가입자가 사망한 경우에는 일정한 보험료 납부 요건을 채워야 하며, 이는 짧게 가입하고 오래 미납한 사람에게까지 무제한 지급되는 것을 막기 위한 장치입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>노령연금 수급권자가 사망한 경우</li>
                  <li>장애등급 2급 이상 장애연금 수급권자가 사망한 경우</li>
                  <li>가입기간 10년 이상인 가입자(였던 자)가 사망한 경우</li>
                  <li>연금보험료를 낸 기간이 일정 요건(가입대상기간의 일정 비율 등)을 충족한 가입자가 사망한 경우</li>
                </ul>
                <p className="mt-4">
                  다만 가입기간이 1년 미만인 가입자가 질병이나 부상으로 사망하면, 가입 중에 생긴 질병·부상으로 사망한 경우에만 유족연금이 지급됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">유족 중 누가 먼저 받나요?</h2>
                <p>
                  법으로 정한 순위에서 가장 앞선 한 사람에게 지급됩니다(국민연금법 §73). 여러 유족이 있어도 나눠 받는 것이 아니라 최우선순위자가 받습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 유족연금 수급 순위 (국민연금법 §73)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">순위</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">유족</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">요건</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1</td>
                        <td className="p-3">배우자</td>
                        <td className="p-3">사실혼 포함</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2</td>
                        <td className="p-3">자녀</td>
                        <td className="p-3">25세 미만 또는 장애 2급 이상</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3</td>
                        <td className="p-3">부모</td>
                        <td className="p-3">60세 이상 또는 장애</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">4</td>
                        <td className="p-3">손자녀</td>
                        <td className="p-3">19세 미만 또는 장애</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">5</td>
                        <td className="p-3">조부모</td>
                        <td className="p-3">60세 이상 또는 장애</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 나이나 장애 요건을 갖춘 유족만 순위에 포함됩니다. 예를 들어 성인 자녀는 장애가 없다면 수급 대상이 아니어서, 그다음 순위인 부모가 요건을 갖췄다면 부모가 받을 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">유족연금은 얼마나 받나요?</h2>
                <p>
                  사망자의 가입기간에 따라 기본연금액의 40%에서 60%에 부양가족연금액을 더해 지급합니다(국민연금법 §74). 오래 가입한 사람일수록 지급률이 높습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 가입기간별 유족연금 지급률 (국민연금법 §74)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">사망자 가입기간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지급률</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">10년 미만</td>
                        <td className="p-3"><strong>기본연금액의 40%</strong> + 부양가족연금액</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">10년 이상 20년 미만</td>
                        <td className="p-3"><strong>기본연금액의 50%</strong> + 부양가족연금액</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">20년 이상</td>
                        <td className="p-3"><strong>기본연금액의 60%</strong> + 부양가족연금액</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 노령연금을 받던 사람이 사망한 경우, 유족연금액은 사망자가 받던 노령연금액을 초과할 수 없습니다. 기본연금액은 가입 중 평균소득과 전체 가입자 평균소득으로 산정되므로, 실제 금액은 사람마다 다릅니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">본인 노령연금과 겹치면 어떻게 되나요?</h2>
                <p>
                  두 연금을 모두 전액 받을 수는 없고 하나를 선택해야 합니다(국민연금법 §56 중복급여의 조정). 다만 본인의 노령연금을 선택하면 유족연금을 완전히 포기하는 것은 아니라, 유족연금의 30%를 더해 줍니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 본인 노령연금 60만원 + 유족연금 50만원 권리</p>
                  <p className="text-sm text-text-secondary">
                    · 선택 A(노령연금): 노령연금 60만원 + 유족연금 50만원의 30%(15만원) = <strong>월 75만원</strong>
                    <br />
                    · 선택 B(유족연금): 유족연금 50만원만 = 월 50만원
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 이 경우 노령연금을 선택하면 월 75만원으로 더 유리합니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 유족연금이 본인 노령연금보다 훨씬 큰 경우에는 유족연금 선택이 유리할 수 있습니다. 각자의 연금액에 따라 결과가 달라지므로, 청구 전 국민연금공단에서 두 경우를 비교해 보세요.
                </p>
              </section>

              <AdSlot slot="guide-national-pension-survivor-benefit-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">재혼하면 유족연금이 없어지나요?</h2>
                <p>
                  배우자인 수급권자가 재혼하면 유족연금 수급권이 소멸됩니다(국민연금법 §75). 재혼은 법률혼뿐 아니라 사실혼도 포함해 판단하므로 주의해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>배우자 수급권자가 재혼한 경우</li>
                  <li>수급권자가 사망한 경우</li>
                  <li>자녀·손자녀가 파양된 경우</li>
                  <li>자녀·손자녀가 정해진 연령을 초과한 경우(장애 상태가 아닌 때)</li>
                </ul>
                <p className="mt-4">
                  예외: 소멸 사유가 생겼는데도 신고하지 않고 계속 받으면 부당수급으로 환수되고 가산 징수될 수 있습니다. 재혼 등 신분 변동이 있으면 반드시 국민연금공단에 신고하세요.
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
                    <p className="mt-1 text-sm text-text-secondary">가입기간·소득으로 노령연금을 추정해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-divorce-split-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 분할연금</div>
                    <p className="mt-1 text-sm text-text-secondary">이혼 시 배우자 연금을 나누는 규칙.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-early-deferred-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">조기·연기연금</div>
                    <p className="mt-1 text-sm text-text-secondary">앞당겨 받기와 미뤄 받기의 손익 비교.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-lump-sum-refund-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">반환일시금</div>
                    <p className="mt-1 text-sm text-text-secondary">가입기간 10년 미만일 때 돌려받는 금액.</p>
                  </Link>
                  <Link
                    href="/guide/basic-pension-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">기초연금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">만 65세 이상 소득 하위 70% 지원.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연금·노후 가이드 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">국민연금·퇴직연금·은퇴자금 관련 가이드.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 연금 상담이 아닙니다. 유족연금의 수급요건, 지급 정지·재개, 실제 수령액은 사망자의 가입 이력과 유족의 상황에 따라 달라지므로, 구체적 사안은 국민연금공단(국번 없이 1355)에서 확인하세요. 본 콘텐츠는 2026-07-29 기준이며, 관련 법령은 국민연금법 <strong>§56(중복급여의 조정), §72(유족연금의 수급권자), §73(유족의 범위), §74(유족연금액), §75(수급권 소멸)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.nps.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국민연금공단</a>,{' '}
                  <a href="https://www.mohw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">보건복지부</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="국민연금 유족연금 2026 가이드"
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