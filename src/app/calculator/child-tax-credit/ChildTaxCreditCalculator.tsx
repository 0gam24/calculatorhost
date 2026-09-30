'use client';
import { useMemo } from 'react';
import { CalculatorWorkspace } from '@/components/calculator/CalculatorWorkspace';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import { formatKRW } from '@/lib/utils';

import { calculateChildTaxCredit, type HouseholdType } from '@/lib/tax/child-tax-credit';
export function ChildTaxCreditCalculator() {
  const [householdType, setHouseholdType] = useCalculatorState<HouseholdType>(
    'child-tax-credit:householdType',
    'dualEarner',
  );
  const [totalAnnualIncome, setTotalAnnualIncome] = useCalculatorState(
    'child-tax-credit:totalAnnualIncome',
    30_000_000,
  );
  const [childCount, setChildCount] = useCalculatorState('child-tax-credit:childCount', 2);
  const [annualGrossPay, setAnnualGrossPay] = useCalculatorState(
    'child-tax-credit:annualGrossPay',
    30_000_000,
  );
  const [householdAssets, setHouseholdAssets] = useCalculatorState(
    'child-tax-credit:householdAssets',
    0,
  );
  const result = useMemo(
    () =>
      calculateChildTaxCredit({
        householdType,
        totalAnnualIncome,
        annualGrossPay,
        childCount,
        householdAssets,
        passesAssetTest: householdAssets < 240_000_000,
      }),
    [householdType, totalAnnualIncome, annualGrossPay, childCount, householdAssets],
  );
  return (
    <CalculatorWorkspace slug="child-tax-credit" className="grid gap-6 lg:grid-cols-2">
      <FormCard title="자녀장려금 조건 입력">
        <RadioGroup
          id="household-type"
          label="가구 유형"
          value={householdType}
          onChange={setHouseholdType}
          options={[
            { value: 'singleEarner', label: '홑벌이' },
            { value: 'dualEarner', label: '맞벌이' },
            { value: 'single', label: '단독 (비해당)' },
          ]}
        />
        <NumberInput
          id="total-annual-income"
          label="부부 합산 연 총소득"
          value={totalAnnualIncome}
          onChange={setTotalAnnualIncome}
          unit="원"
          helpText="소득과 재산 요건을 함께 확인해야 합니다."
        />
        <NumberInput
          id="annual-gross-pay"
          label="부부 합산 총급여액 등"
          value={annualGrossPay}
          onChange={setAnnualGrossPay}
          unit="원"
          helpText="지급액 산정용 근로·사업·종교인 소득입니다. 자격 판단용 총소득과 구분하세요."
        />
        <NumberInput
          id="child-count"
          label="요건에 해당하는 18세 미만 자녀 수"
          value={childCount}
          onChange={setChildCount}
          unit="명"
          max={20}
          integer
        />
        <RadioGroup
          id="asset-test"
          label="가구원 합산 재산 구간"
          value={
            householdAssets >= 240_000_000
              ? 'ineligible'
              : householdAssets >= 170_000_000
                ? 'half'
                : 'full'
          }
          onChange={(value) =>
            setHouseholdAssets(
              value === 'ineligible' ? 240_000_000 : value === 'half' ? 170_000_000 : 0,
            )
          }
          options={[
            { value: 'full', label: '1.7억원 미만' },
            { value: 'half', label: '1.7~2.4억원 미만' },
            { value: 'ineligible', label: '2.4억원 이상' },
          ]}
        />
        <p className="text-xs leading-relaxed text-text-secondary">
          재산 1.7~2.4억원 미만 구간은 50% 감액합니다. 자녀세액공제 중복·기한 후 신청·체납 등에 따른
          감액은 반영하지 않습니다.
        </p>
      </FormCard>
      <div className="space-y-4">
        <ResultCard
          title="예상 자녀장려금"
          heroLabel="현재 입력 조건의 예상 지급액"
          heroValue={formatKRW(result.finalPayment)}
          heroNote="신청 자격과 실제 지급액은 국세청 심사로 결정됩니다."
          rows={[
            { label: '해당 자녀 수', value: `${result.eligibleChildCount}명` },
            { label: '감액 전 금액', value: formatKRW(result.grossPayment) },
            { label: '감액률', value: `${(result.reductionRate * 100).toFixed(1)}%` },
          ]}
        >
          {result.warnings.length ? (
            <ul className="space-y-2 text-sm text-text-secondary">
              {result.warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          ) : null}
        </ResultCard>
        <ResultBanner note="자녀장려금과 연말정산 자녀세액공제는 서로 다른 제도입니다." />
      </div>
    </CalculatorWorkspace>
  );
}
