'use client';
import { CalculatorDetails } from '@/components/calculator/CalculatorDetails';

import { CalculatorWorkspace } from '@/components/calculator/CalculatorWorkspace';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';

import { useMemo } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import { Card } from '@/components/ui/Card';
import { calculateRetirement, type RetirementInput } from '@/lib/finance/retirement';
import { formatKRW } from '@/lib/utils';

export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useCalculatorState('retirement:currentAge', 30);
  const [retirementAge, setRetirementAge] = useCalculatorState('retirement:retirementAge', 60);
  const [expectedLifespanAge, setExpectedLifespanAge] = useCalculatorState(
    'retirement:expectedLifespanAge',
    90,
  );
  const [currentSavings, setCurrentSavings] = useCalculatorState(
    'retirement:currentSavings',
    50_000_000,
  );
  const [monthlyContribution, setMonthlyContribution] = useCalculatorState(
    'retirement:monthlyContribution',
    1_000_000,
  );
  const [expectedAnnualReturnPercent, setExpectedAnnualReturnPercent] = useCalculatorState(
    'retirement:expectedAnnualReturnPercent',
    6,
  );
  const [expectedInflationPercent, setExpectedInflationPercent] = useCalculatorState(
    'retirement:expectedInflationPercent',
    2.5,
  );
  const [annualSpendingAtRetirement, setAnnualSpendingAtRetirement] = useCalculatorState(
    'retirement:annualSpendingAtRetirement',
    40_000_000,
  );

  const result = useMemo(() => {
    return calculateRetirement({
      currentAge,
      retirementAge,
      expectedLifespanAge,
      currentSavings,
      monthlyContribution,
      expectedAnnualReturnPercent,
      expectedInflationPercent,
      annualSpendingAtRetirement,
    } as RetirementInput);
  }, [
    currentAge,
    retirementAge,
    expectedLifespanAge,
    currentSavings,
    monthlyContribution,
    expectedAnnualReturnPercent,
    expectedInflationPercent,
    annualSpendingAtRetirement,
  ]);

  return (
    <CalculatorWorkspace className="grid gap-6 lg:grid-cols-2" slug="retirement">
      <div className="min-w-0 space-y-5">
        {/* 입력 필드 */}
        <FormCard title="계산 조건 입력">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <NumberInput
              id="currentAge"
              label="현재 나이"
              value={currentAge}
              onChange={setCurrentAge}
              unit="세"
              min={0}
              max={120}
              integer
            />
            <NumberInput
              id="retirementAge"
              label="은퇴 희망 나이"
              value={retirementAge}
              onChange={setRetirementAge}
              unit="세"
              min={0}
              max={120}
              integer
            />

            <NumberInput
              id="currentSavings"
              label="현재 보유 자산"
              value={currentSavings}
              onChange={setCurrentSavings}
              unit="원"
              unitButtons={[
                { label: '1억', value: 100_000_000 },
                { label: '5000만', value: 50_000_000 },
                { label: '1000만', value: 10_000_000 },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <NumberInput
              id="monthlyContribution"
              label="월 저축액"
              value={monthlyContribution}
              onChange={setMonthlyContribution}
              unit="원"
              unitButtons={[
                { label: '500만', value: 5_000_000 },
                { label: '100만', value: 1_000_000 },
                { label: '50만', value: 500_000 },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <NumberInput
              id="annualSpendingAtRetirement"
              label="은퇴 후 연 지출"
              value={annualSpendingAtRetirement}
              onChange={setAnnualSpendingAtRetirement}
              unit="원"
              unitButtons={[
                { label: '5000만', value: 50_000_000 },
                { label: '4000만', value: 40_000_000 },
                { label: '3000만', value: 30_000_000 },
              ]}
              helpText="현재 기준 예상 연간 생활비"
            />
          </div>
          <CalculatorDetails
            summary={`기대수명 ${expectedLifespanAge}세 · 수익률 ${expectedAnnualReturnPercent}% · 물가 ${expectedInflationPercent}%`}
          >
            <NumberInput
              id="expectedLifespanAge"
              label="기대 수명"
              value={expectedLifespanAge}
              onChange={setExpectedLifespanAge}
              unit="세"
              min={0}
              max={150}
              helpText="평균 기대 수명은 약 83-85세입니다"
              integer
            />
            <NumberInput
              id="expectedAnnualReturnPercent"
              label="기대 연간 수익률"
              value={expectedAnnualReturnPercent}
              onChange={setExpectedAnnualReturnPercent}
              unit="%"
              helpText="연간 평균 수익률 (예: 주식 6%, 채권 3%)"
            />
            <NumberInput
              id="expectedInflationPercent"
              label="기대 연간 인플레이션"
              value={expectedInflationPercent}
              onChange={setExpectedInflationPercent}
              unit="%"
              helpText="연간 평균 물가 상승률 (기본 2.5%)"
            />
          </CalculatorDetails>
        </FormCard>

        {/* 경고 메시지 */}
        {result.warnings.length > 0 && (
          <div className="bg-danger-50 dark:border-danger-400 rounded-lg border-l-4 border-danger-500 p-4 dark:bg-red-950 dark:bg-opacity-20">
            <h3 className="text-danger-700 dark:text-danger-200 mb-2 font-semibold">주의사항</h3>
            <ul className="dark:text-danger-300 space-y-1 text-sm text-danger-600">
              {result.warnings.map((w, i) => (
                <li key={i}>• {w}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 결과 카드 */}
      </div>
      <div className="min-w-0 space-y-4">
        <ResultCard
          title="은퇴자금 계획 요약"
          heroLabel="예상 은퇴 자산"
          heroValue={formatKRW(result.projectedSavingsAtRetirement)}
          heroNote={
            result.shortfall <= 0
              ? '은퇴 자금이 충분합니다'
              : `${formatKRW(Math.abs(result.shortfall))} 부족합니다`
          }
          rows={[
            {
              label: '은퇴까지 기간',
              value: `${result.yearsToRetirement}년`,
              emphasize: false,
            },
            {
              label: '은퇴 기간',
              value: `${result.yearsInRetirement}년`,
              emphasize: false,
            },
            {
              label: '필요 자산',
              value: formatKRW(result.requiredSavingsAtRetirement),
              emphasize: false,
            },
            {
              label: '부족액 / 잉여액',
              value:
                result.shortfall > 0
                  ? `-${formatKRW(result.shortfall)}`
                  : `+${formatKRW(Math.abs(result.shortfall))}`,
              emphasize: true,
            },
            {
              label: '4% 가정 인출액 (연간)',
              value: formatKRW(result.safeWithdrawalRate4Percent),
              note: '은퇴 예상자산 × 4% 가정',
              emphasize: false,
            },
            {
              label: '권장 월 저축액',
              value:
                result.recommendedMonthlyContribution > 0
                  ? formatKRW(result.recommendedMonthlyContribution)
                  : '현재 저축액으로 충분',
              note:
                result.recommendedMonthlyContribution > 0
                  ? '부족분을 채우기 위한 추가 월 저축액'
                  : undefined,
              emphasize: false,
            },
          ]}
        />
        <ResultBanner />

        {/* 4% 룰 설명 */}
        <Card className="bg-bg-raised">
          <h3 className="mb-3 font-semibold">4% 룰이란?</h3>
          <p className="mb-3 text-sm text-text-secondary">
            4% 룰(Trinity Study, 1998)은 은퇴자산의 4%를 매년 인출하면 30년 이상 자금이 고갈되지
            않는다는 가설입니다. 예를 들어, 1억 원을 보유했다면 매년 400만 원을 생활비로 사용해도
            안전하다는 의미입니다.
          </p>
          <p className="text-xs text-text-tertiary">
            본 계산기는 4% 룰 기반 목표치를 제시할 뿐, 개인의 상황(세금·의료비·인플레이션)에 따라
            조정이 필요합니다. 실제 은퇴 계획은 재무설계 전문가와 상담하세요.
          </p>
        </Card>
      </div>
    </CalculatorWorkspace>
  );
}
