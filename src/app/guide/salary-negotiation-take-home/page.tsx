import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/salary-negotiation-take-home/';
const DATE_PUBLISHED = '2026-05-06';
const DATE_MODIFIED = '2026-05-06';

export const metadata: Metadata = {
  title: '연봉협상 전 꼭 확인하세요 | 실수령액 정확 시뮬레이션 2026 | calculatorhost',
  description:
    '협상 전 연봉 실수령액을 정확히 계산하는 방법. 세전 제시액 vs 세후 기대액, 상여금·인센티브 영향도, 연봉 결정 카드 만드는 법. 직장인 필독 가이드.',
  keywords: [
    '연봉협상',
    '실수령액 계산',
    '협상 전',
    '세후 수령액',
    '상여금 영향',
    '인센티브',
    '연봉 결정',
    '협상카드',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '연봉협상 전 꼭 확인하세요 | 실수령액 시뮬레이션',
    description: '이직·협상 제안 받았을 때, 연봉 수치의 함정 찾아내고 정확한 월 실수령액 계산하는 법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '연봉 5,000만 원 제안받았는데 실제 월급은 얼마인가요?',
    answer:
      '부양가족 1명, 비과세 없음 기준으로 월 약 292만 원입니다. 세전 월급 약 417만 원에서 4대보험(약 37만 원)과 소득세·지방소득세(약 29만 원)가 공제됩니다. 자녀 수·건강보험 피부양자 여부에 따라 10~20만 원 차이가 생기므로, 본인 상황을 [연봉실수령액 계산기](/calculator/salary/)에 입력해 정확히 확인하세요.',
  },
  {
    question: '상여금 500만 원은 월급에 얼마나 영향을 미칠까요?',
    answer:
      '상여금 500만 원은 보통 연1회 지급하므로 월 환산액은 약 42만 원입니다. 이 중 약 7~8만 원이 4대보험료로 공제되고, 약 5~6만 원이 소득세로 공제되어 실제 수령액은 약 28~30만 원. 연봉에 상여금이 포함된 경우 반드시 따로 확인하고, 연봉 + 상여금 합계를 다시 계산해야 정확합니다.',
  },
  {
    question: '인센티브는 월급에 포함되나요? 어떻게 계산하나요?',
    answer:
      '인센티브·성과급은 정기적(매달 또는 분기별)으로 지급되면 연봉에 반영되어야 합니다. 불규칙적이면 제외하고 보수적으로 계산하는 게 맞습니다. 제시액에 인센티브가 포함되는지 명확히 확인 → 포함되면 최저 실적 시나리오, 평년 시나리오, 호실적 시나리오 3가지로 월급 계산하세요.',
  },
  {
    question: '자녀 1명 추가 시 세금이 얼마나 줄어드나요?',
    answer:
      '자녀 1명당 월평균 세액공제 약 4~6만 원 줄어듭니다. 이는 기본공제(150만 원)에 세율 적용과 자녀세액공제(1인 월 12.5만 원)가 동시에 적용되기 때문. 따라서 자녀 예정이 있다면 협상 전에 미리 계산해 두는 것이 유리합니다.',
  },
  {
    question: '이직 시 첫 달 월급이 적을 수 있다는 게 무슨 뜻인가요?',
    answer:
      '4대보험 가입 시기(입사일 vs 근무 시작일)에 따라 첫 달에 공제가 줄어들 수 있습니다. 또한 급여가 월말 지급이면 첫 달은 반 달치만 받을 수 있고, 보너스·상여금은 다음 해부터 받는 경우도 있습니다. 입사 전에 급여 규정(지급일, 상여금 시기, 비과세 수당 여부)을 회사에 확인하세요.',
  },
  {
    question: '비과세 수당(식사비, 교통비)이 있으면 세금이 줄어드나요?',
    answer:
      '네, 비과세 식사비(월 20만 원 한도) + 교통비(월 30만 원 한도)가 있으면 세금·보험료 기준이 되는 소득이 줄어들어 실수령액이 늘어납니다. 예: 월급 417만 원에서 비과세 수당 30만 원을 빼고 387만 원으로 계산하면 세금이 약 2~3만 원 줄어듭니다. 회사에 비과세 수당 지급 정책을 반드시 묻고 협상 수치에 반영하세요.',
  },
  {
    question: '협상 중 "세전·세후"를 구분해서 제시하면 어떻게 해야 하나요?',
    answer:
      '회사가 "세전 5,000만 원"이라 하면 그게 최종 금액입니다. 계산기에 5,000만 원을 입력해 월 실수령액 확인. "세후 400만 원"이라 하면 그게 월 수령액이므로 연봉은 약 5,700만 원 정도입니다. 협상 시 "세전/세후 구분" → 4대보험 포함 여부 → 비과세 수당 포함 여부를 반드시 명확히 하고, 모든 메모를 기록해 두세요.',
  },
];

export default function SalaryNegotiationTakeHomePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '연봉협상 실수령액 시뮬레이션' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '연봉협상 전 꼭 확인하세요 — 실수령액 정확 시뮬레이션 (2026)',
    description:
      '이직·협상 제안 받았을 때, 제시된 연봉 수치에 숨은 함정이 있을 수 있습니다. 세전·세후, 상여금, 비과세 수당, 자녀 공제까지 반영한 정확한 월 실수령액 계산 방법을 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['연봉협상', '실수령액', '세후 월급', '상여금', '협상 전'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '연봉협상 전 꼭 확인하세요 | 실수령액 정확 시뮬레이션',
    description:
      '이직·협상 제안 수락 전, 정말로 받을 수 있는 월 실수령액을 정확히 계산하는 법. 세전 제시액 vs 세후 수령액 함정, 상여금·인센티브·비과세 수당 반영, 자녀·부양가족 공제 활용까지.',
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
                    { name: '연봉협상 실수령액' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장 · 7분 읽기 · 2026-05-06</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  연봉협상 전 꼭 확인하세요 — 실수령액 정확 시뮬레이션
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이직·협상 제안을 받았을 때, 제시된 연봉 수치에 숨은 함정이 있을 수 있습니다.
                  세전·세후의 차이, 상여금의 영향, 비과세 수당, 자녀 공제까지 반영한 정확한 월 실수령액을 계산하는 법을 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-salary-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">협상 체크리스트</h2>
                <ul className="space-y-1.5 text-sm" data-speakable>
                  <li>✓ <strong>제시액 확인</strong> — "세전" 또는 "세후"인지 명확히</li>
                  <li>✓ <strong>상여금 포함 여부</strong> — 성과급·인센티브 따로 계산</li>
                  <li>✓ <strong>비과세 수당</strong> — 식사비·교통비 금액 확인</li>
                  <li>✓ <strong>4대보험 공제 반영</strong> — 월 약 4.5~5% 감액</li>
                  <li>✓ <strong>자녀·부양가족 공제</strong> — 세금 절감액 계산</li>
                  <li>✓ <strong>연봉협상 카드 작성</strong> — 정확한 세후 수치로 무장</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">왜 연봉 수치가 헷갈릴까?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  많은 직장인이 이직 협상 중 "연봉 5,000만 원"이라는 수치를 받고, 월급 계산기에 그대로 입력해 월 약 350만 원을 기대합니다.
                  하지만 실제로는 4대보험료, 소득세, 지방소득세가 공제되어 월 약 292만 원만 받을 수 있습니다.
                  약 60만 원의 차이가 생기는 이유는 <strong>세전 연봉과 세후 월급</strong>이 다르기 때문입니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  또한 회사마다 상여금 지급 방식, 비과세 수당(식사비·교통비), 급여 지급일이 다릅니다.
                  협상 전에 이 모든 것을 정확히 파악해야 실제 월 수령액을 예측할 수 있고,
                  부당한 협상 제안을 거절할 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Step 1. 제시액의 성격 파악하기 — 세전? 세후?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  회사가 "연봉 5,000만 원"이라 하면, 이는 <strong>세전 총급여</strong>입니다.
                  여기서 4대보험료와 소득세가 공제되어야 실제 월급이 결정됩니다.
                </p>
                <ul className="space-y-2 border-l-4 border-l-highlight-500 bg-card pl-4 py-3 text-sm">
                  <li>
                    <strong>세전 연봉:</strong> 회사가 지급하는 원래 금액 (4대보험료·세금 공제 전)
                  </li>
                  <li>
                    <strong>세후 월급:</strong> 실제 통장에 입금되는 금액 (공제 후)
                  </li>
                  <li>
                    <strong>협상 팁:</strong> 회사가 "세후 400만 원"이라고 하면, 그게 최종 수령액입니다.
                    역으로 월 400만 원 × 12개월 = 연 4,800만 원이라고 계산하면 안 됩니다.
                    월 400만 원 세후를 받으려면 세전 연봉은 약 5,700만 원 정도 필요합니다.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Step 2. 상여금·인센티브 분리 계산하기</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  회사가 "기본급 4,000만 원 + 상여금 1,000만 원"이라 할 때, 상여금은 따로 계산해야 합니다.
                  상여금도 4대보험료와 소득세가 공제되며, 지급 시기(연 1회 vs 분기)에 따라 세금 계산이 다릅니다.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    기본급 4,000만 원 → 월 약 230만 원 세후
                  </li>
                  <li>
                    상여금 1,000만 원 (연 1회) → 월평균 약 62만 원 세후
                  </li>
                  <li>
                    <strong>합계: 월 약 292만 원 (세후)</strong>
                  </li>
                </ul>
                <p className="text-sm text-text-tertiary">
                  단, 상여금이 "정기적"인지 "부정기적"인지 확인이 중요합니다.
                  정기 상여금(연 2회)이면 연봉 계산에 포함되지만, 성과급이면 제외하고 보수적으로 계산하는 게 낫습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Step 3. 비과세 수당으로 실수령액 늘리기</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  비과세 식사비(월 20만 원 한도)·교통비(월 30만 원 한도)가 있으면,
                  세금·보험료 계산 기준이 되는 소득이 줄어들어 실수령액이 늘어납니다.
                </p>
                <p className="text-sm text-text-tertiary">
                  예: 월급 417만 원인데 비과세 식사비 20만 원 + 교통비 30만 원 = 총 50만 원이 있으면,
                  세금·보험료는 (417 − 50) = 367만 원을 기준으로 계산되어,
                  실수령액이 약 5~8만 원 늘어나게 됩니다.
                </p>
                <p className="text-sm">
                  협상 시 "기본급은 4,500만 원, 비과세 수당 월 50만 원"이라고 명확히 기재하도록 요청하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Step 4. 자녀·부양가족 공제 반영하기</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  자녀가 1명이면 월평균 세액공제 약 4~6만 원이 생기고,
                  부양가족(부모님 등) 1명이면 월 약 1~2만 원의 세금이 줄어듭니다.
                  협상 직후 월급을 받기 전에 이 공제를 미리 확인해 두면, 실제 수령액이 예상보다 많을 수 있습니다.
                </p>
                <p className="text-sm">
                  <strong>협상 팁:</strong> 자녀 예정이 있다면 인사팀에 미리 알려서,
                  첫 월급부터 부양가족 수를 올바르게 반영한 세금을 공제하도록 요청하세요.
                  그렇지 않으면 나중에 환급 신청해야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">협상 카드 만드는 법 — 실수령액 정확 계산</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  이제 여러분의 상황에 맞게 정확한 월 실수령액을 계산해 봅시다.
                  [연봉실수령액 계산기](/calculator/salary/)를 열어서 다음 정보를 입력하면,
                  자동으로 월 실수령액·연봉세·4대보험료가 계산됩니다.
                </p>
                <ol className="space-y-3 text-sm">
                  <li>
                    <strong>1단계:</strong> 회사가 제시한 "세전 연봉" 입력 (상여금 포함 여부 확인)
                  </li>
                  <li>
                    <strong>2단계:</strong> 비과세 수당 있으면 입력 (식사비, 교통비)
                  </li>
                  <li>
                    <strong>3단계:</strong> 자녀·부양가족 수 입력
                  </li>
                  <li>
                    <strong>4단계:</strong> "월 실수령액" 확인 → 이게 당신이 실제 받을 금액입니다
                  </li>
                  <li>
                    <strong>5단계:</strong> 여러 시나리오 비교 (다양한 연봉 제안, 상여금 유무 등)
                  </li>
                </ol>
                <p className="border-l-4 border-l-highlight-500 bg-card pl-4 py-3 text-sm">
                  계산 결과를 스크린샷·엑셀로 저장해 두고, 협상 중에 회사의 제안과 비교하세요.
                  회사가 제시한 "월 350만 원"과 계산기 결과 "월 292만 원"이 다르면,
                  그 차이가 어디서 나는지 명확히 물어봐야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">자주 하는 실수 5가지</h2>
                <ol className="space-y-2 text-sm">
                  <li>
                    <strong>❌ 제시액 ÷ 12 = 월급</strong>
                    <br />
                    <span className="text-text-tertiary">5,000만 원 ÷ 12 = 416만 원? 아닙니다. 4대보험·세금 공제 후 약 292만 원입니다.</span>
                  </li>
                  <li>
                    <strong>❌ 상여금을 월급에 더하기</strong>
                    <br />
                    <span className="text-text-tertiary">월 350만 원 + 상여금 500만 원 = 월 391만 원? 아닙니다. 상여금도 보험료와 세금이 공제되므로 월 약 30만 원만 추가됩니다.</span>
                  </li>
                  <li>
                    <strong>❌ 비과세 수당을 무시하기</strong>
                    <br />
                    <span className="text-text-tertiary">비과세 수당이 있으면 실제 세금이 줄어드는데, 협상 때 언급하지 않으면 손해봅니다.</span>
                  </li>
                  <li>
                    <strong>❌ 첫 달 월급을 기준으로 생각하기</strong>
                    <br />
                    <span className="text-text-tertiary">첫 달은 반 달치만 받을 수 있고, 4대보험 가입 시기에 따라 공제가 달라질 수 있습니다.</span>
                  </li>
                  <li>
                    <strong>❌ 협상 후 "뭐, 이 정도구나" 하고 포기하기</strong>
                    <br />
                    <span className="text-text-tertiary">협상은 여러 번 가능합니다. 첫 제안이 최종이 아닙니다. 정확한 계산 결과를 들고 다시 협상하세요.</span>
                  </li>
                </ol>
              </section>

              <AdSlot slot="guide-salary-mid" format="rectangle" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">관련 법령 & 공식 출처</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    국세청 소득세 계산기: <a href="https://www.nts.go.kr" className="text-primary-500 underline">https://www.nts.go.kr</a>
                  </li>
                  <li>
                    근로기준법 제34조 (상여금 지급): <a href="https://www.law.go.kr" className="text-primary-500 underline">https://www.law.go.kr</a>
                  </li>
                  <li>
                    소득세법 §55 (종합소득세 누진세율)
                  </li>
                  <li>
                    소득세법 §89 (비과세 근로소득)
                  </li>
                </ul>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">관련 계산기</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    ➜ <Link href="/calculator/salary/" className="font-semibold text-primary-500 hover:underline">
                      연봉 실수령액 계산기
                    </Link>
                    {' — 여러 시나리오로 월급 비교'}
                  </li>
                  <li>
                    ➜ <Link href="/calculator/severance/" className="font-semibold text-primary-500 hover:underline">
                      퇴직금 계산기
                    </Link>
                    {' — 퇴직 시 받을 수 있는 금액 확인'}
                  </li>
                  <li>
                    ➜ <Link href="/calculator/freelancer-tax/" className="font-semibold text-primary-500 hover:underline">
                      프리랜서 종합소득세 계산기
                    </Link>
                    {' — 1099/용역비 지급받는 경우'}
                  </li>
                </ul>
              </section>

              <section className="space-y-3 border-t border-border-base pt-6">
                <p className="text-xs text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 참고용이며 법적 효력이 없습니다.
                  복잡한 연봉협상 또는 세무 처리는 회계사·세무사의 상담을 받으시기 바랍니다.
                </p>
              </section>

              <section className="space-y-3 border-t border-border-base pt-6">
                <p className="text-xs text-text-tertiary">
                  <strong>검수자:</strong> 김준혁(스마트데이터샵 대표, 세무사 자문).
                </p>
                <p className="text-xs text-text-tertiary">
                  마지막 갱신: 2026-05-06 | 2026년 최신 세율·4대보험료 반영
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
