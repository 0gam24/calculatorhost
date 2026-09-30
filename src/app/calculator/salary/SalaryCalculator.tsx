'use client';

import { useMemo } from 'react';
import { CalculatorWorkspace } from '@/components/calculator/CalculatorWorkspace';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';
import { CalculatorDetails } from '@/components/calculator/CalculatorDetails';
import { NextCalculation } from '@/components/calculator/NextCalculation';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import {
  calculateTakeHome,
  inferGrossFromNet,
  type WageType,
  type SeveranceInclusion,
} from '@/lib/tax/income';
import { formatKRW as formatCurrency } from '@/lib/utils';

const formatKRW = (value: number) => formatCurrency(value, { truncateTen: false });

type CalcDirection = 'forward' | 'reverse';
const YEARLY_BUTTONS = [
  { label: '천만', value: 10_000_000 },
  { label: '백만', value: 1_000_000 },
];
const MONTHLY_BUTTONS = [
  { label: '백만', value: 1_000_000 },
  { label: '십만', value: 100_000 },
];

export function SalaryCalculator() {
  const [direction, setDirection] = useCalculatorState<CalcDirection>(
    'salary:direction',
    'forward',
  );
  const [wageType, setWageType] = useCalculatorState<WageType>('salary:wageType', 'yearly');
  const [wageAmount, setWageAmount] = useCalculatorState('salary:wageAmount', 50_000_000);
  const [severance, setSeverance] = useCalculatorState<SeveranceInclusion>(
    'salary:severance',
    'separate',
  );
  const [targetMonthlyNet, setTargetMonthlyNet] = useCalculatorState(
    'salary:targetMonthlyNet',
    2_270_000,
  );
  const [nontaxableMonthly, setNontaxableMonthly] = useCalculatorState(
    'salary:nontaxableMonthly',
    200_000,
  );
  const [dependents, setDependents] = useCalculatorState('salary:dependents', 1);
  const [children, setChildren] = useCalculatorState('salary:children', 0);
  const [calculationMonth, setCalculationMonth] = useCalculatorState(
    'salary:calculationMonth',
    () => {
      const today = new Date();
      return today.getFullYear() === 2026 ? today.getMonth() + 1 : 12;
    },
  );
  const inferredAnnualGross = useMemo(
    () =>
      direction === 'reverse'
        ? inferGrossFromNet(targetMonthlyNet, {
            nontaxableMonthly,
            dependents,
            children,
            calculationMonth,
          })
        : 0,
    [direction, targetMonthlyNet, nontaxableMonthly, dependents, children, calculationMonth],
  );
  const result = useMemo(
    () =>
      calculateTakeHome({
        wageType: direction === 'reverse' ? 'yearly' : wageType,
        wageAmount: direction === 'reverse' ? inferredAnnualGross : wageAmount,
        severance: direction === 'reverse' ? 'separate' : severance,
        nontaxableMonthly,
        dependents,
        children,
        calculationMonth,
      }),
    [
      direction,
      inferredAnnualGross,
      wageType,
      wageAmount,
      severance,
      nontaxableMonthly,
      dependents,
      children,
      calculationMonth,
    ],
  );
  const changeWageType = (next: WageType) => {
    if (next === wageType) return;
    setWageAmount(
      next === 'monthly'
        ? wageAmount / (severance === 'included' ? 13 : 12)
        : wageAmount * (severance === 'included' ? 13 : 12),
    );
    setWageType(next);
  };
  const deductions = result.monthlyGrossIncome - result.monthlyNetIncome;
  return (
    <CalculatorWorkspace slug="salary" className="grid gap-6 lg:grid-cols-2">
      <FormCard title="내 급여 입력">
        {direction === 'forward' ? (
          <>
            <NumberInput
              id={wageType === 'yearly' ? 'yearly-amount' : 'monthly-amount'}
              label={wageType === 'yearly' ? '연봉 (세전)' : '월급 (세전)'}
              value={wageAmount}
              onChange={setWageAmount}
              unit="원"
              min={1}
              max={wageType === 'yearly' ? 100_000_000_000 : 100_000_000}
              unitButtons={wageType === 'yearly' ? YEARLY_BUTTONS : MONTHLY_BUTTONS}
            />
          </>
        ) : (
          <NumberInput
            id="target-monthly-net"
            label="목표 월 실수령액"
            value={targetMonthlyNet}
            onChange={setTargetMonthlyNet}
            unit="원"
            min={1}
            max={100_000_000}
            unitButtons={MONTHLY_BUTTONS}
            helpText="이 월 수령액에 필요한 세전 연봉을 추정합니다."
          />
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="calculation-month" className="text-sm font-medium">
            급여 적용월
          </label>
          <select
            id="calculation-month"
            value={calculationMonth}
            onChange={(event) => setCalculationMonth(Number(event.target.value))}
            className="min-h-12 w-full rounded-xl border border-border-base bg-bg-card px-4 py-3 text-base"
          >
            {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
              <option key={month} value={month}>
                2026년 {month}월
              </option>
            ))}
          </select>
        </div>
        <CalculatorDetails
          summary={`${direction === 'reverse' ? '역산' : wageType === 'yearly' ? '연봉' : '월급'} · 퇴직금 ${severance === 'included' ? '포함' : '별도'} · 비과세 월 ${formatKRW(nontaxableMonthly)} · 본인 포함 ${dependents}명 · 자녀 ${children}명`}
        >
          <RadioGroup<CalcDirection>
            id="direction"
            label="계산 방향"
            value={direction}
            onChange={setDirection}
            options={[
              { value: 'forward', label: '세전 → 실수령' },
              { value: 'reverse', label: '실수령 → 세전 (역산)' },
            ]}
          />
          {direction === 'forward' ? (
            <>
              <RadioGroup<WageType>
                id="wage-type"
                label="임금 유형"
                value={wageType}
                onChange={changeWageType}
                options={[
                  { value: 'yearly', label: '연봉' },
                  { value: 'monthly', label: '월급' },
                ]}
              />
              {wageType === 'yearly' ? (
                <RadioGroup<SeveranceInclusion>
                  id="severance"
                  label="연봉에 퇴직금 포함 여부"
                  value={severance}
                  onChange={setSeverance}
                  options={[
                    { value: 'separate', label: '별도' },
                    { value: 'included', label: '포함' },
                  ]}
                />
              ) : null}
            </>
          ) : null}
          <NumberInput
            id="nontaxable"
            label="월 비과세 금액"
            value={nontaxableMonthly}
            onChange={setNontaxableMonthly}
            unit="원"
            max={2_000_000}
            helpText="식대·자가운전보조금 등. 실제 급여의 비과세 항목을 확인하세요."
          />
          <NumberInput
            id="dependents"
            label="부양가족 수 (본인 포함)"
            value={dependents}
            onChange={setDependents}
            unit="명"
            min={1}
            max={20}
            integer
          />
          <NumberInput
            id="children"
            label="공제대상 자녀·손자녀 수"
            value={children}
            onChange={setChildren}
            unit="명"
            min={0}
            max={Math.min(10, Math.max(0, dependents - 1))}
            integer
            helpText="기본공제대상에 해당하며 자녀세액공제 요건을 충족한 인원입니다."
          />
        </CalculatorDetails>
      </FormCard>
      <div className="min-w-0 space-y-4">
        <ResultCard
          title={direction === 'reverse' ? '추정 세전 연봉' : '월 실수령액'}
          heroLabel={
            direction === 'reverse'
              ? '목표 월 실수령액을 받기 위한 예상 연봉'
              : '보험료·세금을 뺀 예상 월 수령액'
          }
          heroValue={formatKRW(
            direction === 'reverse' ? inferredAnnualGross : result.monthlyNetIncome,
          )}
          heroNote={`2026년 ${calculationMonth < 7 ? '1~6월' : '7~12월'} 기준 · 소득세는 연간 근사 계산`}
          nextStep={<NextCalculation from="salary" monthlyNet={result.monthlyNetIncome} />}
          rows={[
            { label: '예상 월 소득 (세전)', value: formatKRW(result.monthlyGrossIncome) },
            { label: '월 공제 합계', value: formatKRW(deductions) },
            { label: '연 실수령액', value: formatKRW(result.annualNetIncome) },
            { label: '비과세 (월)', value: formatKRW(result.monthlyNontaxable) },
            {
              label: '국민연금',
              value: `-${formatKRW(result.pension)}`,
              note: `근로자 4.75% · 기준소득월액 ${formatKRW(result.pensionLowerMonthly)}~${formatKRW(result.pensionUpperMonthly)}`,
            },
            {
              label: '건강보험',
              value: `-${formatKRW(result.health)}`,
              note: '근로자 보수월액 × 3.595%',
            },
            {
              label: '장기요양',
              value: `-${formatKRW(result.longTermCare)}`,
              note: '건강보험료 × 13.14%',
            },
            {
              label: '고용보험',
              value: `-${formatKRW(result.employment)}`,
              note: '근로자 보수 × 0.9%',
            },
            {
              label: '근로소득세',
              value: `-${formatKRW(result.incomeTax)}`,
              note: '연간 근사치. 국세청 월별 간이세액표 직접 조회 방식이 아닙니다.',
            },
            {
              label: '지방소득세',
              value: `-${formatKRW(result.localIncomeTax)}`,
              note: '소득세 × 10%',
            },
            { label: '월 실수령액', value: formatKRW(result.monthlyNetIncome) },
            { label: '시급 환산', value: formatKRW(result.hourlyWage), note: '월 209시간 가정' },
          ]}
        />
        <ResultBanner note="원천징수 방식·회사 급여 항목·연말정산에 따라 실제 수령액과 차이가 생깁니다." />
      </div>
    </CalculatorWorkspace>
  );
}
