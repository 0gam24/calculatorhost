'use client';

import { useMemo, useState } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import {
  calculateInflation,
  type InflationInput,
  type InflationMode,
} from '@/lib/finance/inflation';
import { formatKRW } from '@/lib/utils';

export function InflationCalculator() {
  const [mode, setMode] = useState<InflationMode>('futureValue');
  const [amount, setAmount] = useState(10_000_000);
  const [years, setYears] = useState(10);
  const [annualInflationPercent, setAnnualInflationPercent] = useState(2);

  const result = useMemo(() => {
    return calculateInflation({
      mode,
      amount,
      years,
      annualInflationPercent,
    } as InflationInput);
  }, [mode, amount, years, annualInflationPercent]);

  const getModeLabel = () => {
    switch (mode) {
      case 'futureValue':
        return '오늘의 돈이 미래에 얼마나 가치 떨어질까?';
      case 'presentValue':
        return '미래의 돈이 오늘 기준 얼마나 가치일까?';
      case 'purchasingPower':
        return '구매력이 얼마나 떨어질까?';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* 계산 방식 선택 */}
      <FormCard title="계산 방식">
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              value="futureValue"
              checked={mode === 'futureValue'}
              onChange={(e) => setMode(e.target.value as InflationMode)}
              className="h-4 w-4 accent-primary-500"
            />
            <span className="text-sm font-medium">미래가치: 오늘의 돈 → 미래에 얼마나 떨어질까?</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              value="presentValue"
              checked={mode === 'presentValue'}
              onChange={(e) => setMode(e.target.value as InflationMode)}
              className="h-4 w-4 accent-primary-500"
            />
            <span className="text-sm font-medium">현재가치: 미래의 돈 → 오늘 기준 얼마나 가치?</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              value="purchasingPower"
              checked={mode === 'purchasingPower'}
              onChange={(e) => setMode(e.target.value as InflationMode)}
              className="h-4 w-4 accent-primary-500"
            />
            <span className="text-sm font-medium">실질 구매력: 실제 사용 가능한 양이 얼마나 떨어질까?</span>
          </label>
        </div>
        <p className="mt-4 text-xs text-text-secondary">
          {getModeLabel()}
        </p>
      </FormCard>

      {/* 입력 필드 */}
      <FormCard title="금액 및 기간">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <NumberInput
            id="amount"
            label={mode === 'futureValue' ? '현재 금액' : '미래 금액'}
            value={amount}
            onChange={setAmount}
            unit="원"
            unitButtons={[
              { label: '1억', value: 100_000_000 },
              { label: '1000만', value: 10_000_000 },
              { label: '100만', value: 1_000_000 },
            ]}
          />
          <NumberInput
            id="years"
            label="기간"
            value={years}
            onChange={setYears}
            unit="년"
            min={0}
            max={100}
            helpText="계산 기간 (0~100년)"
          />
        </div>
      </FormCard>

      <FormCard title="인플레이션">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <NumberInput
            id="annualInflationPercent"
            label="연간 인플레이션율"
            value={annualInflationPercent}
            onChange={setAnnualInflationPercent}
            unit="%"
            min={0}
            max={20}
            helpText="연간 평균 물가 상승률. 한국은행 목표: 2%"
          />
        </div>
      </FormCard>

      {/* 결과 카드 */}
      <ResultCard
        title="화폐가치 분석"
        heroLabel={mode === 'futureValue' ? '미래 화폐가치' : '현재 기준 가치'}
        heroValue={formatKRW(result.resultAmount)}
        heroNote={
          result.resultAmount < result.originalAmount
            ? `${Math.round(((result.originalAmount - result.resultAmount) / result.originalAmount) * 100)}% 감소`
            : result.resultAmount > result.originalAmount
              ? `${Math.round(((result.resultAmount - result.originalAmount) / result.originalAmount) * 100)}% 증가`
              : '동일'
        }
        rows={[
          {
            label: mode === 'futureValue' ? '현재 금액' : '미래 금액',
            value: formatKRW(result.originalAmount),
            emphasize: false,
          },
          {
            label: '계산 기간',
            value: `${result.annualEquivalent > 0 ? years : 0}년`,
            emphasize: false,
          },
          {
            label: '누적 인플레이션',
            value: `${result.totalInflationPercent.toFixed(2)}%`,
            note: '전체 기간 동안의 누적 물가 상승',
            emphasize: false,
          },
          {
            label: '연간 평균',
            value: `${result.annualEquivalent.toFixed(2)}%`,
            note: '기간 동안의 평균 연간 인플레이션',
            emphasize: false,
          },
          {
            label: mode === 'futureValue' ? '미래 화폐가치' : '현재 기준 가치',
            value: formatKRW(result.resultAmount),
            note: mode === 'futureValue'
              ? '인플레이션 반영 후 실질 가치'
              : '오늘 기준 실질 가치',
            emphasize: true,
          },
        ]}
      />
        <ResultBanner />

      {/* 모드별 해석 */}
      <div className="rounded-lg border border-border-base p-4 bg-bg-raised">
        <h3 className="mb-3 font-semibold">계산 해석</h3>
        <p className="text-sm text-text-secondary">
          {mode === 'futureValue'
            ? `오늘 ${formatKRW(amount)}이 ${years}년 후 연 ${annualInflationPercent}% 인플레이션하에서 ${formatKRW(result.resultAmount)} 수준의 구매력을 가집니다. 즉, 같은 물건을 사려면 ${formatKRW(result.originalAmount - result.resultAmount)}을 더 소비해야 합니다.`
            : mode === 'presentValue'
              ? `${years}년 후 ${formatKRW(amount)}을 받는 것은, 오늘 기준 ${formatKRW(result.resultAmount)} 수준의 가치입니다. 은퇴 계획 시 필요한 자산을 역산할 때 유용합니다.`
              : `오늘 ${formatKRW(amount)}으로 살 수 있는 물건을, ${years}년 후에는 약 ${formatKRW(result.resultAmount)}에만 살 수 있습니다. 구매력이 ${Math.round((1 - result.resultAmount / result.originalAmount) * 100)}% 떨어집니다.`}
        </p>
      </div>
    </div>
  );
}
