'use client';
import { CalculatorDetails } from '@/components/calculator/CalculatorDetails';

import {
  CalculatorWorkspace,
  useCalculatorWorkspace,
} from '@/components/calculator/CalculatorWorkspace';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';

/**
 * 퇴직금 계산기 — MVP #2
 *
 * 명세: docs/calculator-spec/퇴직금.md
 * 공식: src/lib/tax/severance.ts
 */

import { useEffect, useMemo } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard, type ResultRowProps } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import { calculateSeverance, type SeverancePlanType } from '@/lib/tax/severance';

// Preserve the corrected formula's won precision; the shared formatter truncates tens.
const formatKRW = (value: number) => `${Math.round(value).toLocaleString('ko-KR')}원`;
const formatDailyKRW = (value: number) =>
  `${value.toLocaleString('ko-KR', { maximumFractionDigits: 2 })}원`;

// ============================================
// 입력 UI 상수
// ============================================

const WAGE_UNIT_BUTTONS = [
  { label: '천만', value: 10_000_000 },
  { label: '백만', value: 1_000_000 },
  { label: '십만', value: 100_000 },
];

const ALLOWANCE_UNIT_BUTTONS = [
  { label: '백만', value: 1_000_000 },
  { label: '십만', value: 100_000 },
];

function SeveranceReadiness({ error }: { error?: string }) {
  const reportValidity = useCalculatorWorkspace()?.reportValidity;
  useEffect(() => {
    reportValidity?.('severance:conditions', error);
    return () => reportValidity?.('severance:conditions');
  }, [error, reportValidity]);
  if (!error) return null;
  return (
    <div
      data-testid="severance-conditions"
      tabIndex={-1}
      aria-invalid="true"
      aria-live="polite"
      className="rounded-lg border border-border-base p-4 text-sm text-text-primary"
    >
      <strong>조건 확인 필요</strong>
      <p className="mt-1">{error}</p>
    </div>
  );
}

// ============================================
// 메인 계산기 컴포넌트
// ============================================

export function SeveranceCalculator() {
  // 기본 입력값
  const [hireDate, setHireDate] = useCalculatorState('severance:hireDate', '2014-01-01'); // 12년 근무 예시
  const [leaveDate, setLeaveDate] = useCalculatorState('severance:leaveDate', '2026-04-24'); // 오늘
  const [monthlyOrdinaryWage, setMonthlyOrdinaryWage] = useCalculatorState(
    'severance:monthlyOrdinaryWage',
    3_000_000,
  ); // 300만원
  const [monthlyExtraAllowance, setMonthlyExtraAllowance] = useCalculatorState(
    'severance:monthlyExtraAllowance',
    0,
  ); // 기타 수당
  const [annualBonus, setAnnualBonus] = useCalculatorState('severance:annualBonus', 0); // 연간 상여금
  const [annualLeaveAllowance, setAnnualLeaveAllowance] = useCalculatorState(
    'severance:annualLeaveAllowance',
    0,
  ); // 연차수당
  const [ordinaryWageMode, setOrdinaryWageMode] = useCalculatorState<'daily' | 'monthly'>(
    'severance:ordinaryWageMode',
    'daily',
  );
  const [ordinaryDailyWage, setOrdinaryDailyWage] = useCalculatorState(
    'severance:ordinaryDailyWage',
    0,
  );
  const [retirementMonthlyOrdinaryWage, setRetirementMonthlyOrdinaryWage] = useCalculatorState(
    'severance:retirementMonthlyOrdinaryWage',
    0,
  );
  const [monthlyOrdinaryHours, setMonthlyOrdinaryHours] = useCalculatorState(
    'severance:monthlyOrdinaryHours',
    209,
  );
  const [dailyOrdinaryHours, setDailyOrdinaryHours] = useCalculatorState(
    'severance:dailyOrdinaryHours',
    8,
  );
  const [workCondition, setWorkCondition] = useCalculatorState<
    'unknown' | 'ordinary' | 'shortHours' | 'exception'
  >('severance:workCondition', 'unknown');

  // 퇴직연금 제도 & 세금
  const [planType, setPlanType] = useCalculatorState<SeverancePlanType>(
    'severance:planType',
    'statutory',
  );
  const [includeTax, setIncludeTax] = useCalculatorState('severance:includeTax', true);

  // 계산 수행
  const { result, error } = useMemo(() => {
    try {
      if (!hireDate || !leaveDate)
        throw new Error('입사일과 마지막 근무일 다음날인 퇴직일을 입력해 주세요.');
      if (workCondition !== 'ordinary')
        throw new Error(
          '주 15시간 이상이고 휴직·임금 변동 등 별도 검토 사항이 없는 일반 근무 조건만 지원합니다. 해당 여부를 확인하거나 고용노동부·회사 담당자에게 산정을 요청해 주세요.',
        );
      if (!Number.isFinite(monthlyOrdinaryWage) || monthlyOrdinaryWage <= 0)
        throw new Error(
          '직전 3개월 임금의 월평균 기초액을 입력해 주세요. 0원과 미입력은 확정 계산할 수 없습니다.',
        );
      const dailyWage =
        ordinaryWageMode === 'daily'
          ? ordinaryDailyWage
          : (retirementMonthlyOrdinaryWage / monthlyOrdinaryHours) * dailyOrdinaryHours;
      if (
        ordinaryWageMode === 'monthly' &&
        (!Number.isFinite(monthlyOrdinaryHours) ||
          monthlyOrdinaryHours <= 0 ||
          !Number.isFinite(dailyOrdinaryHours) ||
          dailyOrdinaryHours <= 0 ||
          !Number.isFinite(retirementMonthlyOrdinaryWage) ||
          retirementMonthlyOrdinaryWage <= 0)
      )
        throw new Error('퇴직 당시 월 통상임금과 월·일 통상임금 산정 시간을 확인해 주세요.');
      if (!Number.isFinite(dailyWage) || dailyWage <= 0)
        throw new Error(
          '퇴직 당시 1일 통상임금을 확인해 입력해 주세요. 평균임금 자료를 통상임금으로 자동 적용하지 않습니다.',
        );
      const calculated = calculateSeverance({
        hireDate,
        leaveDate,
        monthlyOrdinaryWage,
        ordinaryDailyWage: dailyWage,
        monthlyExtraAllowance,
        annualBonus,
        annualLeaveAllowance,
        planType,
        includeTax,
      });
      return { result: calculated, error: undefined };
    } catch (cause) {
      return {
        result: null,
        error: cause instanceof Error ? cause.message : '입력 조건을 확인해 주세요.',
      };
    }
  }, [
    hireDate,
    leaveDate,
    monthlyOrdinaryWage,
    monthlyExtraAllowance,
    annualBonus,
    annualLeaveAllowance,
    planType,
    includeTax,
    ordinaryWageMode,
    ordinaryDailyWage,
    retirementMonthlyOrdinaryWage,
    monthlyOrdinaryHours,
    dailyOrdinaryHours,
    workCondition,
  ]);

  // 결과 카드 행 구성
  const resultRows: ResultRowProps[] = useMemo(() => {
    if (!result) return [];

    const rows: ResultRowProps[] = [
      {
        label: '재직일수',
        value: `${result.serviceDays.toLocaleString('ko-KR')}일`,
      },
      {
        label: '재직 연수',
        value: `${result.serviceYears.toFixed(2)}년`,
      },
      {
        label: '1일 평균임금',
        value: formatDailyKRW(result.averageDailyWage),
      },
      {
        label: '법정 퇴직금',
        value: formatKRW(result.statutorySeverance),
      },
      {
        label: '1일 통상임금',
        value:
          result.ordinaryDailyWage === null ? '미확인' : formatDailyKRW(result.ordinaryDailyWage),
      },
      {
        label: '적용 1일 임금',
        value: formatDailyKRW(result.basisDailyWage),
        note:
          result.wageBasis === 'ordinary'
            ? '통상임금이 평균임금보다 높아 적용'
            : '평균임금과 통상임금 비교 후 적용',
      },
      { label: '직전 3개월 산정일수', value: `${result.threeMonthDays.toLocaleString('ko-KR')}일` },
    ];

    // 세금 포함 시에만 추가 항목
    if (includeTax && result.retirementIncomeTax > 0) {
      rows.push(
        {
          label: '퇴직소득세',
          value: formatKRW(result.retirementIncomeTax),
        },
        {
          label: '지방소득세',
          value: formatKRW(result.localIncomeTax),
        },
      );
    }

    return rows;
  }, [result, includeTax]);

  // warnings 알림
  const warningElements = useMemo(() => {
    if (!result || result.warnings.length === 0) return null;

    return (
      <div className="rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-4">
        <p className="text-sm font-medium text-text-primary">주의사항</p>
        <ul className="mt-2 space-y-1">
          {result.warnings.map((warn, idx) => (
            <li key={idx} className="text-sm text-text-secondary">
              • {warn}
            </li>
          ))}
        </ul>
      </div>
    );
  }, [result]);

  // DC형 추가 안내
  const dcNote = useMemo(() => {
    if (planType !== 'DC') return null;
    return (
      <div className="rounded-lg border border-primary-500/30 bg-primary-500/5 p-4">
        <p className="text-sm text-text-secondary">
          DC형의 실제 수령액은 적립금·운용수익 등을 확인해야 합니다. 아래 값은 평균임금과 통상임금을
          비교한 법정 퇴직금 기준 참고액이며, 실제 DC 적립금·수령액 계산을 지원하지 않습니다.
        </p>
      </div>
    );
  }, [planType]);

  return (
    <CalculatorWorkspace className="grid gap-6 lg:grid-cols-2" slug="severance">
      <div className="min-w-0 space-y-5">
        {/* ===== 입력 폼 ===== */}
        <FormCard title="퇴직금 계산 입력">
          <div className="flex flex-col gap-5">
            {/* 입사일 / 퇴사일 */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="hire-date" className="text-sm font-medium text-text-primary">
                  입사일
                </label>
                <input
                  id="hire-date"
                  type="date"
                  required
                  value={hireDate}
                  onChange={(e) => setHireDate(e.target.value)}
                  className="w-full rounded-lg border border-border-base bg-bg-card px-4 py-3 text-text-primary focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  lang="ko"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="leave-date" className="text-sm font-medium text-text-primary">
                  퇴직일 (마지막 근무일 다음날)
                </label>
                <input
                  id="leave-date"
                  type="date"
                  required
                  value={leaveDate}
                  onChange={(e) => setLeaveDate(e.target.value)}
                  className="w-full rounded-lg border border-border-base bg-bg-card px-4 py-3 text-text-primary focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  lang="ko"
                />
              </div>
            </div>
            <p className="text-sm text-text-secondary">
              마지막 근무일이 2026-09-30이면 퇴직일은 2026-10-01입니다. 퇴직일은 재직기간에서
              제외합니다. 저장된 날짜는 그대로 유지되므로 마지막 근무일을 입력했다면 확인해
              수정하세요.
            </p>

            {/* 월 통상임금 */}
            <NumberInput
              id="monthly-ordinary-wage"
              label="직전 3개월 월평균 임금 기초액"
              value={monthlyOrdinaryWage}
              onChange={setMonthlyOrdinaryWage}
              placeholder="예: 3000000"
              unit="원"
              unitButtons={WAGE_UNIT_BUTTONS}
              min={1}
              helpText="직전 3개월의 기본급·고정수당 합계 ÷ 3입니다. 아래에 별도 입력하는 기타수당·상여금·연차수당을 중복 포함하지 마세요. 퇴직 당시 통상임금과는 별도 자료입니다."
            />

            <RadioGroup<'unknown' | 'ordinary' | 'shortHours' | 'exception'>
              id="work-condition"
              label="근무 조건 확인"
              value={workCondition}
              onChange={setWorkCondition}
              options={[
                { value: 'unknown', label: '확인 필요' },
                { value: 'ordinary', label: '주 15시간 이상·별도 예외 없음' },
                { value: 'shortHours', label: '주 15시간 미만' },
                { value: 'exception', label: '휴직·불규칙 임금 등 예외' },
              ]}
            />
            <p className="text-sm text-text-secondary">
              평균임금 산정에서 제외할 휴직 기간이나 불규칙한 임금, 근로시간 변동 등이 있으면 별도
              산정이 필요합니다. 이 화면은 해당 예외 조건의 확정 지급액을 계산하지 않습니다.
            </p>
            <RadioGroup<'daily' | 'monthly'>
              id="ordinary-wage-mode"
              label="퇴직 당시 통상임금 입력 방식"
              value={ordinaryWageMode}
              onChange={setOrdinaryWageMode}
              options={[
                { value: 'daily', label: '1일 통상임금 직접 입력' },
                { value: 'monthly', label: '월 통상임금과 산정 시간' },
              ]}
            />
            {ordinaryWageMode === 'daily' ? (
              <NumberInput
                id="ordinary-daily-wage"
                label="퇴직 당시 1일 통상임금"
                value={ordinaryDailyWage}
                onChange={setOrdinaryDailyWage}
                min={0}
                unit="원"
                helpText="회사 담당자 등에게 확인한 1일 통상임금을 입력하세요. 원 미만 소수 입력을 유지해 비교하며, 초기 0은 미확인 상태입니다."
              />
            ) : (
              <>
                <NumberInput
                  id="retirement-monthly-ordinary-wage"
                  label="퇴직 당시 월 통상임금"
                  value={retirementMonthlyOrdinaryWage}
                  onChange={setRetirementMonthlyOrdinaryWage}
                  min={0}
                  unit="원"
                  unitButtons={WAGE_UNIT_BUTTONS}
                  helpText="평균임금 계산 재료와 별개로 퇴직 당시 통상임금에 해당하는 월 금액을 확인하세요. 초기 0은 미확인입니다."
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <NumberInput
                    id="monthly-ordinary-hours"
                    label="월 통상임금 산정 기준시간"
                    value={monthlyOrdinaryHours}
                    onChange={setMonthlyOrdinaryHours}
                    min={0}
                    unit="시간"
                  />
                  <NumberInput
                    id="daily-ordinary-hours"
                    label="1일 소정근로시간"
                    value={dailyOrdinaryHours}
                    onChange={setDailyOrdinaryHours}
                    min={0}
                    max={24}
                    unit="시간"
                  />
                </div>
                <p className="text-sm text-text-secondary">
                  1일 통상임금 = 월 통상임금 ÷ 월 산정 기준시간 × 1일 소정근로시간입니다. 기본
                  209시간·8시간은 주 40시간·주 5일의 표준 근무 가정입니다. 단시간 근로자에게 그대로
                  적용하지 마세요. 실제 산정 시간을 확인하거나 1일 통상임금을 직접 입력하세요.
                </p>
              </>
            )}

            {/* 기타 수당 */}
            <CalculatorDetails
              summary={`기타수당 ${formatKRW(monthlyExtraAllowance)} · 상여금 ${formatKRW(annualBonus)} · 연차수당 ${formatKRW(annualLeaveAllowance)}`}
            >
              <NumberInput
                id="monthly-extra-allowance"
                label="퇴직 전 3개월 기타 수당 총액 (옵션)"
                value={monthlyExtraAllowance}
                onChange={setMonthlyExtraAllowance}
                placeholder="0"
                unit="원"
                unitButtons={ALLOWANCE_UNIT_BUTTONS}
                helpText="위 기초액에 포함하지 않은 평균임금 산입 대상 수당의 직전 3개월 합계입니다. 같은 임금을 중복 입력하지 마세요."
              />

              {/* 연간 상여금 */}
              <NumberInput
                id="annual-bonus"
                label="연간 상여금 총액 (옵션)"
                value={annualBonus}
                onChange={setAnnualBonus}
                placeholder="0"
                unit="원"
                unitButtons={ALLOWANCE_UNIT_BUTTONS}
                helpText="평균임금 산입 대상으로 확인한 직전 1년 상여금 합계입니다. 예상 상여나 산입 대상이 아닌 금액은 넣지 마세요."
              />

              {/* 연차수당 */}
              <NumberInput
                id="annual-leave-allowance"
                label="연차수당 (연간) (옵션)"
                value={annualLeaveAllowance}
                onChange={setAnnualLeaveAllowance}
                placeholder="0"
                unit="원"
                unitButtons={ALLOWANCE_UNIT_BUTTONS}
                helpText="평균임금 산입 대상으로 확인한 직전 1년 연차수당입니다. 퇴직으로 새로 발생한 미사용 연차수당을 자동 포함하지 마세요."
              />
            </CalculatorDetails>

            {/* 퇴직연금 제도 */}
            <RadioGroup<SeverancePlanType>
              id="plan-type"
              label="퇴직연금 제도"
              value={planType}
              onChange={setPlanType}
              options={[
                { value: 'statutory', label: '법정퇴직금 (일반)' },
                { value: 'DB', label: 'DB형 확정급여' },
                { value: 'DC', label: 'DC형 확정기여' },
              ]}
            />

            {/* 세금 계산 */}
            <div className="flex items-center gap-3">
              <input
                id="include-tax"
                type="checkbox"
                checked={includeTax}
                onChange={(e) => setIncludeTax(e.target.checked)}
                className="h-5 w-5 rounded border-border-base text-primary-500 focus:ring-2 focus:ring-primary-500/30"
                aria-label="세금 계산 포함"
              />
              <label htmlFor="include-tax" className="text-sm font-medium text-text-primary">
                세금 계산 포함
              </label>
            </div>
            <SeveranceReadiness error={error} />
          </div>
        </FormCard>

        {/* ===== 결과 카드 ===== */}
      </div>
      <div className="min-w-0 space-y-4">
        {result ? (
          <>
            <ResultCard
              title={
                planType === 'DC' ? '법정 기준 참고 계산 (DC 적립금 제외)' : '퇴직금 참고 계산 결과'
              }
              heroLabel={includeTax ? '세후 법정 기준 참고액' : '법정 퇴직금 참고액'}
              heroNote={
                planType === 'DC'
                  ? 'DC 실제 적립금·운용수익 제외한 법정 기준 참고액 · 평균임금·통상임금 비교 · 최종 퇴직금 원 단위 반올림'
                  : '평균임금과 통상임금 중 큰 금액 적용 · 최종 퇴직금은 원 단위 반올림 참고액'
              }
              heroValue={
                includeTax ? formatKRW(result.netSeverance) : formatKRW(result.statutorySeverance)
              }
              rows={resultRows}
            >
              <div className="flex flex-col gap-4">
                {/* 세금 세부내역 */}
                {includeTax && result.serviceYearsDeduction > 0 && (
                  <details className="group">
                    <summary className="cursor-pointer text-sm font-medium text-text-primary hover:text-primary-500">
                      세부 내역 보기
                    </summary>
                    <div className="mt-3 space-y-2 border-t border-border-base pt-3">
                      <div className="flex items-baseline justify-between text-sm">
                        <span className="text-text-secondary">근속연수공제</span>
                        <span className="font-semibold tabular-nums">
                          {formatKRW(result.serviceYearsDeduction)}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between text-sm">
                        <span className="text-text-secondary">환산급여</span>
                        <span className="font-semibold tabular-nums">
                          {formatKRW(result.convertedSalary)}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between text-sm">
                        <span className="text-text-secondary">환산급여공제</span>
                        <span className="font-semibold tabular-nums">
                          {formatKRW(result.convertedSalaryDeduction)}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between text-sm">
                        <span className="text-text-secondary">과세표준</span>
                        <span className="font-semibold tabular-nums">
                          {formatKRW(result.retirementTaxableBase)}
                        </span>
                      </div>
                    </div>
                  </details>
                )}

                {/* warnings 알림 */}
                {warningElements}

                {/* DC형 안내 */}
                {dcNote}
              </div>
            </ResultCard>
            <ResultBanner />
          </>
        ) : (
          <>
            <ResultCard
              title="조건 확인 필요"
              heroLabel="퇴직금 참고 계산"
              heroValue="조건을 확인해 주세요"
              rows={[]}
              empty
            />
            {error && (
              <p
                role="status"
                className="rounded-lg border border-border-base p-4 text-sm text-text-primary"
              >
                {error}
              </p>
            )}
          </>
        )}
      </div>
    </CalculatorWorkspace>
  );
}
