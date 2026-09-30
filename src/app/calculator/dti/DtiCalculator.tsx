'use client';
import { useMemo } from 'react';
import { CalculatorWorkspace } from '@/components/calculator/CalculatorWorkspace';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import { formatKRW } from '@/lib/utils';

import { calculateDebtToIncome } from '@/lib/finance/dti';
export function DtiCalculator() {
  const [annualIncome, setAnnualIncome] = useCalculatorState('dti:annualIncome', 60_000_000);
  const [mortgageAnnualPayment, setMortgageAnnualPayment] = useCalculatorState(
    'dti:mortgageAnnualPayment',
    18_000_000,
  );
  const [otherLoanAnnualInterest, setOtherLoanAnnualInterest] = useCalculatorState(
    'dti:otherLoanAnnualInterest',
    0,
  );
  const result = useMemo(
    () => calculateDebtToIncome({ annualIncome, mortgageAnnualPayment, otherLoanAnnualInterest }),
    [annualIncome, mortgageAnnualPayment, otherLoanAnnualInterest],
  );
  return (
    <CalculatorWorkspace slug="dti" className="grid gap-6 lg:grid-cols-2">
      <FormCard title="연간 상환 부담 입력">
        <NumberInput
          id="dti-annual-income"
          label="연 소득"
          value={annualIncome}
          onChange={setAnnualIncome}
          unit="원"
          min={1}
        />
        <NumberInput
          id="dti-mortgage-payment"
          label="주택담보대출 연 원리금 합계"
          value={mortgageAnnualPayment}
          onChange={setMortgageAnnualPayment}
          unit="원"
          helpText="신규와 기존 주택담보대출의 연간 원금·이자를 모두 합산하세요."
        />
        <NumberInput
          id="dti-other-interest"
          label="기타 대출 연 이자 합계"
          value={otherLoanAnnualInterest}
          onChange={setOtherLoanAnnualInterest}
          unit="원"
          helpText="주택담보대출 외의 기타 대출은 이자 상환액을 입력하세요."
        />
      </FormCard>
      <div className="space-y-4">
        <ResultCard
          title="예상 DTI"
          heroLabel="연 소득 대비 연간 상환 부담"
          heroValue={
            result.ratio === null ? '연 소득을 입력하세요' : `${(result.ratio * 100).toFixed(2)}%`
          }
          heroNote="금융기관의 실제 심사·대출 승인 결과와 다를 수 있습니다."
          rows={[
            { label: '연 소득', value: formatKRW(annualIncome) },
            { label: '연 상환액 합계', value: formatKRW(result.annualDebtPayment) },
            { label: '주담대 연 원리금', value: formatKRW(mortgageAnnualPayment) },
          ]}
        />
        <ResultBanner note="DSR은 기타 대출의 원금도 포함하므로 DTI와 구분하세요." />
      </div>
    </CalculatorWorkspace>
  );
}
