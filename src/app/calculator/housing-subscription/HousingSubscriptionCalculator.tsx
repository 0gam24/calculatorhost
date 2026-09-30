'use client';
import { useMemo } from 'react';
import { CalculatorWorkspace } from '@/components/calculator/CalculatorWorkspace';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';

import { calculateHousingSubscriptionScore } from '@/lib/utils/housing-subscription';
export function HousingSubscriptionCalculator() {
  const [noHomeYears, setNoHomeYears] = useCalculatorState('housing-subscription:noHomeYears', 5);
  const [dependents, setDependents] = useCalculatorState('housing-subscription:dependents', 2);
  const [accountYears, setAccountYears] = useCalculatorState(
    'housing-subscription:accountYears',
    3,
  );
  const result = useMemo(
    () => calculateHousingSubscriptionScore({ noHomeYears, dependents, accountYears }),
    [noHomeYears, dependents, accountYears],
  );
  return (
    <CalculatorWorkspace slug="housing-subscription" className="grid gap-6 lg:grid-cols-2">
      <FormCard title="청약 가점 조건 입력">
        <NumberInput
          id="no-home-years"
          label="무주택 기간"
          value={noHomeYears}
          onChange={setNoHomeYears}
          unit="년"
          max={100}
          helpText="청약 기준에 해당하는 무주택 기간을 입력하세요. 0.5년은 6개월입니다."
        />
        <NumberInput
          id="housing-dependents"
          label="청약 기준 부양가족 수"
          value={dependents}
          onChange={setDependents}
          unit="명"
          max={20}
          integer
          helpText="신청자 본인을 제외하고 부양가족 인정 요건을 충족한 인원입니다."
        />
        <NumberInput
          id="account-years"
          label="청약통장 가입 기간"
          value={accountYears}
          onChange={setAccountYears}
          unit="년"
          max={100}
          helpText="배우자 통장 가입기간 합산 등 별도 인정 조건은 계산 기준을 확인하세요."
        />
      </FormCard>
      <div className="space-y-4">
        <ResultCard
          title="예상 청약 가점"
          heroLabel="입력한 세 항목의 합계"
          heroValue={`${result.totalScore} / 84점`}
          heroNote="당첨 가능성이나 청약 자격을 판단하는 결과는 아닙니다."
          rows={[
            { label: '무주택 기간', value: `${result.noHomeScore} / 32점` },
            { label: '부양가족', value: `${result.dependentsScore} / 35점` },
            { label: '통장 가입 기간', value: `${result.accountScore} / 17점` },
          ]}
        >
          {result.warnings.map((warning) => (
            <p key={warning} className="text-sm text-text-secondary">
              {warning}
            </p>
          ))}
        </ResultCard>
        <ResultBanner note="모집공고의 자격·기간·세대 요건과 함께 확인하세요." />
      </div>
    </CalculatorWorkspace>
  );
}
