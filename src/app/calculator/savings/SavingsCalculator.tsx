'use client';

/**
 * 적금 이자 계산기 (MVP #11)
 *
 * 명세: docs/calculator-spec/적금.md
 * 공식: src/lib/finance/savings.ts
 */

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import {
  calculateSavings,
  type CompoundingMethod,
  type TaxType,
} from '@/lib/finance/savings';
import { formatKRW } from '@/lib/utils';

// Recharts 차트 컴포넌트 동적 import (번들 분리)
const SavingsChart = dynamic(() => import('./SavingsChart'), {
  ssr: false,
  loading: () => <div className="h-80 animate-pulse bg-bg-card rounded-lg" />,
});

const MONTHLY_DEPOSIT_UNIT_BUTTONS = [
  { label: '100만', value: 1_000_000 },
  { label: '50만', value: 500_000 },
  { label: '10만', value: 100_000 },
  { label: '1만', value: 10_000 },
];

const TERM_MONTH_BUTTONS = [
  { label: '6개월', value: 6 },
  { label: '12개월', value: 12 },
  { label: '24개월', value: 24 },
  { label: '36개월', value: 36 },
  { label: '60개월', value: 60 },
];

interface CompoundingLabel {
  method: CompoundingMethod;
  label: string;
}

interface TaxTypeLabel {
  type: TaxType;
  label: string;
}

const COMPOUNDING_LABELS: CompoundingLabel[] = [
  {
    method: 'simple',
    label: '단리',
  },
  {
    method: 'monthlyCompound',
    label: '월복리',
  },
];

const TAX_TYPE_LABELS: TaxTypeLabel[] = [
  {
    type: 'general',
    label: '일반과세 (15.4%)',
  },
  {
    type: 'preferential',
    label: '세금우대 (9.5%)',
  },
  {
    type: 'exempt',
    label: '비과세',
  },
];

export function SavingsCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(1_000_000); // 100만원
  const [annualRate, setAnnualRate] = useState(3.5);
  const [termMonths, setTermMonths] = useState(12);
  const [method, setMethod] = useState<CompoundingMethod>('simple');
  const [taxType, setTaxType] = useState<TaxType>('general');

  const result = useMemo(() => {
    if (monthlyDeposit <= 0 || termMonths <= 0 || annualRate < 0) {
      return null;
    }
    try {
      return calculateSavings({
        monthlyDeposit,
        annualRatePercent: annualRate,
        termMonths,
        method,
        taxType,
      });
    } catch {
      return null;
    }
  }, [monthlyDeposit, annualRate, termMonths, method, taxType]);

  // 단리 vs 복리 비교용 계산 (현재 선택과 반대 방식)
  const alternativeResult = useMemo(() => {
    if (monthlyDeposit <= 0 || termMonths <= 0 || annualRate < 0) {
      return null;
    }
    try {
      const alternativeMethod: CompoundingMethod = method === 'simple' ? 'monthlyCompound' : 'simple';
      return calculateSavings({
        monthlyDeposit,
        annualRatePercent: annualRate,
        termMonths,
        method: alternativeMethod,
        taxType,
      });
    } catch {
      return null;
    }
  }, [monthlyDeposit, annualRate, termMonths, method, taxType]);

  // 세율 표시용 칩
  const taxRatePercent = result ? (result.appliedTaxRate * 100).toFixed(1) : '0';

  // 차트 데이터 (월별 누적)
  const chartData = useMemo(() => {
    if (!result) return [];
    const data = [];
    for (let m = 1; m <= termMonths; m++) {
      const principal = monthlyDeposit * m;
      let interest = 0;

      if (method === 'simple') {
        // 단리: m(m+1)/2 / 12 공식의 일부
        interest = Math.floor(
          (monthlyDeposit * annualRate / 100 * m * (m + 1) / 2 / 12) / 10
        ) * 10;
      } else {
        // 월복리: 월별 누적 계산
        const r = annualRate / 100 / 12;
        if (r === 0) {
          interest = 0;
        } else {
          const maturityAtMonth = monthlyDeposit * ((Math.pow(1 + r, m) - 1) / r) * (1 + r);
          interest = Math.floor((maturityAtMonth - principal) / 10) * 10;
        }
      }

      const pretax = principal + interest;
      const tax = Math.floor((interest * result.appliedTaxRate) / 10) * 10;
      const posttax = principal + (interest - tax);

      data.push({
        month: m,
        principal,
        pretax,
        posttax,
      });
    }
    return data;
  }, [result, monthlyDeposit, termMonths, annualRate, method]);

  // 단리 vs 복리 이자 차이
  const interestDifference =
    result && alternativeResult
      ? Math.abs(result.posttaxInterest - alternativeResult.posttaxInterest)
      : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <FormCard title="입력">
        <NumberInput
          id="monthly-deposit"
          label="월 납입금액"
          value={monthlyDeposit}
          onChange={setMonthlyDeposit}
          placeholder="예: 1,000,000"
          unitButtons={MONTHLY_DEPOSIT_UNIT_BUTTONS}
          max={10_000_000}
        />

        <NumberInput
          id="annual-rate"
          label="연 이자율 (%)"
          value={annualRate}
          onChange={setAnnualRate}
          placeholder="예: 3.5"
          min={0.01}
          max={15}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-text-primary">가입 기간 (개월)</label>
          <NumberInput
            id="term-months"
            label=""
            value={termMonths}
            onChange={setTermMonths}
            placeholder="예: 12"
            min={1}
            max={360}
            className="mb-2"
          />
          <div className="flex flex-wrap gap-2">
            {TERM_MONTH_BUTTONS.map((btn) => (
              <button
                key={btn.value}
                type="button"
                onClick={() => setTermMonths(btn.value)}
                className={`rounded-chip border px-3 py-1 text-caption font-medium transition ${
                  termMonths === btn.value
                    ? 'border-primary-500 bg-primary-500/10 text-primary-500'
                    : 'border-border-base text-text-secondary hover:border-primary-500'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <RadioGroup<CompoundingMethod>
          id="method"
          label="이자 방식"
          value={method}
          onChange={setMethod}
          options={COMPOUNDING_LABELS.map((l) => ({
            value: l.method,
            label: l.label,
          }))}
        />

        <RadioGroup<TaxType>
          id="tax-type"
          label="이자 과세 방식"
          value={taxType}
          onChange={setTaxType}
          options={TAX_TYPE_LABELS.map((l) => ({
            value: l.type,
            label: l.label,
          }))}
        />
      </FormCard>

      <ResultCard
        title="적금 계산"
        heroLabel={`${method === 'simple' ? '단리' : '월복리'} 세후 만기 수령액`}
        heroValue={result ? formatKRW(result.maturityAmount) : '계산하려면 값을 입력해 주세요'}
        heroNote={result ? `세율 ${taxRatePercent}% 적용` : undefined}
        rows={
          result
            ? [
                {
                  label: '원금 합계',
                  value: formatKRW(result.principal),
                },
                {
                  label: '세전 이자',
                  value: formatKRW(result.pretaxInterest),
                },
                {
                  label: '세금',
                  value: formatKRW(result.tax),
                },
                {
                  label: '세후 이자',
                  value: formatKRW(result.posttaxInterest),
                  emphasize: true,
                },
              ]
            : [
                {
                  label: '세후 만기 수령액',
                  value: '계산하려면 값을 입력해 주세요',
                },
              ]
        }
      >
        {result && alternativeResult && (
          <div className="mt-4 rounded-lg bg-secondary-500/10 p-4">
            <p className="text-sm font-medium text-text-primary">
              {method === 'simple' ? '월복리' : '단리'} 비교
            </p>
            <p className="mt-2 text-caption text-text-secondary">
              같은 조건으로 {method === 'simple' ? '월복리' : '단리'} 방식 사용 시 세후 이자는{' '}
              <span className="font-semibold text-secondary-500">
                {formatKRW(alternativeResult.posttaxInterest)}
              </span>
              입니다. (차이: {formatKRW(interestDifference)})
            </p>
          </div>
        )}

        {result && result.warnings.length > 0 && (
          <div className="mt-4 space-y-2">
            {result.warnings.map((warning, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-danger-500/10 px-3 py-2 text-caption text-danger-500"
              >
                ⚠️ {warning}
              </div>
            ))}
          </div>
        )}
      </ResultCard>
        <ResultBanner />

      {result && (
        <>
          {/* 누적 잔액 추이 차트 */}
          <div className="col-span-1 lg:col-span-2">
            <section aria-label="누적 잔액 추이 차트" className="card">
              <h3 className="mb-4 text-lg font-semibold">누적 잔액 추이</h3>
              <div className="min-h-80 w-full">
                <SavingsChart data={chartData} />
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
