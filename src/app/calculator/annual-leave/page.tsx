import type { Metadata } from 'next';
import Link from 'next/link';
import { QuickTable } from '@/components/calculator/QuickTable';
import { annualLeaveQuickTable } from '@/lib/quick-tables/annual-leave';
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
import { AnnualLeaveCalculator } from './AnnualLeaveCalculator';
import {
  MINIMUM_HOURLY_WAGE_2026,
  MONTHLY_ORDINARY_HOURS,
  ANNUAL_LEAVE_BASE_DAYS,
  ANNUAL_LEAVE_MAX_DAYS,
  ANNUAL_LEAVE_MAX_MONTHLY_DAYS,
  WEEKLY_HOLIDAY_MIN_WEEKLY_HOURS,
  STANDARD_WEEKLY_HOURS,
} from '@/lib/constants/labor-rules-2026';
import { calculateAnnualLeave } from '@/lib/work/annual-leave';

const URL = 'https://calculatorhost.com/calculator/annual-leave/';
const DATE_PUBLISHED = '2026-10-26';
const DATE_MODIFIED = '2026-10-26';
const TITLE = '연차 계산기 2026 | 입사일 기준 연차 개수·연차수당';
const DESCRIPTION =
  '입사일로 연차 개수와 다음 발생일, 미사용 연차수당을 계산합니다. 1년 미만은 매달 1일, 1년 뒤 15일이 생깁니다.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    '연차 계산기',
    '연차 발생 기준',
    '연차 개수',
    '연차수당 계산기',
    '퇴사 연차수당',
    '1년 미만 연차',
    '입사일 기준 연차',
    '근로기준법 60조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '연차 계산기 2026, 입사일 기준 개수·다음 발생일·미사용 수당',
    description: DESCRIPTION,
    url: URL,
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '연차 계산기 2026',
    description: '입사일로 연차 개수와 미사용 수당을 바로 계산',
  },
};

// === 포맷 헬퍼 ===
const formatWon = (value: number) => `${Math.round(value).toLocaleString('ko-KR')}원`;
const formatHours = (value: number) =>
  `${value.toLocaleString('ko-KR', { maximumFractionDigits: 2 })}시간`;

// === 통상시급(원): 월 통상임금 300만 원 ÷ 월 소정 209시간 (주 40시간 사업장 환산 관행) ===
const ORDINARY_HOURLY_WAGE_300M = Math.round(3_000_000 / MONTHLY_ORDINARY_HOURS);

// === 본문 예시: 전부 calculateAnnualLeave 함수로 산출 (수기 하드코딩 금지) ===

// 1년 미만 상태: 입사 2026-01-01, 11개월째(2026-12-01) 기준, §60② 월 연차 11일
const EXAMPLE_UNDER_1Y = calculateAnnualLeave({
  hireDate: '2026-01-01',
  untilDate: '2026-12-01',
  weeklyHours: 40,
  fivePlus: true,
  usedDays: 0,
  hourlyWage: MINIMUM_HOURLY_WAGE_2026,
});

// 1년 하루 전 퇴사: 입사 2025-11-01, 마지막 근무 2026-10-31
// (§60① 15일 발생 전날이라 월 연차만 최대 11일, 대법원 2021다227100 반영)
const EXAMPLE_1Y_LAST_DAY = calculateAnnualLeave({
  hireDate: '2025-11-01',
  untilDate: '2026-10-31',
  weeklyHours: 40,
  fivePlus: true,
  usedDays: 0,
  hourlyWage: ORDINARY_HOURLY_WAGE_300M,
});

// 1년 완성 다음 날 퇴사: 입사 2025-11-01, 마지막 근무 2026-11-01
// (§60① 15일이 발생한 날에 근로관계가 있어 15일 성립, 월 연차는 §60⑦ 사용 기한 지나 소멸)
const EXAMPLE_1Y_PLUS = calculateAnnualLeave({
  hireDate: '2025-11-01',
  untilDate: '2026-11-01',
  weeklyHours: 40,
  fivePlus: true,
  usedDays: 0,
  hourlyWage: ORDINARY_HOURLY_WAGE_300M,
});

// 1년차 15일 미사용 수당: 월 300만 원 통상시급
const EXAMPLE_WAGE_300M = calculateAnnualLeave({
  hireDate: '2025-10-26',
  untilDate: '2026-10-26',
  weeklyHours: 40,
  fivePlus: true,
  usedDays: 0,
  hourlyWage: ORDINARY_HOURLY_WAGE_300M,
});

// 1년차 15일 미사용 수당: 2026 최저시급
const EXAMPLE_WAGE_MIN = calculateAnnualLeave({
  hireDate: '2025-10-26',
  untilDate: '2026-10-26',
  weeklyHours: 40,
  fivePlus: true,
  usedDays: 0,
  hourlyWage: MINIMUM_HOURLY_WAGE_2026,
});

// 알바 주 20시간 1년차: 시행령 §9 별표2 제4호 나목 비례 산정
const EXAMPLE_PART_20H = calculateAnnualLeave({
  hireDate: '2025-10-26',
  untilDate: '2026-10-26',
  weeklyHours: 20,
  fivePlus: true,
  usedDays: 0,
  hourlyWage: MINIMUM_HOURLY_WAGE_2026,
});

// 주 60시간 사례: 명세 §3 에 따라 소정근로시간은 40 으로 캡
const EXAMPLE_WEEK_60 = calculateAnnualLeave({
  hireDate: '2025-10-26',
  untilDate: '2026-10-26',
  weeklyHours: 60,
  fivePlus: true,
  usedDays: 0,
  hourlyWage: MINIMUM_HOURLY_WAGE_2026,
});

// 주 14시간: §18③ 초단시간 근로자 적용 제외
const EXAMPLE_UNDER_15H = calculateAnnualLeave({
  hireDate: '2025-10-26',
  untilDate: '2026-10-26',
  weeklyHours: 14,
  fivePlus: true,
  usedDays: 0,
  hourlyWage: MINIMUM_HOURLY_WAGE_2026,
});

// 상시 4명 이하 사업장: §11②·시행령 §7 별표1 적용 제외
const EXAMPLE_UNDER_5 = calculateAnnualLeave({
  hireDate: '2025-10-26',
  untilDate: '2026-10-26',
  weeklyHours: 40,
  fivePlus: false,
  usedDays: 0,
  hourlyWage: MINIMUM_HOURLY_WAGE_2026,
});

// === 근속별 표: n년차 기념일이 2026-10-26 이 되도록 입사일 역산 ===
const CAREER_YEARS = [1, 2, 3, 5, 10, 15, 20, 25] as const;
const CAREER_ROWS = CAREER_YEARS.map((years) => {
  const hireDate = `${2026 - years}-10-26`;
  const result = calculateAnnualLeave({
    hireDate,
    untilDate: '2026-10-26',
    weeklyHours: 40,
    fivePlus: true,
    usedDays: 0,
    hourlyWage: ORDINARY_HOURLY_WAGE_300M,
  });
  const added = result.availableDays - ANNUAL_LEAVE_BASE_DAYS;
  const additional = Math.floor((years - 1) / 2);
  const formula =
    years <= 2
      ? '15 (§60①)'
      : additional + ANNUAL_LEAVE_BASE_DAYS >= ANNUAL_LEAVE_MAX_DAYS
        ? `min(25, 15 + ${additional}) = ${result.availableDays}`
        : `15 + ${additional} = ${result.availableDays}`;
  return { years, days: result.availableDays, added, formula };
});

const FAQ_ITEMS = [
  {
    question: '연차는 언제, 며칠 생기나요?',
    answer:
      '1년을 다 채운 다음 날에 15일이 생깁니다. 근로기준법 §60①은 1년간 80% 이상 출근한 근로자에게 15일 유급휴가를 주도록 하고, §60④가 3년 이상 근속자에게 매 2년에 1일을 더해 25일을 상한으로 쌓게 합니다. 1년 미만 기간에는 §60②에 따라 1개월 개근할 때마다 1일씩 최대 11일이 쌓입니다.',
  },
  {
    question: '1년 미만 알바도 연차가 있나요?',
    answer:
      '네. 1개월 개근하면 다음 달 같은 날에 1일이 생깁니다 (§60②). 상한은 11일이고, 사용 기한은 최초 1년 근로가 끝날 때까지입니다 (§60⑦). 다만 §18③에 따라 4주 평균 주 15시간 미만 초단시간 근로자, 그리고 §11②·시행령 §7 별표1에 따라 상시 4명 이하 사업장은 연차 규정 자체가 적용되지 않습니다.',
  },
  {
    question: '딱 1년만 다니고 그만두면 연차 15일을 받나요?',
    answer:
      `받지 못합니다. 15일은 1년 근로를 마친 다음 날 생기므로 그날에도 근로관계가 있어야 합니다 (대법원 2021. 10. 14. 선고 2021다227100). 입사 2025-11-01, 마지막 근무 2026-10-31이면 월 연차만 최대 ${EXAMPLE_1Y_LAST_DAY.availableDays}일 받고 15일은 생기지 않습니다. 마지막 근무를 2026-11-01까지 늘리면 15일이 생깁니다.`,
  },
  {
    question: '1년 조금 넘게 다니면 최대 26일을 받을 수 있나요?',
    answer:
      '맞습니다. 1년을 넘겨 다니면 1년 미만 월 연차 최대 11일과 1년을 마친 다음 날 생기는 15일을 합해 최대 26일이 됩니다 (대법원 2022. 9. 7. 선고 2022다245419). 다만 월 연차 11일은 최초 1년 근로가 끝나면 쓸 수 없게 되고(§60⑦), 그때까지 못 쓴 날은 회사가 사용 촉진(§61)을 하지 않았다면 수당으로 받습니다.',
  },
  {
    question: '연차수당은 어떻게 계산하나요?',
    answer:
      `미사용 일수 × 1일 통상임금으로 계산합니다. 1일 통상임금은 월 통상임금 ÷ 월 통상임금 산정 기준시간(주 40시간 사업장은 ${MONTHLY_ORDINARY_HOURS}시간)으로 환산한 시급에 1일 소정근로시간(주 40시간이면 8시간)을 곱한 값입니다. 월 통상임금 300만 원·주 40시간이면 시급 ${formatWon(ORDINARY_HOURLY_WAGE_300M)} 기준으로 15일 미사용 시 ${formatWon(EXAMPLE_WAGE_300M.allowance)}, 2026 최저시급 기준이면 ${formatWon(EXAMPLE_WAGE_MIN.allowance)}입니다.`,
  },
  {
    question: '알바·단시간 근로자 연차는 어떻게 계산하나요?',
    answer:
      `시간 단위로 비례 산정합니다. 시행령 §9 별표2 제4호 나목에 따라 통상근로자 연차 일수 × 1주 소정근로시간 × 8 ÷ 40 으로 시간을 구하고 1시간 미만은 1시간으로 올립니다. 주 20시간을 1년 꽉 채우고 다음 날 근로관계가 있으면 1년차 15일에 해당하는 ${formatHours(EXAMPLE_PART_20H.availableHours)}이 쌓입니다. 하루 소정근로시간이 짧으면 연차 1일로 쉬는 시간도 함께 줄어듭니다.`,
  },
  {
    question: '5인 미만 사업장도 연차가 있나요?',
    answer:
      '없습니다. 근로기준법 §11②과 시행령 §7 별표1이 상시 근로자 4명 이하 사업장을 §60 적용에서 제외하기 때문입니다. 노사가 취업규칙·단체협약으로 자율적으로 연차를 두면 그 조건이 적용되지만, 법정 연차·연차수당 청구 대상은 아닙니다. 상시 근로자 수를 어떻게 세는지 헷갈리면 고용노동부 상담(국번 없이 1350)에 물어보세요.',
  },
  {
    question: '연차는 안 쓰면 사라지나요?',
    answer:
      '네. §60⑦에 따라 발생일부터 1년 안에 쓰지 않으면 소멸합니다. 1년 미만에 쌓인 월 연차는 최초 1년 근로가 끝날 때까지만 사용할 수 있고, n년차 연차는 다음 기념일 전날까지 사용할 수 있습니다. 사용자가 §61 사용 촉진 절차를 지키지 않았거나 사용자 귀책사유로 쓰지 못한 경우에는 수당으로 보상됩니다. 수당 자체는 임금 채권이라 §49 소멸시효가 별도로 적용됩니다.',
  },
] as const;

const RELATED = [
  {
    href: '/calculator/weekly-holiday-allowance/',
    title: '주휴수당 계산기',
    description: '시급·주 소정근로시간으로 주휴수당 계산',
  },
  {
    href: '/calculator/salary/',
    title: '연봉 실수령액 계산기',
    description: '4대보험·세금 공제 월 실수령',
  },
  {
    href: '/calculator/severance/',
    title: '퇴직금 계산기',
    description: '근속 1년 이상 법정 퇴직금',
  },
];

export default function AnnualLeavePage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '연차 계산기 2026',
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
    { name: '연차 계산기' },
  ]);
  const howtoLd = buildHowToJsonLd({
    name: '연차 개수와 연차수당 계산하기',
    description: '입사일과 기준일, 1주 소정근로시간, 통상임금으로 연차 일수·다음 발생일·미사용 연차수당을 구하는 방법',
    steps: [
      {
        name: '입사일 입력',
        text: '근로계약서상 입사일을 YYYY-MM-DD 형식으로 넣습니다. 입사일 기준으로 1년·2년 기념일이 자동 계산됩니다.',
      },
      {
        name: '기준일 입력',
        text: '재직 중이면 오늘, 퇴사면 마지막 근무일(그날까지 근로관계가 있다고 봄)을 넣습니다. 이 날에 연차가 쌓여 있는지 판정합니다.',
      },
      {
        name: '근무 조건 선택',
        text: '1주 소정근로시간(4주 평균, 연장근로 제외)과 상시 근로자 5명 이상 사업장 여부를 고릅니다. 40시간이 넘게 넣으면 40시간으로 계산합니다.',
      },
      {
        name: '이미 쓴 연차와 통상임금 입력',
        text: '이미 쓴 연차 일수를 넣고, 월 통상임금 또는 통상시급을 입력합니다. 월 통상임금은 월 ÷ 209시간으로 시급을 환산합니다.',
      },
      {
        name: '결과 확인',
        text: '지금 쓸 수 있는 연차 일수, 남은 연차, 미사용 연차수당, 다음 연차 발생일을 확인합니다. 참고용 산정이며 사용 촉진·회사 규정에 따라 실제 지급이 다를 수 있습니다.',
      },
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
              guidesFor="annual-leave"
              quickTable={<QuickTable data={annualLeaveQuickTable()} />}
              intro={
                <header>
                  <Breadcrumb
                    items={[
                      { name: '홈', href: '/' },
                      { name: '근로', href: '/category/work/' },
                      { name: '연차 계산기' },
                    ]}
                  />
                  <h1 className="mb-3 text-4xl font-bold tracking-tight">연차 계산기 2026</h1>
                  <p className="text-lg text-text-secondary" data-speakable>
                    입사일만 넣으면 지금 쓸 수 있는 연차 일수, 다음 연차 발생일, 미사용 연차수당을
                    바로 확인할 수 있어요. 1년 미만 월 연차와 1년차 15일, 가산휴가까지 입사일 기준
                    근로기준법 §60 그대로 계산합니다.
                  </p>
                  <AuthorByline datePublished={DATE_PUBLISHED} dateModified={DATE_MODIFIED} />
                </header>
              }
              calculator={<AnnualLeaveCalculator />}
              related={<RelatedCalculators items={RELATED} />}
              faq={<FaqSection items={FAQ_ITEMS} />}
              tools={
                <ShareButtons
                  title="연차 계산기 2026"
                  url={URL}
                  description="입사일로 연차 개수와 미사용 수당을 바로 계산"
                />
              }
            >
              <StructuredSummary
                definition={`연차 유급휴가는 근로기준법 §60이 1년 이상 근속자에게 ${ANNUAL_LEAVE_BASE_DAYS}일, 1년 미만 근로자에게 매월 1일(최대 ${ANNUAL_LEAVE_MAX_MONTHLY_DAYS}일)을 유급으로 보장하는 휴가입니다.`}
                table={{
                  caption: '2026년 연차 핵심 수치',
                  headers: ['항목', '내용'],
                  rows: [
                    ['1년 이상 기본 연차', `${ANNUAL_LEAVE_BASE_DAYS}일 (§60①)`],
                    [
                      '1년 미만 월 연차',
                      `1개월 개근 시 1일, 최대 ${ANNUAL_LEAVE_MAX_MONTHLY_DAYS}일 (§60②)`,
                    ],
                    ['가산휴가', `3년 이상 매 2년에 1일, 상한 ${ANNUAL_LEAVE_MAX_DAYS}일 (§60④)`],
                    ['사용 기한', '발생일부터 1년, 1년 미만 연차는 입사 1년이 될 때까지 (§60⑦)'],
                    [
                      '적용 제외',
                      `상시 4명 이하 사업장·주 ${WEEKLY_HOLIDAY_MIN_WEEKLY_HOURS}시간 미만 (§18③·시행령 §7 별표1)`,
                    ],
                  ],
                }}
                tldr={[
                  `1년 꽉 채우고 다음 날 근로관계가 있어야 ${ANNUAL_LEAVE_BASE_DAYS}일이 생깁니다 (대법원 2021다227100).`,
                  `1년 미만은 매월 1일씩 최대 ${ANNUAL_LEAVE_MAX_MONTHLY_DAYS}일, 사용 기한은 첫 기념일 전날까지.`,
                  `3년 이상 근속이면 가산휴가로 매 2년에 1일 추가, 상한 ${ANNUAL_LEAVE_MAX_DAYS}일.`,
                  '연차수당 = 미사용 일수 × 1일 통상임금 (주 40시간이면 월 ÷ 209 × 8).',
                  '상시 4명 이하 사업장과 주 15시간 미만 초단시간 근로자는 적용 제외.',
                ]}
              />

              <section aria-label="근속별 연차 일수" className="card">
                <h2 className="mb-3 text-2xl font-semibold">
                  연차는 언제, 며칠 생기나요? 입사 1년 뒤 15일부터
                </h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  1년을 꽉 채우고 다음 날 근로관계가 있으면 그날 {ANNUAL_LEAVE_BASE_DAYS}일이
                  생깁니다. 근로기준법 §60①이 1년간 80% 이상 출근한 근로자에게{' '}
                  {ANNUAL_LEAVE_BASE_DAYS}일을 보장하고, §60④가 3년 이상 근속자에게 매 2년에 1일을
                  더해 {ANNUAL_LEAVE_MAX_DAYS}일을 상한으로 쌓도록 정하기 때문입니다.
                </p>
                <p className="mb-3 text-text-secondary">
                  공식은{' '}
                  <code className="rounded bg-bg-raised px-1 py-0.5 text-text-primary">
                    min({ANNUAL_LEAVE_MAX_DAYS}, {ANNUAL_LEAVE_BASE_DAYS} + floor((n - 1) / 2))
                  </code>{' '}
                  입니다. 3년차부터 1일이 더 붙기 시작해 21년차에{' '}
                  {ANNUAL_LEAVE_MAX_DAYS}일 상한에 도달하고, 그 이후에는 더 늘지 않습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 text-left text-text-tertiary">
                      근속연수별 연차 일수와 산식 (주 40시간 상근, 매년 출근율 80% 이상 가정)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base bg-bg-raised text-left">
                        <th scope="col" className="px-3 py-2 font-semibold">
                          근속
                        </th>
                        <th scope="col" className="px-3 py-2 font-semibold">
                          연차 일수
                        </th>
                        <th scope="col" className="px-3 py-2 font-semibold">
                          가산 일수
                        </th>
                        <th scope="col" className="px-3 py-2 font-semibold">
                          산식 (§60①·④)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {CAREER_ROWS.map((row) => (
                        <tr key={row.years} className="border-b border-border-base">
                          <td className="px-3 py-2 tabular-nums">{row.years}년차</td>
                          <td className="px-3 py-2 tabular-nums">{row.days}일</td>
                          <td className="px-3 py-2 tabular-nums">
                            {row.added > 0 ? `+${row.added}일` : '0일'}
                          </td>
                          <td className="px-3 py-2 text-text-secondary">{row.formula}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-text-secondary">
                  다만 이 표는 매년 출근율 80% 이상을 가정합니다. 1년간 80% 미만이면 §60②이 적용되어
                  그 해에는 1개월 개근마다 1일만 쌓이고, 그 다음 해부터 다시 §60①의 15일 산정 궤도로
                  돌아갑니다. 또 회계연도 기준으로 운영하는 회사라면 숫자가 달라질 수 있으니{' '}
                  <Link
                    href="/guide/annual-leave-allowance-2026/"
                    className="text-primary-600 underline"
                  >
                    연차수당 계산 가이드
                  </Link>
                  를 함께 확인하거나 인사팀에 입사일 기준과 비교해 달라고 요청하세요.
                </p>
              </section>

              <section aria-label="1년 미만 연차" className="card">
                <h2 className="mb-3 text-2xl font-semibold">
                  1년 미만 연차는 며칠이고 언제까지 쓰나요?
                </h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  1년 미만 연차는 1개월 개근할 때마다 1일씩 최대{' '}
                  {ANNUAL_LEAVE_MAX_MONTHLY_DAYS}일이 쌓이고, 최초 1년 근로가 끝날 때까지만 쓸 수
                  있습니다. 근로기준법 §60②가 "계속하여 근로한 기간이 1년 미만이거나 1년간 80%
                  미만을 출근한 근로자에게는 1개월 개근 시 1일" 을 주도록 하고, §60⑦이 그 사용
                  기간을 "최초 1년의 근로가 끝날 때까지" 로 제한하기 때문입니다.
                </p>
                <p className="mb-3 text-text-secondary">
                  발생일은 입사일의 대응일(민법 §160 역법 계산)로 봅니다. 입사일이 2026-01-01이면
                  2026-02-01, 03-01, ..., 12-01에 각각 1일씩 생기고, 그 전날까지 1개월 전부 개근해야
                  합니다. 2026-12-01 기준으로는 총 {EXAMPLE_UNDER_1Y.availableDays}일이 쌓여 있고,
                  1년이 끝날 때까지 하나도 쓰지 못했다면 회사가 사용 촉진을 하지 않은 경우 2026
                  최저시급 기준 {formatWon(EXAMPLE_UNDER_1Y.allowance)}을 연차수당으로 받을 수
                  있습니다. 대응일이 없는 달(예: 1월 31일 입사자의 2월)은 다음 달 1일로 넘어갑니다.
                </p>
                <p className="text-text-secondary">
                  다만 1년 미만 월 연차는 1년 근로를 마친 다음 날 생기는 15일(§60①)과는 별개로
                  소멸 시점이 더 빠릅니다. 고용노동부도 2021년 12월 16일 행정해석을 바꿔, 월 연차
                  역시 1개월 근로를 마친 다음 날 생기고 그날 근로관계가 있어야 한다는 기준을
                  적용합니다. 그래서 1월 1일 입사해 7월 31일까지 개근하고 그만두면 7일이 아니라
                  6일입니다. 마지막 근무일을 다음 발생일(이 예에서는 8월 1일)까지 잡으면 1일이 더
                  생깁니다.
                </p>
              </section>

              <section aria-label="1년 딱 퇴사" className="card">
                <h2 className="mb-3 text-2xl font-semibold">
                  1년만 다니고 퇴사하면 연차 15일을 받나요?
                </h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  1년을 채운 날까지만 일하고 그만두면 받지 못합니다. 15일은 1년 근로를 마친 다음
                  날에 생기므로 그날에도 근로관계가 있어야 한다는 대법원 2021. 10. 14. 선고
                  2021다227100 판결과 2021년 12월 고용노동부 행정해석 변경이 그 이유입니다. 월
                  통상임금 300만 원·주 40시간으로 두 경우를 계산하면 이렇게 달라집니다.
                </p>
                <ul className="mb-3 list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong className="text-text-primary">입사 2025-11-01, 마지막 근무 2026-10-31</strong>
                    : 1년을 채운 10월 31일까지만 일해서, 15일이 생기는 다음 날(11월 1일)에는
                    근로관계가 없습니다. 그래서 §60① 15일은 생기지 않고 월 연차{' '}
                    {EXAMPLE_1Y_LAST_DAY.availableDays}일만 남습니다. 모두 못 썼다면 수당은{' '}
                    {formatWon(EXAMPLE_1Y_LAST_DAY.allowance)}이고, 하루만 더 다녔다면{' '}
                    {EXAMPLE_1Y_LAST_DAY.nextAccrual
                      ? `${EXAMPLE_1Y_LAST_DAY.nextAccrual.date}에 ${EXAMPLE_1Y_LAST_DAY.nextAccrual.days}일`
                      : '15일'}
                    이 더 생겼을 것입니다.
                  </li>
                  <li>
                    <strong className="text-text-primary">입사 2025-11-01, 마지막 근무 2026-11-01</strong>
                    : 1년을 마친 다음 날에도 근로관계가 있어 §60① 15일이 생깁니다. 지금 쓸 수
                    있는 연차는 {EXAMPLE_1Y_PLUS.availableDays}일, 모두 못 쓰고 그만두면 수당{' '}
                    {formatWon(EXAMPLE_1Y_PLUS.allowance)}입니다. 1년 미만 때 생긴 월 연차 11일은
                    10월 31일에 사용 기한이 끝났는데, 그때까지 못 썼고 회사가 사용 촉진을 하지
                    않았다면 그 11일분 수당도 따로 받을 수 있습니다(합계 최대 26일분).
                  </li>
                </ul>
                <p className="text-text-secondary">
                  다만 1년을 넘겨 다니면 1년 미만 월 연차 최대 11일과 1년을 마친 다음 날 생기는
                  15일을 합해 최대 26일이 됩니다(대법원 2022. 9. 7. 선고 2022다245419). 월 연차는
                  최초 1년이 끝나면 쓸 수 없게 되지만(§60⑦), 회사가 사용 촉진(§61)을 하지
                  않았다면 못 쓴 날은 수당으로 받습니다. 이 계산기의 수당은 기준일에 쓸 수 있는
                  연차만 계산하니, 사용 기한이 지난 연차의 수당은 따로 확인하세요.
                </p>
              </section>

              <section aria-label="연차수당 계산법" className="card">
                <h2 className="mb-3 text-2xl font-semibold">
                  연차수당은 얼마인가요? 미사용 일수 × 1일 통상임금
                </h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  연차수당은 미사용 일수에 1일 통상임금을 곱해 산출합니다. 근로기준법 §60⑤는 연차
                  휴가 기간의 임금을 취업규칙 등에서 정하는 통상임금 또는 평균임금으로 주도록
                  정하고, 이 계산기는 통상임금으로 계산합니다. 1일 통상임금은 월 통상임금을 월
                  통상임금 산정 기준시간(주 40시간이면 209시간)으로 나눠 시급을 구한 뒤 1일
                  소정근로시간을 곱해 구합니다.
                </p>
                <ul className="mb-3 list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    월 통상임금 300만 원·주 40시간 → 시급 ={' '}
                    {formatWon(ORDINARY_HOURLY_WAGE_300M)} (= 300만 ÷ {MONTHLY_ORDINARY_HOURS}), 1일
                    통상임금 ≈ {formatWon(ORDINARY_HOURLY_WAGE_300M * 8)}. 1년차 15일 전부
                    미사용이면 수당 {formatWon(EXAMPLE_WAGE_300M.allowance)}.
                  </li>
                  <li>
                    2026 최저시급 {formatWon(MINIMUM_HOURLY_WAGE_2026)} · 주 40시간 → 1일 통상임금{' '}
                    {formatWon(MINIMUM_HOURLY_WAGE_2026 * 8)}. 15일 전부 미사용이면 수당{' '}
                    {formatWon(EXAMPLE_WAGE_MIN.allowance)}.
                  </li>
                </ul>
                <p className="text-text-secondary">
                  다만 이 계산기는 입력한 통상시급을 그대로 사용하고, 평균임금과의 유리 비교나
                  10원 미만 단수 처리 같은 사업장별 지급 관행은 반영하지 않습니다. 통상임금의 범위
                  (정기상여·식대·근속수당 포함 여부)는 사업장마다 다를 수 있어 실제 수당을 다툴
                  때는{' '}
                  <Link
                    href="/guide/annual-leave-usage-promotion-2026/"
                    className="text-primary-600 underline"
                  >
                    연차 사용 촉진 가이드
                  </Link>
                  와 함께 명세서·근로계약서를 확인하는 편이 안전합니다.
                </p>
              </section>

              <section aria-label="단시간 근로자" className="card">
                <h2 className="mb-3 text-2xl font-semibold">
                  알바·단시간 근로자도 연차가 있나요?
                </h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  주 15시간 이상 일하면 연차가 생기고 통상근로자 연차 일수에서 시간 단위로 비례
                  산정합니다. 시행령 §9 별표2 제4호 나목은 통상근로자 연차 일수에 단시간근로자의
                  소정근로시간 × 8시간을 곱하고 통상근로자의 소정근로시간으로 나눠 시간을 구하며,
                  1시간 미만은 1시간으로 봅니다.
                </p>
                <ul className="mb-3 list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong className="text-text-primary">주 20시간 · 1년차</strong>: 통상근로자
                    1년차 15일 × 20 × 8 ÷ 40 = {formatHours(EXAMPLE_PART_20H.availableHours)}. 하루{' '}
                    {EXAMPLE_PART_20H.dailyHours.toLocaleString('ko-KR', {
                      maximumFractionDigits: 2,
                    })}
                    시간이 소정근로이므로 연차 1일로 {EXAMPLE_PART_20H.dailyHours}시간을 쉬게
                    됩니다.
                  </li>
                  <li>
                    <strong className="text-text-primary">주 60시간 입력</strong>: 소정근로시간은 §50①
                    법정 상한 주 {STANDARD_WEEKLY_HOURS}시간을 넘지 못하므로 계산기는{' '}
                    {STANDARD_WEEKLY_HOURS}시간으로 봅니다. 결과는 통상근로자와 같은{' '}
                    {EXAMPLE_WEEK_60.availableDays}일·{formatHours(EXAMPLE_WEEK_60.availableHours)}
                    로 수렴합니다.
                  </li>
                  <li>
                    <strong className="text-text-primary">주 14시간</strong>: §18③에 따라 초단시간
                    근로자로 분류되어 §55·§60이 적용되지 않습니다. 그래서{' '}
                    {EXAMPLE_UNDER_15H.availableDays}일·연차수당{' '}
                    {formatWon(EXAMPLE_UNDER_15H.allowance)}이 산출됩니다.
                  </li>
                </ul>
                <p className="text-text-secondary">
                  다만 "4주 평균 15시간 미만" 이 판정 기준이라 어느 한 주만 14시간이어도 다른 주가
                  15시간을 넘기면 평균이 15시간 이상인지 다시 확인해야 합니다. 짧게 일하다 늘어난
                  경우에도 4주 평균을 다시 돌려 보고, 상시 근로자 수와 소정근로시간을 노동청 상담
                  1350 에서 함께 확인하는 편이 좋습니다.
                </p>
              </section>

              <section aria-label="적용 제외" className="card">
                <h2 className="mb-3 text-2xl font-semibold">
                  5인 미만 회사나 출근율 80% 미만이면 어떻게 되나요?
                </h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  상시 4명 이하 사업장과 1년간 80% 미만 출근자는 §60의 적용 범위가 달라집니다.
                  근로기준법 §11②과 시행령 §7 별표1이 상시 4명 이하 사업장을 §60(연차 유급휴가)의
                  적용에서 제외하고, §60②이 "1년간 80% 미만 출근자" 를 1년 미만 근로자와 같은
                  "1개월 개근 시 1일" 궤도로 보내기 때문입니다.
                </p>
                <ul className="mb-3 list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong className="text-text-primary">상시 4명 이하 사업장</strong>: 입력에서
                    "아니오"를 고르면 법정 연차가 없어 {EXAMPLE_UNDER_5.availableDays}일·연차수당{' '}
                    {formatWon(EXAMPLE_UNDER_5.allowance)}으로 나옵니다.
                  </li>
                  <li>
                    <strong className="text-text-primary">출근율 80% 미만</strong>: 법정 연차 15일
                    대신 1개월 개근할 때마다 1일씩 쌓입니다. 다음 해부터 다시 80% 이상 출근하면
                    §60①의 궤도로 복귀합니다.
                  </li>
                  <li>
                    <strong className="text-text-primary">가산휴가 §60④</strong>: 3년 이상 근속자는
                    매 2년에 1일 가산되어 상한 {ANNUAL_LEAVE_MAX_DAYS}일에 도달하면 그 이상 늘지
                    않습니다.
                  </li>
                </ul>
                <p className="text-text-secondary">
                  다만 5인 미만 사업장도 취업규칙이나 근로계약으로 연차를 주기로 정했다면 그
                  약속대로 받습니다. 상시 근로자 수를 어떻게 세는지 헷갈리면 고용노동부 상담(국번
                  없이 1350)에 물어보세요. 참고로 연차와 달리 퇴직금은 5인 미만 사업장에도
                  적용됩니다(
                  <Link
                    href="/guide/severance-pay-eligibility-2026/"
                    className="text-primary-600 underline"
                  >
                    퇴직금 지급 기준 가이드
                  </Link>
                  ).
                </p>
              </section>

              <section aria-label="계산 방법" className="card">
                <h2 className="mb-3 text-2xl font-semibold">
                  이 계산기로 연차를 계산하는 방법은?
                </h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  입사일과 기준일 두 날짜만 있으면 됩니다. 아래 다섯 단계로 넣으면 지금 쓸 수 있는
                  연차 일수, 미사용 연차수당, 다음 연차 발생일이 바로 나옵니다.
                </p>
                <ol className="mb-3 list-decimal space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong className="text-text-primary">입사일 입력</strong>: 근로계약서상
                    입사일을 넣습니다. 입사일 기준으로 1년·2년 기념일이 자동 계산됩니다.
                  </li>
                  <li>
                    <strong className="text-text-primary">기준일 입력</strong>: 재직 중이면 오늘,
                    퇴사면 마지막 근무일(그날까지 근로관계가 있다고 봄)을 넣습니다. 이 날에 연차가
                    쌓여 있는지 판정합니다.
                  </li>
                  <li>
                    <strong className="text-text-primary">근무 조건 선택</strong>: 1주 소정근로시간
                    (4주 평균, 연장근로 제외)과 상시 5명 이상 사업장 여부를 고릅니다. 40시간이
                    넘게 넣으면 40시간으로 계산합니다.
                  </li>
                  <li>
                    <strong className="text-text-primary">이미 쓴 연차·통상임금 입력</strong>: 이미
                    쓴 연차 일수와 월 통상임금 또는 통상시급을 넣습니다. 월 통상임금은{' '}
                    {MONTHLY_ORDINARY_HOURS}시간으로 나눠 시급을 환산합니다.
                  </li>
                  <li>
                    <strong className="text-text-primary">결과 확인</strong>: 지금 쓸 수 있는 연차
                    일수, 남은 연차, 미사용 연차수당, 다음 연차 발생일, 블록별 발생 내역을
                    확인합니다. 참고용 산정이며 사용 촉진·회사 규정에 따라 실제 지급이 달라질 수
                    있습니다.
                  </li>
                </ol>
                <p className="text-text-secondary">
                  다만 계산기는 매년 출근율 80% 이상을 기본 가정으로 둡니다. 질병·개인 사유 결근이
                  많아 1년간 80% 미만을 출근한 해가 있다면 그 해 연차는 §60②의 월 1일 궤도로
                  바뀌므로 결과값과 실제 발생 일수가 달라질 수 있습니다. 또 회계연도 기준으로 연차를
                  운영하는 회사라면 입사일 기준 산정과 달라질 수 있어 퇴사 전에 인사팀에 입사일
                  기준과 회계연도 기준을 함께 비교해 달라고 요청하세요.
                </p>
              </section>

              <section aria-label="법적 근거" className="card">
                <h2 className="mb-3 text-lg font-semibold">법적 근거 · 공식 출처</h2>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/근로기준법/제60조"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline"
                    >
                      근로기준법 §60 (국가법령정보센터)
                    </a>
                    {' · 연차 유급휴가 발생·가산·사용 기한 전반'}
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/근로기준법/제18조"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline"
                    >
                      근로기준법 §18③ (국가법령정보센터)
                    </a>
                    {' · 4주 평균 주 15시간 미만 초단시간 근로자의 §55·§60 미적용'}
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/근로기준법시행령/제7조"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline"
                    >
                      근로기준법 시행령 §7 별표1 (국가법령정보센터)
                    </a>
                    {' · 상시 4명 이하 사업장에 §60 적용 제외'}
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/근로기준법시행령/제9조"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline"
                    >
                      근로기준법 시행령 §9 별표2 (국가법령정보센터)
                    </a>
                    {' · 단시간근로자 연차 시간 단위 비례 산정'}
                  </li>
                  <li>
                    <a
                      href="https://www.moel.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline"
                    >
                      고용노동부
                    </a>
                    {' · 연차·사용 촉진 행정해석(2021-12 변경), 노동청 상담 1350'}
                  </li>
                  <li>
                    <a
                      href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=2042&ccfNo=3&cciNo=1&cnpClsNo=1"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline"
                    >
                      찾기 쉬운 생활법령 · 근로시간 및 휴가
                    </a>
                    {' · 연차 발생·사용·수당 정리'}
                  </li>
                </ul>
                <p className="mt-3 text-xs text-text-tertiary">
                  본 계산기는 참고용 산정이며 노무 상담이 아닙니다. 매년 출근율 80% 이상·입사일
                  기준·사용 촉진 미실시를 가정했고, 평균임금 비교·10원 미만 단수 처리·회계연도 기준
                  정산은 반영하지 않습니다. 기준일 2026-10-26 현행 근로기준법 §18③·§55·§60·§61,
                  시행령 §7 별표1·§9 별표2, 대법원 2021. 10. 14. 선고 2021다227100 및 2022. 9. 7.
                  선고 2022다245419 를 인용했습니다. 실제 지급은 근로계약서·취업규칙·사업장 운영
                  관행에 따라 달라질 수 있으니 고용노동부 상담 1350 또는 사업장 인사팀과 함께
                  확인하세요.
                </p>
              </section>

              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>
                    2026-10-26: 초판 공개 (입사일 기준 월 연차·연차 15일·가산휴가·단시간 비례
                    산정·미사용 수당 반영)
                  </li>
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
