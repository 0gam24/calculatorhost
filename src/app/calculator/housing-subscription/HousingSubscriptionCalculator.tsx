'use client';

import { ResultBanner } from '@/components/calculator/ResultBanner';
import { useState, useCallback } from 'react';
import { calculateHousingSubscriptionScore } from '@/lib/utils/housing-subscription';
import type {
  HousingSubscriptionInput,
  HousingSubscriptionResult,
} from '@/lib/utils/housing-subscription';

export function HousingSubscriptionCalculator() {
  const [noHomeYears, setNoHomeYears] = useState(5);
  const [dependents, setDependents] = useState(2);
  const [accountYears, setAccountYears] = useState(3);
  const [result, setResult] = useState<HousingSubscriptionResult | null>(null);

  const handleCalculate = useCallback(() => {
    const input: HousingSubscriptionInput = {
      noHomeYears,
      dependents,
      accountYears,
    };
    const calculated = calculateHousingSubscriptionScore(input);
    setResult(calculated);
  }, [noHomeYears, dependents, accountYears]);

  // 자동 계산 (입력 변경 시)
  const handleInputChange = useCallback(
    (fn: () => void) => {
      fn();
      setTimeout(handleCalculate, 0);
    },
    [handleCalculate]
  );

  const getScoreColor = (score: number, max: number) => {
    const ratio = score / max;
    if (ratio >= 0.8) return 'bg-primary-500';
    if (ratio >= 0.6) return 'bg-secondary-500';
    if (ratio >= 0.4) return 'bg-highlight-500';
    return 'bg-danger-500';
  };

  return (
    <div className="mt-8 space-y-8">
      {/* 입력 폼 */}
      <div className="rounded-lg border border-border-base bg-bg-card p-6">
        <h2 className="text-xl font-semibold mb-6">청약 정보 입력</h2>

        {/* 무주택 기간 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            무주택 기간 (년)
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              step="0.5"
              min="0"
              value={noHomeYears}
              onChange={(e) =>
                handleInputChange(() => setNoHomeYears(Number(e.target.value)))
              }
              className="flex-1 rounded-lg border border-border-base bg-bg-base px-4 py-2 text-sm"
              placeholder="무주택 기간 입력"
            />
            <span className="flex items-center px-4 text-sm text-text-secondary">
              년
            </span>
          </div>
          <p className="mt-2 text-xs text-text-secondary">
            청약신청일 기준으로 계산. 0.5년 = 6개월
          </p>
        </div>

        {/* 부양가족 수 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">부양가족 수 (명)</label>
          <div className="flex gap-4">
            <input
              type="number"
              min="0"
              max="20"
              value={dependents}
              onChange={(e) =>
                handleInputChange(() => setDependents(Number(e.target.value)))
              }
              className="flex-1 rounded-lg border border-border-base bg-bg-base px-4 py-2 text-sm"
              placeholder="부양가족 수 입력"
            />
            <span className="flex items-center px-4 text-sm text-text-secondary">
              명
            </span>
          </div>
          <p className="mt-2 text-xs text-text-secondary">
            본인 포함. 6명 이상은 35점 만점
          </p>
        </div>

        {/* 청약통장 가입 기간 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            청약통장 가입 기간 (년)
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              step="0.5"
              min="0"
              value={accountYears}
              onChange={(e) =>
                handleInputChange(() => setAccountYears(Number(e.target.value)))
              }
              className="flex-1 rounded-lg border border-border-base bg-bg-base px-4 py-2 text-sm"
              placeholder="청약통장 기간 입력"
            />
            <span className="flex items-center px-4 text-sm text-text-secondary">
              년
            </span>
          </div>
          <p className="mt-2 text-xs text-text-secondary">
            가입일부터 청약신청일까지. 월 2만원 이상 납입 필수
          </p>
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
        <div className="rounded-lg border border-border-base bg-bg-card p-6 space-y-6">
          <h2 className="text-xl font-semibold">계산 결과</h2>

          {/* 합계 점수 (히어로) */}
          <div className="rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 p-8 text-white text-center">
            <p className="text-sm font-medium opacity-90">청약가점</p>
            <p className="mt-2 text-6xl font-bold">{result.totalScore}</p>
            <p className="mt-2 text-sm opacity-75">/ 84점</p>
          </div>

          {/* 점수 분석 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 무주택 기간 */}
            <div className="rounded-lg border border-border-base p-4">
              <h3 className="text-sm font-semibold mb-3">무주택 기간</h3>
              <div className="flex items-end justify-between mb-2">
                <span className="text-2xl font-bold text-primary-500">
                  {result.noHomeScore}
                </span>
                <span className="text-sm text-text-secondary">32점 만점</span>
              </div>
              <div className="w-full bg-border-base rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all ${getScoreColor(
                    result.noHomeScore,
                    32
                  )}`}
                  style={{
                    width: `${(result.noHomeScore / 32) * 100}%`,
                  }}
                />
              </div>
              <p className="mt-3 text-xs text-text-secondary">
                {noHomeYears < 1
                  ? '1년 미만: 2점'
                  : noHomeYears < 15
                  ? `${Math.floor(noHomeYears)}년+: ${result.noHomeScore}점`
                  : '15년 이상: 32점 만점'}
              </p>
            </div>

            {/* 부양가족 수 */}
            <div className="rounded-lg border border-border-base p-4">
              <h3 className="text-sm font-semibold mb-3">부양가족 수</h3>
              <div className="flex items-end justify-between mb-2">
                <span className="text-2xl font-bold text-secondary-500">
                  {result.dependentsScore}
                </span>
                <span className="text-sm text-text-secondary">35점 만점</span>
              </div>
              <div className="w-full bg-border-base rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all ${getScoreColor(
                    result.dependentsScore,
                    35
                  )}`}
                  style={{
                    width: `${(result.dependentsScore / 35) * 100}%`,
                  }}
                />
              </div>
              <p className="mt-3 text-xs text-text-secondary">
                {dependents >= 6
                  ? '6명 이상: 35점 만점'
                  : `${dependents}명: ${result.dependentsScore}점`}
              </p>
            </div>

            {/* 청약통장 기간 */}
            <div className="rounded-lg border border-border-base p-4">
              <h3 className="text-sm font-semibold mb-3">청약통장 기간</h3>
              <div className="flex items-end justify-between mb-2">
                <span className="text-2xl font-bold text-highlight-500">
                  {result.accountScore}
                </span>
                <span className="text-sm text-text-secondary">17점 만점</span>
              </div>
              <div className="w-full bg-border-base rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all ${getScoreColor(
                    result.accountScore,
                    17
                  )}`}
                  style={{
                    width: `${(result.accountScore / 17) * 100}%`,
                  }}
                />
              </div>
              <p className="mt-3 text-xs text-text-secondary">
                {accountYears < 0.5
                  ? '6개월 미만: 1점'
                  : accountYears < 1
                  ? '6개월~1년: 2점'
                  : accountYears >= 15
                  ? '15년 이상: 17점 만점'
                  : `${Math.floor(accountYears)}년+: ${result.accountScore}점`}
              </p>
            </div>
          </div>

          {/* 점수 분석 및 당첨 가능성 */}
          <div className="rounded-lg bg-bg-base p-4 space-y-3">
            <h3 className="text-sm font-semibold">당첨 가능성 분석</h3>
            {result.totalScore >= 70 && (
              <div className="text-sm text-primary-500">
                <p className="font-semibold">높음</p>
                <p>
                  가점이 높습니다. 단지별 경쟁 상황에 따라 당첨 확률이 좋을 것으로
                  예상됩니다.
                </p>
              </div>
            )}
            {result.totalScore >= 50 && result.totalScore < 70 && (
              <div className="text-sm text-secondary-500">
                <p className="font-semibold">중간</p>
                <p>
                  중간 정도의 가점입니다. 단지의 경쟁 강도와 신청자 평균을 확인해
                  판단하세요.
                </p>
              </div>
            )}
            {result.totalScore < 50 && (
              <div className="text-sm text-danger-500">
                <p className="font-semibold">낮음</p>
                <p>
                  현재 가점이 낮습니다. 시간 경과(무주택·통장), 가족 구성 변화(부양가족)를
                  기다리거나, 가점이 낮은 지역/단지를 타깃하세요.
                </p>
              </div>
            )}
          </div>

          {/* 경고 메시지 */}
          {result.warnings.length > 0 && (
            <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4">
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

          {/* 주의사항 */}
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
            <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-2">
              ⚠️ 중요 안내
            </p>
            <ul className="space-y-1 text-xs text-blue-700 dark:text-blue-200">
              <li>
                • 본 계산은 참고용입니다. 실제 가점은 청약홈에서 공식 확인하세요.
              </li>
              <li>
                • 당첨 확률은 가점 외에도 단지의 신청자 수와 경쟁 상황에 따라
                달라집니다.
              </li>
              <li>
                • 무주택자 자격, 부양가족 인정 기준은 복잡하니 청약홈 "자격확인"을
                통해 정확히 확인하세요.
              </li>
            </ul>
          </div>
        </div>
      )}
      <ResultBanner />
    </div>
  );
}
