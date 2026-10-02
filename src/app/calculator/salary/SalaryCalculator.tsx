'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  CalculatorWorkspace,
  useCalculatorWorkspace,
} from '@/components/calculator/CalculatorWorkspace';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';
import { CalculatorDetails } from '@/components/calculator/CalculatorDetails';
import { NextCalculation } from '@/components/calculator/NextCalculation';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { AmountPresets } from '@/components/calculator/AmountPresets';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import {
  calculateTakeHome,
  inferGrossFromNetDetailed,
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

function SalaryReadiness({ error }: { error?: string }) {
  const reportValidity = useCalculatorWorkspace()?.reportValidity;
  useEffect(() => {
    reportValidity?.('salary:conditions', error);
    return () => reportValidity?.('salary:conditions');
  }, [error, reportValidity]);
  if (!error) return null;
  return (
    <div
      data-testid="salary-conditions"
      aria-live="polite"
      aria-invalid="true"
      tabIndex={-1}
      className="rounded-xl border border-border-base bg-bg-base p-4 text-sm text-text-primary"
    >
      <strong>조건 확인 필요</strong>
      <p className="mt-1">{error}</p>
    </div>
  );
}

export function SalaryCalculator() {
  const [amountPresetToken, setAmountPresetToken] = useState(0);
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
  const [children, setChildren] = useCalculatorState('salary:withholdingChildren', 0);
  const [withholdingRate, setWithholdingRate] = useCalculatorState<80 | 100 | 120>(
    'salary:withholdingRate',
    100,
  );
  const [hasLegacyChildren, setHasLegacyChildren] = useState(false);
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('calculatorhost:input:v1:salary:children');
      const previous: unknown = saved === null ? null : JSON.parse(saved);
      setHasLegacyChildren(typeof previous === 'number' && previous > 0);
    } catch {
      // 저장소 사용이 제한된 경우에도 새 입력 기준은 동일합니다.
    }
  }, []);
  const [calculationMonth, setCalculationMonth] = useCalculatorState(
    'salary:calculationMonth',
    () => {
      const today = new Date();
      return today.getFullYear() === 2026 ? today.getMonth() + 1 : 12;
    },
  );
  const { result, reverseResult, error } = useMemo(() => {
    try {
      const reverseResult =
        direction === 'reverse'
          ? inferGrossFromNetDetailed(targetMonthlyNet, {
              nontaxableMonthly,
              dependents,
              children,
              calculationMonth,
              withholdingRate,
            })
          : null;
      const result = calculateTakeHome({
        wageType: direction === 'reverse' ? 'yearly' : wageType,
        wageAmount: reverseResult ? reverseResult.annualGrossIncome : wageAmount,
        severance: direction === 'reverse' ? 'separate' : severance,
        nontaxableMonthly,
        dependents,
        children,
        calculationMonth,
        withholdingRate,
      });
      return { result, reverseResult, error: undefined };
    } catch (cause) {
      return {
        result: null,
        reverseResult: null,
        error: cause instanceof Error ? cause.message : '입력 조건을 확인해 주세요.',
      };
    }
  }, [
    direction,
    targetMonthlyNet,
    wageType,
    wageAmount,
    severance,
    nontaxableMonthly,
    dependents,
    children,
    calculationMonth,
    withholdingRate,
  ]);
  const changeWageType = (next: WageType) => {
    if (next === wageType) return;
    setWageAmount(
      next === 'monthly'
        ? wageAmount / (severance === 'included' ? 13 : 12)
        : wageAmount * (severance === 'included' ? 13 : 12),
    );
    setWageType(next);
  };
  const deductions = result ? result.monthlyGrossIncome - result.monthlyNetIncome : 0;
  return (
    <CalculatorWorkspace slug="salary" className="grid gap-6 lg:grid-cols-2">
      <FormCard title="내 급여 입력">
        {direction === 'forward' ? (
          <div className="space-y-3">
            <NumberInput
              id={wageType === 'yearly' ? 'yearly-amount' : 'monthly-amount'}
              label={wageType === 'yearly' ? '연봉 (세전)' : '월급 (세전)'}
              value={wageAmount}
              onChange={setWageAmount}
              unit="원"
              min={1}
              max={wageType === 'yearly' ? 100_000_000_000 : 100_000_000}
              unitButtons={wageType === 'yearly' ? YEARLY_BUTTONS : MONTHLY_BUTTONS}
              resetToken={amountPresetToken}
            />
            <AmountPresets
              label={wageType === 'yearly' ? '연봉 예시' : '월급 예시'}
              value={wageAmount}
              options={
                wageType === 'yearly'
                  ? [
                      { label: '3천만원', value: 30_000_000 },
                      { label: '5천만원', value: 50_000_000 },
                      { label: '7천만원', value: 70_000_000 },
                    ]
                  : [
                      { label: '250만원', value: 2_500_000 },
                      { label: '350만원', value: 3_500_000 },
                      { label: '500만원', value: 5_000_000 },
                    ]
              }
              onSelect={(amount) => {
                setWageAmount(amount);
                setAmountPresetToken((token) => token + 1);
              }}
            />
          </div>
        ) : (
          <div className="space-y-3">
            <NumberInput
              id="target-monthly-net"
              label="목표 월 실수령액"
              value={targetMonthlyNet}
              onChange={setTargetMonthlyNet}
              unit="원"
              min={1}
              max={100_000_000}
              unitButtons={MONTHLY_BUTTONS}
              helpText="선택한 원천징수 조건으로 필요한 연봉을 찾습니다. 탐색 상한은 연 10억 원이며 계산상 달성액과 목표 차이를 함께 확인하세요."
              resetToken={amountPresetToken}
            />
            <AmountPresets
              label="월 실수령액 예시"
              value={targetMonthlyNet}
              options={[
                { label: '200만원', value: 2_000_000 },
                { label: '300만원', value: 3_000_000 },
                { label: '400만원', value: 4_000_000 },
              ]}
              onSelect={(amount) => {
                setTargetMonthlyNet(amount);
                setAmountPresetToken((token) => token + 1);
              }}
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="calculation-month" className="text-sm font-medium">
            2026년 급여 지급·원천징수월
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
        <p className="text-xs text-text-secondary">
          2026년 3월 1일 이후 원천징수분부터 개정 자녀 공제액을 적용합니다. 보험료도 선택한
          지급월과 같은 월의 기준을 적용하는 가정입니다.
        </p>
        <CalculatorDetails
          summary={`${direction === 'reverse' ? '역산' : wageType === 'yearly' ? '연봉' : '월급'} · 퇴직금 ${direction === 'reverse' || severance === 'separate' ? '별도' : '포함'} · 비과세 월 ${formatKRW(nontaxableMonthly)} · 가족 ${dependents}명 · 해당 자녀 ${children}명 · 원천징수 ${withholdingRate}%`}
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
            helpText="식대·자가운전보조금 등 실제 급여의 비과세 항목을 확인하세요. 원 단위 정수로 입력합니다."
          />
          <NumberInput
            id="dependents"
            label="공제대상 가족 수 (본인 포함)"
            value={dependents}
            onChange={setDependents}
            unit="명"
            min={1}
            max={20}
            integer
            helpText="본인을 포함해 기본공제 요건을 충족하는 가족 수입니다. 아래 자녀 수도 이 가족 수에 포함되어 있어야 합니다."
          />
          <NumberInput
            id="children"
            label="8~20세 공제대상 자녀 수"
            value={children}
            onChange={setChildren}
            unit="명"
            min={0}
            max={Math.min(10, Math.max(0, dependents - 1))}
            integer
            helpText="공제대상 가족에 포함된 8세 이상 20세 이하 자녀 수입니다. 연말정산 자녀세액공제 인원과 구분해 확인하세요."
          />
          {hasLegacyChildren ? (
            <p className="text-sm text-text-secondary" data-testid="salary-children-migration">
              이전에 저장한 자녀 수는 연말정산 세액공제 기준이었습니다. 그 값을 자동으로
              적용하지 않으니 간이세액표 기준의 8~20세 해당 자녀 수를 다시 확인해 입력하세요.
            </p>
          ) : null}
          <RadioGroup<'80' | '100' | '120'>
            id="withholding-rate"
            label="원천징수 비율"
            value={String(withholdingRate) as '80' | '100' | '120'}
            onChange={(value) => setWithholdingRate(Number(value) as 80 | 100 | 120)}
            options={[
              { value: '80', label: '80%' },
              { value: '100', label: '100% (기본)' },
              { value: '120', label: '120%' },
            ]}
          />
          <p className="text-xs text-text-secondary">
            비율은 소득세율 선택이 아니라 간이세액표 세액을 기준으로 미리 낼 금액의 선택입니다.
            연말정산 결정세액이 바뀌는 것은 아니며 환급·추가 납부는 실제 정산에 따라 달라집니다.
          </p>
        </CalculatorDetails>
        <p className="text-xs text-text-secondary">
          일반적인 단일 근무지 급여를 계산합니다. 상여·복수 근무지·일용근로·해외소득과 별도
          보험료 신고기준은 반영하지 않습니다. 실제 급여 항목과 보험료는 명세서에서 확인하세요.
        </p>
        <SalaryReadiness error={error} />
      </FormCard>
      <div className="min-w-0 space-y-4">
        <ResultCard
          title={error ? '조건 확인 필요' : direction === 'reverse' ? '추정 세전 연봉' : '월 실수령액'}
          empty={!result}
          heroLabel={
            direction === 'reverse'
              ? reverseResult?.targetMatched
                ? '목표 월 실수령액에 해당하는 예상 연봉'
                : '탐색 범위 내 가장 가까운 예상 연봉'
              : '보험료·세금을 뺀 예상 월 수령액'
          }
          heroValue={result ? formatKRW(
            reverseResult ? reverseResult.annualGrossIncome : result.monthlyNetIncome,
          ) : '입력 조건을 확인해 주세요'}
          heroNote={`2026년 ${calculationMonth}월 지급·원천징수 · 공식 간이세액표 ${withholdingRate}% · 보험료는 입력 조건의 추정${reverseResult?.atSearchLimit ? ' · 역산 상한 연 10억 원 도달' : reverseResult && !reverseResult.targetMatched ? ' · 입력 목표와 차이 있음' : ''}`}
          nextStep={result ? <NextCalculation from="salary" monthlyNet={result.monthlyNetIncome} /> : undefined}
          rows={result ? [
            ...(reverseResult ? [
              { label: '계산상 달성 월 실수령액', value: formatKRW(reverseResult.achievedMonthlyNet) },
              { label: '입력 목표 월 실수령액', value: formatKRW(targetMonthlyNet) },
              {
                label: '목표와의 차이',
                value: `${reverseResult.difference > 0 ? '+' : reverseResult.difference < 0 ? '-' : ''}${formatKRW(Math.abs(reverseResult.difference))}`,
                note: '양수는 목표 초과, 음수는 목표 미달입니다.',
              },
            ] : []),
            { label: '예상 월 소득 (세전)', value: formatKRW(result.monthlyGrossIncome) },
            { label: '월 공제 합계', value: formatKRW(deductions) },
            { label: '연 실수령액', value: formatKRW(result.annualNetIncome) },
            { label: '비과세 (월)', value: formatKRW(result.monthlyNontaxable) },
            { label: '간이세액표 기준 월급여 (비과세 제외)', value: formatKRW(result.monthlyTaxableIncome) },
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
              note: `공식 간이세액표 기준액 ${formatKRW(result.withholdingReferenceTax)} × 선택 비율 ${result.withholdingRate}% · 최종 10원 미만 버림 · 1천 원 미만 부징수`,
            },
            {
              label: '지방소득세',
              value: `-${formatKRW(result.localIncomeTax)}`,
              note: '징수 소득세 × 10% · 10원 미만 버림',
            },
            { label: '월 실수령액', value: formatKRW(result.monthlyNetIncome) },
            { label: '시급 환산', value: formatKRW(result.hourlyWage), note: '월 209시간 가정' },
          ] : []}
        >
          {reverseResult && (!reverseResult.targetMatched || reverseResult.atSearchLimit) ? (
            <p className="mt-4 text-sm text-text-secondary" data-testid="salary-reverse-status">
              {reverseResult.atSearchLimit ? '연봉 탐색 상한 10억 원에 도달했습니다. ' : ''}
              {reverseResult.targetMatched
                ? '표시된 조건의 계산상 목표 금액과 같습니다.'
                : '세액표 구간과 원 단위 처리로 목표 금액과 정확히 일치하지 않습니다. 계산상 달성액과 차이를 확인하세요.'}
            </p>
          ) : null}
        </ResultCard>
        <ResultBanner note="원천징수 방식·회사 급여 항목·연말정산에 따라 실제 수령액과 차이가 생깁니다." />
      </div>
    </CalculatorWorkspace>
  );
}
