'use client';

/**
 * 대출한도 계산기 (DSR·LTV·DTI) — MVP #4
 *
 * 명세: docs/calculator-spec/대출한도.md
 * 공식: src/lib/finance/loan-limit.ts
 * 상수: src/lib/constants/loan-rules-2026.ts
 */

import { ResultBanner } from '@/components/calculator/ResultBanner';
import { useMemo, useState } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard } from '@/components/calculator/Result';
import { calculateLoanLimit, type RepaymentType } from '@/lib/finance/loan-limit';
import type { RegionType, LenderType, HousingStatus } from '@/lib/constants/loan-rules-2026';
import { formatKRW, formatPercent } from '@/lib/utils';

// ============================================
// 입력 UI 상수
// ============================================

const ANNUAL_INCOME_UNIT_BUTTONS = [
  { label: '1억', value: 100_000_000 },
  { label: '천만', value: 10_000_000 },
  { label: '백만', value: 1_000_000 },
];

const COLLATERAL_UNIT_BUTTONS = [
  { label: '1억', value: 100_000_000 },
  { label: '천만', value: 10_000_000 },
  { label: '백만', value: 1_000_000 },
];

const DEBT_UNIT_BUTTONS = [
  { label: '천만', value: 10_000_000 },
  { label: '백만', value: 1_000_000 },
];

// ============================================
// 메인 계산기 컴포넌트
// ============================================

interface ResultRowData {
  label: string;
  value: string;
  note?: string;
  emphasize?: boolean;
}

export function LoanLimitCalculator() {
  // 기본 입력값
  const [annualIncome, setAnnualIncome] = useState(60_000_000); // 6천만원
  const [existingDebtPayment, setExistingDebtPayment] = useState(0);
  const [existingDebtInterest, setExistingDebtInterest] = useState(0);
  const [collateralValue, setCollateralValue] = useState(500_000_000); // 5억원

  // 규제 옵션
  const [region, setRegion] = useState<RegionType>('nonRegulated');
  const [housingStatus, setHousingStatus] = useState<HousingStatus>('general');
  const [lender, setLender] = useState<LenderType>('bank');

  // 대출 조건
  const [newLoanRate, setNewLoanRate] = useState(4.0);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [applyStressDsr, setApplyStressDsr] = useState(true);
  const [repaymentType, setRepaymentType] = useState<RepaymentType>('amortization');

  // 기존 대출 이자가 기본값과 다를 수 있으므로,
  // 입력하지 않으면 연원리금과 동일로 간주
  const effectiveExistingInterest = existingDebtInterest || existingDebtPayment;

  // 계산 수행 (모든 입력값이 변경될 때 useMemo로 재계산)
  const result = useMemo(() => {
    // 검증: 기본 필수값 체크
    if (
      annualIncome < 0 ||
      collateralValue < 0 ||
      newLoanRate < 0 ||
      loanTermYears <= 0
    ) {
      return null;
    }

    try {
      return calculateLoanLimit({
        annualIncome,
        existingDebtAnnualPayment: Math.max(0, existingDebtPayment),
        existingDebtAnnualInterest: Math.max(0, effectiveExistingInterest),
        collateralValue,
        region,
        housingStatus,
        lender,
        newLoanAnnualRate: newLoanRate,
        newLoanTermYears: loanTermYears,
        applyStressDsr,
        repaymentType,
      });
    } catch {
      return null;
    }
  }, [
    annualIncome,
    existingDebtPayment,
    effectiveExistingInterest,
    collateralValue,
    region,
    housingStatus,
    lender,
    newLoanRate,
    loanTermYears,
    applyStressDsr,
    repaymentType,
  ]);

  // 결과 카드 행 구성
  const resultRows: ResultRowData[] = useMemo(() => {
    if (!result) return [];

    const rows: ResultRowData[] = [
      {
        label: '결정적 제약',
        value: result.bindingConstraint === 'collateral'
          ? '담보가치 상한'
          : `${result.bindingConstraint} (${
              result.bindingConstraint === 'DSR' ? formatPercent(lender === 'bank' ? 0.4 : 0.5) :
              result.bindingConstraint === 'LTV' ? `${Math.round(
                region === 'nonRegulated' ? 70 : housingStatus === 'firstOrSubsistence' ? 80 : 50
              )}%` :
              formatPercent(region === 'nonRegulated' ? 0.5 : 0.4)
            })`,
        note: '이 규제가 한도를 가장 낮게 제한하는 요소',
      },
      {
        label: 'DSR 기준',
        value: formatKRW(result.dsrLimit),
        note: `${formatPercent(lender === 'bank' ? 0.4 : 0.5)} 규제 적용`,
      },
      {
        label: 'LTV 기준',
        value: formatKRW(result.ltvLimit),
        note: `${Math.round(
          region === 'nonRegulated' ? 70 : housingStatus === 'firstOrSubsistence' ? 80 : 50
        )}% 규제 적용`,
      },
      {
        label: 'DTI 기준',
        value: formatKRW(result.dtiLimit),
        note: `${formatPercent(region === 'nonRegulated' ? 0.5 : 0.4)} 규제 적용`,
      },
      {
        label: '월 예상 상환액',
        value: formatKRW(result.monthlyPaymentAtLimit),
        note: `최종 한도 ${formatKRW(result.finalLimit)} 기준`,
      },
    ];

    if (result.appliedStressRate !== null) {
      rows.push({
        label: '적용 스트레스 금리',
        value: `${newLoanRate.toFixed(2)}% + ${result.appliedStressRate.toFixed(2)}% = ${(newLoanRate + result.appliedStressRate).toFixed(2)}%`,
        note: '변동금리 DSR 산정 시 적용',
      });
    }

    return rows;
  }, [result, lender, region, housingStatus, newLoanRate]);

  // 경고 메시지 렌더링
  const warningsElement = useMemo(() => {
    if (!result || result.warnings.length === 0) return null;

    return (
      <div className="rounded-lg bg-danger-500/5 border border-danger-500/20 p-4">
        <p className="text-sm font-medium text-danger-500 mb-2">주의</p>
        <ul className="space-y-1">
          {result.warnings.map((warning, idx) => (
            <li key={idx} className="text-sm text-danger-500/90">
              • {warning}
            </li>
          ))}
        </ul>
      </div>
    );
  }, [result]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* ========== 입력 폼 ========== */}
      <FormCard title="대출 조건 입력">
        <NumberInput
          id="annual-income"
          label="연 소득"
          value={annualIncome}
          onChange={setAnnualIncome}
          placeholder="예: 60,000,000"
          unitButtons={ANNUAL_INCOME_UNIT_BUTTONS}
          helpText="무직 또는 소득 없음 = 0"
          debounceMs={150}
        />

        <NumberInput
          id="existing-debt-payment"
          label="기존 대출 연 원리금"
          value={existingDebtPayment}
          onChange={setExistingDebtPayment}
          placeholder="예: 0"
          helpText="현재 갚고 있는 모든 대출의 연간 원리금 합"
          unitButtons={DEBT_UNIT_BUTTONS}
          debounceMs={150}
        />

        <NumberInput
          id="existing-debt-interest"
          label="기존 대출 연 이자 (DTI 용)"
          value={existingDebtInterest}
          onChange={setExistingDebtInterest}
          placeholder="연 원리금과 동일로 계산됨"
          helpText="비우면 위의 연 원리금과 동일로 계산됩니다"
          unitButtons={DEBT_UNIT_BUTTONS}
          debounceMs={150}
        />

        <NumberInput
          id="collateral-value"
          label="담보 가치 (주택가격)"
          value={collateralValue}
          onChange={setCollateralValue}
          placeholder="예: 500,000,000"
          unitButtons={COLLATERAL_UNIT_BUTTONS}
          debounceMs={150}
        />

        <RadioGroup
          id="region"
          label="지역 구분"
          value={region}
          onChange={setRegion}
          options={[
            { value: 'nonRegulated', label: '비규제' },
            { value: 'adjusted', label: '조정대상' },
            { value: 'speculation', label: '투기·투기과열' },
          ]}
        />

        <RadioGroup
          id="housing-status"
          label="주택 구입 상태"
          value={housingStatus}
          onChange={setHousingStatus}
          options={[
            { value: 'general', label: '일반 (2주택 이상)' },
            { value: 'firstOrSubsistence', label: '생애최초·서민실수요' },
          ]}
        />

        <RadioGroup
          id="lender"
          label="금융기관"
          value={lender}
          onChange={setLender}
          options={[
            { value: 'bank', label: '은행 (DSR 40%)' },
            { value: 'nonBank', label: '2금융권 (DSR 50%)' },
          ]}
        />

        <NumberInput
          id="new-loan-rate"
          label="신규 대출 연 이자율 (%)"
          value={newLoanRate}
          onChange={setNewLoanRate}
          placeholder="예: 4.0"
          min={0}
          max={20}
          helpText="소수점 2자리까지 입력 가능"
          debounceMs={150}
        />

        <div className="flex flex-col gap-2">
          <label htmlFor="loan-term-years" className="text-sm font-medium text-text-primary">
            신규 대출 기간
          </label>
          <select
            id="loan-term-years"
            value={loanTermYears}
            onChange={(e) => setLoanTermYears(Number(e.target.value))}
            className="w-full rounded-lg border border-border-base bg-bg-card px-4 py-3 text-text-primary focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          >
            <option value={10}>10년</option>
            <option value={20}>20년</option>
            <option value={30}>30년</option>
            <option value={40}>40년</option>
          </select>
        </div>

        <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-border-base hover:bg-bg-card/50">
          <input
            type="checkbox"
            checked={applyStressDsr}
            onChange={(e) => setApplyStressDsr(e.target.checked)}
            className="w-4 h-4 accent-primary-500"
          />
          <span className="text-sm font-medium text-text-primary">
            스트레스 DSR 적용 (변동금리 가정, +1.5%p)
          </span>
        </label>

        <RadioGroup
          id="repayment-type"
          label="상환 방식"
          value={repaymentType}
          onChange={setRepaymentType}
          options={[
            { value: 'amortization', label: '원리금균등' },
            { value: 'principal-equal', label: '원금균등' },
            { value: 'bullet', label: '만기일시' },
          ]}
        />
      </FormCard>

      {/* ========== 결과 카드 ========== */}
      <div className="flex flex-col gap-4">
        {result ? (
          <>
            <ResultCard
              title="최종 대출 한도"
              heroLabel="신규 대출 최대 가능액"
              heroValue={formatKRW(result.finalLimit)}
              rows={resultRows.map((row) => ({
                label: row.label,
                value: row.value,
                note: row.note,
                emphasize: row.emphasize,
              }))}
            />
        <ResultBanner note="실제 대출 한도는 은행 내부 기준에 따라 달라집니다." />

            {warningsElement}
          </>
        ) : (
          <div className="card flex items-center justify-center min-h-[300px]">
            <p className="text-text-secondary">조건을 입력하여 계산하세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
