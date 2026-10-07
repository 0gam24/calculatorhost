'use client';

import { useMemo, useState } from 'react';
import {
  CalculatorWorkspace,
} from '@/components/calculator/CalculatorWorkspace';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { ResultCard, type ResultRowProps } from '@/components/calculator/Result';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';
import {
  calculateWeeklyHolidayAllowance,
  type WeeklyHolidayAllowanceResult,
} from '@/lib/work/weekly-holiday-allowance';
import {
  MINIMUM_HOURLY_WAGE_2026,
  MINIMUM_HOURLY_WAGE_2027,
  STANDARD_WEEKLY_HOURS,
  WEEKLY_HOLIDAY_MIN_WEEKLY_HOURS,
} from '@/lib/constants/labor-rules-2026';

const SLUG = 'weekly-holiday-allowance';

const formatWon = (value: number) => `${Math.round(value).toLocaleString('ko-KR')}원`;
const formatHours = (value: number) =>
  `${value.toLocaleString('ko-KR', { maximumFractionDigits: 2 })}시간`;

interface HelperState {
  dailyHours: number;
  daysPerWeek: number;
}

export function WeeklyHolidayAllowanceCalculator() {
  const [hourlyWage, setHourlyWage] = useCalculatorState<number>(
    'weekly-holiday-allowance:hourlyWage',
    MINIMUM_HOURLY_WAGE_2026,
  );
  const [weeklyHours, setWeeklyHours] = useCalculatorState<number>(
    'weekly-holiday-allowance:weeklyHours',
    STANDARD_WEEKLY_HOURS,
  );
  const [fullAttendance, setFullAttendance] = useCalculatorState<boolean>(
    'weekly-holiday-allowance:fullAttendance',
    true,
  );
  // 하루 근무시간 x 주 근무일수 보조 입력은 사용자가 눌러서 1주 소정근로시간에 반영한다.
  const [helper, setHelper] = useState<HelperState>({ dailyHours: 8, daysPerWeek: 5 });
  const [wageResetToken, setWageResetToken] = useState(0);
  const [hoursResetToken, setHoursResetToken] = useState(0);

  const applyWage = (next: number) => {
    setHourlyWage(next);
    setWageResetToken((token) => token + 1);
  };
  const applyHours = (next: number) => {
    setWeeklyHours(next);
    setHoursResetToken((token) => token + 1);
  };

  const { result, error } = useMemo<{
    result: WeeklyHolidayAllowanceResult | null;
    error?: string;
  }>(() => {
    try {
      return {
        result: calculateWeeklyHolidayAllowance({
          hourlyWage,
          weeklyHours,
          fullAttendance,
        }),
      };
    } catch (cause) {
      return {
        result: null,
        error:
          cause instanceof Error
            ? cause.message
            : '시급과 주 소정근로시간을 다시 확인해 주세요.',
      };
    }
  }, [hourlyWage, weeklyHours, fullAttendance]);

  const totalWeeklyPay = result ? result.weeklyWorkPay + result.weeklyPay : 0;

  const heroLabel = result && result.eligible ? '1주 주휴수당' : '주휴수당';
  const heroValue = (() => {
    if (!result) return '입력값을 확인해 주세요';
    if (!result.eligible) return '0원';
    return formatWon(result.weeklyPay);
  })();

  const reasonMessage = (() => {
    if (!result || result.eligible) return undefined;
    if (result.reason === 'under15') {
      return '4주 평균 주 15시간 미만이라 주휴수당이 생기지 않아요 (근로기준법 §18③).';
    }
    if (result.reason === 'absence') {
      return '결근한 주는 주휴수당이 생기지 않아요 (근로기준법 시행령 §30①).';
    }
    return undefined;
  })();

  const heroNote = (() => {
    if (!result) return undefined;
    if (!result.eligible) return reasonMessage;
    const base = `주 ${formatHours(result.countedHours)} ÷ 40 × 8 × ${hourlyWage.toLocaleString('ko-KR')}원`;
    return result.cappedHours
      ? `${base} · 주 40시간 초과분은 연장근로라 주휴 계산에서 제외`
      : base;
  })();

  const rows: ResultRowProps[] = result && result.eligible
    ? [
        {
          label: '주휴시간',
          value: formatHours(result.paidHours),
          note: '1주 소정근로시간 ÷ 40 × 8 (최대 8시간)',
          emphasize: false,
        },
        {
          label: '월 환산 주휴수당 (약)',
          value: formatWon(result.monthlyPay),
          note: '365 ÷ 7 ÷ 12주 (약 4.345주) 기준',
          emphasize: false,
        },
        {
          label: '1주 총 임금',
          value: formatWon(totalWeeklyPay),
          note: '소정근로 임금 + 주휴수당',
        },
        {
          label: '주휴 포함 실질 시급',
          value: formatWon(result.effectiveHourlyWage),
          note: '시급 × 6/5 (주휴시간 반영)',
        },
      ]
    : [];

  const cappedNote = result && result.cappedHours
    ? '소정근로시간은 주 40시간까지만 반영돼요. 연장근로는 주휴 계산에 넣지 않아요 (근로기준법 §50①).'
    : undefined;

  return (
    <CalculatorWorkspace className="grid gap-6 lg:grid-cols-2" slug={SLUG}>
      <FormCard title="주휴수당 계산에 필요한 값">
        <div className="flex flex-col gap-3">
          <NumberInput
            id="weekly-holiday-hourly-wage"
            label="시급"
            value={hourlyWage}
            onChange={setHourlyWage}
            min={0}
            max={1_000_000}
            integer
            debounceMs={0}
            unit="원"
            resetToken={wageResetToken}
            helpText="세전 통상시급을 원 단위 정수로 입력하세요."
          />
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="시급 빠른 선택"
          >
            <button
              type="button"
              onClick={() => applyWage(MINIMUM_HOURLY_WAGE_2026)}
              className="min-h-10 rounded-chip border border-border-base bg-bg-raised px-3 py-2 text-sm text-text-primary hover:border-primary-500"
            >
              2026 최저시급 {MINIMUM_HOURLY_WAGE_2026.toLocaleString('ko-KR')}원
            </button>
            <button
              type="button"
              onClick={() => applyWage(MINIMUM_HOURLY_WAGE_2027)}
              className="min-h-10 rounded-chip border border-border-base bg-bg-raised px-3 py-2 text-sm text-text-primary hover:border-primary-500"
            >
              2027 최저시급 {MINIMUM_HOURLY_WAGE_2027.toLocaleString('ko-KR')}원
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <NumberInput
            id="weekly-holiday-weekly-hours"
            label="1주 소정근로시간"
            value={weeklyHours}
            onChange={setWeeklyHours}
            min={0}
            max={168}
            debounceMs={0}
            unit="시간"
            resetToken={hoursResetToken}
            helpText="4주 평균 기준. 연장근로시간은 넣지 마세요. 소수 둘째 자리까지 입력할 수 있습니다."
          />
          <fieldset className="flex flex-col gap-3 rounded-xl border border-border-base bg-bg-raised p-3">
            <legend className="px-1 text-sm font-medium text-text-primary">
              하루 근무시간 × 주 근무일수로 채우기
            </legend>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1 text-xs text-text-secondary">
                하루 근무시간
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={24}
                  step={0.5}
                  value={helper.dailyHours}
                  onChange={(event) =>
                    setHelper((previous) => ({
                      ...previous,
                      dailyHours: Number(event.target.value) || 0,
                    }))
                  }
                  aria-label="하루 근무시간"
                  className="min-h-10 rounded-lg border border-border-base bg-bg-card px-3 py-2 text-right text-base tabular-nums text-text-primary"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs text-text-secondary">
                주 근무일수
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={7}
                  step={1}
                  value={helper.daysPerWeek}
                  onChange={(event) =>
                    setHelper((previous) => ({
                      ...previous,
                      daysPerWeek: Number(event.target.value) || 0,
                    }))
                  }
                  aria-label="주 근무일수"
                  className="min-h-10 rounded-lg border border-border-base bg-bg-card px-3 py-2 text-right text-base tabular-nums text-text-primary"
                />
              </label>
            </div>
            <button
              type="button"
              onClick={() => {
                const raw = helper.dailyHours * helper.daysPerWeek;
                const rounded = Math.min(168, Math.max(0, Math.round(raw * 100) / 100));
                applyHours(rounded);
              }}
              className="min-h-10 self-start rounded-chip border border-primary-500 bg-primary-50 px-3 py-2 text-sm font-medium text-primary-700 hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-200"
            >
              1주 소정근로시간에 넣기 ({(helper.dailyHours * helper.daysPerWeek).toLocaleString('ko-KR', { maximumFractionDigits: 2 })}시간)
            </button>
          </fieldset>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border-base bg-bg-card p-3">
          <input
            type="checkbox"
            checked={fullAttendance}
            onChange={(event) => setFullAttendance(event.target.checked)}
            className="mt-1 h-4 w-4 accent-primary-500"
            aria-describedby="weekly-holiday-attendance-help"
          />
          <span className="flex flex-col gap-0.5 text-sm">
            <span className="font-medium text-text-primary">
              이번 주 소정근로일을 모두 출근했어요
            </span>
            <span id="weekly-holiday-attendance-help" className="text-xs text-text-secondary">
              근로기준법 시행령 §30① 개근 요건. 한 번이라도 결근한 주는 체크 해제하세요.
            </span>
          </span>
        </label>

        {error ? (
          <p role="alert" className="text-sm text-danger-500">
            {error}
          </p>
        ) : null}
        <p className="text-xs text-text-secondary">
          주 {WEEKLY_HOLIDAY_MIN_WEEKLY_HOURS}시간 이상 · 그 주 개근이면 주휴수당이 생겨요. 통상근로자 주 5일 사업장을 가정합니다.
        </p>
      </FormCard>

      <ResultCard
        title={error ? '입력 확인 필요' : '주휴수당 참고 계산'}
        heroLabel={heroLabel}
        heroValue={heroValue}
        heroNote={heroNote}
        rows={rows}
        empty={!result}
        visibleRowCount={4}
      >
        {result && !result.eligible && reasonMessage ? (
          <div className="rounded-xl border border-border-base bg-bg-base p-3 text-sm text-text-primary">
            {reasonMessage}
          </div>
        ) : null}
        {cappedNote ? (
          <p className="text-xs leading-relaxed text-text-secondary">{cappedNote}</p>
        ) : null}
        <p className="text-xs leading-relaxed text-text-secondary">
          시급 × 통상근로자 주 5일 가정으로 계산한 참고액입니다. 월급제는 월급에 주휴수당이 포함되는 경우가 많으니 근로계약서와 급여명세서에서 지급 방식을 확인하세요.
        </p>
      </ResultCard>
    </CalculatorWorkspace>
  );
}
