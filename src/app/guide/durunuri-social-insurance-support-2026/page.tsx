// [revenue-lever: indexing+traffic]
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

const URL = 'https://calculatorhost.com/guide/durunuri-social-insurance-support-2026/';
const DATE_PUBLISHED = '2026-08-08';
const DATE_MODIFIED = '2026-08-08';

export const metadata: Metadata = {
  title: '두루누리 사회보험료 지원 2026, 10인 미만 80% 지원',
  description:
    '두루누리는 근로자 10명 미만 사업장의 월 보수 270만원 미만 신규 가입 근로자와 사업주에게 국민연금·고용보험료의 80%를 최대 36개월 지원합니다(보험료징수법 §21). 지원 요건, 지원액 계산, 신청 방법, 제외 사유까지 정리했습니다.',
  keywords: [
    '두루누리 사회보험료 지원',
    '두루누리 신청방법',
    '10인 미만 국민연금 지원',
    '소상공인 고용보험 지원',
    '두루누리 지원 조건',
    '신규가입 사회보험 지원',
    '보험료징수법 21조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '두루누리 사회보험료 지원 2026' }],
    title: '두루누리 사회보험료 지원 2026, 10인 미만 80% 지원',
    description: '소규모 사업장 신규 가입 근로자·사업주의 국민연금·고용보험료 80% 지원 요건과 신청 방법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '두루누리 사회보험료 지원 2026, 10인 미만 80% 지원',
    description: '직원이 있는 작은 사업장이라면 국민연금·고용보험료 80%를 지원받을 수 있습니다. 조건과 신청법 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '두루누리 지원 대상은 누구인가요?',
    answer:
      '근로자 수 10명 미만 사업장의 월평균 보수 270만원 미만인 신규 가입 근로자와 그 사업주가 대상입니다. 신규 가입자는 지원 신청일 직전 1년간 국민연금·고용보험 자격 취득 이력이 없는 근로자를 말합니다. 근로자의 재산·종합소득 요건도 함께 봅니다.',
  },
  {
    question: '지원율과 지원 기간은 어떻게 되나요?',
    answer:
      '국민연금과 고용보험료의 80%를 지원하며, 지원 기간은 신규 가입 후 최대 36개월입니다. 근로자 부담분과 사업주 부담분에 각각 지원되므로 양쪽 모두 보험료 부담이 크게 줄어듭니다. 지원 기간이 지나면 지원이 종료됩니다.',
  },
  {
    question: '어떤 보험이 지원되나요?',
    answer:
      '국민연금과 고용보험 두 가지가 지원됩니다. 건강보험과 산재보험은 두루누리 지원 대상이 아닙니다. 국민연금 지원 근거는 국민연금법, 고용보험 지원 근거는 고용보험 및 산업재해보상보험의 보험료징수 등에 관한 법률 §21입니다.',
  },
  {
    question: '가족을 직원으로 채용해도 지원받을 수 있나요?',
    answer:
      '사업주의 직계가족은 고용보험 적용 대상에서 제외되므로 두루누리 고용보험 지원을 받을 수 없습니다. 국민연금은 사업장 가입 요건을 충족하면 별도로 검토됩니다. 가족 고용 시에는 각 보험별 적용 여부를 먼저 확인해야 합니다.',
  },
  {
    question: '보험료를 밀리면 지원이 어떻게 되나요?',
    answer:
      '두루누리는 보험료를 완납해야 지원됩니다. 체납액이 있으면 먼저 납부한 뒤 신청해야 하고, 지원 기간 중에도 체납이 발생하면 해당 월의 지원금은 받을 수 없습니다. 따라서 매월 보험료를 제때 납부하는 것이 중요합니다.',
  },
  {
    question: '언제부터 지원되나요? 소급 적용이 되나요?',
    answer:
      '지원은 신청한 날이 속하는 달부터 적용되며 소급 지원은 되지 않습니다. 신청일이 월초인지 월말인지는 따지지 않고 그 달부터 지원합니다. 따라서 요건을 갖췄다면 가입 후 최대한 빨리 신청하는 것이 유리합니다.',
  },
  {
    question: '어디에서 신청하나요?',
    answer:
      '4대 사회보험 정보연계센터(4insure.or.kr)나 국민연금공단·근로복지공단을 통해 신청할 수 있습니다. 사업장에서 신규 가입 신고를 할 때 두루누리 지원을 함께 신청하는 경우가 많습니다. 구체적 절차는 공단 안내를 확인하세요.',
  },
];

export default function DurunuriSocialInsurancePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '두루누리 사회보험료 지원 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '두루누리 사회보험료 지원 2026, 10인 미만 80% 지원 요건과 신청법',
    description:
      '두루누리 사회보험료 지원의 대상 요건, 국민연금·고용보험 80% 지원율, 최대 36개월 지원, 지원액 계산 사례, 신청 방법과 제외 사유를 정리한 소상공인 실무 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['두루누리', '사회보험료 지원', '10인 미만', '국민연금', '고용보험'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '두루누리 사회보험료 지원 2026',
    description:
      '소규모 사업장 신규 가입자의 국민연금·고용보험료 80% 지원 요건, 지원액, 신청 방법, 제외 사유.',
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
                    { name: '두루누리 사회보험료 지원 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">소상공인·소규모 사업주 · 8분 읽기 · 2026-08-08</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  두루누리 사회보험료 지원 2026
                  <br />
                  <span className="text-2xl text-text-secondary">10인 미만 국민연금·고용보험 80% 지원</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  직원 한두 명을 둔 작은 사업장이라면, 국민연금과 고용보험료의 상당 부분을 국가가 대신 내주는 두루누리 지원을 받을 수 있습니다. 이 가이드는 소상공인 사장님과 새로 취업한 저임금 근로자를 위해 지원 대상 조건, 실제로 얼마를 지원받는지, 어떻게 신청하는지, 그리고 못 받는 경우는 언제인지 정리했습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">두루누리란 무엇인가</h2>
                <p>
                  두루누리 사회보험료 지원사업은 사회보험 사각지대에 놓이기 쉬운 소규모 사업장 근로자와 사업주의 보험료 부담을 국가가 덜어주는 제도입니다. 근로자 10명 미만 사업장의 저임금 신규 가입자를 대상으로 국민연금과 고용보험료의 일부를 지원합니다(보험료징수법 §21).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <ul className="mt-2 ml-5 list-disc text-sm text-text-secondary space-y-1">
                    <li>대상 사업장: 근로자 수 10명 미만</li>
                    <li>대상 근로자: 월평균 보수 270만원 미만 신규 가입자</li>
                    <li>지원율: 국민연금·고용보험료의 80%(근로자·사업주 각각)</li>
                    <li>지원 기간: 신규 가입 후 최대 36개월</li>
                  </ul>
                </div>
                <p>
                  즉 새 직원을 채용하며 4대보험에 처음 가입시키는 소규모 사업장이라면, 3년 동안 국민연금과 고용보험료 부담을 크게 줄일 수 있는 제도입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">지원 대상 조건은 무엇인가</h2>
                <p>
                  사업장 규모, 근로자 보수, 신규 가입 여부, 재산·소득 요건을 모두 충족해야 합니다. 핵심 요건은 다음과 같습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 두루누리 지원 대상 요건 (2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">요건</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">사업장 규모</td>
                        <td className="p-3">근로자 수 10명 미만</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">근로자 보수</td>
                        <td className="p-3">월평균 보수 270만원 미만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신규 가입</td>
                        <td className="p-3">신청일 직전 1년간 국민연금·고용보험 취득 이력 없음</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">재산 요건</td>
                        <td className="p-3">재산세 과세표준 합계 6억원 미만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">소득 요건</td>
                        <td className="p-3">근로소득 외 종합소득 연 4,300만원 미만</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 지원 기준 금액은 매년 조정될 수 있습니다. 신청 전 근로복지공단·국민연금공단의 최신 공고로 그 해 기준을 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제로 얼마를 지원받나</h2>
                <p>
                  국민연금과 고용보험료의 80%를 근로자와 사업주 양쪽에 지원합니다. 보수 수준에 따라 지원 금액이 달라지므로 사례로 살펴보겠습니다. 아래는 이해를 돕기 위한 예시이며 실제 요율은 시기별로 다를 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 월 보수 200만원 신규 가입 근로자</p>
                  <p className="text-sm text-text-secondary">
                    · 국민연금 근로자 부담(4.75% 가정): 200만원 × 4.75% = 95,000원
                    <br />
                    · 국민연금 지원액(80%): 95,000원 × 80% = <strong>76,000원</strong>
                    <br />
                    · 사업주 부담분도 동일 방식으로 80% 지원
                    <br />
                    · 고용보험 실업급여 근로자 부담(0.9%): 200만원 × 0.9% = 18,000원
                    <br />
                    · 고용보험 지원액(80%): 18,000원 × 80% = <strong>14,400원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 근로자·사업주 부담 모두 80% 지원되어 실부담이 크게 줄어듭니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 국민연금 보험료율은 2026년 시기별로 조정되는 단계 인상이 있어, 정확한 금액은 공단 고지서로 확인하는 것이 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">못 받는 경우와 신청 방법</h2>
                <p>
                  요건을 갖춰도 다음의 경우에는 지원이 제한됩니다. 신청 전에 확인해야 헛걸음을 줄일 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>직계가족 고용:</strong> 사업주의 직계가족은 고용보험 적용 제외라 고용보험 지원 불가</li>
                  <li><strong>보험료 체납:</strong> 완납이 조건이며 체납 월은 지원 제외</li>
                  <li><strong>기존 가입 이력:</strong> 직전 1년 내 취득 이력이 있으면 신규 가입으로 인정 안 됨</li>
                  <li><strong>소급 불가:</strong> 지원은 신청한 달부터 적용, 지난 기간 소급 지원 없음</li>
                </ul>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">신청 절차</p>
                  <ol className="ml-5 list-decimal text-sm text-text-secondary space-y-1">
                    <li>신규 근로자 4대보험 자격 취득 신고</li>
                    <li>4대 사회보험 정보연계센터(4insure.or.kr) 또는 공단에서 두루누리 지원 신청</li>
                    <li>사업장 규모·보수·재산·소득 요건 심사</li>
                    <li>승인 시 신청한 달부터 보험료 80% 지원 적용</li>
                  </ol>
                </div>
                <p className="mt-4">
                  주의: 요건을 갖췄다면 가입 직후 바로 신청하는 것이 가장 유리합니다. 소급이 안 되므로 신청이 늦어진 만큼 지원 개월 수가 줄어듭니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/four-major-insurance-rates-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">4대보험 요율 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">국민연금·건보·고용·산재 요율 한눈에 정리.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-premium-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 보험료 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">보험료율과 근로자·사업주 부담 구조.</p>
                  </Link>
                  <Link
                    href="/guide/unemployment-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">실업급여 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">고용보험 가입 후 받는 구직급여 조건.</p>
                  </Link>
                  <Link
                    href="/guide/health-insurance-regional-subscriber-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">건강보험 지역가입자</div>
                    <p className="mt-1 text-sm text-text-secondary">직장·지역가입자 보험료 차이를 이해하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">4대보험 공제 후 실수령액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로 가이드 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">사회보험·수당·연차 등 근로 가이드.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 조언이 아닙니다. 두루누리 지원 기준 금액(보수 상한·재산·소득 요건)과 지원율은 매년 조정될 수 있으며, 국민연금 보험료율도 시기별로 다릅니다. 실제 지원 자격과 금액은 근로복지공단·국민연금공단·4대 사회보험 정보연계센터의 최신 공고로 확인하세요. 본 콘텐츠는 2026-08-08 기준이며, 인용 법조항은 <strong>고용보험 및 산업재해보상보험의 보험료징수 등에 관한 법률 §21(보험료의 지원), 국민연금법의 연금보험료 지원 규정</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.4insure.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">4대 사회보험 정보연계센터</a>,{' '}
                  <a href="https://www.nps.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국민연금공단</a>,{' '}
                  <a href="https://www.comwel.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">근로복지공단</a>.
                </p>
              </section>

              <ShareButtons
                title="두루누리 사회보험료 지원 2026 가이드"
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
