'use client';
import { useMemo } from 'react';
import { CalculatorWorkspace } from '@/components/calculator/CalculatorWorkspace';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';

import { CalculatorDetails } from '@/components/calculator/CalculatorDetails';
import { calculateExchange, type ExchangeDirection } from '@/lib/finance/exchange';
export function ExchangeCalculator() {
  const [direction, setDirection] = useCalculatorState<ExchangeDirection>(
    'exchange:direction',
    'krwToForeign',
  );
  const [amount, setAmount] = useCalculatorState('exchange:amount', 1_000_000);
  const [baseRate, setBaseRate] = useCalculatorState('exchange:baseRate', 1350);
  const [spreadPercent, setSpreadPercent] = useCalculatorState('exchange:spreadPercent', 1.5);
  const [feePercent, setFeePercent] = useCalculatorState('exchange:feePercent', 0);
  const [feeFlat, setFeeFlat] = useCalculatorState('exchange:feeFlat', 0);
  const result = useMemo(
    () => calculateExchange({ direction, amount, baseRate, spreadPercent, feePercent, feeFlat }),
    [direction, amount, baseRate, spreadPercent, feePercent, feeFlat],
  );
  const receivingUnit = direction === 'krwToForeign' ? 'USD' : '원';
  const display = (value: number) =>
    `${value.toLocaleString('ko-KR', { maximumFractionDigits: receivingUnit === 'USD' ? 2 : 0 })} ${receivingUnit}`;
  return (
    <CalculatorWorkspace slug="exchange" className="grid gap-6 lg:grid-cols-2">
      <FormCard title="환전 조건 입력">
        <RadioGroup<ExchangeDirection>
          id="exchange-direction"
          label="환전 방향"
          value={direction}
          onChange={setDirection}
          options={[
            { value: 'krwToForeign', label: '원 → USD' },
            { value: 'foreignToKrw', label: 'USD → 원' },
          ]}
        />
        <NumberInput
          id="exchange-amount"
          label="환전할 금액"
          value={amount}
          onChange={setAmount}
          unit={direction === 'krwToForeign' ? '원' : 'USD'}
          min={0.01}
        />
        <NumberInput
          id="exchange-base-rate"
          label="1 USD당 기준환율"
          value={baseRate}
          onChange={setBaseRate}
          unit="원/USD"
          min={0.01}
          helpText="현재 은행이 제시한 환율을 직접 입력하세요. 기본값은 실시간 환율이 아닙니다."
        />
        <CalculatorDetails
          summary={`스프레드 ${spreadPercent}% · 수수료 ${feePercent}% + ${feeFlat} ${receivingUnit}`}
        >
          <NumberInput
            id="exchange-spread"
            label="은행 스프레드"
            value={spreadPercent}
            onChange={setSpreadPercent}
            unit="%"
            max={99}
          />
          <NumberInput
            id="exchange-fee-percent"
            label="비율 수수료"
            value={feePercent}
            onChange={setFeePercent}
            unit="%"
            max={100}
          />
          <NumberInput
            id="exchange-flat-fee"
            label="고정 수수료 (수령 통화 기준)"
            value={feeFlat}
            onChange={setFeeFlat}
            unit={receivingUnit}
          />
        </CalculatorDetails>
      </FormCard>
      <div className="space-y-4">
        <ResultCard
          title="예상 환전 수령액"
          heroLabel="스프레드·수수료 반영 후"
          heroValue={display(result.netAmount)}
          rows={[
            {
              label: '적용 환율',
              value: `${result.appliedRate.toLocaleString('ko-KR', { maximumFractionDigits: 4 })} 원/USD`,
            },
            { label: '수수료 전 금액', value: display(result.grossAmount) },
            { label: '수수료 합계', value: display(result.feeAmount) },
            {
              label: '실질 환율',
              value: `${result.effectiveRate.toLocaleString('ko-KR', { maximumFractionDigits: 4 })} 원/USD`,
            },
          ]}
        >
          {result.warnings.map((warning) => (
            <p key={warning} className="text-sm text-text-secondary">
              {warning}
            </p>
          ))}
        </ResultCard>
        <ResultBanner note="환율과 수수료는 금융기관·거래 시점에 따라 다릅니다." />
      </div>
    </CalculatorWorkspace>
  );
}
