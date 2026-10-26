'use client';

/**
 * 연차 유급휴가 계산기 UI.
 *
 * 계산 로직: src/lib/work/annual-leave.ts (수정 금지, import 전용)
 * 상수: src/lib/constants/labor-rules-2026.ts
 * 명세: docs/calculator-spec/연차.md, ADR-018
 */

import { useEffect, useMemo } from 'react';
import { CalculatorWorkspace } from '@/components/calculator/CalculatorWorkspace';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard, type ResultRowProps } from '@/components/calculator/Result';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';
import {
  calculateAnnualLeave,
  type AnnualLeaveBlock,
  type AnnualLeaveResult,
} from '@/lib/work/annual-leave';
import {
  MINIMUM_HOURLY_WAGE_2026,
  MONTHLY_ORDINARY_HOURS,
  STANDARD_WEEKLY_HOURS,
} from '@/lib/constants/labor-rules-2026';

const SLUG = 'annual-leave';
const KEY_PREFIX = 'annual-leave';

type WageMode = 'monthly' | 'hourly';
type FivePlusChoice = 'yes' | 'no';

const WAGE_UNIT_BUTTONS = [
  { label: '백만', value: 1_000_000 },
  { label: '십만', value: 100_000 },
  { label: '만', value: 10_000 },
];

const formatWon = (value: number) => `${Math.round(value).toLocaleString('ko-KR')}원`;
const formatDays = (value: number) =>
  `${value.toLocaleString('ko-KR', { maximumFractionDigits: 2 })}일`;
const formatHours = (value: number) =>
  `${value.toLocaleString('ko-KR', { maximumFractionDigits: 2 })}시간`;

function toYmd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function todayYmd(): string {
  return toYmd(new Date());
}
function oneYearAgoYmd(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return toYmd(d);
}
function addOneDay(ymd: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ymd)) return '';
  const [y, m, d] = ymd.split('-').map(Number) as [number, number, number];
  const date = new Date(Date.UTC(y, m - 1, d));
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}

function blockStatus(block: AnnualLeaveBlock, untilDate: string): string {
  if (block.accruedOn > untilDate) return '예정';
  if (block.usableOnUntilDate) return '사용 가능';
  return '기한 지남';
}

interface AccrualRow {
  key: string;
  accruedOn: string;
  label: string;
  amount: string;
  usableUntil: string;
  status: string;
}

function buildAccrualRows(
  result: AnnualLeaveResult,
  untilDate: string,
  shortTime: boolean,
): AccrualRow[] {
  const rows: AccrualRow[] = [];

  const monthlyBlocks = result.blocks.filter((b) => b.kind === 'monthly');
  const firstMonthly = monthlyBlocks[0];
  if (firstMonthly) {
    const accruedCount = monthlyBlocks.filter((b) => b.accruedOn <= untilDate).length;
    const usableCount = monthlyBlocks.filter((b) => b.usableOnUntilDate).length;
    const totalDays = accruedCount;
    const totalHours = monthlyBlocks
      .filter((b) => b.accruedOn <= untilDate)
      .reduce((sum, b) => sum + b.hours, 0);
    const lastAccrued = accruedCount > 0 ? monthlyBlocks[accruedCount - 1] : undefined;
    const dateDisplay = (() => {
      if (accruedCount === 0) return `${firstMonthly.accruedOn} 예정`;
      if (!lastAccrued || accruedCount === 1) return firstMonthly.accruedOn;
      return `${firstMonthly.accruedOn} ~ ${lastAccrued.accruedOn}`;
    })();
    const amount = shortTime
      ? `${formatHours(totalHours)} (약 ${totalDays}일)`
      : `${totalDays}일`;
    const status = (() => {
      if (accruedCount === 0) return '예정';
      if (usableCount > 0) return '사용 가능';
      return '기한 지남';
    })();
    rows.push({
      key: 'monthly',
      accruedOn: dateDisplay,
      label: `1년 미만 월 연차 (발생 ${accruedCount}개)`,
      amount,
      usableUntil: firstMonthly.usableUntil,
      status,
    });
  }

  for (const b of result.blocks.filter((b) => b.kind === 'annual')) {
    const amount = shortTime ? `${formatHours(b.hours)} (${b.days}일)` : `${b.days}일`;
    rows.push({
      key: `annual-${b.serviceYear}`,
      accruedOn: b.accruedOn,
      label: `${b.serviceYear}년차`,
      amount,
      usableUntil: b.usableUntil,
      status: blockStatus(b, untilDate),
    });
  }

  return rows;
}

export function AnnualLeaveCalculator() {
  const [hireDate, setHireDate] = useCalculatorState<string>(`${KEY_PREFIX}:hireDate`, '');
  const [untilDate, setUntilDate] = useCalculatorState<string>(`${KEY_PREFIX}:untilDate`, '');
  const [weeklyHours, setWeeklyHours] = useCalculatorState<number>(
    `${KEY_PREFIX}:weeklyHours`,
    STANDARD_WEEKLY_HOURS,
  );
  const [fivePlus, setFivePlus] = useCalculatorState<FivePlusChoice>(
    `${KEY_PREFIX}:fivePlus`,
    'yes',
  );
  const [usedDays, setUsedDays] = useCalculatorState<number>(`${KEY_PREFIX}:usedDays`, 0);
  const [wageMode, setWageMode] = useCalculatorState<WageMode>(
    `${KEY_PREFIX}:wageMode`,
    'monthly',
  );
  const [monthlyWage, setMonthlyWage] = useCalculatorState<number>(
    `${KEY_PREFIX}:monthlyWage`,
    3_000_000,
  );
  const [hourlyWage, setHourlyWage] = useCalculatorState<number>(
    `${KEY_PREFIX}:hourlyWage`,
    MINIMUM_HOURLY_WAGE_2026,
  );

  // "오늘" 과 "1년 전" 기본값은 하이드레이션 이후에만 세팅한다.
  // 서버 렌더와 클라이언트 첫 렌더는 모두 빈 문자열이라 미스매치가 없다.
  useEffect(() => {
    setHireDate((prev) => prev || oneYearAgoYmd());
    setUntilDate((prev) => prev || todayYmd());
  }, [setHireDate, setUntilDate]);

  const supportsMonthlyWage = weeklyHours === STANDARD_WEEKLY_HOURS;
  const effectiveWageMode: WageMode = supportsMonthlyWage ? wageMode : 'hourly';
  const computedHourlyWage = useMemo(() => {
    if (effectiveWageMode === 'monthly') {
      return Math.max(0, Math.round(monthlyWage / MONTHLY_ORDINARY_HOURS));
    }
    return Math.max(0, Math.round(hourlyWage));
  }, [effectiveWageMode, monthlyWage, hourlyWage]);

  const { result, error } = useMemo<{ result: AnnualLeaveResult | null; error?: string }>(() => {
    if (!hireDate || !untilDate) return { result: null };
    try {
      return {
        result: calculateAnnualLeave({
          hireDate,
          untilDate,
          weeklyHours,
          fivePlus: fivePlus === 'yes',
          usedDays,
          hourlyWage: computedHourlyWage,
        }),
      };
    } catch (cause) {
      return {
        result: null,
        error:
          cause instanceof Error
            ? cause.message
            : '입력한 날짜와 숫자를 다시 확인해 주세요.',
      };
    }
  }, [hireDate, untilDate, weeklyHours, fivePlus, usedDays, computedHourlyWage]);

  const shortTime = !!result && result.eligible && result.dailyHours < 8;
  const remainingDays =
    result && result.eligible ? Math.max(0, result.availableDays - usedDays) : 0;
  const nearAnniversary = !!(
    result &&
    result.eligible &&
    result.completedYears === 0 &&
    result.nextAccrual &&
    result.nextAccrual.days === 15 &&
    hireDate &&
    untilDate &&
    addOneDay(untilDate) === result.nextAccrual.date
  );

  const reasonMessage = (() => {
    if (!result || result.eligible) return undefined;
    if (result.reason === 'under15') {
      return '4주 평균 주 15시간 미만이면 연차가 생기지 않아요 (근로기준법 §18③).';
    }
    if (result.reason === 'under5') {
      return '상시 5명 미만 사업장은 연차 규정이 적용되지 않아요 (근로기준법 시행령 §7 별표1).';
    }
    return undefined;
  })();

  const heroValue = (() => {
    if (!result) return '입력을 확인해 주세요';
    if (!result.eligible) return '0일';
    if (shortTime) {
      return `${formatHours(result.availableHours)} (하루 ${result.dailyHours.toLocaleString(
        'ko-KR',
        { maximumFractionDigits: 2 },
      )}시간 기준 약 ${result.availableDays}일)`;
    }
    return `${result.availableDays}일`;
  })();

  const heroNote = (() => {
    if (!result) return error;
    if (!result.eligible) return '법정 연차가 생기지 않는 경우예요. 이유는 아래에 있어요.';
    if (shortTime) {
      return `주 ${weeklyHours.toLocaleString('ko-KR')}시간 기준, 통상근로자 일수에 비례해 산정 (시행령 §9 별표2).`;
    }
    return `입사일 기준 (주 ${weeklyHours.toLocaleString('ko-KR')}시간) 쌓인 연차의 합계예요.`;
  })();

  const rows: ResultRowProps[] = [];
  if (result && result.eligible) {
    rows.push({
      label: '남은 연차',
      value: shortTime
        ? `${formatHours(Math.max(0, result.unusedHours))} (약 ${formatDays(remainingDays)})`
        : `${remainingDays}일`,
      note: usedDays > 0 ? `이미 쓴 ${usedDays}일 제외` : '아직 쓴 연차 없음',
    });
    rows.push({
      label: '미사용 연차수당',
      value: formatWon(result.allowance),
      note: `시급 ${computedHourlyWage.toLocaleString('ko-KR')}원 × 미사용 시간 (원 미만 반올림)`,
    });
    if (result.nextAccrual) {
      rows.push({
        label: '다음 연차 발생일',
        value: `${result.nextAccrual.date} (${result.nextAccrual.days}일)`,
      });
    }
    rows.push({
      label: '근속',
      value: `${result.serviceDays.toLocaleString('ko-KR')}일 (꽉 찬 ${result.completedYears}년)`,
    });
  }

  const accrualRows =
    result && result.eligible ? buildAccrualRows(result, untilDate, shortTime) : [];

  return (
    <CalculatorWorkspace className="grid gap-6 lg:grid-cols-2" slug={SLUG}>
      <FormCard title="연차 계산에 필요한 값">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="annual-leave-hire-date"
              className="text-sm font-medium text-text-primary"
            >
              입사일
            </label>
            <input
              id="annual-leave-hire-date"
              type="date"
              value={hireDate}
              onChange={(event) => setHireDate(event.target.value)}
              className="min-h-12 w-full rounded-xl border border-border-base bg-bg-card px-4 py-3 text-text-primary focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              lang="ko"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="annual-leave-until-date"
              className="text-sm font-medium text-text-primary"
            >
              기준일
            </label>
            <input
              id="annual-leave-until-date"
              type="date"
              value={untilDate}
              onChange={(event) => setUntilDate(event.target.value)}
              className="min-h-12 w-full rounded-xl border border-border-base bg-bg-card px-4 py-3 text-text-primary focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              lang="ko"
            />
          </div>
        </div>
        <p className="text-xs leading-relaxed text-text-secondary">
          퇴사하면 마지막 근무일을 넣으세요. 연차는 1년을 채운 다음 날에도 다니고 있어야 생깁니다.
        </p>

        <NumberInput
          id="annual-leave-weekly-hours"
          label="1주 소정근로시간"
          value={weeklyHours}
          onChange={setWeeklyHours}
          min={0}
          max={168}
          unit="시간"
          debounceMs={0}
          helpText="4주 평균 기준. 연장근로는 넣지 마세요. 주 40시간 미만이면 통상근로자 일수에 비례해 산정합니다 (시행령 §9 별표2)."
        />

        <RadioGroup<FivePlusChoice>
          id="annual-leave-five-plus"
          label="상시 근로자 5명 이상 사업장인가요?"
          value={fivePlus}
          onChange={setFivePlus}
          options={[
            { value: 'yes', label: '예' },
            { value: 'no', label: '아니오' },
          ]}
        />

        <NumberInput
          id="annual-leave-used-days"
          label="이미 쓴 연차"
          value={usedDays}
          onChange={setUsedDays}
          min={0}
          max={400}
          unit="일"
          debounceMs={0}
          helpText="0.5일 단위로 입력할 수 있습니다. 아직 안 쓴 분은 0으로 두세요."
        />

        <RadioGroup<WageMode>
          id="annual-leave-wage-mode"
          label="임금 입력 방식"
          value={effectiveWageMode}
          onChange={setWageMode}
          options={[
            { value: 'monthly', label: '월 통상임금' },
            { value: 'hourly', label: '통상시급' },
          ]}
        />
        {!supportsMonthlyWage ? (
          <p className="text-xs leading-relaxed text-text-secondary">
            주 40시간이 아닐 때는 월 ÷ 209시간이 그대로 적용되지 않아 시급 입력만 사용해요.
          </p>
        ) : null}
        {effectiveWageMode === 'monthly' && supportsMonthlyWage ? (
          <NumberInput
            id="annual-leave-monthly-wage"
            label="월 통상임금"
            value={monthlyWage}
            onChange={setMonthlyWage}
            min={0}
            unit="원"
            unitButtons={WAGE_UNIT_BUTTONS}
            helpText="월급 중 통상임금(기본급 + 고정수당)만 넣으세요. 시급 환산은 월 ÷ 209시간 (주 40시간 기준)."
          />
        ) : (
          <NumberInput
            id="annual-leave-hourly-wage"
            label="통상시급"
            value={hourlyWage}
            onChange={setHourlyWage}
            min={0}
            integer
            unit="원"
            helpText="세전 통상시급을 원 단위 정수로 넣으세요. 2026 최저시급은 10,320원이에요."
          />
        )}

        {error ? (
          <p role="alert" className="text-sm text-danger-500">
            {error}
          </p>
        ) : null}
      </FormCard>

      <div className="min-w-0 lg:min-h-[28rem]">
        <ResultCard
          title={result && !result.eligible ? '적용 제외 안내' : '연차 참고 계산'}
          heroLabel="지금 쓸 수 있는 연차"
          heroValue={heroValue}
          heroNote={heroNote}
          rows={rows}
          empty={!result}
          visibleRowCount={4}
        >
          {nearAnniversary ? (
            <div className="rounded-xl border border-primary-500/40 bg-primary-500/10 p-3 text-sm text-primary-700 dark:text-primary-200">
              하루만 더 다니면 (기념일까지) 1년차 15일이 생겨요.
            </div>
          ) : null}
          {result && !result.eligible && reasonMessage ? (
            <div className="rounded-xl border border-border-base bg-bg-base p-3 text-sm text-text-primary">
              {reasonMessage}
            </div>
          ) : null}
          {accrualRows.length > 0 ? (
            <div className="min-w-0 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-text-primary">
                <caption className="pb-2 text-left text-xs text-text-secondary">
                  발생 내역 (근로기준법 §60)
                </caption>
                <thead className="bg-bg-raised text-xs uppercase text-text-secondary">
                  <tr>
                    <th scope="col" className="whitespace-nowrap px-3 py-2 font-medium">
                      발생일
                    </th>
                    <th scope="col" className="whitespace-nowrap px-3 py-2 font-medium">
                      구분
                    </th>
                    <th scope="col" className="whitespace-nowrap px-3 py-2 font-medium">
                      일수
                    </th>
                    <th scope="col" className="whitespace-nowrap px-3 py-2 font-medium">
                      사용 기한
                    </th>
                    <th scope="col" className="whitespace-nowrap px-3 py-2 font-medium">
                      상태
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {accrualRows.map((row) => (
                    <tr key={row.key} className="border-t border-border-subtle">
                      <td className="whitespace-nowrap px-3 py-2 tabular-nums">
                        {row.accruedOn}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2">{row.label}</td>
                      <td className="whitespace-nowrap px-3 py-2 tabular-nums">{row.amount}</td>
                      <td className="whitespace-nowrap px-3 py-2 tabular-nums">
                        {row.usableUntil}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
          <p className="text-xs leading-relaxed text-text-secondary">
            매년 출근율 80% 이상, 입사일 기준으로 계산한 참고값이에요. 실제 지급은 회사 규정과 사용
            촉진 여부에 따라 다를 수 있어요.
          </p>
        </ResultCard>
      </div>
    </CalculatorWorkspace>
  );
}
