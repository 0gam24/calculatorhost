'use client';

import { ResultBanner } from '@/components/calculator/ResultBanner';
import { useState, useCallback } from 'react';
import { calculateNJobberInsurance } from '@/lib/tax/n-jobber-insurance';
import type {
  NJobberInsuranceInput,
  NJobberInsuranceResult,
} from '@/lib/tax/n-jobber-insurance';

export function NJobberInsuranceCalculator() {
  const [mainWageIncome, setMainWageIncome] = useState(50_000_000);
  const [sideBusinessIncome, setSideBusinessIncome] = useState(10_000_000);
  const [sideOtherIncome, setSideOtherIncome] = useState(0);
  const [isDependent, setIsDependent] = useState(false);
  const [result, setResult] = useState<NJobberInsuranceResult | null>(null);

  const handleCalculate = useCallback(() => {
    const input: NJobberInsuranceInput = {
      mainWageIncome: Math.max(0, mainWageIncome),
      sideBusinessIncome: Math.max(0, sideBusinessIncome),
      sideOtherIncome: Math.max(0, sideOtherIncome),
      isDependent,
    };
    const calculated = calculateNJobberInsurance(input);
    setResult(calculated);
  }, [mainWageIncome, sideBusinessIncome, sideOtherIncome, isDependent]);

  const handleInputChange = useCallback(
    (fn: () => void) => {
      fn();
      setTimeout(handleCalculate, 0);
    },
    [handleCalculate]
  );

  const formatCurrency = (value: number) => {
    return value.toLocaleString('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="mt-8 space-y-8">
      {/* 입력 폼 */}
      <div className="rounded-lg border border-border-base bg-bg-card p-6">
        <h2 className="text-xl font-semibold mb-6">소득 정보 입력</h2>

        {/* 주 근로 소득 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            주 근로소득 (연, 원)
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              min="0"
              step="1000000"
              value={mainWageIncome}
              onChange={(e) =>
                handleInputChange(() =>
                  setMainWageIncome(Number(e.target.value))
                )
              }
              className="flex-1 rounded-lg border border-border-base bg-bg-base px-4 py-2 text-sm"
              placeholder="주 근로소득 입력"
            />
            <span className="flex items-center px-4 text-sm text-text-secondary">
              원
            </span>
          </div>
          <p className="mt-2 text-xs text-text-secondary">
            직장에서의 월급·보너스 등 (건강보험료 3.545% 근로자부담)
          </p>
        </div>

        {/* 부업 사업소득 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            부업 사업소득 (연, 원)
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              min="0"
              step="500000"
              value={sideBusinessIncome}
              onChange={(e) =>
                handleInputChange(() =>
                  setSideBusinessIncome(Number(e.target.value))
                )
              }
              className="flex-1 rounded-lg border border-border-base bg-bg-base px-4 py-2 text-sm"
              placeholder="부업 사업소득 입력"
            />
            <span className="flex items-center px-4 text-sm text-text-secondary">
              원
            </span>
          </div>
          <p className="mt-2 text-xs text-text-secondary">
            프리랜서, 자영업 등 사업 관련 소득
          </p>
        </div>

        {/* 기타 부가소득 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            기타 부가소득 (연, 원)
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              min="0"
              step="500000"
              value={sideOtherIncome}
              onChange={(e) =>
                handleInputChange(() =>
                  setSideOtherIncome(Number(e.target.value))
                )
              }
              className="flex-1 rounded-lg border border-border-base bg-bg-base px-4 py-2 text-sm"
              placeholder="기타 소득 입력"
            />
            <span className="flex items-center px-4 text-sm text-text-secondary">
              원
            </span>
          </div>
          <p className="mt-2 text-xs text-text-secondary">
            이자, 배당, 강의료, 원고료 등 기타 소득
          </p>
        </div>

        {/* 피부양자 여부 */}
        <div className="mb-6">
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={isDependent}
              onChange={(e) =>
                handleInputChange(() => setIsDependent(e.target.checked))
              }
              className="rounded"
            />
            <span className="font-medium">
              현재 건강보험 피부양자 자격 유지 중
            </span>
          </label>
          <p className="mt-2 text-xs text-text-secondary">
            피부양자는 추가소득 2,000만원 이상 시 자격 상실 가능
          </p>
        </div>
      </div>

      {/* 결과 카드 */}
      {result && (
        <div className="rounded-lg border border-border-base bg-bg-card p-6" role="region" aria-label="계산 결과">
          <h2 className="text-xl font-semibold mb-6">건강보험료 계산 결과</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 mb-6">
            {/* 주 근로 건보 */}
            <div className="rounded-lg bg-bg-base p-4">
              <p className="text-xs text-text-secondary mb-2">주 근로 월보</p>
              <p className="text-2xl font-bold text-secondary-500">
                {formatCurrency(result.monthlyWagePremium)}
              </p>
            </div>

            {/* 추가소득 건보 */}
            <div className="rounded-lg bg-bg-base p-4">
              <p className="text-xs text-text-secondary mb-2">추가 월보</p>
              <p className="text-2xl font-bold text-highlight-500">
                {formatCurrency(result.extraIncomeMonthlyPremium)}
              </p>
            </div>

            {/* 월 총액 (히어로) */}
            <div className="rounded-lg border-2 border-primary-500 bg-primary-500/10 p-4">
              <p className="text-xs text-text-secondary mb-2 font-semibold">
                월 총액
              </p>
              <p className="text-3xl font-bold text-primary-500">
                {formatCurrency(result.totalMonthlyPremium)}
              </p>
            </div>

            {/* 연간 총액 */}
            <div className="rounded-lg bg-bg-base p-4">
              <p className="text-xs text-text-secondary mb-2">연간 총액</p>
              <p className="text-xl font-bold text-text-primary">
                {formatCurrency(result.annualPremium)}
              </p>
            </div>
          </div>

          {/* 피부양자 상실 경고 */}
          {result.dependentLossRisk && (
            <div className="mt-6 rounded-lg border-l-4 border-danger-500 bg-danger-500/10 p-4">
              <h3 className="font-semibold text-danger-500 mb-2">⚠️ 피부양자 자격 상실 위험</h3>
              <p className="text-sm text-text-secondary mb-3">
                추가소득이 2,000만원 이상이면 건강보험 피부양자 자격을 잃고 지역가입자로 전환되어 보험료가 크게 증가할 수 있습니다.
              </p>
              <div className="rounded-lg bg-bg-card p-3 text-sm">
                <p className="font-semibold text-text-primary mb-1">현재 추가소득:</p>
                <p className="text-primary-500">
                  {formatCurrency(result.totalExtraIncome)} (2,000만원 기준 초과)
                </p>
              </div>
            </div>
          )}

          {/* 경고 메시지 */}
          {result.warnings.length > 0 && (
            <div className="mt-6 rounded-lg border-l-4 border-highlight-500 bg-highlight-500/10 p-4">
              <h3 className="font-semibold text-highlight-500 mb-2">안내 및 주의</h3>
              <ul className="space-y-1 text-sm text-text-secondary">
                {result.warnings.map((warning, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span>•</span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 계산 설명 */}
          <div className="mt-6 rounded-lg border border-border-base bg-bg-base p-4">
            <h3 className="font-semibold mb-3">어떻게 계산되나요?</h3>
            <div className="space-y-2 text-sm text-text-secondary">
              <p>
                1. 주 근로 월보: {formatCurrency(mainWageIncome / 12)} × 3.545% ={' '}
                {formatCurrency(result.monthlyWagePremium)}
              </p>
              {result.totalExtraIncome > 20_000_000 && (
                <p>
                  2. 추가소득 월보: ({formatCurrency(result.totalExtraIncome)} -{' '}
                  2,000만) / 12 × 7.09% = {formatCurrency(result.extraIncomeMonthlyPremium)}
                </p>
              )}
              <p>
                3. 월 총액: {formatCurrency(result.monthlyWagePremium)} +{' '}
                {formatCurrency(result.extraIncomeMonthlyPremium)} ={' '}
                {formatCurrency(result.totalMonthlyPremium)}
              </p>
            </div>
          </div>
        </div>
      )}
      <ResultBanner />

      {/* 정보 안내 */}
      <div className="rounded-lg border border-border-base bg-bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">N잡러 건강보험 안내</h3>
        <div className="space-y-4 text-sm text-text-secondary">
          <div>
            <p className="font-semibold text-text-primary mb-1">📊 건강보험료 계산</p>
            <ul className="list-inside list-disc space-y-1">
              <li>근로소득: 월급의 3.545% (근로자 부담)</li>
              <li>추가소득: 2,000만원 초과분의 7.09% / 12월</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-text-primary mb-1">⚠️ 피부양자 상실 조건</p>
            <p>추가소득(사업소득 + 기타소득) ≥ 2,000만원</p>
          </div>
          <div>
            <p className="font-semibold text-text-primary mb-1">💡 절세 팁</p>
            <ul className="list-inside list-disc space-y-1">
              <li>추가소득 2,000만원 이하 유지 → 피부양자 자격 유지</li>
              <li>필요경비 적절히 공제 → 순소득 감소</li>
              <li>불확실할 땐 건강보험공단에 미리 상담</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
