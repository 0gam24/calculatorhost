'use client';

/**
 * 프리랜서 종합소득세 계산기 (MVP #15, 블루오션 니치)
 *
 * 명세: docs/calculator-spec/프리랜서종합소득세.md
 * 공식: src/lib/tax/freelancer.ts
 *
 * 기능:
 * - 연간 수입, 경비 산정 방식 선택 (단순경비율 / 실제 경비)
 * - 원천징수액 자동 계산 / 수동 입력
 * - 부양가족·자녀 공제
 * - 종합소득세·지방소득세·최종 정산액 계산
 */

import { useMemo, useState } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard, type ResultRowProps } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import {
  calculateFreelancerTax,
  type ExpenseMethod,
  type FreelancerInput,
} from '@/lib/tax/freelancer';
import { formatKRW } from '@/lib/utils';

const PRESET_EXPENSE_RATES = [
  { label: '인적용역 (기본)', rate: 64.1 },
  { label: 'IT·소프트웨어', rate: 66.6 },
  { label: '학원강사', rate: 58.0 },
] as const;

export function FreelancerCalculator() {
  // 기본 입력
  const [annualRevenue, setAnnualRevenue] = useState<number>(30_000_000);
  const [expenseMethod, setExpenseMethod] = useState<ExpenseMethod>('simpleRate');
  const [simpleExpenseRatePercent, setSimpleExpenseRatePercent] = useState<number>(64.1);
  const [actualExpenses, setActualExpenses] = useState<number>(0);

  // 원천징수액
  const [useAutoWithholding, setUseAutoWithholding] = useState<boolean>(true);
  const [withholdingPaid, setWithholdingPaid] = useState<number>(0);

  // 부양가족·공제
  const [dependents, setDependents] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [nationalPensionPaid, setNationalPensionPaid] = useState<number>(0);
  const [healthInsurancePaid, setHealthInsurancePaid] = useState<number>(0);

  // 즉시 계산 (useMemo)
  const result = useMemo(() => {
    const autoWithholding = useAutoWithholding ? annualRevenue * 0.033 : withholdingPaid;

    const input: FreelancerInput = {
      annualRevenue: Math.max(0, annualRevenue),
      expenseMethod,
      simpleExpenseRatePercent:
        expenseMethod === 'simpleRate' ? simpleExpenseRatePercent : undefined,
      actualExpenses: expenseMethod === 'actual' ? actualExpenses : undefined,
      withholdingPaid: autoWithholding,
      dependents: Math.max(1, dependents),
      children: Math.max(0, children),
      nationalPensionPaid: Math.max(0, nationalPensionPaid),
      healthInsurancePaid: Math.max(0, healthInsurancePaid),
    };

    return calculateFreelancerTax(input);
  }, [
    annualRevenue,
    expenseMethod,
    simpleExpenseRatePercent,
    actualExpenses,
    useAutoWithholding,
    withholdingPaid,
    dependents,
    children,
    nationalPensionPaid,
    healthInsurancePaid,
  ]);

  // 정산액의 색상 (환급 vs 추가납부)
  const settlementColor =
    result.settlementAmount > 0
      ? 'text-danger-500' // 추가납부
      : result.settlementAmount < 0
        ? 'text-green-500' // 환급
        : 'text-text-secondary'; // 0원

  const settlementBg =
    result.settlementAmount > 0
      ? 'bg-danger-500/10 border-danger-500/30'
      : result.settlementAmount < 0
        ? 'bg-green-500/10 border-green-500/30'
        : 'bg-bg-card border-border-base';

  // 결과 카드 행 구성
  const resultRows: ResultRowProps[] = useMemo(() => {
    const rows: ResultRowProps[] = [];

    rows.push({
      label: '연간 총 수입',
      value: formatKRW(result.annualRevenue),
    });

    rows.push({
      label: '필요경비',
      value: formatKRW(result.expenseAmount),
      note:
        expenseMethod === 'simpleRate'
          ? `단순경비율 ${simpleExpenseRatePercent}%`
          : '실제 경비',
    });

    rows.push({
      label: '사업소득',
      value: formatKRW(result.businessIncome),
    });

    // 접이식 섹션용 상세 항목들 (나중에 토글되는 내용)
    rows.push({
      label: '인적공제',
      value: formatKRW(result.personalDeduction),
      note: `부양가족 ${dependents}명 (1인당 150만원)`,
    });

    rows.push({
      label: '사회보험료 공제',
      value: formatKRW(result.socialInsuranceDeduction),
      note: `국민연금 + 건강보험`,
    });

    rows.push({
      label: '과세표준',
      value: formatKRW(result.taxableBase),
    });

    rows.push({
      label: '산출세액',
      value: formatKRW(result.grossTax),
    });

    if (result.childTaxCredit > 0) {
      rows.push({
        label: '자녀세액공제',
        value: `-${formatKRW(result.childTaxCredit).replace('원', '')}원`,
        note: `자녀 ${children}명`,
      });
    }

    rows.push({
      label: '결정세액 (지방소득세 제외)',
      value: formatKRW(result.finalTax),
    });

    rows.push({
      label: '지방소득세',
      value: formatKRW(result.localIncomeTax),
      note: '결정세액의 10%',
    });

    rows.push({
      label: '총 세금',
      value: formatKRW(result.totalTaxLiability),
      emphasize: true,
    });

    rows.push({
      label: '기납부 원천징수액',
      value: formatKRW(result.withholdingPaid),
      note: useAutoWithholding ? '(자동 계산)' : '(직접 입력)',
    });

    return rows;
  }, [
    result,
    dependents,
    children,
    expenseMethod,
    simpleExpenseRatePercent,
    useAutoWithholding,
  ]);

  return (
    <div className="flex flex-col gap-6">
      {/* 입력 폼 */}
      <FormCard title="소득 정보">
        <div className="flex flex-col gap-5">
          {/* 연간 수입 */}
          <div>
            <label htmlFor="freelancer-revenue" className="mb-3 block text-sm font-semibold">
              연간 총 수입 (매출)
            </label>
            <NumberInput
              id="freelancer-revenue"
              label="연간 총 수입 (매출)"
              value={annualRevenue}
              onChange={setAnnualRevenue}
              placeholder="30,000,000"
              unit="원"
              min={0}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => setAnnualRevenue(10_000_000)}
                className="rounded-full border border-border-base bg-bg-card px-3 py-1 text-sm hover:bg-primary-500/20 transition-colors"
              >
                1,000만
              </button>
              <button
                onClick={() => setAnnualRevenue(50_000_000)}
                className="rounded-full border border-border-base bg-bg-card px-3 py-1 text-sm hover:bg-primary-500/20 transition-colors"
              >
                5,000만
              </button>
              <button
                onClick={() => setAnnualRevenue(100_000_000)}
                className="rounded-full border border-border-base bg-bg-card px-3 py-1 text-sm hover:bg-primary-500/20 transition-colors"
              >
                1억
              </button>
            </div>
          </div>

          {/* 경비 산정 방식 */}
          <RadioGroup<ExpenseMethod>
            id="freelancer-expense-method"
            label="경비 산정 방식"
            value={expenseMethod}
            onChange={setExpenseMethod}
            options={[
              { value: 'simpleRate', label: '단순경비율 사용 (일반적)' },
              { value: 'actual', label: '실제 경비 직접 입력' },
            ]}
          />

          {/* 단순경비율 입력 (expenseMethod === 'simpleRate' 일 때만) */}
          {expenseMethod === 'simpleRate' && (
            <div>
              <label htmlFor="freelancer-expense-rate" className="mb-3 block text-sm font-semibold">
                단순경비율 (%)
              </label>
              <NumberInput
                id="freelancer-expense-rate"
                label="단순경비율 (%)"
                value={simpleExpenseRatePercent}
                onChange={setSimpleExpenseRatePercent}
                placeholder="64.1"
                unit="%"
                min={0}
                max={100}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {PRESET_EXPENSE_RATES.map(({ label, rate }) => (
                  <button
                    key={rate}
                    onClick={() => setSimpleExpenseRatePercent(rate)}
                    className="rounded-full border border-border-base bg-bg-card px-3 py-1 text-sm hover:bg-primary-500/20 transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-text-tertiary">
                업종별로 정해진 경비율입니다. 정확한 업종코드 확인이 필요합니다.
              </p>
            </div>
          )}

          {/* 실제 경비 입력 (expenseMethod === 'actual' 일 때만) */}
          {expenseMethod === 'actual' && (
            <NumberInput
              id="freelancer-actual-expenses"
              label="실제 경비"
              value={actualExpenses}
              onChange={setActualExpenses}
              placeholder="10,000,000"
              unit="원"
              min={0}
            />
          )}
        </div>
      </FormCard>

      {/* 원천징수 설정 */}
      <FormCard title="기납부 원천징수액">
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useAutoWithholding}
              onChange={(e) => setUseAutoWithholding(e.target.checked)}
              className="cursor-pointer"
            />
            <span className="text-sm font-medium">자동 계산 (수입 × 3.3%)</span>
          </label>

          {useAutoWithholding ? (
            <div className="rounded-lg bg-bg-card p-3 text-sm text-text-secondary">
              자동 계산: {formatKRW(annualRevenue)} × 3.3% = {formatKRW(Math.round(annualRevenue * 0.033))}
            </div>
          ) : (
            <NumberInput
              id="freelancer-withholding"
              label="직접 입력"
              value={withholdingPaid}
              onChange={setWithholdingPaid}
              placeholder="0"
              unit="원"
              min={0}
            />
          )}

          <p className="text-xs text-text-tertiary">
            3.3% 원천징수는 소득세법 §127에 따른 의무 원천징수입니다.
          </p>
        </div>
      </FormCard>

      {/* 부양가족·공제 */}
      <FormCard title="부양가족 · 공제">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <NumberInput
            id="freelancer-dependents"
            label="부양가족 수 (본인 포함)"
            value={dependents}
            onChange={setDependents}
            min={1}
            max={10}
            placeholder="1"
          />

          <NumberInput
            id="freelancer-children"
            label="20세 이하 자녀 수"
            value={children}
            onChange={setChildren}
            min={0}
            max={10}
            placeholder="0"
          />

          <NumberInput
            id="freelancer-pension"
            label="연 국민연금 납부액"
            value={nationalPensionPaid}
            onChange={setNationalPensionPaid}
            placeholder="0"
            unit="원"
            min={0}
          />

          <NumberInput
            id="freelancer-health"
            label="연 건강보험 납부액"
            value={healthInsurancePaid}
            onChange={setHealthInsurancePaid}
            placeholder="0"
            unit="원"
            min={0}
          />
        </div>
      </FormCard>

      {/* 결과 카드 */}
      <ResultCard
        title="계산 결과"
        heroLabel="최종 정산액"
        heroValue={formatKRW(Math.abs(result.settlementAmount)).replace('원', '')}
        rows={resultRows}
      >
        {/* 정산 상태 박스 */}
        <div className={`rounded-lg border p-4 ${settlementBg}`}>
          <p className={`text-sm font-medium ${settlementColor}`}>
            {result.settlementAmount > 0
              ? `추가 납부 예상: ${formatKRW(result.settlementAmount)}`
              : result.settlementAmount < 0
                ? `환급 예상: ${formatKRW(Math.abs(result.settlementAmount))}`
                : '납부 불필요 (0원)'}
          </p>
          <p className="mt-2 text-xs text-text-secondary">
            {result.settlementAmount > 0
              ? '5월 종합소득세 신고 시 추가로 납부해야 합니다.'
              : '기납부 원천징수액이 최종 세액보다 많아 환급받을 수 있습니다.'}
          </p>
        </div>

        {/* 경고 메시지 */}
        {result.warnings.length > 0 && (
          <div className="rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-4">
            <p className="text-sm font-medium text-text-primary mb-2">주의사항</p>
            <ul className="space-y-1">
              {result.warnings.map((warn, idx) => (
                <li key={idx} className="text-xs text-text-secondary">
                  • {warn}
                </li>
              ))}
            </ul>
          </div>
        )}
      </ResultCard>
        <ResultBanner />
    </div>
  );
}
