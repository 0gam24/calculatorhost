import type { Metadata } from 'next';
import { CalculatorPageContent } from '@/components/calculator/CalculatorPageContent';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import { AuthorByline } from '@/components/calculator/AuthorByline';
import {
  buildSoftwareApplicationJsonLd,
  buildWebPageJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
  buildHowToJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';
import { WeeklyHolidayAllowanceCalculator } from './WeeklyHolidayAllowanceCalculator';
import {
  MINIMUM_HOURLY_WAGE_2026,
  MINIMUM_HOURLY_WAGE_2027,
  STANDARD_WEEKLY_HOURS,
  WEEKLY_HOLIDAY_MIN_WEEKLY_HOURS,
} from '@/lib/constants/labor-rules-2026';
import { calculateWeeklyHolidayAllowance } from '@/lib/work/weekly-holiday-allowance';

const URL = 'https://calculatorhost.com/calculator/weekly-holiday-allowance/';
const DATE_PUBLISHED = '2026-10-07';
const DATE_MODIFIED = '2026-10-07';
const TITLE = '주휴수당 계산기 2026 | 주 15시간 조건·시급별';
const DESCRIPTION =
  '시급과 주 근무시간으로 주휴수당·월 환산액·실질 시급을 계산합니다. 주 15시간 미만이거나 결근한 주는 생기지 않습니다.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    '주휴수당 계산기',
    '주휴수당 계산법',
    '주휴수당 조건',
    '알바 주휴수당',
    '주 15시간 주휴수당',
    '최저시급 주휴수당',
    '근로기준법 55조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '주휴수당 계산기 2026, 주 15시간 조건·시급별 자동 계산',
    description: DESCRIPTION,
    url: URL,
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '주휴수당 계산기 2026',
    description: '시급·주 소정근로시간으로 주휴수당을 바로 계산',
  },
};

const FAQ_ITEMS = [
  {
    question: '주 14시간이면 주휴수당을 받을 수 있나요?',
    answer:
      '못 받습니다. 근로기준법 §18③에 따라 4주 평균 주 소정근로시간이 15시간 미만인 초단시간 근로자는 §55 주휴일 규정에서 제외되기 때문입니다. 몇 주만 15시간을 넘고 그 외 주가 14시간이면 4주 평균이 15시간을 넘는지 다시 확인해야 합니다.',
  },
  {
    question: '하루 결근하면 그 주 주휴수당은 어떻게 되나요?',
    answer:
      '그 주 주휴수당은 생기지 않습니다. 근로기준법 시행령 §30①이 "1주 소정근로일을 개근한 자"에게만 유급휴일을 주도록 정했기 때문입니다. 연차·공가 등 유급 처리된 결근은 개근으로 보지만, 결근 사유의 적법성 판단은 사업장 규정과 노동청 해석을 따릅니다.',
  },
  {
    question: '월급제는 주휴수당을 따로 받나요?',
    answer:
      '보통은 월급에 포함되어 있어 따로 받지 않습니다. 통상임금을 월 소정근로시간으로 환산할 때 주 40시간 사업장은 월 209시간을 쓰는데, 이 209시간이 소정근로 174시간에 주휴 35시간을 더한 값입니다. 월급제라면 근로계약서에 주휴수당 포함 여부가 적혀 있는지 확인하세요.',
  },
  {
    question: '주 40시간 넘게 일하면 주휴수당도 늘어나나요?',
    answer:
      '아니요. 근로기준법 §50①의 법정 주 40시간을 넘는 시간은 연장근로이고, 주휴 계산의 소정근로시간은 최대 주 40시간까지만 반영합니다. 그래서 주 50시간을 일해도 주휴수당은 주 40시간 기준인 8시간분이 상한입니다. 연장분은 §56의 연장근로 가산수당으로 따로 받습니다.',
  },
  {
    question: '5인 미만 사업장도 주휴수당을 줘야 하나요?',
    answer:
      '네, 줘야 합니다. 상시 4명 이하 사업장에도 근로기준법 §55①(주휴일)이 적용되기 때문입니다(시행령 §7·별표1). 공휴일 유급휴일(§55②)·연차(§60)·연장근로 가산수당(§56)은 4명 이하 사업장에 적용되지 않지만, 주휴수당은 주 15시간·개근 요건만 채우면 규모와 관계없이 생깁니다.',
  },
  {
    question: '지각이나 조퇴를 하면 주휴수당이 없어지나요?',
    answer:
      '없어지지 않습니다. 고용노동부는 지각·조퇴·외출을 결근으로 보지 않아, 지각·조퇴 시간을 합쳐 8시간이 되더라도 하루 결근으로 처리할 수 없다고 해석합니다(근로기준과-5560, 2009.12.23). 주휴수당도 실제 일한 시간이 아니라 소정근로시간 기준으로 계산합니다.',
  },
  {
    question: '그만두는 주에도 주휴수당을 받나요?',
    answer:
      '그 주 7일 동안 근로관계가 이어지고 소정근로일을 모두 나왔다면 받습니다. 고용노동부는 2021년 해석을 바꿔, 다음 주 근무가 예정되어 있지 않아도 1주 개근이면 주휴수당이 생긴다고 봅니다(임금근로시간과-1736, 2021.8.4). 주 중간에 그만두면 그 주 주휴수당은 없습니다.',
  },
] as const;

const RELATED = [
  {
    href: '/guide/weekly-holiday-allowance-2026/',
    title: '주휴수당 계산법 완전 정리',
    description: '요건·결근 규칙·월급제 포함 여부',
  },
  {
    href: '/calculator/salary/',
    title: '연봉 실수령액 계산기',
    description: '4대보험·세금 공제 월 실수령',
  },
  {
    href: '/guide/overtime-night-holiday-allowance-2026/',
    title: '연장·야간·휴일수당 계산',
    description: '§56 가산 50%·중첩 처리',
  },
];

// 표에 들어가는 수치는 함수를 직접 호출해 산출하므로 수기 하드코딩이 없다.
const HOURS_TABLE_ROWS = [15, 20, 25, 30, 35, 40] as const;
const ONE_HUNDRED_TWENTY_PERCENT_2026 = calculateWeeklyHolidayAllowance({
  hourlyWage: MINIMUM_HOURLY_WAGE_2026,
  weeklyHours: STANDARD_WEEKLY_HOURS,
  fullAttendance: true,
}).effectiveHourlyWage;
const ONE_HUNDRED_TWENTY_PERCENT_2027 = calculateWeeklyHolidayAllowance({
  hourlyWage: MINIMUM_HOURLY_WAGE_2027,
  weeklyHours: STANDARD_WEEKLY_HOURS,
  fullAttendance: true,
}).effectiveHourlyWage;
const EXAMPLE_22H_2026 = calculateWeeklyHolidayAllowance({
  hourlyWage: MINIMUM_HOURLY_WAGE_2026,
  weeklyHours: 22,
  fullAttendance: true,
});
const FULL_WEEK_2026 = calculateWeeklyHolidayAllowance({
  hourlyWage: MINIMUM_HOURLY_WAGE_2026,
  weeklyHours: STANDARD_WEEKLY_HOURS,
  fullAttendance: true,
}).weeklyPay;

const formatWon = (value: number) => `${Math.round(value).toLocaleString('ko-KR')}원`;
const formatHours = (value: number) =>
  `${value.toLocaleString('ko-KR', { maximumFractionDigits: 2 })}시간`;

export default function WeeklyHolidayAllowancePage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '주휴수당 계산기 2026',
    description: DESCRIPTION,
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: TITLE,
    description: DESCRIPTION,
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    isPartOf: 'https://calculatorhost.com/category/work/',
  });
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '근로', url: 'https://calculatorhost.com/category/work/' },
    { name: '주휴수당 계산기' },
  ]);
  const howtoLd = buildHowToJsonLd({
    name: '주휴수당 계산하기',
    description: '시급과 1주 소정근로시간으로 주휴수당·월 환산액·실질 시급을 구하는 방법',
    steps: [
      { name: '시급 입력', text: '통상시급을 원 단위로 입력합니다. 2026·2027 최저시급 버튼으로 바로 채울 수 있습니다.' },
      { name: '1주 소정근로시간 입력', text: '4주 평균 1주 소정근로시간을 입력합니다. 하루 근무시간과 주 근무일수로 채울 수도 있습니다. 연장근로는 넣지 않습니다.' },
      { name: '개근 여부 확인', text: '그 주 소정근로일을 모두 출근했는지 체크합니다. 결근이 있으면 그 주 주휴수당은 생기지 않습니다.' },
      { name: '결과 확인', text: '1주 주휴수당, 주휴시간, 월 환산액, 주휴 포함 실질 시급을 확인합니다. 참고용 계산이며 계약 조건에 따라 달라질 수 있습니다.' },
    ],
  });
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((item) => ({ question: item.question, answer: item.answer })),
  );

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoLd) }}
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
                      { name: '근로', href: '/category/work/' },
                      { name: '주휴수당 계산기' },
                    ]}
                  />
                  <h1 className="mb-3 text-4xl font-bold tracking-tight">
                    주휴수당 계산기 2026
                  </h1>
                  <p className="text-lg text-text-secondary" data-speakable>
                    알바·단시간 근로자와 사업주를 위한 참고 계산기입니다. 시급과 1주 소정근로시간만 넣으면 주 15시간 개근 조건에서 받을 주휴수당, 주휴시간, 월 환산액을 바로 확인할 수 있어요.
                  </p>
                  <AuthorByline datePublished={DATE_PUBLISHED} dateModified={DATE_MODIFIED} />
                </header>
              }
              calculator={<WeeklyHolidayAllowanceCalculator />}
              related={<RelatedCalculators items={RELATED} />}
              faq={<FaqSection items={FAQ_ITEMS} />}
              tools={
                <ShareButtons
                  title="주휴수당 계산기 2026"
                  url={URL}
                  description="시급·주 소정근로시간으로 주휴수당을 바로 계산"
                />
              }
            >
              <StructuredSummary
                definition={`주휴수당은 1주 소정근로시간이 ${WEEKLY_HOLIDAY_MIN_WEEKLY_HOURS}시간 이상이고 그 주를 개근한 근로자에게 사용자가 지급하는 1일 유급휴일 임금입니다. 근로기준법 §55①이 정하고, 시행령 §30①이 "소정근로일 개근" 요건을 명시합니다.`}
                table={{
                  caption: '2026년 주휴수당 핵심 수치',
                  headers: ['항목', '내용'],
                  rows: [
                    ['지급 조건', `주 ${WEEKLY_HOLIDAY_MIN_WEEKLY_HOURS}시간 이상 + 그 주 개근`],
                    [
                      '주휴시간 계산',
                      `1주 소정근로시간 ÷ ${STANDARD_WEEKLY_HOURS} × 8 (최대 8시간)`,
                    ],
                    [
                      '2026 최저시급 주 40시간',
                      `${MINIMUM_HOURLY_WAGE_2026.toLocaleString('ko-KR')}원 × 8 = ${formatWon(FULL_WEEK_2026)}`,
                    ],
                    ['소정근로 상한', `주 ${STANDARD_WEEKLY_HOURS}시간 (연장근로 제외)`],
                    ['월 환산 기준', '365 ÷ 7 ÷ 12 ≈ 4.345주'],
                  ],
                }}
                tldr={[
                  `주 ${WEEKLY_HOLIDAY_MIN_WEEKLY_HOURS}시간 이상 근무 + 그 주 개근이면 주휴수당 발생`,
                  `공식: 주 소정근로시간 ÷ ${STANDARD_WEEKLY_HOURS} × 8 × 시급 (주휴시간 최대 8시간)`,
                  `2026 최저시급 10,320원·주 40시간 기준 주휴수당은 ${formatWon(FULL_WEEK_2026)}`,
                  '한 번이라도 결근한 주는 주휴수당 없음 (시행령 §30①)',
                  '주 40시간을 넘는 시간은 연장근로라 주휴 계산에 넣지 않음 (§50①)',
                ]}
              />

              <section aria-label="주휴수당 조건" className="card">
                <h2 className="mb-3 text-2xl font-semibold">
                  주휴수당 조건은? 주 15시간 이상, 그 주 개근
                </h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  주 15시간 이상 일하고 그 주를 개근하면 주휴수당이 생깁니다. 근로기준법 §55①이 사용자에게 1주 평균 1회 이상 유급휴일을 주라고 정하고, 시행령 §30①이 "1주 소정근로일을 개근한 자"로 수급 요건을 좁힙니다. 또 §18③은 4주 평균 주 소정근로시간이 15시간 미만인 초단시간 근로자를 §55 적용 대상에서 뺍니다.
                </p>
                <p className="mb-3 text-text-secondary">
                  4주 평균이라는 표현이 중요합니다. 한 주만 15시간 넘고 다른 주에는 14시간만 일했다면 4주 전체를 다시 평균 내서 15시간 이상인지 확인해야 합니다. 다만 특정 주에 결근한 경우에는 그 주의 주휴수당만 사라지고, 4주 평균 15시간 이상을 유지하면 다른 주의 수급 자격은 그대로 유지됩니다.
                </p>
                <p className="text-text-secondary">
                  주의: 결근 사유가 연차·공가·업무상 재해처럼 유급 처리된 사유라면 개근으로 봅니다. 반대로 지각·조퇴·조퇴가 모여 결과적으로 소정근로일에 출근하지 못한 상태가 되면 결근으로 평가될 수 있어 사업장 취업규칙 확인이 필요합니다.
                </p>
              </section>

              <section aria-label="계산법" className="card">
                <h2 className="mb-3 text-2xl font-semibold">
                  주휴수당 계산법은? 주 소정근로시간 ÷ 40 × 8 × 시급
                </h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  주휴수당은 주 소정근로시간을 40으로 나눠 8시간을 곱한 뒤 시급을 곱해 구합니다. 통상근로자가 주 5일·주 40시간 일하는 사업장을 기준으로 보면, 1일 소정근로시간이 8시간이고 주휴일 1일에 해당하는 유급 시간이 8시간이기 때문입니다. 근거는 근로기준법 시행령 §9① 별표2의 단시간근로자 1일 소정근로시간 산정 방식입니다.
                </p>
                <p className="mb-3 text-text-secondary">
                  그래서 단시간 근로자는 주 소정근로시간이 적을수록 주휴시간도 비례해서 줄어듭니다. 다만 주휴시간은 아무리 많이 일해도 1일 8시간을 넘지 않아요. 주 40시간을 넘는 연장근로는 소정근로시간이 아니라 §56의 가산수당 영역이기 때문입니다.
                </p>
                <p className="mb-3 text-text-secondary">
                  예시: 시급 {MINIMUM_HOURLY_WAGE_2026.toLocaleString('ko-KR')}원인 알바가 주 22시간을 개근으로 일했다면 주휴시간은 22 ÷ 40 × 8 = {formatHours(EXAMPLE_22H_2026.paidHours)}이고, 주휴수당은 {formatHours(EXAMPLE_22H_2026.paidHours)} × {MINIMUM_HOURLY_WAGE_2026.toLocaleString('ko-KR')}원 = {formatWon(EXAMPLE_22H_2026.weeklyPay)}입니다. 같은 주의 소정근로 임금 {formatWon(EXAMPLE_22H_2026.weeklyWorkPay)}과 더하면 그 주 총 임금은 {formatWon(EXAMPLE_22H_2026.weeklyWorkPay + EXAMPLE_22H_2026.weeklyPay)}이 됩니다.
                </p>
                <p className="text-text-secondary">
                  다만 이 공식은 사업장이 통상근로자 기준으로 주 5일·주 40시간일 때 들어맞습니다. 통상근로자 소정근로시간이 다르면 시행령 §9① 별표2 공식(4주 소정근로시간 ÷ 통상근로자 총 소정근로일수)으로 다시 계산해야 합니다.
                </p>
              </section>

              <section aria-label="시간별 표" className="card">
                <h2 className="mb-3 text-2xl font-semibold">
                  주 근무시간별 주휴수당은 얼마?
                </h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  2026·2027 최저시급을 기준으로 주 15시간부터 40시간까지 주휴수당이 얼마인지 함수가 그대로 계산한 값입니다. 사업장 시급이 다르면 위 계산기에 넣어 보세요.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 text-left text-text-tertiary">
                      주 소정근로시간별 1주 주휴수당 (개근 가정)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base bg-bg-raised text-left">
                        <th scope="col" className="px-3 py-2 font-semibold">
                          주 소정근로시간
                        </th>
                        <th scope="col" className="px-3 py-2 font-semibold">
                          주휴시간
                        </th>
                        <th scope="col" className="px-3 py-2 font-semibold">
                          2026 최저시급 {MINIMUM_HOURLY_WAGE_2026.toLocaleString('ko-KR')}원
                        </th>
                        <th scope="col" className="px-3 py-2 font-semibold">
                          2027 최저시급 {MINIMUM_HOURLY_WAGE_2027.toLocaleString('ko-KR')}원
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {HOURS_TABLE_ROWS.map((hours) => {
                        const base2026 = calculateWeeklyHolidayAllowance({
                          hourlyWage: MINIMUM_HOURLY_WAGE_2026,
                          weeklyHours: hours,
                          fullAttendance: true,
                        });
                        const base2027 = calculateWeeklyHolidayAllowance({
                          hourlyWage: MINIMUM_HOURLY_WAGE_2027,
                          weeklyHours: hours,
                          fullAttendance: true,
                        });
                        return (
                          <tr key={hours} className="border-b border-border-base">
                            <td className="px-3 py-2 tabular-nums">
                              주 {hours}시간
                            </td>
                            <td className="px-3 py-2 tabular-nums">
                              {formatHours(base2026.paidHours)}
                            </td>
                            <td className="px-3 py-2 tabular-nums">
                              {formatWon(base2026.weeklyPay)}
                            </td>
                            <td className="px-3 py-2 tabular-nums">
                              {formatWon(base2027.weeklyPay)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-text-tertiary">
                  주휴시간은 소수로 나올 수 있습니다. 사업장에서 수당을 지급할 때 원 단위 반올림·절사 규칙은 취업규칙과 지급 관행에 따릅니다.
                </p>
              </section>

              <section aria-label="실질 시급" className="card">
                <h2 className="mb-3 text-2xl font-semibold">
                  주휴수당을 넣으면 시급이 얼마가 되나?
                </h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  주휴수당까지 받는 알바라면 실질 시급은 명목 시급의 1.2배로 올라갑니다. 주 소정근로 5일에 하루분(주휴 1일)의 유급 시간이 더해지기 때문에 비율로 보면 6/5, 즉 20% 할증과 같은 효과가 생기기 때문입니다.
                </p>
                <ul className="mb-3 list-disc space-y-1 pl-5 text-sm text-text-secondary">
                  <li>
                    2026 최저시급 {MINIMUM_HOURLY_WAGE_2026.toLocaleString('ko-KR')}원 → 주휴 포함 실질 시급 약 {formatWon(ONE_HUNDRED_TWENTY_PERCENT_2026)}
                  </li>
                  <li>
                    2027 최저시급 {MINIMUM_HOURLY_WAGE_2027.toLocaleString('ko-KR')}원 → 주휴 포함 실질 시급 약 {formatWon(ONE_HUNDRED_TWENTY_PERCENT_2027)}
                  </li>
                </ul>
                <p className="text-text-secondary">
                  다만 월급제 근로자는 월 소정근로시간을 환산할 때 이미 주 40시간 기준 월 209시간(소정 174시간 + 주휴 35시간)을 쓰기 때문에, 월급 안에 주휴수당이 포함된 경우가 많습니다. 월급제라면 명세서나 근로계약서에서 "주휴수당 포함"으로 표기됐는지 먼저 확인하세요.
                </p>
              </section>

              <section aria-label="제외 사례" className="card">
                <h2 className="mb-3 text-2xl font-semibold">
                  주휴수당을 못 받는 경우는?
                </h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  크게 세 가지입니다. 1주 소정근로시간이 15시간 미만이거나, 그 주에 결근이 있거나, 받으려는 시간이 연장근로여서 소정근로시간에서 빠지는 경우예요.
                </p>
                <ul className="mb-3 list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong className="text-text-primary">주 15시간 미만</strong>: 4주 평균 주 15시간 미만인 초단시간 근로자는 §18③에 따라 주휴일 적용에서 빠집니다. 평일·주말 아르바이트 시간을 모두 합쳐 다시 평균을 내 보세요.
                  </li>
                  <li>
                    <strong className="text-text-primary">그 주 결근</strong>: 시행령 §30①의 "소정근로일 개근" 요건을 만족하지 못하면 그 주 주휴수당은 0원입니다. 유급 처리된 연차·공가·업무상 재해 등은 개근으로 봅니다.
                  </li>
                  <li>
                    <strong className="text-text-primary">주 40시간 초과분</strong>: §50① 법정근로시간 40시간을 넘는 시간은 연장근로입니다. 소정근로시간 상한이 40시간이라 주휴 계산에서는 40시간까지만 반영되고, 초과분은 §56의 연장근로 가산수당으로 받습니다.
                  </li>
                </ul>
                <p className="text-text-secondary">
                  다만 지각·조퇴는 결근이 아닙니다. 고용노동부는 지각·조퇴 시간을 합쳐 8시간이 되더라도 하루 결근으로 처리할 수 없다고 봅니다(근로기준과-5560, 2009.12.23). 병가처럼 법정 유급이 아닌 휴무는 취업규칙과 근로계약에 따라 결근 여부가 갈리므로 미리 확인해 두면 분쟁을 줄일 수 있습니다.
                </p>
              </section>

              <section aria-label="법적 근거" className="card">
                <h2 className="mb-3 text-lg font-semibold">법적 근거 · 공식 출처</h2>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/근로기준법/제18조"
                      target="_blank"
                      rel="nofollow noopener"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      근로기준법 §18③ (국가법령정보센터)
                    </a>
                    {' · 4주 평균 1주 소정근로시간 15시간 미만 근로자의 §55 미적용'}
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/근로기준법/제50조"
                      target="_blank"
                      rel="nofollow noopener"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      근로기준법 §50① (국가법령정보센터)
                    </a>
                    {' · 법정 주 40시간, 소정근로시간 상한'}
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/근로기준법/제55조"
                      target="_blank"
                      rel="nofollow noopener"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      근로기준법 §55① (국가법령정보센터)
                    </a>
                    {' · 1주 평균 1회 이상 유급휴일 보장 의무'}
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/근로기준법 시행령/제9조"
                      target="_blank"
                      rel="nofollow noopener"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      근로기준법 시행령 §9①·별표2 (국가법령정보센터)
                    </a>
                    {' · 단시간근로자 1일 소정근로시간 산정 방식'}
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/근로기준법 시행령/제30조"
                      target="_blank"
                      rel="nofollow noopener"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      근로기준법 시행령 §30① (국가법령정보센터)
                    </a>
                    {' · 소정근로일 개근 요건'}
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/최저임금법/제10조"
                      target="_blank"
                      rel="nofollow noopener"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      최저임금법 §10 (국가법령정보센터)
                    </a>
                    {' · 최저임금 고시와 효력 발생 (2026·2027 적용 시급 근거)'}
                  </li>
                  <li>
                    <a
                      href="https://www.moel.go.kr"
                      target="_blank"
                      rel="nofollow noopener"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      고용노동부
                    </a>
                    {' · 근로조건·주휴수당 행정해석'}
                  </li>
                </ul>
                <p className="mt-3 text-xs text-text-tertiary">
                  본 계산기는 참고용 산정입니다. 실제 지급 금액은 근로계약서, 취업규칙, 사업장의 급여 산정 관행과 노동청 해석에 따라 달라질 수 있으니 사업주·근로자 간 확인이 필요합니다.
                </p>
              </section>

              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-10-07: 초판 공개 (2026·2027 최저시급 프리셋, 주 40시간 상한 반영)</li>
                </ul>
              </section>
            </CalculatorPageContent>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
