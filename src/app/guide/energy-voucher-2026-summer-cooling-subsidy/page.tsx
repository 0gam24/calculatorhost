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

const URL = 'https://calculatorhost.com/guide/energy-voucher-2026-summer-cooling-subsidy/';
const DATE_PUBLISHED = '2026-06-02';
const DATE_MODIFIED = '2026-06-02';

export const metadata: Metadata = {
  title: '2026 에너지바우처 — 여름 냉방비 최대 70만원 지원, 6월 15일 신청',
  description:
    '2026 에너지바우처는 저소득층·취약계층의 냉방비를 최대 70만원까지 지원합니다. 신청 기간(6/15~12/31), 대상, 지원금액(세대원 수별), 신청 방법·필요 서류, 사용 방법을 완벽 정리했습니다.',
  keywords: [
    '에너지바우처 2026',
    '에너지바우처 신청',
    '여름 냉방비 지원',
    '에너지바우처 대상',
    '에너지바우처 신청방법',
    '에너지바우처 지원금',
    '냉방비 지원금 2026',
    '에너지바우처 6월 15일',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '2026 에너지바우처 — 여름 냉방비 최대 70만원 지원, 6월 15일 신청' }],
    title: '2026 에너지바우처 — 여름 냉방비 최대 70만원 지원, 신청 안내',
    description: '저소득층·노인·영유아·장애인 등 취약계층 최대 70만원 냉방비 지원. 신청 기한 6월 15일~12월 31일.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026 에너지바우처 — 여름 냉방비 최대 70만원 지원',
    description: '신청 기한 6월 15일부터. 대상·신청방법·지원금액 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '에너지바우처를 받으려면 어떤 조건을 충족해야 하나요?',
    answer:
      '두 가지 조건을 동시에 충족해야 합니다. 첫째, 소득기준: 국민기초생활보장법상 생계·의료·주거·교육급여 수급자. 둘째, 세대원 특성: 65세 이상 노인, 6세 미만 영유아, 등록 장애인, 임산부, 중증/희귀/중증난치질환자, 한부모가족 중 1명 이상이 있어야 합니다. 둘 다 맞아야만 신청 대상이 됩니다.',
  },
  {
    question: '4인 가족이면 연간 몇 만원을 받나요?',
    answer:
      '4인 이상 가구는 연간 701,300원을 받을 수 있습니다. 이는 대상 자격 조건을 모두 충족했을 때의 지원액입니다. 다만 정확한 지원액은 가구 상황에 따라 달라질 수 있으므로, 에너지바우처 누리집에서 사전 모의계산을 해보는 것이 좋습니다.',
  },
  {
    question: '여름(냉방)과 겨울(난방) 중 어디에 더 쓸 수 있나요?',
    answer:
      '2026년부터 계절별 제한이 폐지되었습니다. 연간 지원금을 여름 냉방과 겨울 난방에 자유롭게 배분할 수 있습니다. 예를 들어 연간 70만원을 여름에 모두 쓸 수도, 겨울에 모두 쓸 수도, 여름 30만원+겨울 40만원으로 나눌 수도 있습니다.',
  },
  {
    question: '신청은 어디서 하나요?',
    answer:
      '주민등록상 거주지의 읍·면·동 행정복지센터를 방문하거나, 복지로(bokjiro.go.kr) 온라인 신청이 가능합니다. 방문 신청 시 신분증과 요금 고지서를 가져가면 대부분의 서류를 현장에서 작성할 수 있습니다.',
  },
  {
    question: '6월 말에 신청해도 7월 냉방비 차감을 받을 수 있나요?',
    answer:
      '신청 후 승인까지 7~14일이 소요되므로, 7월 냉방비 차감을 받으려면 가능하면 6월 중순~6월 말까지 신청하는 것이 안전합니다. 늦게 신청하면 7월 차감을 못 받을 수 있으니 서둘수록 좋습니다.',
  },
  {
    question: '필요한 서류는 무엇인가요?',
    answer:
      '신분증(주민등록증, 운전면허증)과 최근 전기요금 고지서가 기본입니다. 방문 신청 시 직원이 필요한 추가 서류를 안내해줄 것입니다. 온라인 신청(복지로)의 경우 각 시도별로 요구 서류가 약간 다를 수 있으니, 신청 전에 해당 지역 안내를 확인하거나 콜센터(1600-3190)에 전화하여 확인하는 것이 정확합니다.',
  },
  {
    question: '이미 받고 있으면 다시 신청해야 하나요?',
    answer:
      '주소 변경이나 가구 구성 변화(출생·사망·이혼 등)가 없다면 자동 갱신되어 다시 신청할 필요가 없습니다. 다만 변화가 생겼다면 행정복지센터에 신고한 후 신청해야 합니다.',
  },
  {
    question: '요금을 어떻게 차감받나요?',
    answer:
      '에너지바우처 승인 후, 전기요금 고지서에서 지원금이 자동으로 차감됩니다. 별도의 신청 절차나 영수증 제출이 필요 없습니다. 단, 가스·수도는 지원 대상이 아니며, 전기요금만 차감됩니다.',
  },
] as const;

export default function EnergyVoucher2026SummerCoolingSubsidy() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '2026 에너지바우처 — 여름 냉방비 지원' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '2026 에너지바우처 — 여름 냉방비 최대 70만원 지원, 신청 기한 6월 15일 ~ 12월 31일',
    description:
      '저소득층·노인·영유아·장애인 등 취약계층 최대 70만원 냉방비·난방비 지원. 신청 대상, 지원금액, 신청 방법, 필요 서류 완벽 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['에너지바우처 2026', '여름 냉방비 지원', '신청 기한 6월 15일', '저소득층 복지'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '2026 에너지바우처 — 여름 냉방비 최대 70만원 지원, 신청 안내',
    description:
      '6월 15일부터 신청 시작. 저소득층·취약계층 연간 최대 70만원 냉방·난방비 지원. 대상·신청 방법·지원금액 완정리.',
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
                    { name: '2026 에너지바우처 — 여름 냉방비 지원' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">생활·복지 · 7분 읽기 · 2026-06-02</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  2026 에너지바우처
                  <br />
                  <span className="text-2xl text-text-secondary">— 여름 냉방비 최대 70만원 지원 (6월 15일 신청)</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  올여름 에어컨 요금 걱정이 크다면, 에너지바우처를 신청해보세요.
                  저소득층과 노인·영유아·장애인 등 취약계층을 대상으로 <strong>연간 최대 70만원</strong>의 냉방비와 난방비를 지원하는 제도입니다.
                  <strong>신청 기간은 6월 15일부터 12월 31일까지</strong>이며, 신청이 빠를수록 7월 냉방비 차감을 받을 수 있습니다.
                  대상, 신청 방법, 필요 서류를 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-energy-voucher-2026-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <div className="space-y-3 text-sm" data-speakable>
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 font-semibold text-text-primary">2026년 에너지바우처 주요 정보</caption>
                    <thead>
                      <tr className="bg-primary-500/10">
                        <th scope="col" className="border border-border-base px-2 py-2 text-left">항목</th>
                        <th scope="col" className="border border-border-base px-2 py-2 text-left">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">신청 기간</td>
                        <td className="border border-border-base px-2 py-1">2026년 6월 15일 ~ 12월 31일</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">사용 기간</td>
                        <td className="border border-border-base px-2 py-1">2026년 7월 1일 ~ 2027년 5월 31일</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">연간 지원금 (1인)</td>
                        <td className="border border-border-base px-2 py-1">295,200원</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">연간 지원금 (4인 이상)</td>
                        <td className="border border-border-base px-2 py-1 font-bold text-primary-600 dark:text-primary-400">
                          701,300원
                        </td>
                      </tr>
                      <tr className="bg-primary-500/5">
                        <td className="border border-border-base px-2 py-1 font-semibold">지원 대상</td>
                        <td className="border border-border-base px-2 py-1">
                          저소득층 + 노인·영유아·장애인·임산부·중증질환자·한부모가족 중 1명 이상
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">2026 주요 변경점</td>
                        <td className="border border-border-base px-2 py-1">계절별(하절기/동절기) 제한 폐지 → 연간 자유 사용</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">신청 장소</td>
                        <td className="border border-border-base px-2 py-1">행정복지센터 방문 또는 복지로 온라인</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 에너지바우처란? — 누가, 얼마를 받나</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  에너지바우처는 <strong>에너지법 §16의3(에너지이용권의 발급 등)</strong>을 근거로 산업통상자원부와 한국에너지공단이 운영하는 에너지복지 제도로,
                  저소득층과 취약계층의 냉방비·난방비 부담을 덜어주는 사업입니다.
                  여름 에어컨 요금과 겨울 난방비는 가구마다 부담이 크므로, 이를 지원하여 에너지 빈곤층을 보호하는 것이 법령의 입법 취지입니다.
                  2026년부터는 <strong>계절별 제한이 폐지</strong>되어, 연간 지원금을 여름과 겨울 중 어디에 더 쓸지 자유롭게 선택할 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">2026년 에너지바우처 연간 지원금 (세대원 수별)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">가구 구성</th>
                        <th scope="col" className="px-3 py-2 text-left">연간 지원금</th>
                        <th scope="col" className="px-3 py-2 text-left">월평균</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">1인</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">295,200원</td>
                        <td className="px-3 py-2">약 24,600원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">2인</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">407,500원</td>
                        <td className="px-3 py-2">약 33,958원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">3인</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">532,700원</td>
                        <td className="px-3 py-2">약 44,392원</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">4인 이상</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">701,300원</td>
                        <td className="px-3 py-2">약 58,442원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>💡 참고:</strong> 월평균은 12개월 기준입니다. 실제 지원금은 신청 시점과 가구 상황에 따라 조정될 수 있습니다.
                    정확한 지원금은 에너지바우처 누리집(energyv.or.kr)의 모의계산 기능을 이용하면 확인할 수 있습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 신청 대상 — 두 가지 조건을 모두 충족해야 함</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  에너지바우처를 받으려면 <strong>에너지법 §16의3 ①</strong>의 위임에 따라 대통령령이 정한 두 가지 요건 — <strong>소득기준</strong>과 <strong>세대원 특성 기준</strong> — 을 동시에 충족해야 합니다.
                  두 조건 중 하나라도 맞지 않으면 신청 대상이 아닙니다.
                </p>
                <div className="space-y-4">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-3">조건 1: 소득기준</h3>
                    <p className="text-sm text-text-secondary mb-2">
                      <strong>국민기초생활보장법 §7(급여의 종류)</strong>에서 정한 <strong>생계급여, 의료급여, 주거급여, 교육급여</strong> 중 어느 하나의 수급자
                    </p>
                    <p className="text-xs text-text-tertiary">
                      (즉, 기초생활보장 수급자 명부에 등재되어 있어야 함 — 차상위계층은 별도 사업 대상)
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-3">조건 2: 세대원 특성기준 (1명 이상 포함)</h3>
                    <ul className="space-y-1.5 text-sm text-text-secondary">
                      <li>
                        <strong>노인:</strong> 만 65세 이상
                      </li>
                      <li>
                        <strong>영유아:</strong> 만 6세 미만
                      </li>
                      <li>
                        <strong>장애인:</strong> 등록 장애인 (장애 정도 무관)
                      </li>
                      <li>
                        <strong>임산부:</strong> 임신 중인 여성 (의료기관 확인)
                      </li>
                      <li>
                        <strong>중증질환자:</strong> 중증질환·희귀질환·중증난치질환으로 진단받은 사람
                      </li>
                      <li>
                        <strong>한부모가족:</strong> 모자·부자 가정
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4 mt-4">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>⚠️ 중요:</strong> 소득기준만 맞거나 세대원 특성만 맞아서는 안 됩니다.
                    예를 들어 노인 가구라도 기초생활보장 수급자가 아니면 신청 불가, 기초생활보장 수급자라도 취약계층 세대원이 없으면 신청 불가입니다.
                    둘 다 만족해야 지원받을 수 있습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 신청 기간과 사용 기간 — 언제 신청하나</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  에너지바우처 신청은 한 해에 한 번, <strong>6월 15일부터 12월 31일까지</strong> 가능합니다.
                  승인된 지원금은 <strong>2026년 7월 1일부터 2027년 5월 31일까지</strong> 사용할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4">
                  <h3 className="font-semibold text-primary-700 dark:text-primary-400 mb-3">신청 시기별 이점</h3>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p>
                      <strong>6월 중 신청 (빠를수록 ★★★):</strong> 승인까지 1~2주 소요 후 7월 전기요금 차감 가능
                    </p>
                    <p>
                      <strong>7월 초 신청:</strong> 7월 말~8월 초 요금부터 차감 가능 (일부 여름 냉방비 손실 위험)
                    </p>
                    <p>
                      <strong>8월 이후 신청:</strong> 여름 냉방비 대부분 손실. 겨울 난방비부터 사용 예정이라면 서두르지 않아도 됨
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>💡 팁:</strong> 여름 냉방비 지원을 최대한 받으려면 6월 15일 신청 시작일에 가까운 시점(6월 중)에 신청하는 것이 좋습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 2026년 주요 변경점 — 계절별 제한 폐지</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  2026년부터 에너지바우처의 <strong>가장 큰 변화</strong>는 계절별 제한이 없어졌다는 점입니다.
                  이전(2025년까지)에는 하절기(7~9월) 냉방과 동절기(10월~5월) 난방의 지원금이 따로 정해져 있었습니다.
                  하지만 2026년부터는 연간 총 지원금(예: 4인 가구 701,300원)을 사용자가 여름과 겨울에 자유롭게 배분할 수 있습니다.
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">2025년 vs 2026년 에너지바우처 비교</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">구분</th>
                        <th scope="col" className="px-3 py-2 text-left">2025년</th>
                        <th scope="col" className="px-3 py-2 text-left">2026년</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">냉방·난방 제한</td>
                        <td className="px-3 py-2">하절기·동절기 분리 (지정된 기간에만 사용)</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">제한 없음 (자유 배분)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">신청 횟수</td>
                        <td className="px-3 py-2">2회 (하절기/동절기 각각)</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">1회 (연간 1번)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">사용 기간</td>
                        <td className="px-3 py-2">지정된 기간만</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">
                          7월 1일 ~ 다음해 5월 31일 (자유)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4">
                  <h3 className="font-semibold text-primary-700 dark:text-primary-400 mb-3">변경으로 얻는 이점</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>여름 폭염이 심하면:</strong> 연간 지원금을 여름 냉방에 집중 사용 가능
                    </li>
                    <li>
                      <strong>겨울 난방비 걱정이 크면:</strong> 겨울 난방에 더 많이 배분 가능
                    </li>
                    <li>
                      <strong>신청 번거로움 감소:</strong> 연 1회만 신청하면 됨 (이전은 분기별 신청)
                    </li>
                  </ul>
                </div>
              </section>

              <AdSlot slot="guide-energy-voucher-2026-mid" format="rectangle" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 신청 방법 — 두 가지 선택지</h2>
                <p className="text-text-secondary leading-relaxed">
                  에너지바우처 신청 절차는 <strong>에너지법 §16의3</strong>과 <strong>에너지법 시행규칙 제3조의2</strong>에 따라 운영되며,
                  실무적으로는 <strong>행정복지센터 방문</strong>과 <strong>복지로 온라인</strong> 두 가지 경로 중 편한 방식을 선택하면 됩니다.
                </p>
                <div className="space-y-4">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-3">1) 행정복지센터 방문 신청 (추천)</h3>
                    <ol className="space-y-2 text-sm text-text-secondary">
                      <li>
                        <strong>주민등록 거주지 읍·면·동 행정복지센터 방문</strong> (평일 09:00~18:00)
                      </li>
                      <li>
                        <strong>담당자에게 "에너지바우처 신청"이라고 말하기</strong>
                      </li>
                      <li>
                        <strong>신청 양식 작성</strong> → 담당자가 안내
                      </li>
                      <li>
                        <strong>필요 서류 제출:</strong> 신분증, 최근 전기요금 고지서
                      </li>
                      <li>
                        <strong>접수 완료</strong> → 영수증 받음
                      </li>
                      <li>
                        <strong>승인 대기</strong> → 1~2주 후 전기요금 차감 시작 (에너지공단에서 확인)
                      </li>
                    </ol>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-3">2) 복지로 온라인 신청</h3>
                    <ol className="space-y-2 text-sm text-text-secondary">
                      <li>
                        <strong>복지로(bokjiro.go.kr) 접속</strong>
                      </li>
                      <li>
                        <strong>로그인</strong> → 공인인증서 또는 휴대폰 본인인증
                      </li>
                      <li>
                        <strong>"에너지바우처" 검색</strong> 또는 복지 서비스 목록에서 클릭
                      </li>
                      <li>
                        <strong>신청서 작성</strong> → 가구 정보, 소득 기준, 세대원 특성 입력
                      </li>
                      <li>
                        <strong>서류 첨부</strong> → 신분증, 전기요금 고지서 사본 업로드 (필요한 서류는 시도별로 다를 수 있음)
                      </li>
                      <li>
                        <strong>신청 완료</strong> → 신청번호 발급
                      </li>
                      <li>
                        <strong>승인 대기</strong> → 지역에 따라 3~5일 후 확인 가능
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>💡 팁:</strong> 방문 신청이 편한 이유는 담당자가 함께 작성을 도와주고,
                    그 자리에서 필요한 서류가 더 있는지 확인할 수 있기 때문입니다.
                    온라인이 불편하다면 행정복지센터 방문을 권장합니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 필요한 서류</h2>
                <p className="text-text-secondary leading-relaxed">
                  에너지바우처 신청 시 준비할 기본 서류는 다음과 같습니다.
                  지역(시도)에 따라 추가 서류가 요청될 수 있으므로, 신청 전에 행정복지센터나 통합 상담센터에 전화로 확인하는 것이 정확합니다.
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">필수 서류</h3>
                    <ul className="space-y-1.5 text-sm text-text-secondary">
                      <li>신분증 (주민등록증, 운전면허증, 여권 등)</li>
                      <li>최근 전기요금 고지서 (또는 전기계약자 확인 서류)</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">추가 서류 (필요에 따라)</h3>
                    <ul className="space-y-1.5 text-sm text-text-secondary">
                      <li>기초생활보장 수급자 증명서 (홈택스 또는 주민센터에서 발급)</li>
                      <li>장애인 등록증 (장애인 세대원이 있을 경우)</li>
                      <li>임신 확인증 또는 산모수첩 (임산부가 있을 경우)</li>
                      <li>가족관계증명서 또는 주민등록등본 (세대 구성 확인)</li>
                    </ul>
                  </div>
                </div>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>📋 서류 확인 팁:</strong> 신청 전에 관할 행정복지센터에 전화(읍면동 전번 조회)하거나,
                    통합 상담센터 1600-3190(평일 09:00~18:00, 점심 12:00~13:00 제외)으로 전화하여
                    자신의 지역에서 필요한 서류를 미리 확인하는 것이 가장 정확합니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. 요금 차감 방식 — 자동 적용</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  에너지바우처가 승인되면, 전기 요금에서 자동으로 지원금이 차감됩니다.
                  별도의 신청이나 영수증 제출 절차 없이, 전력회사가 자동으로 처리합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-3">요금 차감 프로세스</h3>
                  <ol className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>1단계: 신청 및 승인</strong> → 에너지공단에서 신청 심사 (1~2주)
                    </li>
                    <li>
                      <strong>2단계: 전력회사 공지</strong> → 승인 결과를 한국전력공사에 통보
                    </li>
                    <li>
                      <strong>3단계: 자동 차감</strong> → 다음 달 전기요금 고지서에 지원금이 차감되어 청구
                    </li>
                    <li>
                      <strong>4단계: 차감 확인</strong> → 고지서에 "에너지바우처 차감액" 항목으로 명기되어 있음
                    </li>
                  </ol>
                </div>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4 mt-4">
                  <h3 className="font-semibold text-primary-700 dark:text-primary-400 mb-2">주의할 점</h3>
                  <ul className="space-y-1.5 text-sm text-text-secondary">
                    <li>
                      <strong>전기요금만 지원:</strong> 가스, 수도, 난방유 요금은 지원 대상이 아닙니다.
                    </li>
                    <li>
                      <strong>지원금이 월 요금보다 큰 경우:</strong> 초과분은 다음 달로 이월되거나 환급됩니다 (운영사에 확인).
                    </li>
                    <li>
                      <strong>현금화 불가:</strong> 에너지바우처는 현금으로 받을 수 없으며, 전기 요금 차감만 가능합니다.
                    </li>
                  </ul>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/guide/high-oil-price-relief-fund-2026-application/" className="text-primary-600 underline dark:text-primary-500">
                      2026 고유가 민생지원금 신청 가이드
                    </Link>
                    {' — 에너지바우처와 함께 챙길 유가 부담 완화 지원금'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/tax-calendar-2026/" className="text-primary-600 underline dark:text-primary-500">
                      2026년 세금·복지 달력
                    </Link>
                    {' — 세금 신청, 복지금 신청 전체 일정'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/category/lifestyle/" className="text-primary-600 underline dark:text-primary-500">
                      생활 복지
                    </Link>
                    {' — 주택, 기초생활, 보육, 저소득층 지원 계산기·가이드'}
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="2026 에너지바우처 — 여름 냉방비 최대 70만원 지원, 신청 가이드"
                url={URL}
                description="저소득층·취약계층 연간 최대 70만원 냉방·난방비 지원. 신청 기한 6월 15일~12월 31일. 대상·신청 방법·필요 서류 완정리."
              />

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 에너지법 §16의2(에너지복지 사업의 실시) · 에너지법 §16의3(에너지이용권의 발급 등) · 에너지법 시행규칙 제3조의2 · 국민기초생활보장법 §7(급여의 종류) · {' '}
                  <a
                    href="https://www.energyv.or.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    에너지바우처 누리집
                  </a>{' '}
                  · {' '}
                  <a
                    href="https://www.bokjiro.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    복지로 (온라인 신청)
                  </a>{' '}
                  · {' '}
                  <a
                    href="https://www.moef.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    산업통상자원부 에너지정책
                  </a>{' '}
                  .
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 2026년 6월 2일 기준 정보를 제공합니다.
                  에너지바우처 제도는 정부 정책 및 법 개정에 따라 변경될 수 있으므로,
                  정확한 대상 판정과 지원금액 계산이 필요하면 에너지바우처 누리집(energyv.or.kr) 또는
                  복지로(bokjiro.go.kr)의 모의계산 기능을 사용하거나,
                  통합 상담센터 1600-3190 또는 거주지 행정복지센터에 상담하시기 바랍니다.
                  지원금액, 신청 대상, 사용 기간 등은 지역과 신청 시점에 따라 다를 수 있습니다.
                  본 콘텐츠는 AI 보조 작성 후 운영자 검수를 거쳤습니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (calculatorhost)
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
