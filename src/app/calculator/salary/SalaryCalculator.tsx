'use client';

/**
 * 연봉 실수령액 계산기 (MVP #1)
 *
 * 명세: docs/calculator-spec/연봉실수령액.md
 * 공식: src/lib/tax/income.ts
 */

import { useMemo, useState } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import { calculateTakeHome, type WageType, type SeveranceInclusion } from '@/lib/tax/income';
import { formatKRW } from '@/lib/utils';

const YEARLY_UNIT_BUTTONS = [
  { label: '1억', value: 100_000_000 },
  { label: '천만', value: 10_000_000 },
  { label: '백만', value: 1_000_000 },
];

const MONTHLY_UNIT_BUTTONS = [
  { label: '백만', value: 1_000_000 },
  { label: '십만', value: 100_000 },
  { label: '만', value: 10_000 },
];

const NONTAX_UNIT_BUTTONS = [
  { label: '십만', value: 100_000 },
  { label: '만', value: 10_000 },
];

export function SalaryCalculator() {
  const [wageType, setWageType] = useState<WageType>('yearly');
  const [wageAmount, setWageAmount] = useState(50_000_000);
  const [severance, setSeverance] = useState<SeveranceInclusion>('separate');
  const [nontaxableMonthly, setNontaxableMonthly] = useState(200_000);
  const [dependents, setDependents] = useState(1);
  const [children, setChildren] = useState(0);

  const result = useMemo(
    () =>
      calculateTakeHome({
        wageType,
        wageAmount,
        severance,
        nontaxableMonthly,
        dependents,
        children,
      }),
    [wageType, wageAmount, severance, nontaxableMonthly, dependents, children],
  );

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2">
      <div className="order-2 lg:order-1">
        <FormCard title="입력">
        <RadioGroup<WageType>
          id="wage-type"
          label="임금 유형"
          value={wageType}
          onChange={setWageType}
          options={[
            { value: 'yearly', label: '연봉' },
            { value: 'monthly', label: '월급' },
          ]}
        />

        {wageType === 'yearly' ? (
          <>
            <NumberInput
              id="yearly-amount"
              label="연봉 (세전)"
              value={wageAmount}
              onChange={setWageAmount}
              placeholder="예: 50,000,000"
              unitButtons={YEARLY_UNIT_BUTTONS}
              max={100_000_000_000}
              debounceMs={150}
            />
            <RadioGroup<SeveranceInclusion>
              id="severance"
              label="퇴직금"
              value={severance}
              onChange={setSeverance}
              options={[
                { value: 'separate', label: '별도' },
                { value: 'included', label: '포함' },
              ]}
            />
          </>
        ) : (
          <NumberInput
            id="monthly-amount"
            label="월급 (세전)"
            value={wageAmount}
            onChange={setWageAmount}
            placeholder="예: 3,500,000"
            unitButtons={MONTHLY_UNIT_BUTTONS}
            max={100_000_000}
            debounceMs={150}
          />
        )}

        <NumberInput
          id="nontaxable"
          label="비과세 (월)"
          value={nontaxableMonthly}
          onChange={setNontaxableMonthly}
          placeholder="예: 식대 200,000"
          helpText="식대·자가운전보조금 등 월 비과세 항목 합계"
          unitButtons={NONTAX_UNIT_BUTTONS}
          max={2_000_000}
          debounceMs={150}
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="dependents" className="text-sm font-medium">
              부양가족 수
            </label>
            <input
              id="dependents"
              type="number"
              min={1}
              max={20}
              value={dependents}
              onChange={(e) => setDependents(Math.max(1, Number(e.target.value) || 1))}
              className="mt-2 w-full rounded-lg border border-border-base bg-bg-card px-4 py-3 text-right text-lg font-semibold tabular-nums focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
            />
            <p className="mt-1 text-caption text-text-tertiary">본인 포함</p>
          </div>
          <div>
            <label htmlFor="children" className="text-sm font-medium">
              자녀 수
            </label>
            <input
              id="children"
              type="number"
              min={0}
              max={10}
              value={children}
              onChange={(e) => setChildren(Math.max(0, Number(e.target.value) || 0))}
              className="mt-2 w-full rounded-lg border border-border-base bg-bg-card px-4 py-3 text-right text-lg font-semibold tabular-nums focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
            />
            <p className="mt-1 text-caption text-text-tertiary">20세 이하</p>
          </div>
        </div>
        </FormCard>
      </div>

      <div className="order-1 lg:order-2">
        <ResultCard
        title="월 실수령액"
        heroLabel="4대보험·세금 공제 후 월 수령액"
        heroValue={formatKRW(result.monthlyNetIncome)}
        heroNote={`시급 환산 (월 209시간 기준): ${formatKRW(result.hourlyWage)}`}
        rows={[
          {
            label: '예상 월 소득 (세전)',
            value: formatKRW(result.monthlyGrossIncome),
          },
          {
            label: '비과세 (월)',
            value: formatKRW(result.monthlyNontaxable),
          },
          {
            label: '국민연금',
            note: '월 과세소득 × 4.5%',
            value: `-${formatKRW(result.pension)}`,
          },
          {
            label: '건강보험',
            note: '월 과세소득 × 3.545%',
            value: `-${formatKRW(result.health)}`,
          },
          {
            label: '장기요양',
            note: '건강보험료 × 12.95%',
            value: `-${formatKRW(result.longTermCare)}`,
          },
          {
            label: '고용보험',
            note: '월 과세소득 × 0.9%',
            value: `-${formatKRW(result.employment)}`,
          },
          {
            label: '근로소득세',
            note: '연 과세표준 × 누진세율',
            value: `-${formatKRW(result.incomeTax)}`,
          },
          {
            label: '지방소득세',
            note: '소득세 × 10%',
            value: `-${formatKRW(result.localIncomeTax)}`,
          },
          {
            label: '연 실수령액',
            value: formatKRW(result.annualNetIncome),
            emphasize: true,
          },
        ]}
        />
        <ResultBanner />
      </div>
    </div>
  );
}
