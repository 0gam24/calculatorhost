'use client';
import { CalculatorDetails } from '@/components/calculator/CalculatorDetails';

import {
  CalculatorWorkspace,
  useCalculatorWorkspace,
} from '@/components/calculator/CalculatorWorkspace';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';

import { ResultBanner } from '@/components/calculator/ResultBanner';
import { useEffect, useMemo } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { ResultCard } from '@/components/calculator/Result';
import { calculateRentalYield } from '@/lib/finance/rental-yield';
import { formatKRW } from '@/lib/utils';

function RentalReadiness({ error }: { error?: string }) {
  const reportValidity = useCalculatorWorkspace()?.reportValidity;
  useEffect(() => {
    reportValidity?.('rental-yield:conditions', error);
    return () => reportValidity?.('rental-yield:conditions');
  }, [error, reportValidity]);
  return error ? (
    <div
      data-testid="rental-yield-conditions"
      aria-invalid="true"
      tabIndex={-1}
      className="rounded-lg border border-danger-500 p-3 text-sm text-danger-500 focus-visible:outline focus-visible:outline-2"
    >
      <p role="alert">{error}</p>
    </div>
  ) : null;
}

function RentalResultNotice() {
  const workspace = useCalculatorWorkspace();
  if (workspace && Object.keys(workspace.invalidFields).length > 0) return null;
  return <ResultBanner note="음수 결과는 손실(투자금 회수 불가)을 의미합니다." />;
}

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

  const calculation = useMemo(() => {
    const amounts = [
      purchasePrice,
      depositReceived,
      acquisitionCosts,
      monthlyRent,
      monthlyExpenses,
    ];
    if (
      amounts.some((amount) => !Number.isFinite(amount) || amount < 0) ||
      !Number.isFinite(vacancyRatePercent) ||
      vacancyRatePercent < 0 ||
      vacancyRatePercent > 100
    ) {
      return { result: null, error: '입력값과 공실률 범위를 확인해 주세요.' };
    }
    if (purchasePrice <= 0) {
      return { result: null, error: '구매가는 0보다 큰 금액으로 입력해 주세요.' };
    }
    const investment = purchasePrice - depositReceived + acquisitionCosts;
    if (!Number.isFinite(investment) || investment <= 0) {
      return {
        result: null,
        error:
          '실투자금(구매가 − 받은 보증금 + 취득부대비)이 0보다 커야 수익률을 계산할 수 있습니다. 입력 금액을 확인해 주세요.',
      };
    }
    const result = calculateRentalYield({
      purchasePrice,
      depositReceived,
      acquisitionCosts,
      monthlyRent,
      monthlyExpenses,
      vacancyRatePercent,
    });
    const resultNumbers = [
      result.annualGrossIncome,
      result.annualEffectiveIncome,
      result.annualNetIncome,
      result.monthlyNetIncome,
      result.actualInvestment,
      result.annualYieldPercent,
      result.capRatePercent,
    ];
    if (resultNumbers.some((value) => !Number.isFinite(value))) {
      return { result: null, error: '계산 가능한 금액 범위를 확인해 주세요.' };
    }
    return { result, error: undefined };
  }, [
    purchasePrice,
    depositReceived,
    acquisitionCosts,
    monthlyRent,
    monthlyExpenses,
    vacancyRatePercent,
  ]);
  const { result, error } = calculation;

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
              min={1}
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
          <RentalReadiness error={error} />
        </FormCard>

        {/* 경고 메시지 */}
        {result && result.warnings.length > 0 && (
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
          heroValue={result ? `${result.annualYieldPercent.toFixed(2)}%` : '입력을 확인해 주세요'}
          empty={!result}
          heroNote={
            !result
              ? undefined
              : result.annualYieldPercent >= 5
                ? '양호한 수익률입니다'
                : result.annualYieldPercent >= 3
                  ? '중간 수익률입니다'
                  : '저수익 물건입니다'
          }
          rows={
            result
              ? [
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
                ]
              : []
          }
        />
        {result ? <RentalResultNotice /> : null}
      </div>
    </CalculatorWorkspace>
  );
}
