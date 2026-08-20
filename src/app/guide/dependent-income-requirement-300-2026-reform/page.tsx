// [revenue-lever: traffic] 2026 세제개편 롱테일 흡수, 부양가족 소득요건 100→300 이슈 키워드
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

const URL = 'https://calculatorhost.com/guide/dependent-income-requirement-300-2026-reform/';
const DATE_PUBLISHED = '2026-08-21';
const DATE_MODIFIED = '2026-08-21';

export const metadata: Metadata = {
  title: '부양가족 소득요건 300만 상향 2026 세제개편, 총급여 750만까지',
  description:
    '2026년 세제개편안에 따라 부양가족 기본공제 소득요건이 연 100만원에서 300만원(근로 총급여 500만원에서 750만원)으로 상향됩니다. 자녀 알바·배우자 파트타임의 공제 재진입 조건과 경계값 계산을 정리합니다.',
  keywords: [
    '부양가족 소득요건 300만',
    '부양가족 총급여 750만',
    '2026 세제개편 부양가족',
    '기본공제 소득기준',
    '알바 자녀 부양가족 공제',
    '소득세법 50조',
    '연말정산 부양가족',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '부양가족 소득요건 300만 상향 2026 세제개편, 총급여 750만까지',
      },
    ],
    title: '부양가족 소득요건 300만 상향 2026 세제개편, 총급여 750만까지',
    description:
      '2026-08-03 발표 세제개편안, 부양가족 기본공제 소득요건 연 100만원에서 300만원 상향. 알바 자녀·파트타임 배우자 재진입 조건과 근로 총급여 750만 경계값.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '부양가족 소득요건 300만 상향, 근로 총급여 750만까지 공제 (2026 세제개편)',
    description:
      '개편 후 알바 자녀·파트타임 배우자를 다시 부양가족에 포함할 수 있는 조건과 경계값 계산. 소득세법 §50, §47 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '부양가족 소득요건이 정확히 어떻게 바뀌나요?',
    answer:
      '2026년 세제개편안(2026-08-03 기획재정부 발표)은 부양가족 기본공제의 소득요건을 연 소득금액 100만원 이하에서 300만원 이하로 3배 상향합니다. 근로소득만 있는 경우 판정 특례도 총급여 500만원 이하에서 750만원 이하로 함께 조정됩니다. 다만 이 개편안은 국회 통과가 필요하며, 통과 시 2026년 귀속 소득분(2027년 초 연말정산·2027년 5월 종합소득세 신고)부터 적용될 전망입니다.',
  },
  {
    question: '소득금액 300만원과 총급여 750만원, 어느 쪽을 봐야 하나요?',
    answer:
      '두 기준은 대체가 아니라 판정 방식의 차이입니다. 부양가족에게 근로소득만 있다면 총급여 750만원 이하인지만 확인하면 됩니다. 근로소득 외에 사업·이자·배당·기타소득이 함께 있거나 사업소득만 있다면 각 소득의 필요경비·근로소득공제를 뺀 뒤 합산한 소득금액이 300만원 이하인지 판정합니다. 소득세법 §50 ①3호와 시행령 §106의 근로자 특례가 이런 이원 구조를 만듭니다.',
  },
  {
    question: '왜 하필 총급여 750만원에서 잘리나요?',
    answer:
      '총급여 750만원에 소득세법 §47 근로소득공제(500만원 이하 70%, 500만원 초과분 40%)를 적용하면 공제액이 450만원, 근로소득금액이 정확히 300만원이 됩니다. 즉 근로소득만 있는 경우의 총급여 750만원은 새 소득금액 컷오프 300만원과 정확히 일치하도록 설계된 값입니다. 이 때문에 개편 전 500만원(근로소득금액 150만원 특례)보다 실질 완화폭이 큽니다.',
  },
  {
    question: '알바로 총급여 700만원 번 대학생 자녀, 다시 공제받나요?',
    answer:
      '개편안이 통과되면 가능합니다. 기존 규정에서는 총급여 500만원을 넘으면 부양가족에서 탈락했지만, 개편 후에는 총급여 750만원까지 허용되므로 700만원인 자녀는 기본공제 150만원(1인당) 대상에 다시 포함됩니다. 20세 이하이면 자녀세액공제도 별도로 유지되며, 대학생 자녀의 교육비 세액공제(연 900만원 한도) 산정도 가능해집니다. 다만 만 20세 초과 자녀는 나이 요건 때문에 부양가족 기본공제는 불가하고, 장애인 등 별도 사유가 있어야 합니다.',
  },
  {
    question: '파트타임으로 사업소득 250만원 있는 배우자는요?',
    answer:
      '개편 후 공제 대상이 됩니다. 사업소득 250만원에서 단순경비율·기준경비율 등 필요경비를 뺀 금액이 소득금액이 되는데, 필요경비를 반영하지 않은 총수입만으로도 300만원 이하이므로 안전 범위입니다. 부부간에는 나이 요건이 없으므로 소득요건만 통과하면 기본공제 150만원이 적용됩니다. 다만 배우자의 건강보험 피부양자 요건(연 소득 2,000만원 이하 등)은 국세와 별도 기준이므로 함께 확인해야 합니다.',
  },
  {
    question: '기본공제 금액 150만원이나 자녀세액공제도 함께 오르나요?',
    answer:
      '아니요, 이번 개편은 소득요건(누가 부양가족이 되는가)만 완화하며 공제 금액 자체는 그대로입니다. 기본공제는 부양가족 1인당 연 150만원, 경로우대 100만원, 장애인 200만원, 자녀세액공제(첫째 15만원·둘째 20만원·셋째 이후 30만원, 8세~20세 대상) 모두 2025년과 동일 수준으로 유지됩니다. 즉 개편의 효과는 공제 대상 인원 확대이지 인당 공제액 상향이 아닙니다.',
  },
  {
    question: '언제부터 실제로 적용되나요?',
    answer:
      '2026년 정기국회에서 개편안이 원안 통과된다고 가정하면, 2026년 1월 1일 이후 발생 소득분부터 적용됩니다. 근로자라면 2027년 1~2월에 진행하는 2026년 귀속 연말정산에서, 종합소득세 신고자라면 2027년 5월 종합소득세 확정신고에서 처음 반영됩니다. 2025년 귀속(2026년 초 연말정산)에는 소급 적용되지 않으며, 여전히 소득금액 100만원·총급여 500만원 기준이 유지됩니다.',
  },
  {
    question: '소득요건이 완화돼도 공제가 안 되는 경우가 있나요?',
    answer:
      '있습니다. 부양가족 기본공제는 소득요건 외에 나이 요건(직계존속 만 60세 이상·직계비속 만 20세 이하·형제자매 만 20세 이하 또는 60세 이상)과 생계 요건(주소·거소 동일 또는 실질 부양)을 동시에 충족해야 합니다. 예를 들어 만 25세 대학원생 자녀는 알바 소득이 300만원 이하여도 나이 요건 초과로 원칙적으로 공제 대상이 아니며, 장애인·군복무 등 예외 사유가 있어야 합니다. 부부간에는 나이 요건이 없어 소득요건만 판정합니다.',
  },
];

export default function DependentIncomeRequirement300ReformPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '부양가족 소득요건 300만 상향 2026 세제개편' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '부양가족 소득요건 300만 상향 2026 세제개편, 총급여 750만까지',
    description:
      '2026-08-03 세제개편안, 부양가족 기본공제 소득요건이 소득금액 100만원에서 300만원(근로 총급여 500만원에서 750만원)으로 완화됩니다. 컷오프 계산, 사례, 시행일까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '부양가족 소득요건',
      '2026 세제개편',
      '총급여 750만원',
      '소득금액 300만원',
      '기본공제',
      '알바 자녀',
      '소득세법 50조',
    ],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '부양가족 소득요건 300만 상향 2026 세제개편',
    description:
      '2026 세제개편안, 부양가족 기본공제 소득요건 완화(100만→300만, 근로 총급여 500만→750만)의 경계값 계산과 사례 정리.',
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
                    { name: '부양가족 소득요건 300만 상향 2026 세제개편' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">근로자·프리랜서 가구 · 9분 읽기 · 2026-08-21</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  부양가족 소득요건 300만 상향 2026 세제개편
                  <br />
                  <span className="text-2xl text-text-secondary">, 총급여 750만원까지 다시 공제</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026-08-03 기획재정부가 발표한 2026년 세제개편안은 부양가족 기본공제의 소득요건을 연 소득금액 100만원 이하에서 300만원 이하로 3배 완화합니다. 근로소득만 있는 경우 판정 특례도 총급여 500만원 이하에서 750만원 이하로 함께 오릅니다. 방학·주말 알바를 시작한 대학생 자녀, 파트타임으로 복귀한 배우자, 소액 프리랜서 활동 중인 부모가 다시 부양가족 명단에 들어올 수 있는지 판정 기준과 경계값 계산을 정리했습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 부양가족 소득요건 100만에서 300만으로, 무엇이 바뀌나</h2>
                <p>
                  결론부터 말하면 판정 기준선만 3배 완화되고, 인당 공제 금액은 그대로입니다. 소득세법 §50이 정하는 부양가족 기본공제(1인당 150만원)의 요건 중 소득요건이 완화되고, 시행령 §106의 근로소득 특례 500만원도 750만원으로 조정됩니다. 나이 요건(직계존속 60세 이상·직계비속 20세 이하 등)과 생계 요건은 변동이 없습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 1. 부양가족 소득요건 개편 전후 비교 (2026 세제개편안 기준)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">개편 전 (~2025 귀속)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">개편 후 (2026 귀속 예정)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">소득금액 컷오프</td>
                        <td className="p-3">연 100만원 이하</td>
                        <td className="p-3"><strong>연 300만원 이하</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">근로소득만 있는 경우 총급여 특례</td>
                        <td className="p-3">연 500만원 이하</td>
                        <td className="p-3"><strong>연 750만원 이하</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">기본공제 금액</td>
                        <td className="p-3">1인당 150만원</td>
                        <td className="p-3">1인당 150만원 (동일)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">나이·생계 요건</td>
                        <td className="p-3">유지</td>
                        <td className="p-3">유지</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 이 개편안은 발표 시점에서 국회 통과가 필요한 정부안 단계입니다. 예산부수법률안 처리 관례상 12월 정기국회에서 확정되며, 시행일은 다음 항목에서 다시 짚습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">소득금액 300만원의 정확한 의미</h2>
                <p>
                  세법이 말하는 300만원은 총수입이 아니라 소득금액입니다. 즉 필요경비·근로소득공제를 차감한 뒤의 값이며, 이 구분이 실무 판정을 좌우합니다. 소득 종류별로 소득금액 산정 방식이 다르므로 부양가족이 어떤 소득을 얼마나 벌었는지 유형을 먼저 확인해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>근로소득만 있는 경우</strong>: 총급여에서 소득세법 §47 근로소득공제를 뺀 금액이 근로소득금액입니다. 실무에서는 근로자 특례에 따라 총급여 750만원 컷오프만 보면 되지만, 다른 소득과 합산해야 할 때는 근로소득금액을 다시 계산합니다.
                  </li>
                  <li>
                    <strong>사업소득이 있는 경우</strong>: 총수입에서 실제 경비 또는 단순경비율·기준경비율에 따른 필요경비를 뺀 값이 사업소득금액입니다. 원천징수 3.3% 사업소득자도 필요경비 차감 후 판정합니다.
                  </li>
                  <li>
                    <strong>기타소득이 있는 경우</strong>: 강연료·원고료 등은 총수입의 60%(경우에 따라 70%)를 필요경비로 자동 인정합니다. 총수입 750만원이면 소득금액 300만원으로 컷오프에 걸립니다.
                  </li>
                  <li>
                    <strong>이자·배당소득</strong>: 원칙적으로 필요경비 공제가 없으므로 총수입이 곧 소득금액입니다. 금융소득 2,000만원 이하는 분리과세이지만 부양가족 판정에서는 300만원 초과 여부만 봅니다.
                  </li>
                  <li>
                    <strong>연금소득</strong>: 공적연금은 연금소득공제 후 금액을 봅니다. 국민연금 월 60만원(연 720만원) 부모라면 연금소득공제 490만원이 적용되어 소득금액 약 230만원이 되므로 개편 후 요건을 통과합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 소득이 두 종류 이상이면 각각의 소득금액을 계산해 합산합니다. 예를 들어 배우자가 알바로 총급여 500만원(근로소득금액 150만원)에 프리랜서 부수입 200만원(경비 60만원 차감 후 소득금액 140만원)이 있다면, 합산 소득금액은 290만원으로 요건 안입니다. 반대로 근로소득금액 200만원과 기타소득금액 200만원이면 합계 400만원으로 300만원 초과 탈락입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">근로소득 총급여 750만원 컷오프의 계산 근거</h2>
                <p>
                  총급여 750만원이라는 숫자는 임의로 정해진 것이 아니라 소득세법 §47 근로소득공제 구조에서 역산된 경계값입니다. 왜 딱 750만원인지 계산 과정을 보면 개편의 정합성을 이해할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">계산. 총급여 750만원 → 근로소득금액 300만원</p>
                  <p className="text-sm text-text-secondary">
                    · 근로소득공제 구간 (소득세법 §47)
                    <br />
                    · 500만원 이하 부분: 500만원 × 70% = 350만원
                    <br />
                    · 500만원 초과 부분: (750만원 − 500만원) × 40% = 100만원
                    <br />
                    · 근로소득공제 합계: 350만원 + 100만원 = <strong>450만원</strong>
                    <br />
                    · 근로소득금액: 750만원 − 450만원 = <strong>300만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">
                      결론: 총급여 750만원의 근로소득금액이 새 컷오프 300만원과 정확히 일치. 특례 구조가 소득금액 기준과 어긋나지 않도록 설계됨.
                    </span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">참고. 개편 전 총급여 500만원 → 근로소득금액 150만원</p>
                  <p className="text-sm text-text-secondary">
                    · 근로소득공제: 500만원 × 70% = 350만원
                    <br />
                    · 근로소득금액: 500만원 − 350만원 = 150만원
                    <br />
                    <span className="text-xs text-text-tertiary">
                      기존 특례는 소득금액 100만원 컷오프보다 근로자에게 유리한 150만원 근로소득금액까지 허용했음. 이 완화폭이 개편 후에도 유지된다고 보면 실질 경계는 소득금액 300만원 기준보다 관대함.
                    </span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 근로자 특례는 근로소득만 있을 때 적용됩니다. 알바 총급여 700만원에 배당소득 50만원이 붙으면 특례가 깨지고 소득금액 합산 방식으로 다시 계산해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 알바 자녀, 파트타임 배우자, 다시 공제 가능한가</h2>
                <p>
                  실제 가구에서 자주 발생하는 3가지 상황으로 판정을 시뮬레이션합니다. 개편안 통과를 전제로 한 예시이며, 실무 적용은 2026년 귀속 소득분부터입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 대학생 자녀, 방학 알바로 총급여 700만원</p>
                  <p className="text-sm text-text-secondary">
                    · 자녀 나이: 만 19세 (20세 이하, 나이 요건 충족)
                    <br />
                    · 소득 유형: 근로소득만 있음
                    <br />
                    · 개편 전 판정: 총급여 700만원 &gt; 500만원 → 부양가족 탈락, 기본공제 150만원 소멸
                    <br />
                    · 개편 후 판정: 총급여 700만원 ≤ 750만원 → <strong>부양가족 재진입</strong>, 기본공제 150만원 회복
                    <br />
                    <span className="text-xs text-text-tertiary">
                      추가 효과: 8세~20세 자녀세액공제(첫째 15만원)와 자녀 명의 지출 교육비 세액공제도 함께 산정 가능해짐.
                    </span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 2. 파트타임 배우자, 프리랜서 사업소득 250만원</p>
                  <p className="text-sm text-text-secondary">
                    · 배우자 나이 요건: 부부간 나이 요건 없음
                    <br />
                    · 소득 유형: 사업소득 250만원 (필요경비 미차감 총수입 기준)
                    <br />
                    · 개편 전 판정: 소득금액 100만원 초과 가능성 높음 → 대체로 탈락
                    <br />
                    · 개편 후 판정: 필요경비 차감 전에도 250만원, 차감 후에는 더 낮음 → 확실히 <strong>300만원 이하</strong>로 통과, 기본공제 150만원 적용
                    <br />
                    <span className="text-xs text-text-tertiary">
                      다만 배우자의 건강보험 피부양자 자격은 별도(연 소득 2,000만원 이하 등). 국세와 4대보험은 판정 기준이 다르므로 함께 확인 필요.
                    </span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 3. 알바 자녀, 총급여 800만원 (경계 초과)</p>
                  <p className="text-sm text-text-secondary">
                    · 소득 유형: 근로소득만 있음
                    <br />
                    · 근로소득공제: 350만원 + (800만원 − 500만원) × 40% = 350만원 + 120만원 = 470만원
                    <br />
                    · 근로소득금액: 800만원 − 470만원 = <strong>330만원</strong>
                    <br />
                    · 개편 후 판정: 총급여 800만원 &gt; 750만원, 근로소득금액 330만원 &gt; 300만원 → <strong>여전히 탈락</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">
                      경계 근처 알바 자녀는 12월 급여를 조정하거나 근무일수를 관리해야 750만원 안쪽에 머무를 수 있음. 다만 자녀 근로계약 왜곡은 실질과세 원칙(국세기본법 §14) 위반 소지가 있어 권장되지 않음.
                    </span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">시행일과 소급 적용 여부</h2>
                <p>
                  세제개편안은 정부 발표(2026-08-03) 후 국회 심의를 거쳐 12월 정기국회에서 통과되는 것이 통상적입니다. 원안대로 통과된다면 부칙에 따라 2026년 1월 1일 이후 발생한 소득분부터 적용됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>2026년 1~12월 발생 소득</strong>: 새 요건(소득금액 300만원·총급여 750만원) 적용. 근로자는 2027년 1~2월 연말정산에서 반영.
                  </li>
                  <li>
                    <strong>종합소득세 신고자</strong>: 2027년 5월 종합소득세 확정신고 때 새 요건으로 부양가족 판정.
                  </li>
                  <li>
                    <strong>2025년 귀속 소득</strong>: 2026년 초 연말정산이나 2026년 5월 종소세 신고에는 소급 적용되지 않음. 기존 100만원·500만원 기준 유지.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 정기국회에서 수치가 조정되거나 시행일이 유예될 가능성도 있습니다. 예를 들어 2018년 근로소득공제·2023년 근로소득세율 개편에서도 국회 논의 과정에서 시행일이 1년 늦춰지거나 세부 구간이 재조정된 사례가 있습니다. 확정 여부는 국회 본회의 통과 시점과 관보 게재를 통해 확인해야 하며, 국세청은 통과 이후 연말정산 안내 자료에서 최종 기준을 공지할 예정입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 기본공제 150만원과 자녀세액공제는 그대로인가</h2>
                <p>
                  네, 그대로입니다. 이번 개편은 문(door)만 넓혔지 방(공제액)의 크기는 건드리지 않았습니다. 소득세법 §50 ①의 기본공제 금액(1인당 150만원), §51의 추가공제(경로우대 100만원·장애인 200만원·부녀자 50만원·한부모 100만원), §59의2의 자녀세액공제 금액(첫째 15만원·둘째 20만원·셋째 이후 30만원, 8세~20세 대상)은 모두 2025년과 동일합니다.
                </p>
                <p>
                  다시 말해 개편의 실질 효과는 인당 공제액 상향이 아니라 공제 대상 인원의 확대입니다. 예를 들어 이전에는 자녀 2명 중 첫째가 알바 총급여 600만원으로 탈락해 기본공제가 150만원(둘째만)이었다면, 개편 후에는 둘 다 인정되어 300만원 기본공제가 회복됩니다. 여기에 15% 근로소득 한계세율을 가정하면 세액 감면 효과는 약 22만원(150만원 × 15%)이 됩니다.
                </p>
                <p>
                  다만 세액공제인 자녀세액공제는 종합소득세율 구간과 무관하게 정액이라, 이번 개편의 직접 수혜는 소득공제 방식인 기본공제 쪽이 큽니다. 고소득 근로자일수록 한계세율(24~45%)이 높으므로 부양가족 1명 추가의 절세폭도 그만큼 커집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">다만, 나이 요건과 동거 요건은 별개</h2>
                <p>
                  소득요건이 완화됐다고 모든 가족이 부양가족이 되는 것은 아닙니다. 소득세법 §50은 소득요건과 함께 나이 요건, 생계 요건을 동시에 요구합니다. 이번 개편은 이 셋 중 소득요건만 손댔습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 2. 관계별 나이·생계 요건 (소득세법 §50, 2026 개편 후에도 유지)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">관계</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">나이 요건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">생계 요건</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">배우자</td>
                        <td className="p-3">없음</td>
                        <td className="p-3">생계 동일 (별거해도 실질 부양이면 인정)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">직계존속 (부모·조부모)</td>
                        <td className="p-3">만 60세 이상</td>
                        <td className="p-3">주민등록 동거 또는 실질 부양</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">직계비속 (자녀·손자녀)</td>
                        <td className="p-3">만 20세 이하</td>
                        <td className="p-3">동거 원칙 (독립세대 별도 관리 필요)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">형제자매</td>
                        <td className="p-3">만 20세 이하 또는 60세 이상</td>
                        <td className="p-3">주민등록 동거 원칙</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">장애인 (관계 무관)</td>
                        <td className="p-3">나이 제한 없음</td>
                        <td className="p-3">생계 동일</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예를 들어 만 25세 대학원생 자녀는 소득이 없어도 나이 요건 초과로 부양가족 기본공제 대상이 아닙니다(장애인 예외 별도). 반대로 만 65세 부모는 나이 요건은 통과했지만 소득요건(개편 후 300만원 이하)도 함께 봐야 하므로, 부모의 국민연금·이자·배당·임대소득 등을 합산해 판정합니다.
                </p>
                <p className="mt-4">
                  다만 생계 요건은 형식적 주소 일치보다 실질 부양 여부를 우선합니다. 요양원에 계신 부모, 대학 기숙사에 사는 자녀도 부양자가 생계비를 지원한다면 인정되는 경우가 많으므로, 판단이 애매하면 국세청 상담(126)을 활용하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/personal-deduction-dependent-150-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부양가족 기본공제 150만원 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">인당 공제액과 판정 기본 규칙을 정리한 원문 가이드.</p>
                  </Link>
                  <Link
                    href="/guide/child-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자녀세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">8세~20세 자녀 세액공제 금액과 부양가족 요건 연동.</p>
                  </Link>
                  <Link
                    href="/guide/earned-income-deduction-brackets-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로소득공제 구간 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">총급여 750만원 컷오프 계산의 근거가 되는 공제 구조.</p>
                  </Link>
                  <Link
                    href="/guide/n-jobber-insurance-dependent-disqualification/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">N잡러 건강보험 피부양자 탈락</div>
                    <p className="mt-1 text-sm text-text-secondary">국세와 4대보험의 판정 기준 차이, 부양가족과 별개 계산.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">부양가족 등록 절차와 서류, 절세 항목 총정리.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">부양가족 수를 반영한 세후 월급 시뮬레이션.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 2026-08-03 기획재정부 발표 2026년 세제개편안을 기준으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 국회 심의 과정에서 수치·시행일이 조정될 수 있으므로 최종 확정 여부는 관보와 국세청 안내를 확인하세요. 부양가족 판정에는 소득요건 외에 나이·생계 요건이 함께 적용되며, 실질 사실관계에 따라 결과가 달라질 수 있습니다. 부양가족 기본공제의 정확한 기준은 <strong>소득세법 §50(기본공제), §51(추가공제), §47(근로소득공제)</strong>과 <strong>소득세법 시행령 §106</strong>을 따릅니다. 본 콘텐츠는 2026-08-21을 기준으로 작성되었고, 개편안 통과·시행 시 즉시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">
                    기획재정부 세제개편안
                  </a>
                  ,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">
                    국세청 연말정산 종합안내
                  </a>
                  ,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">
                    국가법령정보센터 소득세법
                  </a>
                  ,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">
                    홈택스 연말정산 간소화
                  </a>
                  .
                </p>
              </section>

              <ShareButtons
                title="부양가족 소득요건 300만 상향 2026 세제개편 가이드"
                url={URL}
                description="2026 세제개편안, 부양가족 기본공제 소득요건 100만→300만·근로 총급여 500만→750만 완화. 알바 자녀·파트타임 배우자 재진입 조건 정리."
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
