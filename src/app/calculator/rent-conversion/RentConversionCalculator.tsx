'use client';

/**
 * 전월세 전환 계산기 (MVP #9)
 *
 * 명세: docs/calculator-spec/전월세전환.md
 * 공식: src/lib/finance/rent-conversion.ts
 * 상수: src/lib/constants/rent-rules-2026.ts
 *
 * 3 모드 탭:
 * A. 전세 → 월세 (jeonseToMonthly)
 * B. 월세 → 전세 (monthlyToJeonse)
 * C. 전환율 역산 (rateReverse)
 */

import { ResultBanner } from '@/components/calculator/ResultBanner';
import { useMemo, useState } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import {
  calculateRentConversion,
  type ConversionMode,
  type RentConversionInput,
  type RentConversionResult,
} from '@/lib/finance/rent-conversion';
import { formatKRW, formatPercent, cn } from '@/lib/utils';

const PRICE_UNIT_BUTTONS = [
  { label: '1억', value: 100_000_000 },
  { label: '천만', value: 10_000_000 },
  { label: '백만', value: 1_000_000 },
];

interface ModeConfig {
  id: ConversionMode;
  label: string;
  description: string;
}

const MODES: ModeConfig[] = [
  {
    id: 'jeonseToMonthly',
    label: '전세 → 월세',
    description: '기존 전세보증금에서 새 보증금으로 감소하면, 그 차액을 월세로 전환',
  },
  {
    id: 'monthlyToJeonse',
    label: '월세 → 전세',
    description: '보증금과 월세가 있을 때 이를 전세로 환산한 금액 계산',
  },
  {
    id: 'rateReverse',
    label: '전환율 역산',
    description: '실제 계약한 전세·보증금·월세에서 적용된 전환율이 몇 %인지 계산',
  },
];

export function RentConversionCalculator() {
  // 입력 상태
  const [mode, setMode] = useState<ConversionMode>('jeonseToMonthly');

  // Mode A: 전세 → 월세
  const [jeonseDeposit, setJeonseDeposit] = useState(500_000_000);
  const [newDeposit, setNewDeposit] = useState(200_000_000);

  // Mode B: 월세 → 전세
  const [baseDeposit, setBaseDeposit] = useState(100_000_000);
  const [monthlyRent, setMonthlyRent] = useState(500_000);

  // Mode C: 전환율 역산
  const [jeonseDepositC, setJeonseDepositC] = useState(500_000_000);
  const [newDepositC, setNewDepositC] = useState(200_000_000);
  const [monthlyRentC, setMonthlyRentC] = useState(1_375_000);

  // 공통 (고급 설정)
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [baseRatePercent, setBaseRatePercent] = useState(3.5);
  const [additionalRatePercent, setAdditionalRatePercent] = useState(2.0);
  const [annualCapPercent, setAnnualCapPercent] = useState(10.0);

  // 계산 실행
  const result: RentConversionResult = useMemo(() => {
    try {
      let input: RentConversionInput;

      if (mode === 'jeonseToMonthly') {
        input = {
          mode,
          jeonseDeposit,
          newDeposit,
          baseRatePercent,
          additionalRatePercent,
          annualCapPercent,
        };
      } else if (mode === 'monthlyToJeonse') {
        input = {
          mode,
          baseDeposit,
          monthlyRent,
          baseRatePercent,
          additionalRatePercent,
          annualCapPercent,
        };
      } else {
        // rateReverse
        input = {
          mode,
          jeonseDeposit: jeonseDepositC,
          newDeposit: newDepositC,
          monthlyRent: monthlyRentC,
          baseRatePercent,
          additionalRatePercent,
          annualCapPercent,
        };
      }

      return calculateRentConversion(input);
    } catch (e) {
      console.error('Rent conversion calculation error:', e);
      return {
        appliedConversionRate: 0,
        appliedConversionRatePercent: 0,
        convertedDeposit: 0,
        warnings: ['계산 중 오류가 발생했습니다'],
      };
    }
  }, [
    mode,
    jeonseDeposit,
    newDeposit,
    baseDeposit,
    monthlyRent,
    jeonseDepositC,
    newDepositC,
    monthlyRentC,
    baseRatePercent,
    additionalRatePercent,
    annualCapPercent,
  ]);

  const hasWarnings = result.warnings.length > 0;
  const exceedsLegalLimit =
    mode === 'rateReverse' &&
    result.resultActualRate !== undefined &&
    result.resultActualRate > result.appliedConversionRatePercent + 0.01;

  // 결과 텍스트 조성
  let heroValue: string;
  let heroLabel: string;

  if (mode === 'jeonseToMonthly') {
    heroValue = formatKRW(result.resultMonthlyRent ?? 0);
    heroLabel = '월 예상 월세';
  } else if (mode === 'monthlyToJeonse') {
    heroValue = formatKRW(result.resultJeonseAmount ?? 0);
    heroLabel = '환산 전세보증금';
  } else {
    // rateReverse
    heroValue = `${(result.resultActualRate ?? 0).toFixed(2)}%`;
    heroLabel = '실제 전환율';
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <FormCard title="입력">
        {/* 모드 선택 탭 */}
        <div className="mb-2">
          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium text-text-primary">변환 모드</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  className={cn(
                    'rounded-lg border p-3 text-left text-sm font-medium transition',
                    mode === m.id
                      ? 'border-primary-500 bg-primary-500/10 text-primary-500'
                      : 'border-border-base text-text-secondary hover:border-primary-500',
                  )}
                >
                  <div className="font-semibold">{m.label}</div>
                  <div className="mt-1 text-caption text-text-secondary">{m.description}</div>
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        {/* 모드별 입력 필드 */}
        {mode === 'jeonseToMonthly' && (
          <>
            <NumberInput
              id="jeonse-deposit"
              label="기존 전세보증금"
              value={jeonseDeposit}
              onChange={setJeonseDeposit}
              placeholder="예: 500,000,000"
              unitButtons={PRICE_UNIT_BUTTONS}
              max={10_000_000_000}
            />
            <NumberInput
              id="new-deposit"
              label="새 보증금 (감소분)"
              value={newDeposit}
              onChange={setNewDeposit}
              placeholder="예: 200,000,000"
              unitButtons={PRICE_UNIT_BUTTONS}
              max={10_000_000_000}
              helpText="기존 전세보증금보다 작아야 월세가 발생합니다"
            />
          </>
        )}

        {mode === 'monthlyToJeonse' && (
          <>
            <NumberInput
              id="base-deposit"
              label="보증금"
              value={baseDeposit}
              onChange={setBaseDeposit}
              placeholder="예: 100,000,000"
              unitButtons={PRICE_UNIT_BUTTONS}
              max={10_000_000_000}
            />
            <NumberInput
              id="monthly-rent"
              label="월세"
              value={monthlyRent}
              onChange={setMonthlyRent}
              placeholder="예: 500,000"
              unitButtons={[
                { label: '백만', value: 1_000_000 },
                { label: '십만', value: 100_000 },
                { label: '만', value: 10_000 },
              ]}
              max={100_000_000}
            />
          </>
        )}

        {mode === 'rateReverse' && (
          <>
            <NumberInput
              id="jeonse-deposit-c"
              label="기존 전세보증금"
              value={jeonseDepositC}
              onChange={setJeonseDepositC}
              placeholder="예: 500,000,000"
              unitButtons={PRICE_UNIT_BUTTONS}
              max={10_000_000_000}
            />
            <NumberInput
              id="new-deposit-c"
              label="새 보증금"
              value={newDepositC}
              onChange={setNewDepositC}
              placeholder="예: 200,000,000"
              unitButtons={PRICE_UNIT_BUTTONS}
              max={10_000_000_000}
            />
            <NumberInput
              id="monthly-rent-c"
              label="월세"
              value={monthlyRentC}
              onChange={setMonthlyRentC}
              placeholder="예: 1,375,000"
              unitButtons={[
                { label: '백만', value: 1_000_000 },
                { label: '십만', value: 100_000 },
                { label: '만', value: 10_000 },
              ]}
              max={100_000_000}
            />
          </>
        )}

        {/* 고급 설정 토글 */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="mt-2 text-sm font-medium text-primary-500 hover:text-primary-600"
        >
          {showAdvanced ? '▼' : '▶'} 고급 설정
        </button>

        {/* 고급 설정 */}
        {showAdvanced && (
          <div className="mt-4 space-y-4 rounded-lg border border-border-base bg-bg-raised p-4">
            <NumberInput
              id="base-rate"
              label="한국은행 기준금리 (%)"
              value={baseRatePercent}
              onChange={setBaseRatePercent}
              placeholder="3.5"
              unit="%"
              min={0}
              max={20}
            />
            <NumberInput
              id="additional-rate"
              label="대통령령 가산비율 (%p)"
              value={additionalRatePercent}
              onChange={setAdditionalRatePercent}
              placeholder="2.0"
              unit="%p"
              min={0}
              max={10}
            />
            <NumberInput
              id="annual-cap"
              label="연 상한율 (%)"
              value={annualCapPercent}
              onChange={setAnnualCapPercent}
              placeholder="10.0"
              unit="%"
              min={0}
              max={20}
            />
            <p className="text-caption text-text-tertiary">
              법정 상한 = min(기준금리 + 가산비율, 연 상한율)
            </p>
          </div>
        )}
      </FormCard>

      {/* 결과 카드 */}
      <div className="flex flex-col gap-6">
        <div className="card flex flex-col gap-6">
          <header className="hero-number-container">
            <h2 className="text-lg font-semibold text-text-secondary">결과</h2>
            <p className="mt-2 text-caption text-text-tertiary">{heroLabel}</p>
            <p className="mt-4 hero-number" aria-label={`${heroLabel}: ${heroValue}`}>{heroValue}</p>
          </header>

          {/* 경고 박스 */}
          {hasWarnings && (
            <div className="space-y-2 rounded-lg border border-warning-500/50 bg-warning-500/5 p-3">
              {result.warnings.map((warning, idx) => (
                <div key={idx} className="text-sm text-warning-500">
                  ⚠️ {warning}
                </div>
              ))}
            </div>
          )}

          {/* 법정 상한 초과 강조 */}
          {exceedsLegalLimit && (
            <div className="rounded-lg border border-danger-500/50 bg-danger-500/5 p-3">
              <div className="text-sm font-semibold text-danger-500">
                ⛔ 법정 상한 초과
              </div>
              <div className="mt-1 text-caption text-danger-500">
                이 계약은 주택임대차보호법 §7의2를 위반할 수 있습니다.
                분쟁 시 주택임대차분쟁조정위원회 조정을 신청할 수 있습니다.
              </div>
            </div>
          )}

          {/* 핵심 정보 테이블 */}
          <div className="space-y-3 rounded-lg border border-border-base bg-bg-raised p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">적용된 전환율</span>
              <span className="font-semibold text-text-primary">
                {formatPercent(result.appliedConversionRate)}
              </span>
            </div>
            {mode !== 'rateReverse' && (
              <div className="flex items-center justify-between border-t border-border-base pt-3">
                <span className="text-sm text-text-secondary">환산보증금</span>
                <span className="font-semibold text-text-primary">
                  {formatKRW(result.convertedDeposit)}
                </span>
              </div>
            )}
          </div>

          {/* 추가 설명 */}
          <p className="text-caption text-text-tertiary">
            {mode === 'jeonseToMonthly' &&
              '월세 = (기존 전세 - 새 보증금) × 전환율 ÷ 12'}
            {mode === 'monthlyToJeonse' &&
              '환산 전세 = 보증금 + (월세 × 12 ÷ 전환율)'}
            {mode === 'rateReverse' &&
              '실제 전환율 = (월세 × 12) ÷ (기존 전세 - 새 보증금) × 100'}
          </p>
        </div>

        {/* 법정 상한 계산식 */}
        <div className="rounded-lg border border-border-base bg-bg-raised p-4">
          <h3 className="mb-3 font-semibold text-text-primary">법정 상한 계산</h3>
          <div className="space-y-2 text-sm text-text-secondary">
            <div>
              A = 기준금리 ({baseRatePercent}%) + 가산비율 ({additionalRatePercent}%p) ={' '}
              <span className="font-medium text-text-primary">
                {(baseRatePercent + additionalRatePercent).toFixed(2)}%
              </span>
            </div>
            <div>
              B = 연 상한율 ={' '}
              <span className="font-medium text-text-primary">{annualCapPercent.toFixed(2)}%</span>
            </div>
            <div className="border-t border-border-base pt-2">
              <strong className="text-text-primary">
                적용 상한 = min(A, B) ={' '}
                {Math.min(baseRatePercent + additionalRatePercent, annualCapPercent).toFixed(2)}%
              </strong>
            </div>
          </div>
        </div>
        <ResultBanner />
      </div>
    </div>
  );
}
