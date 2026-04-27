'use client';

/**
 * 퇴직금 계산기 — MVP #2
 *
 * 명세: docs/calculator-spec/퇴직금.md
 * 공식: src/lib/tax/severance.ts
 */

import { useMemo, useState } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard, type ResultRowProps } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import { calculateSeverance, type SeverancePlanType } from '@/lib/tax/severance';
import { formatKRW } from '@/lib/utils';

// ============================================
// 입력 UI 상수
// ============================================

const WAGE_UNIT_BUTTONS = [
  { label: '천만', value: 10_000_000 },
  { label: '백만', value: 1_000_000 },
  { label: '십만', value: 100_000 },
];

const ALLOWANCE_UNIT_BUTTONS = [
  { label: '백만', value: 1_000_000 },
  { label: '십만', value: 100_000 },
];

// ============================================
// 메인 계산기 컴포넌트
// ============================================

export function SeveranceCalculator() {
  // 기본 입력값
  const [hireDate, setHireDate] = useState('2014-01-01'); // 12년 근무 예시
  const [leaveDate, setLeaveDate] = useState('2026-04-24'); // 오늘
  const [monthlyOrdinaryWage, setMonthlyOrdinaryWage] = useState(3_000_000); // 300만원
  const [monthlyExtraAllowance, setMonthlyExtraAllowance] = useState(0); // 기타 수당
  const [annualBonus, setAnnualBonus] = useState(0); // 연간 상여금
  const [annualLeaveAllowance, setAnnualLeaveAllowance] = useState(0); // 연차수당

  // 퇴직연금 제도 & 세금
  const [planType, setPlanType] = useState<SeverancePlanType>('statutory');
  const [includeTax, setIncludeTax] = useState(true);

  // 계산 수행
  const result = useMemo(() => {
    if (!hireDate || !leaveDate || monthlyOrdinaryWage <= 0) {
      return null;
    }

    try {
      return calculateSeverance({
        hireDate,
        leaveDate,
        monthlyOrdinaryWage,
        monthlyExtraAllowance: Math.max(0, monthlyExtraAllowance),
        annualBonus: Math.max(0, annualBonus),
        annualLeaveAllowance: Math.max(0, annualLeaveAllowance),
        planType,
        includeTax,
      });
    } catch {
      return null;
    }
  }, [hireDate, leaveDate, monthlyOrdinaryWage, monthlyExtraAllowance, annualBonus, annualLeaveAllowance, planType, includeTax]);

  // 결과 카드 행 구성
  const resultRows: ResultRowProps[] = useMemo(() => {
    if (!result) return [];

    const rows: ResultRowProps[] = [
      {
        label: '재직일수',
        value: `${result.serviceDays.toLocaleString('ko-KR')}일`,
      },
      {
        label: '재직 연수',
        value: `${result.serviceYears.toFixed(2)}년`,
      },
      {
        label: '1일 평균임금',
        value: formatKRW(result.averageDailyWage),
      },
      {
        label: '법정 퇴직금',
        value: formatKRW(result.statutorySeverance),
      },
    ];

    // 세금 포함 시에만 추가 항목
    if (includeTax && result.retirementIncomeTax > 0) {
      rows.push(
        {
          label: '퇴직소득세',
          value: formatKRW(result.retirementIncomeTax),
        },
        {
          label: '지방소득세',
          value: formatKRW(result.localIncomeTax),
        }
      );
    }

    return rows;
  }, [result, includeTax]);

  // warnings 알림
  const warningElements = useMemo(() => {
    if (!result || result.warnings.length === 0) return null;

    return (
      <div className="rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-4">
        <p className="text-sm font-medium text-text-primary">주의사항</p>
        <ul className="mt-2 space-y-1">
          {result.warnings.map((warn, idx) => (
            <li key={idx} className="text-sm text-text-secondary">
              • {warn}
            </li>
          ))}
        </ul>
      </div>
    );
  }, [result]);

  // DC형 추가 안내
  const dcNote = useMemo(() => {
    if (planType !== 'DC') return null;
    return (
      <div className="rounded-lg border border-primary-500/30 bg-primary-500/5 p-4">
        <p className="text-sm text-text-secondary">
          DC형은 실제 적립금·운용수익을 기반으로 합니다. 본 계산기는 법정 평균임금 기준 추정치만 제공합니다.
        </p>
      </div>
    );
  }, [planType]);

  return (
    <div className="flex flex-col gap-6">
      {/* ===== 입력 폼 ===== */}
      <FormCard title="퇴직금 계산 입력">
        <div className="flex flex-col gap-5">
          {/* 입사일 / 퇴사일 */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="hire-date" className="text-sm font-medium text-text-primary">
                입사일
              </label>
              <input
                id="hire-date"
                type="date"
                value={hireDate}
                onChange={(e) => setHireDate(e.target.value)}
                className="w-full rounded-lg border border-border-base bg-bg-card px-4 py-3 text-text-primary focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                lang="ko"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="leave-date" className="text-sm font-medium text-text-primary">
                퇴사일
              </label>
              <input
                id="leave-date"
                type="date"
                value={leaveDate}
                onChange={(e) => setLeaveDate(e.target.value)}
                className="w-full rounded-lg border border-border-base bg-bg-card px-4 py-3 text-text-primary focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                lang="ko"
              />
            </div>
          </div>

          {/* 월 통상임금 */}
          <NumberInput
            id="monthly-ordinary-wage"
            label="퇴직 전 3개월 월 통상임금"
            value={monthlyOrdinaryWage}
            onChange={setMonthlyOrdinaryWage}
            placeholder="예: 3000000"
            unit="원"
            unitButtons={WAGE_UNIT_BUTTONS}
            helpText="기본급 + 직책급 + 고정 수당 (상여금·연차 제외)"
          />

          {/* 기타 수당 */}
          <NumberInput
            id="monthly-extra-allowance"
            label="퇴직 전 3개월 기타 수당 총액 (옵션)"
            value={monthlyExtraAllowance}
            onChange={setMonthlyExtraAllowance}
            placeholder="0"
            unit="원"
            unitButtons={ALLOWANCE_UNIT_BUTTONS}
            helpText="주휴수당·야간수당·연장수당 등 총액 (월 3개월간 합계)"
          />

          {/* 연간 상여금 */}
          <NumberInput
            id="annual-bonus"
            label="연간 상여금 총액 (옵션)"
            value={annualBonus}
            onChange={setAnnualBonus}
            placeholder="0"
            unit="원"
            unitButtons={ALLOWANCE_UNIT_BUTTONS}
            helpText="연 1회분 전체 금액 (1년간 예상액)"
          />

          {/* 연차수당 */}
          <NumberInput
            id="annual-leave-allowance"
            label="연차수당 (연간) (옵션)"
            value={annualLeaveAllowance}
            onChange={setAnnualLeaveAllowance}
            placeholder="0"
            unit="원"
            unitButtons={ALLOWANCE_UNIT_BUTTONS}
            helpText="연간 사용하지 않은 연차 수당"
          />

          {/* 퇴직연금 제도 */}
          <RadioGroup<SeverancePlanType>
            id="plan-type"
            label="퇴직연금 제도"
            value={planType}
            onChange={setPlanType}
            options={[
              { value: 'statutory', label: '법정퇴직금 (일반)' },
              { value: 'DB', label: 'DB형 확정급여' },
              { value: 'DC', label: 'DC형 확정기여' },
            ]}
          />

          {/* 세금 계산 */}
          <div className="flex items-center gap-3">
            <input
              id="include-tax"
              type="checkbox"
              checked={includeTax}
              onChange={(e) => setIncludeTax(e.target.checked)}
              className="h-5 w-5 rounded border-border-base text-primary-500 focus:ring-2 focus:ring-primary-500/30"
              aria-label="세금 계산 포함"
            />
            <label htmlFor="include-tax" className="text-sm font-medium text-text-primary">
              세금 계산 포함
            </label>
          </div>
        </div>
      </FormCard>

      {/* ===== 결과 카드 ===== */}
      {result ? (
        <>
          <ResultCard
            title="퇴직금 계산 결과"
            heroLabel={includeTax ? '세후 실수령액' : '법정 퇴직금'}
            heroValue={
              includeTax
                ? formatKRW(result.netSeverance)
                : formatKRW(result.statutorySeverance)
            }
            rows={resultRows}
          >
            <div className="flex flex-col gap-4">
                {/* 세금 세부내역 */}
                {includeTax && result.serviceYearsDeduction > 0 && (
                  <details className="group">
                    <summary className="cursor-pointer text-sm font-medium text-text-primary hover:text-primary-500">
                      세부 내역 보기
                    </summary>
                    <div className="mt-3 space-y-2 border-t border-border-base pt-3">
                      <div className="flex items-baseline justify-between text-sm">
                        <span className="text-text-secondary">근속연수공제</span>
                        <span className="tabular-nums font-semibold">{formatKRW(result.serviceYearsDeduction)}</span>
                      </div>
                      <div className="flex items-baseline justify-between text-sm">
                        <span className="text-text-secondary">환산급여</span>
                        <span className="tabular-nums font-semibold">{formatKRW(result.convertedSalary)}</span>
                      </div>
                      <div className="flex items-baseline justify-between text-sm">
                        <span className="text-text-secondary">환산급여공제</span>
                        <span className="tabular-nums font-semibold">{formatKRW(result.convertedSalaryDeduction)}</span>
                      </div>
                      <div className="flex items-baseline justify-between text-sm">
                        <span className="text-text-secondary">과세표준</span>
                        <span className="tabular-nums font-semibold">{formatKRW(result.retirementTaxableBase)}</span>
                      </div>
                    </div>
                  </details>
                )}

                {/* warnings 알림 */}
                {warningElements}

                {/* DC형 안내 */}
                {dcNote}
              </div>
          </ResultCard>
        <ResultBanner />
        </>
      ) : null}
    </div>
  );
}
