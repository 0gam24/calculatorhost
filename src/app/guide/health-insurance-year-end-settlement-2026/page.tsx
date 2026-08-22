// [revenue-lever: traffic+indexing] 직장인 4월 건보료 정산 시즌 검색 흡수, 직장인 트래픽 + 색인 표면 확대.
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

const URL = 'https://calculatorhost.com/guide/health-insurance-year-end-settlement-2026/';
const DATE_PUBLISHED = '2026-08-23';
const DATE_MODIFIED = '2026-08-23';

export const metadata: Metadata = {
  title: '건강보험료 연말정산 2026, 4월 추가징수·환급 왜 생기나',
  description:
    '직장인 건강보험료는 전년 보수총액이 확정되는 4월에 정산됩니다. 연봉이 오르면 추가징수, 줄면 환급이 되는 이유와 정산 계산법, 최대 12회 분할납부까지 국민건강보험법 시행령 §39 기준으로 정리합니다.',
  keywords: [
    '건강보험료 연말정산',
    '건강보험료 4월 추가징수',
    '보수총액 신고',
    '건보료 정산 환급',
    '건강보험료 분할납부',
    '2026 건강보험료율',
    '국민건강보험법 시행령 39조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '건강보험료 연말정산 2026 4월 추가징수 환급' }],
    title: '건강보험료 연말정산 2026, 4월에 추가로 떼이는 이유와 계산법',
    description: '연봉 오른 직장인은 4월 급여에서 건보료가 추가징수됩니다. 정산 원리와 계산, 분할납부 방법을 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '건강보험료 연말정산 2026, 4월 추가징수·환급',
    description: '전년 보수총액 확정으로 4월에 정산되는 직장인 건강보험료의 원리와 계산법.',
  },
};

const FAQ_ITEMS = [
  {
    question: '건강보험료 연말정산이 정확히 무엇인가요?',
    answer:
      '직장가입자 건강보험료는 전년도에 신고한 예상 보수월액으로 매달 걷은 뒤, 실제 보수총액이 확정되면 그 차액을 다시 정산하는 구조입니다(국민건강보험법 시행령 §39). 실제 보수가 예상보다 많았으면 4월에 추가로 걷고, 적었으면 돌려줍니다. 소득세 연말정산과는 별개의 절차입니다.',
  },
  {
    question: '왜 하필 4월에 건보료가 많이 나오나요?',
    answer:
      '사용자(회사)가 매년 3월에 전년도 보수총액을 공단에 신고하고, 공단이 이를 반영해 정산분을 4월분 보험료에 한꺼번에 얹기 때문입니다. 전년에 연봉이 오른 직장인은 그 인상분에 대한 1년치 보험료 차액이 4월에 몰려 나와 이른바 4월 건보료 정산으로 체감됩니다.',
  },
  {
    question: '연봉이 오르면 무조건 추가로 내야 하나요?',
    answer:
      '전년에 실제 받은 보수총액이 매달 보험료를 매길 때 쓴 예상 보수월액보다 크면 추가징수됩니다. 반대로 무급휴직, 수당 감소 등으로 실제 보수가 줄었다면 정산 결과 환급이 됩니다. 즉 추가징수는 벌금이 아니라, 덜 낸 보험료를 정산하는 것입니다.',
  },
  {
    question: '2026년 건강보험료율은 얼마인가요?',
    answer:
      '2026년 직장가입자 건강보험료율은 보수월액의 7.19%로, 근로자와 사용자가 절반씩 부담해 본인부담은 3.595%입니다(2025년은 7.09%). 장기요양보험료도 함께 오릅니다. 다만 4월 정산은 정산 대상 연도(전년)의 요율로 계산되므로, 2026년 4월 정산은 2025년 요율 7.09%가 적용됩니다.',
  },
  {
    question: '장기요양보험료도 함께 정산되나요?',
    answer:
      '네, 장기요양보험료는 건강보험료에 일정 비율을 곱해 산정되므로 건강보험료가 정산되면 장기요양보험료도 같은 방향으로 정산됩니다. 2026년 장기요양보험료율은 소득 대비 0.9448%(건강보험료 대비 약 13.14%) 수준입니다. 정확한 값은 국민건강보험공단에서 확인하세요.',
  },
  {
    question: '추가징수액이 너무 큰데 한 번에 다 내야 하나요?',
    answer:
      '추가징수액이 해당 월의 보수월액보험료 이상이면 사용자 신청으로 최대 12회까지 나눠 낼 수 있습니다(국민건강보험법 시행령 §39 제4항). 부담이 크면 회사 인사·급여 담당을 통해 분할납부를 신청하세요.',
  },
  {
    question: '이직·퇴사했는데도 정산 대상인가요?',
    answer:
      '네, 재직했던 기간의 보수를 기준으로 정산됩니다. 퇴직 시에는 퇴직 정산이 별도로 이뤄지고, 연간 정산 대상이면 4월 정산에도 반영될 수 있습니다. 여러 직장을 다녔다면 각 사업장 보수가 합산·정산되므로, 예상보다 정산액이 커질 수 있습니다.',
  },
  {
    question: '프리랜서나 지역가입자도 4월 정산이 있나요?',
    answer:
      '4월 보수총액 정산은 직장가입자(월급 근로자)에게 적용되는 절차입니다. 지역가입자는 매년 11월경 전년도 소득·재산 자료를 반영해 보험료가 조정되는 방식으로, 정산 시점과 기준이 다릅니다. 겸업으로 사업소득이 큰 직장인은 보수 외 소득에 대한 추가 보험료가 별도로 부과될 수 있습니다.',
  },
];

export default function HealthInsuranceYearEndSettlement2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '건강보험료 연말정산 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '건강보험료 연말정산 2026, 4월 추가징수와 환급이 생기는 이유',
    description:
      '직장인 건강보험료의 4월 보수총액 정산 원리, 추가징수·환급 계산법, 2026 요율, 최대 12회 분할납부 방법을 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['건강보험료 연말정산', '보수총액 신고', '4월 추가징수', '건보료 환급', '분할납부'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '건강보험료 연말정산 2026',
    description: '직장인 건강보험료 4월 정산의 원리와 계산, 분할납부를 정리한 가이드.',
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
                    { name: '건강보험료 연말정산 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 · 7분 읽기 · 2026-08-23</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  건강보험료 연말정산 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 4월 추가징수와 환급이 생기는 이유</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  매년 4월 급여명세서를 보면 건강보험료가 평소보다 훌쩍 뛰어 당황하는 직장인이 많습니다. 이건 요율이 갑자기 오른 게 아니라, 전년도에 덜 냈던 보험료를 한꺼번에 맞추는 정산 때문입니다. 이 가이드는 왜 4월에 정산이 몰리는지, 추가징수와 환급이 어떻게 갈리는지, 부담이 클 때 나눠 내는 방법까지 국민건강보험법 시행령 §39를 기준으로 쉽게 풀어드립니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">건강보험료 연말정산이란 무엇인가요?</h2>
                <p>
                  결론부터 말하면, 미리 걷은 보험료와 실제 내야 할 보험료의 차액을 맞추는 절차입니다. 직장가입자 건강보험료는 전년도에 신고한 예상 보수월액을 기준으로 매달 걷습니다(국민건강보험법 §69, §70). 그런데 실제 1년간 받은 보수총액은 상여·수당·연봉 인상 때문에 예상과 달라집니다. 그래서 실제 보수가 확정되면 그 차액을 다시 정산하는 것이 건강보험료 연말정산입니다(시행령 §39).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">정산의 두 방향</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    실제 보수 &gt; 예상 보수: 덜 냈으므로 4월에 추가징수
                    <br />
                    실제 보수 &lt; 예상 보수: 더 냈으므로 4월에 환급
                    <br />
                    즉 추가징수는 벌칙이 아니라 미납분 정산일 뿐입니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">왜 하필 4월에 몰리나요?</h2>
                <p>
                  회사(사용자)가 매년 3월에 전년도 보수총액을 국민건강보험공단에 신고하기 때문입니다. 공단은 이 자료로 정산 보험료를 계산해 4월분 보험료에 한꺼번에 반영합니다. 전년에 연봉이 오른 직장인일수록 인상분에 대한 1년치 차액이 4월 한 달에 몰려 나오므로 체감이 큽니다.
                </p>
                <p>
                  또한 4월 정산이 끝나면, 그 확정된 보수를 기준으로 그 해 4월부터의 월 보험료도 새로 산정됩니다. 그래서 정산분(1회성)과 월 보험료 인상분(계속)이 겹쳐 4월 이후 매달 부담도 조금 늘어난 것처럼 느껴집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">정산 계산은 어떻게 하나요?</h2>
                <p>
                  정산은 정산 대상 연도(전년)의 요율로 계산합니다. 2026년 4월 정산은 2025년 요율(건강보험 7.09%, 본인부담 3.545%)을 적용합니다. 아래는 이해를 돕기 위한 가상 사례입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 연봉이 올라 추가징수되는 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 매달 부과 기준 예상 보수월액: 300만원
                    <br />
                    · 실제 확정 보수월액: 350만원
                    <br />
                    · 예상 기준 연 본인부담: 300만 × 3.545% × 12 = 1,276,200원
                    <br />
                    · 실제 기준 연 본인부담: 350만 × 3.545% × 12 = 1,488,900원
                    <br />
                    · 4월 정산 추가징수: 1,488,900 − 1,276,200 = <strong>212,700원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">장기요양보험료 정산분은 별도로 함께 부과. 단순 예시로 실제와 다를 수 있음.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 2. 무급휴직으로 환급되는 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 예상 보수월액: 300만원
                    <br />
                    · 실제 확정 보수월액(휴직 반영): 260만원
                    <br />
                    · 예상 기준 연 본인부담: 300만 × 3.545% × 12 = 1,276,200원
                    <br />
                    · 실제 기준 연 본인부담: 260만 × 3.545% × 12 = 1,106,040원
                    <br />
                    · 4월 정산 환급: 1,276,200 − 1,106,040 = <strong>170,160원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">환급은 4월 보험료에서 차감되거나 환급 처리됩니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">추가징수액이 크면 나눠 낼 수 있나요?</h2>
                <p>
                  네, 나눠 낼 수 있습니다. 추가징수액이 해당 월의 보수월액보험료 이상이면, 사용자 신청으로 최대 12회 이내에서 분할납부가 가능합니다(국민건강보험법 시행령 §39 제4항). 부담이 크다면 회사 급여·인사 담당에게 분할납부 신청을 요청하세요.
                </p>
                <p>
                  다만 분할납부를 해도 총액이 줄지는 않습니다. 한 번에 나가는 금액만 나눌 뿐이므로, 연봉이 크게 오른 해에는 4월 정산을 미리 예상하고 대비하는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2026년 요율과 미리 대비하는 법</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 직장가입자 건강보험 관련 요율 (본인부담 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">2025년</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">2026년</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">건강보험료율(총)</td>
                        <td className="p-3">7.09%</td>
                        <td className="p-3"><strong>7.19%</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">본인부담(50%)</td>
                        <td className="p-3">3.545%</td>
                        <td className="p-3"><strong>3.595%</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">장기요양보험료(소득 대비)</td>
                        <td className="p-3">약 0.9182%</td>
                        <td className="p-3">약 0.9448%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 위 요율은 국민건강보험공단·보건복지부 고시 기준이며, 매년 변동됩니다. 연봉 협상으로 인상폭이 컸다면 다음 해 4월 정산에서 추가징수가 나올 것을 예상하고, 인상분의 일부를 미리 떼어 두면 부담이 완화됩니다. 정확한 본인 정산액은 국민건강보험공단(민원·모바일 앱)에서 조회하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">4대보험과 세금을 반영한 세후 월급을 계산하세요.</p>
                  </Link>
                  <Link
                    href="/guide/four-major-insurance-rates-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">2026 4대보험 요율</div>
                    <p className="mt-1 text-sm text-text-secondary">국민연금·건강보험·고용보험·산재 요율 한눈에.</p>
                  </Link>
                  <Link
                    href="/guide/health-insurance-premium-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">건강보험료 산정 기준 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">보수월액과 요율로 월 보험료가 정해지는 원리.</p>
                  </Link>
                  <Link
                    href="/guide/salary-take-home-2026-july-insurance-increase/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">2026 실수령액과 보험료 인상</div>
                    <p className="mt-1 text-sm text-text-secondary">요율 인상이 월급에 미치는 영향을 확인하세요.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 조언이 아닙니다. 실제 정산액, 요율, 분할납부 가능 여부는 국민건강보험공단 또는 회사 급여 담당을 통해 반드시 확인하세요. 인용 조항은 국민건강보험법 §69(보험료), §70(보수월액), 같은 법 시행령 §39(보수월액보험료의 정산 및 분할납부)입니다. 요율은 국민건강보험공단·보건복지부 고시 기준이며 2026-08-23 기준입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nhis.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국민건강보험공단</a>,{' '}
                  <a href="https://www.mohw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">보건복지부</a>.
                </p>
              </section>

              <ShareButtons title="건강보험료 연말정산 2026 가이드" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
