'use client';

import { CalculatorWorkspace } from '@/components/calculator/CalculatorWorkspace';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';

import { useMemo } from 'react';
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
  const [mode, setMode] = useCalculatorState<InflationMode>('inflation:mode', 'futureValue');
  const [amount, setAmount] = useCalculatorState('inflation:amount', 10_000_000);
  const [years, setYears] = useCalculatorState('inflation:years', 10);
  const [annualInflationPercent, setAnnualInflationPercent] = useCalculatorState(
    'inflation:annualInflationPercent',
    2,
  );

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
        return '지금 사는 같은 물건을 미래에 사려면 얼마가 필요할까요?';
      case 'presentValue':
        return '미래에 받을 금액은 오늘 기준 얼마의 구매력일까요?';
      case 'purchasingPower':
        return '지금 가진 돈을 그대로 보유하면 미래 구매력이 얼마나 줄어들까요?';
      default:
        return '';
    }
  };

  const amountLabel = mode === 'presentValue' ? '미래에 받을 금액' : '현재 금액';
  const resultLabel =
    mode === 'futureValue'
      ? '같은 물건의 미래 필요 금액'
      : mode === 'presentValue'
        ? '미래 금액의 현재 구매력'
        : '보유 금액의 미래 구매력';
  const changeAmount = Math.abs(result.resultAmount - result.originalAmount);
  const changePercent = amount > 0 ? (changeAmount / amount) * 100 : 0;
  const money = (value: number) => formatKRW(value, { truncateTen: false });

  return (
    <CalculatorWorkspace className="grid gap-6 lg:grid-cols-2" slug="inflation">
      <div className="min-w-0 space-y-5">
        {/* 계산 방식 선택 */}
        <FormCard title="계산 조건 입력">
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                value="futureValue"
                checked={mode === 'futureValue'}
                onChange={(e) => setMode(e.target.value as InflationMode)}
                className="h-4 w-4 accent-primary-500"
              />
              <span className="text-sm font-medium">
                미래 필요 금액: 같은 물건을 사는 데 필요한 돈
              </span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                value="presentValue"
                checked={mode === 'presentValue'}
                onChange={(e) => setMode(e.target.value as InflationMode)}
                className="h-4 w-4 accent-primary-500"
              />
              <span className="text-sm font-medium">
                현재 구매력: 미래에 받을 돈의 오늘 기준 가치
              </span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                value="purchasingPower"
                checked={mode === 'purchasingPower'}
                onChange={(e) => setMode(e.target.value as InflationMode)}
                className="h-4 w-4 accent-primary-500"
              />
              <span className="text-sm font-medium">
                보유 금액의 구매력: 같은 돈으로 나중에 얼마나 살까?
              </span>
            </label>
          </div>
          <p className="mt-4 text-xs text-text-secondary">{getModeLabel()}</p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <NumberInput
              id="amount"
              label={amountLabel}
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
              integer
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <NumberInput
              id="annualInflationPercent"
              label="연간 인플레이션율"
              value={annualInflationPercent}
              onChange={setAnnualInflationPercent}
              unit="%"
              min={0}
              max={20}
              helpText="기간 내내 같은 상승률을 가정합니다. 기본값 2%는 계산 가정입니다."
            />
          </div>
        </FormCard>

        {/* 결과 카드 */}
      </div>
      <div className="min-w-0 space-y-4">
        <ResultCard
          title="물가 반영 결과"
          heroLabel={resultLabel}
          heroValue={money(result.resultAmount)}
          heroNote={
            mode === 'futureValue'
              ? `현재 비용보다 ${changePercent.toFixed(2)}% 증가`
              : `오늘의 금액으로 환산 · 구매력 ${changePercent.toFixed(2)}% 감소`
          }
          rows={[
            {
              label: amountLabel,
              value: money(result.originalAmount),
              emphasize: false,
            },
            {
              label: '계산 기간',
              value: `${years}년`,
              emphasize: false,
            },
            {
              label: '누적 인플레이션',
              value: `${result.totalInflationPercent.toFixed(2)}%`,
              note: '전체 기간 동안의 누적 물가 상승',
              emphasize: false,
            },
            {
              label: '연평균 금액 변화',
              value: `${money(result.annualEquivalent)}/년`,
              note: '금액 변화의 절댓값 ÷ 기간 (원 미만 버림). 연간 물가상승률이 아닙니다.',
              emphasize: false,
            },
            {
              label: mode === 'futureValue' ? '추가 필요 금액' : '구매력 감소 금액',
              value: money(changeAmount),
              note:
                mode === 'futureValue'
                  ? '미래 비용 − 현재 비용'
                  : '입력 금액 − 오늘의 금액으로 환산한 구매력',
              emphasize: true,
            },
          ]}
        />
        <ResultBanner />

        {/* 모드별 해석 */}
        <div className="rounded-lg border border-border-base bg-bg-raised p-4">
          <h3 className="mb-3 font-semibold">계산 해석</h3>
          <p className="text-sm text-text-secondary">
            {mode === 'futureValue'
              ? `지금 ${money(amount)}인 같은 물건은 ${years}년 후 연 ${annualInflationPercent}% 물가 상승을 가정하면 ${money(result.resultAmount)}이 필요합니다. 현재보다 ${money(changeAmount)} 더 필요합니다. 돈 자체가 이만큼 불어나는 것은 아닙니다.`
              : mode === 'presentValue'
                ? `${years}년 후 받을 ${money(amount)}의 구매력은 오늘의 금액으로 ${money(result.resultAmount)}입니다. 이는 물가로 환산한 가치이며, 오늘 저축해야 할 금액이나 투자 수익을 뜻하지 않습니다.`
                : `지금 가진 ${money(amount)}을 이자 없이 그대로 보유하면 ${years}년 후 잔액은 같지만, 구매력은 오늘의 금액으로 ${money(result.resultAmount)}입니다. 구매력이 ${changePercent.toFixed(2)}% 감소합니다.`}
          </p>
          <p className="mt-3 text-xs text-text-secondary">
            입력한 물가상승률이 매년 일정하다고 가정합니다. 실제 CPI를 자동 조회하지 않으며,
            이자·투자 수익·세금은 제외합니다. 금액 결과는 원 미만을 버립니다.
          </p>
        </div>
      </div>
    </CalculatorWorkspace>
  );
}
