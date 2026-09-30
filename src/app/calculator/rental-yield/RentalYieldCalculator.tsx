'use client';
import { CalculatorDetails } from '@/components/calculator/CalculatorDetails';

import { CalculatorWorkspace } from '@/components/calculator/CalculatorWorkspace';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';

import { ResultBanner } from '@/components/calculator/ResultBanner';
import { useMemo } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { ResultCard } from '@/components/calculator/Result';
import { calculateRentalYield, type RentalYieldInput } from '@/lib/finance/rental-yield';
import { formatKRW } from '@/lib/utils';

export function RentalYieldCalculator() {
  const [purchasePrice, setPurchasePrice] = useCalculatorState(
    'rental-yield:purchasePrice',
    300_000_000,
  );
  const [depositReceived, setDepositReceived] = useCalculatorState(
    'rental-yield:depositReceived',
    100_000_000,
  );
  const [acquisitionCosts, setAcquisitionCosts] = useCalculatorState(
    'rental-yield:acquisitionCosts',
    5_000_000,
  );
  const [monthlyRent, setMonthlyRent] = useCalculatorState('rental-yield:monthlyRent', 1_000_000);
  const [monthlyExpenses, setMonthlyExpenses] = useCalculatorState(
    'rental-yield:monthlyExpenses',
    500_000,
  );
  const [vacancyRatePercent, setVacancyRatePercent] = useCalculatorState(
    'rental-yield:vacancyRatePercent',
    5,
  );

  const result = useMemo(() => {
    return calculateRentalYield({
      purchasePrice,
      depositReceived,
      acquisitionCosts,
      monthlyRent,
      monthlyExpenses,
      vacancyRatePercent,
    } as RentalYieldInput);
  }, [
    purchasePrice,
    depositReceived,
    acquisitionCosts,
    monthlyRent,
    monthlyExpenses,
    vacancyRatePercent,
  ]);

  return (
    <CalculatorWorkspace className="grid gap-6 lg:grid-cols-2" slug="rental-yield">
      <div className="min-w-0 space-y-5">
        {/* 입력 필드 */}
        <FormCard title="계산 조건 입력">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <NumberInput
              id="purchasePrice"
              label="구매가"
              value={purchasePrice}
              onChange={setPurchasePrice}
              unit="원"
              unitButtons={[
                { label: '10억', value: 1_000_000_000 },
                { label: '5억', value: 500_000_000 },
                { label: '3억', value: 300_000_000 },
              ]}
            />
            <NumberInput
              id="depositReceived"
              label="받은 보증금"
              value={depositReceived}
              onChange={setDepositReceived}
              unit="원"
              unitButtons={[
                { label: '1억', value: 100_000_000 },
                { label: '5000만', value: 50_000_000 },
                { label: '0원', value: 0 },
              ]}
              helpText="임차인으로부터 받은 보증금 총액"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <NumberInput
              id="monthlyRent"
              label="월세"
              value={monthlyRent}
              onChange={setMonthlyRent}
              unit="원"
              unitButtons={[
                { label: '300만', value: 3_000_000 },
                { label: '100만', value: 1_000_000 },
                { label: '50만', value: 500_000 },
              ]}
            />
            <NumberInput
              id="monthlyExpenses"
              label="월 관리비"
              value={monthlyExpenses}
              onChange={setMonthlyExpenses}
              unit="원"
              unitButtons={[
                { label: '100만', value: 1_000_000 },
                { label: '50만', value: 500_000 },
                { label: '20만', value: 200_000 },
              ]}
              helpText="아파트관리비, 재산세, 보험료 등"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2"></div>
          <CalculatorDetails
            summary={`취득부대비 ${formatKRW(acquisitionCosts)} · 공실률 ${vacancyRatePercent}%`}
          >
            <NumberInput
              id="acquisitionCosts"
              label="취득부대비"
              value={acquisitionCosts}
              onChange={setAcquisitionCosts}
              unit="원"
              unitButtons={[
                { label: '1000만', value: 10_000_000 },
                { label: '500만', value: 5_000_000 },
                { label: '0원', value: 0 },
              ]}
              helpText="세금, 수수료, 리모델링 등 취득 시 부대비"
            />
            <NumberInput
              id="vacancyRatePercent"
              label="공실률"
              value={vacancyRatePercent}
              onChange={setVacancyRatePercent}
              unit="%"
              min={0}
              max={100}
              helpText="연간 평균 공실률 (0~100)"
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
          title="임대 수익 분석"
          heroLabel="연 수익률 (ROI)"
          heroValue={`${result.annualYieldPercent.toFixed(2)}%`}
          heroNote={
            result.annualYieldPercent >= 5
              ? '양호한 수익률입니다'
              : result.annualYieldPercent >= 3
                ? '중간 수익률입니다'
                : '저수익 물건입니다'
          }
          rows={[
            {
              label: '실투자금',
              value: formatKRW(result.actualInvestment),
              emphasize: false,
            },
            {
              label: 'Cap Rate',
              value: `${result.capRatePercent.toFixed(2)}%`,
              note: '구매가 기준 수익률 (더 보수적)',
              emphasize: false,
            },
            {
              label: '월 순수입',
              value: formatKRW(result.monthlyNetIncome),
              note: '월별 실질 순이익',
              emphasize: true,
            },
            {
              label: '연 순수입',
              value: formatKRW(result.annualNetIncome),
              emphasize: false,
            },
            {
              label: '연 총 임차료',
              value: formatKRW(result.annualGrossIncome),
              emphasize: false,
            },
            {
              label: '공실 손실 반영',
              value: formatKRW(result.annualEffectiveIncome),
              note: '공실률을 반영한 연 임차료',
              emphasize: false,
            },
          ]}
        />
        <ResultBanner note="음수 결과는 손실(투자금 회수 불가)을 의미합니다." />
      </div>
    </CalculatorWorkspace>
  );
}
