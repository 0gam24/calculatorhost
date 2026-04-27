'use client';

/**
 * 예금(정기예금) 이자 계산기 (MVP #12)
 *
 * 명세: docs/calculator-spec/예금.md
 * 공식: src/lib/finance/deposit.ts
 */

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import {
  calculateDeposit,
  type DepositCompoundingMethod,
  type TaxType,
} from '@/lib/finance/deposit';
import { formatKRW } from '@/lib/utils';

// Recharts 차트 컴포넌트 동적 import (번들 분리)
const DepositChart = dynamic(() => import('./DepositChart'), {
  ssr: false,
  loading: () => <div className="h-80 animate-pulse bg-bg-card rounded-lg" />,
});

const PRINCIPAL_UNIT_BUTTONS = [
  { label: '1억', value: 100_000_000 },
  { label: '천만', value: 10_000_000 },
  { label: '백만', value: 1_000_000 },
];

const TERM_MONTH_BUTTONS = [
  { label: '3개월', value: 3 },
  { label: '6개월', value: 6 },
  { label: '12개월', value: 12 },
  { label: '24개월', value: 24 },
  { label: '36개월', value: 36 },
  { label: '60개월', value: 60 },
];

interface CompoundingLabel {
  method: DepositCompoundingMethod;
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
  {
    method: 'dailyCompound',
    label: '일복리',
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

export function DepositCalculator() {
  const [principal, setPrincipal] = useState(10_000_000); // 천만원
  const [annualRate, setAnnualRate] = useState(3.5);
  const [termMonths, setTermMonths] = useState(12);
  const [method, setMethod] = useState<DepositCompoundingMethod>('simple');
  const [taxType, setTaxType] = useState<TaxType>('general');

  const result = useMemo(() => {
    if (principal <= 0 || termMonths <= 0 || annualRate < 0) {
      return null;
    }
    try {
      return calculateDeposit({
        principal,
        annualRatePercent: annualRate,
        termMonths,
        method,
        taxType,
      });
    } catch {
      return null;
    }
  }, [principal, annualRate, termMonths, method, taxType]);

  // 비교용 다른 2가지 방식 계산
  const simpleResult = useMemo(() => {
    if (principal <= 0 || termMonths <= 0 || annualRate < 0) {
      return null;
    }
    try {
      return calculateDeposit({
        principal,
        annualRatePercent: annualRate,
        termMonths,
        method: 'simple',
        taxType,
      });
    } catch {
      return null;
    }
  }, [principal, annualRate, termMonths, taxType]);

  const monthlyCompoundResult = useMemo(() => {
    if (principal <= 0 || termMonths <= 0 || annualRate < 0) {
      return null;
    }
    try {
      return calculateDeposit({
        principal,
        annualRatePercent: annualRate,
        termMonths,
        method: 'monthlyCompound',
        taxType,
      });
    } catch {
      return null;
    }
  }, [principal, annualRate, termMonths, taxType]);

  const dailyCompoundResult = useMemo(() => {
    if (principal <= 0 || termMonths <= 0 || annualRate < 0) {
      return null;
    }
    try {
      return calculateDeposit({
        principal,
        annualRatePercent: annualRate,
        termMonths,
        method: 'dailyCompound',
        taxType,
      });
    } catch {
      return null;
    }
  }, [principal, annualRate, termMonths, taxType]);

  // 세율 표시용 칩
  const taxRatePercent = result ? (result.appliedTaxRate * 100).toFixed(1) : '0';

  // 차트 데이터 (월별 누적)
  const chartData = useMemo(() => {
    if (!result) return [];
    const data = [];
    for (let m = 1; m <= termMonths; m++) {
      const monthFraction = m;
      let interest = 0;

      if (method === 'simple') {
        interest = Math.floor(
          (principal * annualRate / 100) * (monthFraction / 12) / 10
        ) * 10;
      } else if (method === 'monthlyCompound') {
        const r = annualRate / 100 / 12;
        if (r === 0) {
          interest = 0;
        } else {
          const maturityAtMonth = principal * Math.pow(1 + r, monthFraction);
          interest = Math.floor((maturityAtMonth - principal) / 10) * 10;
        }
      } else {
        // dailyCompound
        const r = annualRate / 100 / 365;
        if (r === 0) {
          interest = 0;
        } else {
          const days = monthFraction * 30.4167;
          const maturityAtMonth = principal * Math.pow(1 + r, days);
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
  }, [result, principal, termMonths, annualRate, method]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <FormCard title="입력">
        <NumberInput
          id="principal"
          label="예치 원금"
          value={principal}
          onChange={setPrincipal}
          placeholder="예: 10,000,000"
          unitButtons={PRINCIPAL_UNIT_BUTTONS}
          max={10_000_000_000}
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
          <label className="text-sm font-medium text-text-primary">예치 기간 (개월)</label>
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

        <RadioGroup<DepositCompoundingMethod>
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
        title="예금 계산"
        heroLabel={`${method === 'simple' ? '단리' : method === 'monthlyCompound' ? '월복리' : '일복리'} 세후 만기 수령액`}
        heroValue={result ? formatKRW(result.maturityAmount) : '계산하려면 값을 입력해 주세요'}
        heroNote={result ? `세율 ${taxRatePercent}% 적용` : undefined}
        rows={
          result
            ? [
                {
                  label: '원금',
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
                {
                  label: '연환산 세후 이자율',
                  value: `${result.annualizedNetRate.toFixed(2)}%`,
                  note: '1년 기준 환산 세후 수익률',
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
        {/* 3가지 이자 방식 비교 박스 */}
        {result && simpleResult && monthlyCompoundResult && dailyCompoundResult && (
          <div className="mt-4 rounded-lg bg-highlight-500/10 p-4">
            <p className="text-sm font-medium text-text-primary mb-3">3가지 이자 방식 비교</p>
            <div className="space-y-2 text-caption">
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  {method === 'simple' ? '✓' : '○'} 단리
                </span>
                <span className="font-semibold text-text-primary">
                  {formatKRW(simpleResult.posttaxInterest)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  {method === 'monthlyCompound' ? '✓' : '○'} 월복리
                </span>
                <span className="font-semibold text-text-primary">
                  {formatKRW(monthlyCompoundResult.posttaxInterest)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  {method === 'dailyCompound' ? '✓' : '○'} 일복리
                </span>
                <span className="font-semibold text-text-primary">
                  {formatKRW(dailyCompoundResult.posttaxInterest)}
                </span>
              </div>
              <p className="mt-3 text-text-secondary">
                최고 대비{' '}
                <span className="font-semibold text-secondary-500">
                  {formatKRW(
                    Math.max(
                      simpleResult.posttaxInterest,
                      monthlyCompoundResult.posttaxInterest,
                      dailyCompoundResult.posttaxInterest
                    ) -
                      Math.min(
                        simpleResult.posttaxInterest,
                        monthlyCompoundResult.posttaxInterest,
                        dailyCompoundResult.posttaxInterest
                      )
                  )}
                </span>{' '}
                차이
              </p>
            </div>
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
          {/* 누적 원리금 추이 차트 */}
          <div className="col-span-1 lg:col-span-2">
            <section aria-label="누적 원리금 추이 차트" className="card">
              <h3 className="mb-4 text-lg font-semibold">누적 원리금 추이</h3>
              <div className="min-h-80 w-full">
                <DepositChart data={chartData} />
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
