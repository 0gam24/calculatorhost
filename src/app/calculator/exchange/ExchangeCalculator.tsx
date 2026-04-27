'use client';

import { ResultBanner } from '@/components/calculator/ResultBanner';
import { useState, useCallback } from 'react';
import { calculateExchange } from '@/lib/finance/exchange';
import type { ExchangeInput, ExchangeResult } from '@/lib/finance/exchange';

export function ExchangeCalculator() {
  const [direction, setDirection] = useState<'krwToForeign' | 'foreignToKrw'>(
    'krwToForeign'
  );
  const [amount, setAmount] = useState(1_000_000);
  const [baseRate, setBaseRate] = useState(1350);
  const [spreadPercent, setSpreadPercent] = useState(1.5);
  const [feePercent, setFeePercent] = useState(0);
  const [feeFlat, setFeeFlat] = useState(0);
  const [result, setResult] = useState<ExchangeResult | null>(null);

  const handleCalculate = useCallback(() => {
    const input: ExchangeInput = {
      direction,
      amount,
      baseRate,
      spreadPercent,
      feePercent,
      feeFlat,
    };
    const calculated = calculateExchange(input);
    setResult(calculated);
  }, [direction, amount, baseRate, spreadPercent, feePercent, feeFlat]);

  // 자동 계산 (입력 변경 시)
  const handleInputChange = useCallback(
    (fn: () => void) => {
      fn();
      setTimeout(handleCalculate, 0);
    },
    [handleCalculate]
  );

  return (
    <div className="mt-8 space-y-8">
      {/* 입력 폼 */}
      <div className="rounded-lg border border-border-base bg-bg-card p-6">
        <h2 className="text-xl font-semibold mb-6">환전 설정</h2>

        {/* 방향 선택 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">환전 방향</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="direction"
                value="krwToForeign"
                checked={direction === 'krwToForeign'}
                onChange={(e) =>
                  handleInputChange(() =>
                    setDirection(
                      e.target.value as 'krwToForeign' | 'foreignToKrw'
                    )
                  )
                }
                className="w-4 h-4"
              />
              <span className="text-sm">
                원 → 외화 (매도)
              </span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="direction"
                value="foreignToKrw"
                checked={direction === 'foreignToKrw'}
                onChange={(e) =>
                  handleInputChange(() =>
                    setDirection(
                      e.target.value as 'krwToForeign' | 'foreignToKrw'
                    )
                  )
                }
                className="w-4 h-4"
              />
              <span className="text-sm">
                외화 → 원 (매입)
              </span>
            </label>
          </div>
        </div>

        {/* 금액 입력 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            환전 금액
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) =>
                handleInputChange(() => setAmount(Number(e.target.value)))
              }
              className="flex-1 rounded-lg border border-border-base bg-bg-base px-4 py-2 text-sm"
              placeholder="금액 입력"
            />
        <ResultBanner note="환율은 매시간 변동되며 실제 환전 수수료는 금융기관별 다릅니다." />
            <span className="flex items-center px-4 text-sm text-text-secondary">
              {direction === 'krwToForeign' ? '원' : 'USD'}
            </span>
          </div>
        </div>

        {/* 기준환율 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">기준환율</label>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.01"
              value={baseRate}
              onChange={(e) =>
                handleInputChange(() => setBaseRate(Number(e.target.value)))
              }
              className="flex-1 rounded-lg border border-border-base bg-bg-base px-4 py-2 text-sm"
              placeholder="기준환율"
            />
            <span className="flex items-center px-4 text-sm text-text-secondary">
              USD 1 = KRW
            </span>
          </div>
          <p className="mt-2 text-xs text-text-secondary">
            한국은행 기준환율 또는 현시점 은행 제시 환율 입력
          </p>
        </div>

        {/* 스프레드 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            스프레드 (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={spreadPercent}
            onChange={(e) =>
              handleInputChange(() => setSpreadPercent(Number(e.target.value)))
            }
            className="w-full rounded-lg border border-border-base bg-bg-base px-4 py-2 text-sm"
            placeholder="스프레드"
          />
          <p className="mt-2 text-xs text-text-secondary">
            기본값: 1.5% (은행 매도/매입 차이)
          </p>
        </div>

        {/* 수수료 % */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">수수료 (%)</label>
          <input
            type="number"
            step="0.1"
            value={feePercent}
            onChange={(e) =>
              handleInputChange(() => setFeePercent(Number(e.target.value)))
            }
            className="w-full rounded-lg border border-border-base bg-bg-base px-4 py-2 text-sm"
            placeholder="수수료 %"
          />
        </div>

        {/* 고정 수수료 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            고정 수수료 (원)
          </label>
          <input
            type="number"
            value={feeFlat}
            onChange={(e) =>
              handleInputChange(() => setFeeFlat(Number(e.target.value)))
            }
            className="w-full rounded-lg border border-border-base bg-bg-base px-4 py-2 text-sm"
            placeholder="고정 수수료"
          />
        </div>

        {/* 계산 버튼 */}
        <button
          onClick={handleCalculate}
          className="w-full rounded-lg bg-primary-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-600 focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          계산하기
        </button>
      </div>

      {/* 결과 카드 */}
      {result && (
        <div className="rounded-lg border border-border-base bg-bg-card p-6">
          <h2 className="text-xl font-semibold mb-6">계산 결과</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 최종 수령액 (히어로) */}
            <div className="md:col-span-2 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 p-6 text-white">
              <p className="text-sm font-medium opacity-90">최종 수령액</p>
              <p className="mt-2 text-4xl font-bold">
                {direction === 'krwToForeign'
                  ? `$${result.netAmount.toLocaleString('en-US', {
                      maximumFractionDigits: 2,
                    })}`
                  : `₩${Math.round(result.netAmount).toLocaleString('ko-KR')}`}
              </p>
            </div>

            {/* 기본 정보 */}
            <div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border-base">
                  <span className="text-sm text-text-secondary">기준환율</span>
                  <span className="font-semibold">
                    {result.baseRate.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border-base">
                  <span className="text-sm text-text-secondary">적용환율</span>
                  <span className="font-semibold">
                    {result.appliedRate.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border-base">
                  <span className="text-sm text-text-secondary">실질환율</span>
                  <span className="font-semibold">
                    {result.effectiveRate.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* 수수료 정보 */}
            <div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border-base">
                  <span className="text-sm text-text-secondary">수수료 전</span>
                  <span className="font-semibold">
                    {direction === 'krwToForeign'
                      ? `$${result.grossAmount.toLocaleString('en-US', {
                          maximumFractionDigits: 2,
                        })}`
                      : `₩${Math.round(result.grossAmount).toLocaleString(
                          'ko-KR'
                        )}`}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border-base">
                  <span className="text-sm text-text-secondary">수수료</span>
                  <span className="font-semibold text-danger-500">
                    {direction === 'krwToForeign'
                      ? `-$${result.feeAmount.toLocaleString('en-US', {
                          maximumFractionDigits: 2,
                        })}`
                      : `-₩${Math.round(result.feeAmount).toLocaleString(
                          'ko-KR'
                        )}`}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-text-secondary">
                    환율 차손실
                  </span>
                  <span className="font-semibold text-danger-500">
                    {(
                      result.baseRate -
                      (direction === 'krwToForeign'
                        ? result.effectiveRate
                        : result.effectiveRate)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 경고 메시지 */}
          {result.warnings.length > 0 && (
            <div className="mt-6 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4">
              <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">
                알림
              </p>
              <ul className="mt-2 space-y-1">
                {result.warnings.map((warning, i) => (
                  <li key={i} className="text-sm text-yellow-700 dark:text-yellow-200">
                    • {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <ResultBanner note="환율은 매시간 변동되며 실제 환전 수수료는 금융기관별 다릅니다." />
    </div>
  );
}
