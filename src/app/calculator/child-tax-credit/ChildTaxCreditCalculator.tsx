'use client';

import { useState, useCallback } from 'react';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import { calculateChildTaxCredit } from '@/lib/tax/child-tax-credit';
import type {
  ChildTaxCreditInput,
  ChildTaxCreditResult,
} from '@/lib/tax/child-tax-credit';

export function ChildTaxCreditCalculator() {
  const [householdType, setHouseholdType] = useState<'dualEarner' | 'singleEarner' | 'single'>('dualEarner');
  const [totalAnnualIncome, setTotalAnnualIncome] = useState(30_000_000);
  const [childCount, setChildCount] = useState(2);
  const [passesAssetTest, setPassesAssetTest] = useState(true);
  const [result, setResult] = useState<ChildTaxCreditResult | null>(null);

  const handleCalculate = useCallback(() => {
    const input: ChildTaxCreditInput = {
      householdType,
      totalAnnualIncome: Math.max(0, totalAnnualIncome),
      childCount: Math.max(0, childCount),
      passesAssetTest,
    };
    const calculated = calculateChildTaxCredit(input);
    setResult(calculated);
  }, [householdType, totalAnnualIncome, childCount, passesAssetTest]);

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
        <h2 className="text-xl font-semibold mb-6">자녀장려금 정보 입력</h2>

        {/* 가구 유형 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">가구 유형 *</label>
          <div className="flex gap-3">
            {[
              { value: 'singleEarner' as const, label: '홑벌이 (1인 근로)' },
              { value: 'dualEarner' as const, label: '맞벌이 (2인 이상)' },
              { value: 'single' as const, label: '단독 (비해당)' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  handleInputChange(() => setHouseholdType(option.value))
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  householdType === option.value
                    ? 'bg-primary-500 text-white'
                    : 'border border-border-base text-text-secondary hover:bg-bg-base'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-text-secondary">
            ⚠️ 단독 가구는 자녀장려금 대상이 아닙니다(근로장려금 대상).
          </p>
        </div>

        {/* 연 총소득 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">연 총소득 (원)</label>
          <div className="flex gap-4">
            <input
              type="number"
              min="0"
              step="1000000"
              value={totalAnnualIncome}
              onChange={(e) =>
                handleInputChange(() =>
                  setTotalAnnualIncome(Number(e.target.value))
                )
              }
              className="flex-1 rounded-lg border border-border-base bg-bg-base px-4 py-2 text-sm"
              placeholder="연 총소득 입력"
            />
            <span className="flex items-center px-4 text-sm text-text-secondary">
              원
            </span>
          </div>
          <p className="mt-2 text-xs text-text-secondary">
            기준: 3,600만원 이하 전액 | 3,600~4,300만 감액 | 4,300만 초과 0원
          </p>
        </div>

        {/* 자녀 수 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            18세 미만 자녀 수 (명)
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              min="0"
              max="20"
              value={childCount}
              onChange={(e) =>
                handleInputChange(() => setChildCount(Number(e.target.value)))
              }
              className="flex-1 rounded-lg border border-border-base bg-bg-base px-4 py-2 text-sm"
              placeholder="자녀 수 입력"
            />
            <span className="flex items-center px-4 text-sm text-text-secondary">
              명
            </span>
          </div>
          <p className="mt-2 text-xs text-text-secondary">
            자녀당 연 100만원 기준
          </p>
        </div>

        {/* 재산 기준 */}
        <div className="mb-6">
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={passesAssetTest}
              onChange={(e) =>
                handleInputChange(() => setPassesAssetTest(e.target.checked))
              }
              className="rounded"
            />
            <span className="font-medium">
              재산이 2.4억원 미만이다
            </span>
          </label>
          <p className="mt-2 text-xs text-text-secondary">
            재산(과세표준) 2.4억원 초과 시 자녀장려금을 받을 수 없습니다.
          </p>
        </div>
      </div>

      {/* 결과 카드 */}
      {result && (
        <div className="rounded-lg border border-border-base bg-bg-card p-6">
          <h2 className="text-xl font-semibold mb-6">자녀장려금 계산 결과</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 mb-6">
            {/* 해당 자녀 수 */}
            <div className="rounded-lg bg-bg-base p-4">
              <p className="text-xs text-text-secondary mb-2">해당 자녀 수</p>
              <p className="text-2xl font-bold text-primary-500">
                {result.eligibleChildCount}명
              </p>
            </div>

            {/* 감액률 */}
            <div className="rounded-lg bg-bg-base p-4">
              <p className="text-xs text-text-secondary mb-2">감액률</p>
              <p className="text-2xl font-bold text-secondary-500">
                {(result.reductionRate * 100).toFixed(1)}%
              </p>
            </div>

            {/* 감액 전 지급액 */}
            <div className="rounded-lg bg-bg-base p-4">
              <p className="text-xs text-text-secondary mb-2">감액 전</p>
              <p className="text-xl font-bold text-text-primary">
                {formatCurrency(result.grossPayment)}
              </p>
            </div>

            {/* 최종 지급액 (히어로) */}
            <div className="rounded-lg border-2 border-primary-500 bg-primary-500/10 p-4">
              <p className="text-xs text-text-secondary mb-2 font-semibold">
                최종 지급액
              </p>
              <p className="text-3xl font-bold text-primary-500">
                {formatCurrency(result.finalPayment)}
              </p>
            </div>
          </div>

          {/* 경고 메시지 */}
          {result.warnings.length > 0 && (
            <div className="mt-6 rounded-lg border-l-4 border-danger-500 bg-danger-500/10 p-4">
              <h3 className="font-semibold text-danger-500 mb-2">안내 및 주의</h3>
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

          {/* 결과 설명 */}
          {result.finalPayment > 0 && (
            <div className="mt-6 rounded-lg border border-border-base bg-bg-base p-4">
              <h3 className="font-semibold mb-3">어떻게 계산되나요?</h3>
              <div className="space-y-2 text-sm text-text-secondary">
                <p>
                  1. 기본 지급액: {result.eligibleChildCount}명 × 100만원 ={' '}
                  {formatCurrency(result.grossPayment)}
                </p>
                {result.reductionRate > 0 && (
                  <p>
                    2. 감액률: {(result.reductionRate * 100).toFixed(1)}% 적용
                  </p>
                )}
                <p>
                  3. 최종 지급액: {formatCurrency(result.finalPayment)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      <ResultBanner />

      {/* 신청 안내 */}
      <div className="rounded-lg border border-border-base bg-bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">자녀장려금 신청 방법</h3>
        <div className="space-y-4 text-sm text-text-secondary">
          <div>
            <p className="font-semibold text-text-primary mb-1">📅 신청 기간</p>
            <p>매년 5월 귀속 종합소득세 신고 기간 중 함께 신청</p>
          </div>
          <div>
            <p className="font-semibold text-text-primary mb-1">🏛️ 신청처</p>
            <p>
              국세청 또는 세무서 (홈택스, 모바일 택스나 세무서 직접 방문)
            </p>
          </div>
          <div>
            <p className="font-semibold text-text-primary mb-1">📋 필요 서류</p>
            <ul className="list-inside list-disc space-y-1">
              <li>소득증명서 (근로소득 및 기타소득)</li>
              <li>가족관계증명서 또는 건강보험료 청구서</li>
              <li>재산세 과세명세서 (재산 확인)</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-text-primary mb-1">💰 지급 시기</p>
            <p>신고 후 약 2-3개월 뒤 국세청에서 지급</p>
          </div>
        </div>
      </div>
    </div>
  );
}
