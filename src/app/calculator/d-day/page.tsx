import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { AdSlot } from '@/components/ads/AdSlot';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildSpeakableJsonLd,
  buildWebPageJsonLd,
  buildHowToJsonLd,
} from '@/lib/seo/jsonld';
import { DdayCalculator } from './DdayCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/d-day';

export const metadata: Metadata = {
  title: 'D-day 계산기 2026 | 날짜 차이·100일 기념일 | calculatorhost',
  description:
    '특정일까지 D-day, 두 날짜 사이 일수, N일 후 도달 날짜까지 한 번에 계산. 윤년·요일 자동 처리. 기념일·시험·출산 예정일 카운팅에 최적.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'D-day 계산기 2026 | 날짜 차이·100일 기념일',
    description: '특정일까지 D-day, 두 날짜 사이 일수, N일 후 날짜를 즉시 계산하세요.',
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'D-day 계산기 2026',
    description: '날짜 계산과 기념일 카운팅을 한 번에.',
  },
};

const FAQ_ITEMS = [
  {
    question: 'D-day는 어떻게 계산하나요?',
    answer:
      'D-day는 기준일(보통 오늘)에서 목표일까지의 남은 일수를 계산합니다. 목표일이 기준일보다 뒤에 있으면 "D-10" 같이 양수로 표시되고, 앞에 있으면 "D+5" 같이 음수로 표시됩니다. 기준일과 목표일이 같으면 "D-DAY"로 표시됩니다.',
  },
  {
    question: '100일·1000일 기념일은 어떻게 계산하나요?',
    answer:
      '"N일 후" 모드에서 기준일(보통 생일이나 돌 등)에 100, 1000 등의 일수를 더하면 도달 날짜와 요일을 알 수 있습니다. 예를 들어 2026-01-01에서 +100일을 계산하면 2026-04-11(목)이 결과입니다.',
  },
  {
    question: '두 날짜 사이의 기간을 계산할 때 차이는 무엇인가요?',
    answer:
      '"기간 계산" 모드에서 "양 끝 포함"을 선택하면 시작일과 종료일을 모두 포함하여 계산됩니다. 예를 들어 1월 1일부터 1월 3일까지 "양 끝 포함"으로 계산하면 3일입니다(1일, 2일, 3일 포함). "제외"를 선택하면 양쪽을 제외하여 1일로 계산됩니다.',
  },
  {
    question: '윤년 2월 29일도 정확하게 처리되나요?',
    answer:
      '예, 본 계산기는 윤년을 완벽하게 처리합니다. 2024년 2월 29일과 2025년 2월 28일 사이의 간격도 정확히 계산되며, 일수 환산(주·개월·년)도 올바르게 계산됩니다.',
  },
  {
    question: '시차(UTC)는 영향을 주나요?',
    answer:
      '아니요, 본 계산기는 UTC(협정세계시) 기준으로 자정(00:00)에 계산하므로 한국 시간과 무관하게 일관된 결과를 제공합니다. 시간 단위 계산이 아닌 날짜 단위 계산이므로 일상 사용에서 시차 문제는 없습니다.',
  },
  {
    question: '기간을 년·월·주로 환산할 때 기준은?',
    answer:
      '본 계산기에서는 다음 기준을 사용합니다: 1주 = 7일, 1개월 = 30.4167일(365.25 ÷ 12), 1년 = 365.25일(윤년 고려). 실제 달력의 월(28~31일)이나 년도와 다를 수 있으므로 참고용으로 봐주세요.',
  },
] as const;

const RELATED = [
  { href: '/calculator/area', title: '평수 환산', description: '평↔제곱미터' },
  { href: '/calculator/bmi', title: 'BMI 계산', description: '비만도 측정' },
] as const;

export default function DdayPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: 'D-day 계산기',
    description: '특정일까지의 D-day, 두 날짜 사이 기간, N일 후 도달 날짜를 계산하는 무료 도구',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: 'D-day 계산기 2026',
    description: '날짜 계산과 기념일 카운팅을 한 번에',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
  });
  const howToLd = buildHowToJsonLd({
    name: 'D-day 계산기 사용 방법',
    description: '기준일과 목표일을 입력하여 남은 일수와 도달 날짜를 계산하는 단계별 가이드',
    steps: [
      { name: '계산 모드 선택', text: 'D-day·기간 계산·N일 후 중 원하는 모드를 선택합니다.' },
      { name: '날짜 입력', text: '기준일과 목표일(또는 기준일과 경과일수)을 입력합니다.' },
      { name: '옵션 설정', text: '필요하면 양 끝 포함 여부, 요일 표시 등을 조정합니다(선택).' },
      { name: '결과 확인', text: '남은 일수, 도달 날짜, 요일, 기간 환산값을 확인합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })));
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '생활', url: 'https://calculatorhost.com/category/lifestyle' },
    { name: 'D-day 계산기' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 px-4 py-8 md:px-8">
            <div className="mx-auto flex max-w-4xl flex-col gap-8">
              {/* H1 + 리드 */}
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '생활', href: '/category/lifestyle/' },
                    { name: 'D-day' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">D-day 계산기 2026</h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  특정일까지 며칠 남았는지, 두 날짜 사이의 차이가 얼마나 되는지, 기준일에서 특정 일수 후의 날짜가 언제인지를 즉시 계산할 수 있는 무료 도구입니다. 기념일 카운팅, 시험 준비, 출산 예정일, 휴가 계획 등 일상의 모든 날짜 계산에 활용하세요.
                </p>
                <AuthorByline datePublished="2026-04-24" dateModified="2026-04-27" />
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="D-day는 목표 날짜까지 남은 일수를 나타내는 표현입니다. 기준일(보통 오늘)에서 목표일까지의 차이를 일 단위로 계산하며, 양수는 남은 날을, 음수는 지난 날을 의미합니다."
                table={{
                  caption: '3가지 계산 모드',
                  headers: ['계산 방식', '사용 사례'],
                  rows: [
                    ['D-day (기준→목표일)', '생일, 결혼식, 시험 날까지 남은 일수'],
                    ['기간 계산 (시작→종료)', '휴가 기간, 프로젝트 기간, 임신 기간'],
                    ['N일 후 계산 (기준+일수)', '100일, 1000일 기념일, 추후 예정일'],
                  ],
                }}
                tldr={[
                  'D-day는 기준일에서 목표일까지의 남은 일수 (양수) 또는 지난 일수 (음수)',
                  '기준일 기본값은 오늘이며 자유롭게 변경 가능',
                  '일수를 주·개월·년으로 환산하여 장기 단위 파악 가능',
                  '윤년을 포함한 모든 날짜 자동 처리',
                  '요일(월·화·수 등)도 함께 표시',
                ]}
              />

              <AdSlot slot="d-day-top" format="horizontal" />

              {/* 계산기 */}
              <DdayCalculator />

              {/* FAQ (중간 배치 - GEO 권장) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* D-day란? */}
              <section aria-label="D-day 개념" className="card">
                <h2 className="mb-4 text-2xl font-semibold">D-day란?</h2>
                <p className="mb-4 text-text-secondary">
                  D-day(디데이)는 특정 목표 날짜까지 남은 일수를 나타내는 표현입니다. 원래는 군사용어로 "Day of Invasion(침공일)" 또는 "Designated Day(지정된 날)" 를 의미했으나, 일상에서는 "목표로 삼은 날까지 얼마나 남았는가"를 뜻합니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  예를 들어 "생일까지 D-10"이라고 하면 생일이 10일 남았다는 뜻이고, "시험을 치른 지 D+30"이라고 하면 시험 후 30일이 지났다는 뜻입니다. 한국에서는 결혼식, 입시, 군 제대 등 중요한 일정을 계산할 때 자주 사용됩니다.
                </p>
                <p className="text-text-secondary">
                  본 계산기를 이용하면 복잡한 날짜 계산 없이 버튼 몇 번으로 정확한 D-day를 알 수 있습니다.
                </p>
              </section>

              {/* 3가지 모드 상세 설명 */}
              <section aria-label="계산 모드 설명" className="card">
                <h2 className="mb-4 text-2xl font-semibold">3가지 계산 모드 활용법</h2>

                <div className="mb-6 space-y-6">
                  {/* 모드 A */}
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-primary-500">
                      1. D-day 모드 (기준일 → 목표일)
                    </h3>
                    <p className="mb-3 text-sm text-text-secondary">
                      기준일(기본값: 오늘)에서 목표일까지 몇 일이 남았거나 지났는지 계산합니다.
                    </p>
                    <div className="rounded-lg bg-bg-card p-4 text-sm">
                      <p className="mb-2 font-medium text-text-primary">사용 예시:</p>
                      <ul className="space-y-1 text-text-secondary">
                        <li>• 결혼식이 2026-06-15일인데, 오늘(2026-04-24)부터 몇 일 남았나?</li>
                        <li>• 대학교 입시 발표일이 2026-03-01인데, 얼마나 지났나?</li>
                        <li>• 휴가 시작이 2026-07-01인데 남은 기간은?</li>
                      </ul>
                    </div>
                  </div>

                  {/* 모드 B */}
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-primary-500">
                      2. 기간 계산 모드 (시작일 → 종료일)
                    </h3>
                    <p className="mb-3 text-sm text-text-secondary">
                      두 날짜 사이의 정확한 기간을 계산합니다. "양 끝 포함", "시작일만", "종료일만", "제외" 네 가지 포함 방식을 선택할 수 있습니다.
                    </p>
                    <div className="rounded-lg bg-bg-card p-4 text-sm">
                      <p className="mb-2 font-medium text-text-primary">사용 예시:</p>
                      <ul className="space-y-1 text-text-secondary">
                        <li>• 2026-06-01 ~ 2026-06-30 (여름 방학 기간): 30일</li>
                        <li>• 임신 기간 (마지막 월경일 ~ 출산일): 280일</li>
                        <li>• 휴가 (2026-07-01 ~ 2026-07-15): 15일</li>
                      </ul>
                    </div>
                  </div>

                  {/* 모드 C */}
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-primary-500">
                      3. N일 후 모드 (기준일 + 일수)
                    </h3>
                    <p className="mb-3 text-sm text-text-secondary">
                      기준일에서 특정 일수를 더하거나 빼서 도달할 날짜를 계산합니다. 기념일 계산에 특히 유용합니다.
                    </p>
                    <div className="rounded-lg bg-bg-card p-4 text-sm">
                      <p className="mb-2 font-medium text-text-primary">사용 예시:</p>
                      <ul className="space-y-1 text-text-secondary">
                        <li>• 아기 출생일이 2026-01-15인데, 100일은 언제? → 2026-04-25(금)</li>
                        <li>• 결혼기념일이 2026-05-20인데, 1000일은? → 2028-02-16(목)</li>
                        <li>• 2026-04-24에서 -30일 과거는? → 2026-03-25(월)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 기념일·이벤트별 100일, 1000일 예시 */}
              <section aria-label="기념일 계산 예시" className="card">
                <h2 className="mb-4 text-2xl font-semibold">기념일별 100일·1000일 계산</h2>
                <p className="mb-4 text-sm text-text-secondary">
                  "N일 후 모드"를 이용하면 주요 기념일의 100일, 1000일을 즉시 계산할 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="px-3 py-2 text-left font-semibold text-text-secondary">
                          기념일
                        </th>
                        <th scope="col" className="px-3 py-2 text-center font-semibold text-text-secondary">
                          100일
                        </th>
                        <th scope="col" className="px-3 py-2 text-center font-semibold text-text-secondary">
                          1000일
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 text-text-primary">아기 출생일 (2026-01-15)</td>
                        <td className="px-3 py-2 text-center text-text-secondary">2026-04-25</td>
                        <td className="px-3 py-2 text-center text-text-secondary">2028-10-12</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 text-text-primary">결혼식 (2026-06-20)</td>
                        <td className="px-3 py-2 text-center text-text-secondary">2026-09-28</td>
                        <td className="px-3 py-2 text-center text-text-secondary">2029-03-16</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 text-text-primary">회사 입사일 (2020-01-01)</td>
                        <td className="px-3 py-2 text-center text-text-secondary">2020-04-10</td>
                        <td className="px-3 py-2 text-center text-text-secondary">2022-09-27</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-text-primary">생일 (1990-05-15)</td>
                        <td className="px-3 py-2 text-center text-text-secondary">1990-08-23</td>
                        <td className="px-3 py-2 text-center text-text-secondary">1993-02-09</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 윤년과 요일 처리 */}
              <section aria-label="윤년 및 요일 처리" className="card">
                <h2 className="mb-4 text-2xl font-semibold">윤년·요일 자동 처리</h2>
                <p className="mb-4 text-text-secondary">
                  본 계산기는 모든 날짜 계산에서 윤년을 완벽하게 처리합니다. 2월 29일 같은 특수한 날짜도 정확하게 계산되며, 각 날짜의 요일(월·화·수·목·금·토·일)도 자동으로 표시됩니다.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm">
                  <p className="mb-3 font-medium text-text-primary">윤년 처리 예시:</p>
                  <ul className="space-y-2 text-text-secondary">
                    <li>
                      • <strong>2024-02-28</strong> (수) ~ <strong>2024-02-29</strong> (목): 2일 (윤년이므로 2월이 29일까지)
                    </li>
                    <li>
                      • <strong>2025-02-28</strong> (금) ~ <strong>2025-03-01</strong> (토): 2일 (2025년은 평년)
                    </li>
                    <li>
                      • <strong>2024-01-01</strong> (월) + 366일 = <strong>2025-01-01</strong> (수) ✓
                    </li>
                  </ul>
                </div>
              </section>

              {/* 주의사항 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">D-day 계산 시 주의사항</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong>유효하지 않은 날짜 입력</strong>: "2월 30일" 같은 존재하지 않는 날짜를 입력하면 오류 알림이 나타납니다. 다시 올바른 날짜를 입력해주세요.
                  </li>
                  <li>
                    <strong>공휴일 제외 안 함</strong>: 본 계산기는 순수 일수만 계산하며, 공휴일이나 휴일은 반영하지 않습니다. 실제 업무일 수나 수업일 수를 계산할 때는 공휴일을 별도로 차감해주세요.
                  </li>
                  <li>
                    <strong>시간 단위 미포함</strong>: 계산기는 날짜 단위만 처리하므로 시간, 분, 초는 고려하지 않습니다.
                  </li>
                  <li>
                    <strong>매우 먼 과거/미래</strong>: 1900년 이전이나 2100년 이후 같은 극단적인 날짜 계산은 의도하지 않았으므로, 일반적인 생활 범위 내(1950~2100년)의 날짜만 입력해주세요.
                  </li>
                  <li>
                    <strong>기념일 정확성</strong>: 100일, 1000일 같은 기념일 계산 시 정확한 기준일(출생일, 결혼일 등)을 입력해야 합니다.
                  </li>
                  <li>
                    <strong>참고용</strong>: 본 계산기의 결과는 일반 정보 제공 목적이며, 법적·공식적 기한 계산(계약만료, 세무신고 기한 등)에는 반드시 공식 기관의 안내를 확인해주세요.
                  </li>
                </ul>
              </section>

              {/* 관련 계산기 */}
              <RelatedCalculators items={[...RELATED]} />

              {/* 업데이트 로그 */}
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-04-24: D-day 계산기 초판 공개 (3 모드 완벽 지원)</li>
                </ul>
              </section>

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>계산 기준</strong>: UTC(협정세계시) 자정 기준 일수 계산, 윤년 완벽 처리. 참고: <a href="https://www.kasi.re.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">한국천문연구원</a> 표준시, <a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국가법령정보센터</a>
                </p>
                <p>
                  본 계산기의 결과는 참고용이며 법적 효력이 없습니다. 법적 기한(계약, 신고, 소송 등)과 관련된 날짜 계산에는 반드시 공식 기관(법원, 국세청, 행정기관)의 안내를 확인하시기 바랍니다.
                </p>
              </section>

            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
