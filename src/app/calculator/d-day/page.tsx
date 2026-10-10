import { CalculatorPageContent } from '@/components/calculator/CalculatorPageContent';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildSpeakableJsonLd,
  buildWebPageJsonLd,
  getCategoryUrlForCalculator,
  buildHowToJsonLd,
} from '@/lib/seo/jsonld';
import { DdayCalculator } from './DdayCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/d-day/';
const DATE_MODIFIED = '2026-10-10';

export const metadata: Metadata = {
  title: '디데이 계산기 | D-day 날짜 계산·100일 계산',
  description:
    '두 날짜 사이의 일수와 D-day를 계산합니다. 100일·1000일 기념일과 몇 주·몇 개월인지도 바로 확인하세요.',
  keywords: [
    'D-day 계산기',
    '디데이 계산기',
    '날짜 계산기',
    '날짜 차이 계산',
    '100일 계산기',
    '기념일 계산기',
    '백일 계산',
    '수능 디데이',
  ],
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
    question: '디데이(D-day)는 어떻게 계산하나요?',
    answer:
      '목표일에서 기준일(보통 오늘)을 빼면 됩니다. 목표일이 아직 안 왔으면 "D-10"처럼 남은 날을, 지났으면 "D+5"처럼 지난 날을 붙이고, 같은 날이면 "D-DAY"입니다. 예를 들어 2026-10-10 기준으로 2026-11-19까지는 40일이 남아 D-40입니다.',
  },
  {
    question: '100일·1000일 기념일은 어떻게 계산하나요?',
    answer:
      '기념일은 시작한 날을 1일째로 셉니다. "기념일" 모드에 시작일을 넣으면 100일째·1000일째 날짜가 바로 나옵니다. 2026-01-01이 1일째면 100일째는 2026-04-10(금)입니다. "N일 후" 모드로 100일을 더하면 2026-04-11(토)로 하루 늦게 나오니 기념일에는 기념일 모드를 쓰세요.',
  },
  {
    question: '아기 백일은 태어난 날을 포함해서 세나요?',
    answer:
      '네, 태어난 날을 1일째로 셉니다. 2026-01-15에 태어났다면 백일은 99일 뒤인 2026-04-24(금)입니다. 표준국어대사전도 백일을 아이가 태어난 날로부터 백 번째 되는 날로 풀이합니다.',
  },
  {
    question: '2027 수능 D-day는 어느 날짜 기준인가요?',
    answer:
      '2027학년도 수능 시험일은 2026년 11월 19일(목)입니다. D-day 모드에서 "2027 수능" 빠른 선택을 누르면 기준일부터 남은 날이 나옵니다. 2026-10-10 기준으로는 D-40입니다.',
  },
  {
    question: '두 날짜 사이의 기간을 계산할 때 차이는 무엇인가요?',
    answer:
      '"기간 계산" 모드에서 "양 끝 포함"을 고르면 시작일과 종료일을 모두 셉니다. 1월 1일부터 1월 3일까지는 양 끝 포함이면 3일, "제외"면 가운데 1일만 남아 1일입니다. 휴가 일수처럼 첫날과 마지막 날을 모두 쓰는 기간은 양 끝 포함이 맞습니다.',
  },
  {
    question: '윤년 2월 29일도 정확하게 처리되나요?',
    answer:
      '네, 윤년을 반영합니다. 2024년처럼 2월이 29일까지 있는 해도 날짜 차이와 요일이 정확히 나옵니다. 예를 들어 2024-01-01(월)에 366일을 더하면 2025-01-01(수)입니다.',
  },
  {
    question: '오늘 날짜는 무엇을 기준으로 하나요?',
    answer:
      '사용 중인 휴대폰이나 PC의 날짜를 씁니다. 한국에서 쓰면 한국 날짜가 기준일로 들어갑니다. 계산은 날짜 단위로만 하므로 지금이 몇 시인지는 결과에 영향을 주지 않습니다.',
  },
  {
    question: '기간을 년·월·주로 환산할 때 기준은?',
    answer:
      '1주 = 7일, 1개월 = 30.4167일(365.25 ÷ 12), 1년 = 365.25일(윤년 고려)로 나눕니다. 실제 달력의 한 달(28~31일)과는 다를 수 있으니 대략적인 길이를 볼 때 참고하세요.',
  },
] as const;

const RELATED = [
  { href: '/calculator/savings/', title: '적금이자 계산기', description: '만기까지 이자' },
  { href: '/calculator/severance/', title: '퇴직금 계산기', description: '재직일수로 퇴직금' },
  { href: '/calculator/area/', title: '평수 계산기', description: '평↔제곱미터' },
  { href: '/calculator/bmi/', title: 'BMI 계산기', description: '비만도 측정' },
] as const;

const tdClass = 'px-3 py-2 text-center text-text-secondary';
const thClass = 'px-3 py-2 font-semibold text-text-secondary';

export default function DdayPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '디데이 계산기 (D-day)',
    description:
      '목표일까지 남은 날(D-day), 두 날짜 사이 일수, N일 후 날짜, 100일·1000일 기념일(시작일 = 1일째)을 계산하는 무료 도구',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '디데이 계산기',
    description: '오늘부터 며칠 남았는지, 두 날짜 사이 일수, 100일·1000일 기념일 날짜 계산',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: DATE_MODIFIED,
    isPartOf: getCategoryUrlForCalculator('d-day'),
  });
  const howToLd = buildHowToJsonLd({
    name: '디데이 계산기 사용 방법',
    description: '기준일과 목표일을 입력하여 남은 일수와 기념일 날짜를 계산하는 단계별 가이드',
    steps: [
      {
        name: '계산 모드 선택',
        text: 'D-day·기간 계산·N일 후·기념일 중 원하는 모드를 선택합니다.',
      },
      {
        name: '날짜 입력',
        text: '기준일과 목표일을 넣거나, 빠른 선택(수능·크리스마스·새해·설날)을 누릅니다.',
      },
      {
        name: '옵션 설정',
        text: '기간 계산은 양 끝 포함 여부를, 기념일은 며칠째인지를 정합니다.',
      },
      { name: '결과 확인', text: '남은 일수, 도달 날짜, 요일, 기념일 표를 확인합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })),
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '생활', url: 'https://calculatorhost.com/category/lifestyle/' },
    { name: '디데이 계산기' },
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
          <main
            id="main-content"
            className="calculator-page min-w-0 flex-1 px-4 py-5 md:px-8 md:py-8"
          >
            <CalculatorPageContent
              intro={
                <header>
                  <Breadcrumb
                    items={[
                      { name: '홈', href: '/' },
                      { name: '생활', href: '/category/lifestyle/' },
                      { name: '디데이 계산기' },
                    ]}
                  />
                  <h1 className="mb-3 text-4xl font-bold tracking-tight">디데이 계산기 (D-day)</h1>
                  <p className="text-lg text-text-secondary" data-speakable>
                    오늘부터 목표일까지 며칠 남았는지, 두 날짜 사이가 며칠인지, 100일·1000일
                    기념일이 언제인지 한 번에 계산합니다.
                  </p>
                  <AuthorByline datePublished="2026-04-24" dateModified={DATE_MODIFIED} />
                </header>
              }
              calculator={<DdayCalculator />}
              related={
                <>
                  <RelatedCalculators items={[...RELATED]} />
                </>
              }
              faq={
                <>
                  <FaqSection items={[...FAQ_ITEMS]} />
                </>
              }
            >
              <StructuredSummary
                definition="디데이(D-day)는 목표 날짜까지 남은 날수를 세는 표현입니다. 목표일 전이면 D-남은 날, 지나면 D+지난 날로 쓰고, 기념일은 시작일을 1일째로 셉니다."
                table={{
                  caption: '4가지 계산 모드',
                  headers: ['계산 방식', '사용 사례'],
                  rows: [
                    ['D-day (기준일에서 목표일까지)', '수능, 결혼식, 시험, 전역일까지 남은 날'],
                    ['기간 계산 (시작일에서 종료일까지)', '휴가 일수, 프로젝트 기간, 계약 기간'],
                    ['N일 후 (기준일 + 일수)', '30일 뒤 마감일, 90일 전 날짜'],
                    ['기념일 (시작일 = 1일째)', '아기 백일, 사귄 지 100일·1000일'],
                  ],
                }}
                tldr={[
                  'D-day는 목표일 - 기준일. 남았으면 D-, 지났으면 D+',
                  '기준일 기본값은 오늘이며 자유롭게 바꿀 수 있음',
                  '100일·백일 같은 기념일은 시작일을 1일째로 세므로 시작일 + 99일',
                  '그냥 100일을 더하면 기념일보다 하루 늦게 나옴',
                  '윤년과 요일을 자동으로 반영',
                ]}
              />
              <section aria-label="디데이 개념" className="card">
                <h2 className="mb-4 text-2xl font-semibold">디데이(D-day)란?</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  디데이는 목표로 정한 날까지 남은 날수를 세는 말입니다. 원래는 군사 작전의 개시일을
                  가리키던 말이지만, 지금은 시험·결혼식·전역·출산 예정일처럼 중요한 날까지 얼마나
                  남았는지 말할 때 씁니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  &quot;생일까지 D-10&quot;은 생일이 10일 남았다는 뜻이고, &quot;시험 끝나고
                  D+30&quot;은 시험이 끝난 뒤 30일이 지났다는 뜻입니다. 목표일 당일은
                  &quot;D-DAY&quot;라고 합니다.
                </p>
                <p className="text-text-secondary">
                  날짜를 손으로 세면 달마다 날수가 달라(28~31일) 틀리기 쉽습니다. 이 계산기는 달력
                  날수와 윤년을 그대로 반영해 남은 날, 지난 날, 도달 날짜와 요일을 바로 보여 줍니다.
                </p>
              </section>
              <section aria-label="계산 모드 설명" className="card">
                <h2 className="mb-4 text-2xl font-semibold">4가지 계산 모드, 언제 무엇을 쓰나요?</h2>

                <div className="mb-6 space-y-6">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-primary-500">
                      1. D-day 모드 (기준일에서 목표일까지)
                    </h3>
                    <p className="mb-3 text-sm text-text-secondary">
                      기준일(기본값: 오늘)에서 목표일까지 며칠 남았는지 또는 며칠 지났는지 셉니다.
                      목표일 요일도 함께 나오고, 지난 날을 넣으면 그날을 1일째로 센 날수도
                      보여 줍니다. 수능·크리스마스·새해·설날은 빠른 선택 버튼으로 바로 넣을 수
                      있습니다.
                    </p>
                    <div className="rounded-lg bg-bg-card p-4 text-sm">
                      <p className="mb-2 font-medium text-text-primary">사용 예시 (기준일 2026-10-10):</p>
                      <ul className="space-y-1 text-text-secondary">
                        <li>• 2027 수능 2026-11-19(목)까지: D-40</li>
                        <li>• 크리스마스 2026-12-25(금)까지: D-76</li>
                        <li>• 2027 설날 2027-02-07(일)까지: D-120</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-primary-500">
                      2. 기간 계산 모드 (시작일에서 종료일까지)
                    </h3>
                    <p className="mb-3 text-sm text-text-secondary">
                      두 날짜 사이의 기간을 셉니다. &quot;양 끝 포함&quot;, &quot;시작일만&quot;,
                      &quot;종료일만&quot;, &quot;제외&quot; 네 가지 중 고를 수 있습니다.
                    </p>
                    <div className="rounded-lg bg-bg-card p-4 text-sm">
                      <p className="mb-2 font-medium text-text-primary">사용 예시 (양 끝 포함):</p>
                      <ul className="space-y-1 text-text-secondary">
                        <li>• 2026-06-01 ~ 2026-06-30 여름 방학: 30일</li>
                        <li>• 2026-07-01 ~ 2026-07-15 휴가: 15일</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-primary-500">
                      3. N일 후 모드 (기준일 + 일수)
                    </h3>
                    <p className="mb-3 text-sm text-text-secondary">
                      기준일에 일수를 그대로 더하거나 뺍니다. &quot;오늘부터 30일 뒤&quot; 같은
                      마감일 계산에 맞습니다. 음수를 넣으면 과거 날짜가 나옵니다.
                    </p>
                    <div className="rounded-lg bg-bg-card p-4 text-sm">
                      <p className="mb-2 font-medium text-text-primary">사용 예시:</p>
                      <ul className="space-y-1 text-text-secondary">
                        <li>• 2026-01-15 + 100일: 2026-04-25(토)</li>
                        <li>• 2026-05-20 + 1000일: 2029-02-13(화)</li>
                        <li>• 2026-04-24 - 30일: 2026-03-25(수)</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-primary-500">
                      4. 기념일 모드 (시작일 = 1일째)
                    </h3>
                    <p className="mb-3 text-sm text-text-secondary">
                      출생일·사귄 날·입사일을 1일째로 세어 100일째, 200일째, 1000일째가 언제인지
                      표로 보여 줍니다. 아기 백일, 연인 100일처럼 우리가 보통 말하는 기념일은 이
                      방식입니다.
                    </p>
                    <div className="rounded-lg bg-bg-card p-4 text-sm">
                      <p className="mb-2 font-medium text-text-primary">사용 예시:</p>
                      <ul className="space-y-1 text-text-secondary">
                        <li>• 아기 출생 2026-01-15: 백일 2026-04-24(금)</li>
                        <li>• 사귄 날 2026-03-01: 100일째 2026-06-08(월), 1000일째 2028-11-24(금)</li>
                        <li>• 입사일 2020-01-01: 1000일째 2022-09-26(월)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              <section aria-label="100일 계산 하루 차이" className="card">
                <h2 className="mb-4 text-2xl font-semibold">
                  100일 계산이 하루씩 다르게 나오는 이유는?
                </h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  시작일을 1일째로 세느냐, 시작일 다음 날부터 세느냐의 차이입니다. 기념일은 시작일을
                  1일째로 세므로 100일째는 시작일 + 99일이고, 그냥 100일을 더하면 하루 늦은 날이
                  나옵니다.
                </p>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <caption className="mb-2 text-left text-text-tertiary">
                      같은 시작일, 두 가지 세는 법 비교
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className={`${thClass} text-left`}>
                          시작일
                        </th>
                        <th scope="col" className={`${thClass} text-center`}>
                          기념일 방식 100일째 (+99일)
                        </th>
                        <th scope="col" className={`${thClass} text-center`}>
                          단순 더하기 (+100일)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 text-text-primary">2026-01-01(목)</td>
                        <td className={tdClass}>2026-04-10(금)</td>
                        <td className={tdClass}>2026-04-11(토)</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 text-text-primary">2026-01-15(목)</td>
                        <td className={tdClass}>2026-04-24(금)</td>
                        <td className={tdClass}>2026-04-25(토)</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-text-primary">2026-03-01(일)</td>
                        <td className={tdClass}>2026-06-08(월)</td>
                        <td className={tdClass}>2026-06-09(화)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mb-3 text-text-secondary">
                  아기 백일, 연인 100일, 금연 100일처럼 &quot;며칠째&quot;를 기념하는 날은 기념일
                  방식(왼쪽)이 맞습니다. 표준국어대사전도 백일을 태어난 날로부터 백 번째 되는 날로
                  풀이합니다. 반대로 &quot;오늘부터 100일 뒤에 만나자&quot;처럼 날을 더하는 약속은
                  단순 더하기(오른쪽)입니다.
                </p>
                <p className="text-sm text-text-secondary">
                  다만, 법에서 정한 기간은 또 다릅니다. 민법 §157은 기간을 일·주·월·년으로 정하면
                  첫날을 세지 않는다(오전 0시에 시작하는 경우는 예외)고 정하고, 민법 §161은 기간의
                  마지막 날이 토요일이나 공휴일이면 그다음 날 끝난다고 정합니다. 계약·신고·소송
                  기한은 이 계산기로 대신하지 말고 해당 기관 안내를 따르세요.
                </p>
              </section>
              <section aria-label="기념일 계산 예시" className="card">
                <h2 className="mb-4 text-2xl font-semibold">기념일별 100일·1000일 날짜</h2>
                <p className="mb-4 text-sm text-text-secondary">
                  아래 표는 모두 시작일을 1일째로 센 기념일 방식입니다. 기념일 모드에 시작일을 넣으면
                  200일·300일·500일·2000일·3000일째도 함께 나옵니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <caption className="mb-2 text-left text-text-tertiary">
                      시작일 = 1일째 기준 기념일 예시
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className={`${thClass} text-left`}>
                          기념일
                        </th>
                        <th scope="col" className={`${thClass} text-center`}>
                          100일째
                        </th>
                        <th scope="col" className={`${thClass} text-center`}>
                          1000일째
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 text-text-primary">아기 출생일 (2026-01-15)</td>
                        <td className={tdClass}>2026-04-24(금)</td>
                        <td className={tdClass}>2028-10-10(화)</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 text-text-primary">사귄 날 (2026-03-01)</td>
                        <td className={tdClass}>2026-06-08(월)</td>
                        <td className={tdClass}>2028-11-24(금)</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 text-text-primary">결혼식 (2026-06-20)</td>
                        <td className={tdClass}>2026-09-27(일)</td>
                        <td className={tdClass}>2029-03-15(목)</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-text-primary">회사 입사일 (2020-01-01)</td>
                        <td className={tdClass}>2020-04-09(목)</td>
                        <td className={tdClass}>2022-09-26(월)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              <section aria-label="다가오는 주요 날짜" className="card">
                <h2 className="mb-4 text-2xl font-semibold">2026~2027 주요 날짜는 언제인가요?</h2>
                <p className="mb-4 text-sm text-text-secondary">
                  디데이를 많이 세는 날짜입니다. D-day 모드의 빠른 선택 버튼을 누르면 기준일부터 남은
                  날이 바로 나옵니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <caption className="mb-2 text-left text-text-tertiary">
                      2026년 10월 확인 기준 주요 일정
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className={`${thClass} text-left`}>
                          일정
                        </th>
                        <th scope="col" className={`${thClass} text-center`}>
                          날짜
                        </th>
                        <th scope="col" className={`${thClass} text-left`}>
                          참고
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 text-text-primary">2027학년도 수능</td>
                        <td className={tdClass}>2026-11-19(목)</td>
                        <td className="px-3 py-2 text-text-secondary">
                          성적 통지 2026-12-11(금)
                        </td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 text-text-primary">크리스마스</td>
                        <td className={tdClass}>2026-12-25(금)</td>
                        <td className="px-3 py-2 text-text-secondary">공휴일</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 text-text-primary">2027년 새해</td>
                        <td className={tdClass}>2027-01-01(금)</td>
                        <td className="px-3 py-2 text-text-secondary">공휴일</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-text-primary">2027 설날</td>
                        <td className={tdClass}>2027-02-07(일)</td>
                        <td className="px-3 py-2 text-text-secondary">
                          연휴 2/6~2/9, 대체공휴일 2/9(화)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              <section aria-label="윤년 및 요일 처리" className="card">
                <h2 className="mb-4 text-2xl font-semibold">윤년·요일 자동 처리</h2>
                <p className="mb-4 text-text-secondary">
                  모든 계산에 윤년을 반영합니다. 2월 29일 같은 날짜도 그대로 계산되고, 결과 날짜의
                  요일(월·화·수·목·금·토·일)도 함께 나옵니다.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm">
                  <p className="mb-3 font-medium text-text-primary">윤년 처리 예시:</p>
                  <ul className="space-y-2 text-text-secondary">
                    <li>
                      • <strong>2024-02-28</strong> (수) ~ <strong>2024-02-29</strong> (목): 2일
                      (윤년이므로 2월이 29일까지)
                    </li>
                    <li>
                      • <strong>2025-02-28</strong> (금) ~ <strong>2025-03-01</strong> (토): 2일
                      (2025년은 평년)
                    </li>
                    <li>
                      • <strong>2024-01-01</strong> (월) + 366일 = <strong>2025-01-01</strong> (수)
                    </li>
                  </ul>
                </div>
              </section>
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">디데이 계산 시 주의사항</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong>기념일과 날 더하기 구분</strong>: 백일·100일 기념일은 기념일 모드, 30일
                    뒤 마감일은 N일 후 모드를 쓰세요. 섞어 쓰면 하루 차이가 납니다.
                  </li>
                  <li>
                    <strong>공휴일 제외 안 함</strong>: 순수 날수만 셉니다. 근무일·수업일 수가
                    필요하면 공휴일을 따로 빼 주세요.
                  </li>
                  <li>
                    <strong>시간 단위 미포함</strong>: 날짜 단위로만 계산하므로 시·분·초는 따지지
                    않습니다.
                  </li>
                  <li>
                    <strong>생활 범위 날짜</strong>: 1950~2100년 사이 날짜에 맞춰 만들었습니다.
                  </li>
                  <li>
                    <strong>법적 기한은 별도</strong>: 계약 만료·세무 신고·소송 기한은 민법 §157(첫날
                    불산입)·§161(마지막 날이 휴일이면 다음 날)처럼 따로 정한 규칙이 있습니다. 해당
                    기관 안내를 확인하세요.
                  </li>
                </ul>
              </section>
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>
                    2026-10-10: 기념일 모드(시작일 = 1일째) 추가, 목표일 빠른 선택(수능·크리스마스·
                    새해·설날)과 목표일 요일 표시 추가, 예시의 날짜·요일 오류 정정
                  </li>
                  <li>2026-04-24: D-day 계산기 초판 공개</li>
                </ul>
              </section>
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>계산 기준</strong>: 날짜 단위 계산, 윤년 반영. 기념일은 시작일을
                  1일째로 셈. 참고:{' '}
                  <a
                    href="https://stdict.korean.go.kr/search/searchResult.do?searchKeyword=%EB%B0%B1%EC%9D%BC"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국립국어원 표준국어대사전 &apos;백일&apos;
                  </a>
                  ,{' '}
                  <a
                    href="https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EB%AF%BC%EB%B2%95"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국가법령정보센터 민법(§157·§161)
                  </a>
                  ,{' '}
                  <a
                    href="https://www.kice.re.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    한국교육과정평가원
                  </a>
                  ,{' '}
                  <a
                    href="https://astro.kasi.re.kr/kor/life/post/calendarData?year=2027"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    한국천문연구원 천문우주지식정보 2027년 월력요항
                  </a>
                </p>
                <p>
                  본 계산기의 결과는 참고용이며 법적 효력이 없습니다. 법적 기한(계약, 신고, 소송
                  등)과 관련된 날짜 계산에는 반드시 공식 기관(법원, 국세청, 행정기관)의 안내를
                  확인하시기 바랍니다.
                </p>
              </section>
            </CalculatorPageContent>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
