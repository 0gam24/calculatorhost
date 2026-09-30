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

import { calculateNJobberInsurance } from '@/lib/tax/n-jobber-insurance';
export function NJobberInsuranceCalculator() {
  const [mainWageIncome, setMainWageIncome] = useCalculatorState(
    'n-jobber-insurance:mainWageIncome',
    50_000_000,
  );
  const [sideBusinessIncome, setSideBusinessIncome] = useCalculatorState(
    'n-jobber-insurance:sideBusinessIncome',
    10_000_000,
  );
  const [sideOtherIncome, setSideOtherIncome] = useCalculatorState(
    'n-jobber-insurance:sideOtherIncome',
    0,
  );
  const [isDependent, setIsDependent] = useCalculatorState('n-jobber-insurance:isDependent', false);
  const result = useMemo(
    () =>
      calculateNJobberInsurance({
        mainWageIncome,
        sideBusinessIncome,
        sideOtherIncome,
        isDependent,
      }),
    [mainWageIncome, sideBusinessIncome, sideOtherIncome, isDependent],
  );
  return (
    <CalculatorWorkspace slug="n-jobber-insurance" className="grid gap-6 lg:grid-cols-2">
      <FormCard title="연간 소득 조건 입력">
        <NumberInput
          id="main-wage-income"
          label="직장 근로소득 (연)"
          value={mainWageIncome}
          onChange={setMainWageIncome}
          unit="원"
          helpText="2026년 보수월액 건강보험 근로자 부담 3.595%로 근사합니다."
        />
        <NumberInput
          id="side-business-income"
          label="부업 사업소득 (연)"
          value={sideBusinessIncome}
          onChange={setSideBusinessIncome}
          unit="원"
          helpText="매출이 아닌 필요경비 차감 후 소득을 입력하세요."
        />
        <NumberInput
          id="side-other-income"
          label="이자·배당 등 기타 소득 (연)"
          value={sideOtherIncome}
          onChange={setSideOtherIncome}
          unit="원"
        />
        <RadioGroup
          id="is-dependent"
          label="현재 건강보험 피부양자인가요?"
          value={isDependent ? 'yes' : 'no'}
          onChange={(value) => setIsDependent(value === 'yes')}
          options={[
            { value: 'no', label: '아니요' },
            { value: 'yes', label: '예' },
          ]}
        />
        <p className="text-xs leading-relaxed text-text-secondary">
          피부양자 자격은 사업자등록·소득 종류·재산 등으로 달라집니다. 이 결과만으로 자격을 확정할
          수 없습니다.
        </p>
      </FormCard>
      <div className="space-y-4">
        <ResultCard
          title="예상 월 건강보험료"
          heroLabel="근로자 보수보험료와 추가 소득보험료"
          heroValue={formatKRW(result.totalMonthlyPremium)}
          heroNote="장기요양보험료는 포함하지 않은 근사치입니다."
          rows={[
            {
              label: '직장 보수 월 보험료',
              value: formatKRW(result.monthlyWagePremium),
              note: '근로자 부담 3.595%',
            },
            {
              label: '추가 소득 월 보험료',
              value: formatKRW(result.extraIncomeMonthlyPremium),
              note: '추가 소득 초과분에 7.19% 적용',
            },
            { label: '연 보험료', value: formatKRW(result.annualPremium) },
            { label: '총 추가 소득', value: formatKRW(result.totalExtraIncome) },
          ]}
        >
          {result.dependentLossRisk ? (
            <p className="text-danger-700 dark:text-danger-300 text-sm">
              피부양자 자격 확인이 필요합니다. 건강보험공단에 실제 소득·재산 요건을 확인하세요.
            </p>
          ) : null}
          {result.warnings.map((warning) => (
            <p key={warning} className="text-sm text-text-secondary">
              {warning}
            </p>
          ))}
        </ResultCard>
        <ResultBanner note="소득 종류별 반영률·재산·보험료 상하한은 별도 확인이 필요합니다." />
      </div>
    </CalculatorWorkspace>
  );
}
