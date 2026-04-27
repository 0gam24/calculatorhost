'use client';

/**
 * 양도소득세 계산기 (MVP #5)
 *
 * 명세: docs/calculator-spec/양도소득세.md
 * 공식: src/lib/tax/transfer.ts
 *
 * MVP 스코프:
 * - 케이스: 일반 / 1세대1주택 / 일시적 2주택 (3가지)
 * - 자산: 주택 / 분양권 (2가지, MVP)
 * - 미지원: 토지, 입주권, 기타 (전문가 상담 안내)
 */

import { useMemo, useState } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { cn } from '@/lib/utils';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';

import {
  calculateTransferTax,
  type TransferCaseType,
  type TransferAssetType,
  type AdjustedAreaSurcharge,
} from '@/lib/tax/transfer';
import { formatKRW } from '@/lib/utils';

const PRICE_UNIT_BUTTONS = [
  { label: '1억', value: 100_000_000 },
  { label: '천만', value: 10_000_000 },
  { label: '백만', value: 1_000_000 },
  { label: '십만', value: 100_000 },
];

export function TransferTaxCalculator() {
  // ─── 케이스 선택 ───
  const [caseType, setCaseType] = useState<TransferCaseType>('general');

  // ─── 자산 종류 ───
  const [assetType, setAssetType] = useState<TransferAssetType>('house');

  // ─── 금액 ───
  const [salePrice, setSalePrice] = useState(600_000_000);
  const [acquisitionPrice, setAcquisitionPrice] = useState(500_000_000);
  const [necessaryExpenses, setNecessaryExpenses] = useState(0);

  // ─── 기간 ───
  const [holdingYears, setHoldingYears] = useState(5);
  const [residentYears, setResidentYears] = useState(3);
  const [householdHouseCount, setHouseholdHouseCount] = useState<1 | 2 | 3>(1);

  // ─── 체크박스 ───
  const [isShortTerm, setIsShortTerm] = useState(false);
  const [isSubscriptionRightShort, setIsSubscriptionRightShort] = useState(false);

  // ─── 조정지역 중과 ───
  const [adjustedAreaSurcharge, setAdjustedAreaSurcharge] = useState<AdjustedAreaSurcharge>('none');

  // ─── 계산 실행 ───
  const result = useMemo(
    () =>
      calculateTransferTax({
        caseType,
        assetType,
        salePrice,
        acquisitionPrice,
        necessaryExpenses: Math.max(0, necessaryExpenses),
        holdingYears: Math.max(0, holdingYears),
        residentYears: caseType === 'oneHouseOneHousehold' ? Math.max(0, residentYears) : 0,
        householdHouseCount,
        adjustedAreaSurcharge,
        isShortTerm,
        isSubscriptionRightShort,
      }),
    [
      caseType,
      assetType,
      salePrice,
      acquisitionPrice,
      necessaryExpenses,
      holdingYears,
      residentYears,
      householdHouseCount,
      adjustedAreaSurcharge,
      isShortTerm,
      isSubscriptionRightShort,
    ],
  );

  // ─── 세율 표기 ───
  const ratePercent = result.appliedRate === -1 ? '누진' : (result.appliedRate * 100).toFixed(2);
  const rateLabel =
    result.appliedRate === -1 ? `세율: ${result.rateDescription}` : `세율: ${ratePercent}%`;

  // ─── UI 분기 ───
  const showResidentYears = caseType === 'oneHouseOneHousehold';
  const showHouseholdHouseCount = caseType === 'general';
  const showAdjustedAreaSurcharge = caseType === 'general' && householdHouseCount > 1;
  const showSubscriptionRightShortCheckbox = assetType === 'subscription-right';

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <FormCard title="입력">
        {/* 케이스 유형 */}
        <RadioGroup<TransferCaseType>
          id="case-type"
          label="케이스 유형"
          value={caseType}
          onChange={setCaseType}
          options={[
            { value: 'general', label: '일반' },
            { value: 'oneHouseOneHousehold', label: '1세대1주택' },
            { value: 'temporaryTwoHouses', label: '일시적 2주택' },
          ]}
        />

        {/* 자산 종류 */}
        <RadioGroup<TransferAssetType>
          id="asset-type"
          label="자산 종류"
          value={assetType}
          onChange={setAssetType}
          options={[
            { value: 'house', label: '주택' },
            { value: 'subscription-right', label: '분양권' },
            { value: 'land', label: '토지 (곧 지원)' },
            { value: 'other', label: '기타 (곧 지원)' },
          ]}
        />

        {/* 양도가액 */}
        <NumberInput
          id="sale-price"
          label="양도가액"
          value={salePrice}
          onChange={setSalePrice}
          placeholder="예: 600,000,000"
          unitButtons={PRICE_UNIT_BUTTONS}
          max={10_000_000_000}
          debounceMs={150}
        />

        {/* 취득가액 */}
        <NumberInput
          id="acquisition-price"
          label="취득가액"
          value={acquisitionPrice}
          onChange={setAcquisitionPrice}
          placeholder="예: 500,000,000"
          unitButtons={PRICE_UNIT_BUTTONS}
          max={10_000_000_000}
          debounceMs={150}
        />

        {/* 필요경비 */}
        <NumberInput
          id="necessary-expenses"
          label="필요경비"
          value={necessaryExpenses}
          onChange={setNecessaryExpenses}
          placeholder="예: 0"
          helpText="중개비, 리모델링, 양도비용 등"
          unitButtons={PRICE_UNIT_BUTTONS}
          max={1_000_000_000}
          debounceMs={150}
        />

        {/* 보유기간 */}
        <NumberInput
          id="holding-years"
          label="보유기간(년)"
          value={holdingYears}
          onChange={setHoldingYears}
          placeholder="예: 5"
          helpText="소수점 1자리까지 입력 가능 (예: 2.5년)"
          max={100}
          debounceMs={150}
        />

        {/* 거주기간 — 1세대1주택 선택 시만 노출 */}
        {showResidentYears && (
          <NumberInput
            id="resident-years"
            label="거주기간(년)"
            value={residentYears}
            onChange={setResidentYears}
            placeholder="예: 3"
            helpText="1세대1주택 장기보유특별공제 계산용. 소수점 1자리까지 입력 가능"
            max={100}
            debounceMs={150}
          />
        )}

        {/* 단기 보유 체크박스 */}
        <div className="flex items-center gap-3">
          <input
            id="is-short-term"
            type="checkbox"
            checked={isShortTerm}
            onChange={(e) => setIsShortTerm(e.target.checked)}
            className="h-5 w-5 rounded border-border-base text-primary-500 focus:ring-2 focus:ring-primary-500/30"
            aria-label="1년 미만 단기 보유"
          />
          <label htmlFor="is-short-term" className="text-sm font-medium text-text-primary">
            1년 미만 단기 보유
          </label>
        </div>

        {/* 분양권 1년 미만 체크박스 */}
        {showSubscriptionRightShortCheckbox && (
          <div className="flex items-center gap-3">
            <input
              id="subscription-short"
              type="checkbox"
              checked={isSubscriptionRightShort}
              onChange={(e) => setIsSubscriptionRightShort(e.target.checked)}
              className="h-5 w-5 rounded border-border-base text-primary-500 focus:ring-2 focus:ring-primary-500/30"
              aria-label="분양권 1년 미만"
            />
            <label
              htmlFor="subscription-short"
              className="text-sm font-medium text-text-primary"
            >
              분양권 1년 미만
            </label>
          </div>
        )}

        {/* 세대 주택수 — 일반 케이스 선택 시만 노출 */}
        {showHouseholdHouseCount && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-primary">세대 주택수</label>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="세대 주택수">
              {([1, 2, 3] as const).map((count) => {
                const label = count === 3 ? '3주택↑' : `${count}주택`;
                const active = householdHouseCount === count;
                return (
                  <button
                    key={count}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setHouseholdHouseCount(count)}
                    className={cn(
                      'rounded-chip border px-4 py-2 text-sm font-medium transition',
                      active
                        ? 'border-primary-500 bg-primary-500/10 text-primary-500'
                        : 'border-border-base text-text-secondary hover:border-primary-500',
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 조정지역 중과 — 일반 케이스 + 2주택 이상 선택 시 노출 */}
        {showAdjustedAreaSurcharge && (
          <RadioGroup<AdjustedAreaSurcharge>
            id="adjusted-area-surcharge"
            label="조정지역 중과"
            value={adjustedAreaSurcharge}
            onChange={setAdjustedAreaSurcharge}
            options={[
              { value: 'none', label: '비중과' },
              { value: 'twoHouses', label: '조정 2주택 (+20%p)' },
              { value: 'threeOrMoreHouses', label: '조정 3주택↑ (+30%p)' },
            ]}
          />
        )}
      </FormCard>

      {/* 결과 카드 */}
      <div>
        <ResultCard
          title="납부액"
          heroLabel="총 양도소득세"
          heroValue={formatKRW(result.totalTax)}
          heroNote={rateLabel}
          rows={[
            {
              label: '양도차익',
              value: formatKRW(result.capitalGain),
            },
            ...(result.nontaxableAmount > 0
              ? [
                  {
                    label: '비과세 금액',
                    value: formatKRW(result.nontaxableAmount),
                    note: '(1세대1주택 또는 일시적 2주택)',
                  },
                ]
              : []),
            {
              label: '장기보유특별공제',
              value: formatKRW(result.longTermHoldingDeduction),
              note: result.longTermHoldingDeduction > 0 ? '(공제됨)' : undefined,
            },
            {
              label: '양도소득금액',
              value: formatKRW(result.transferIncome),
            },
            {
              label: '기본공제',
              value: `-${formatKRW(result.basicDeduction)}`,
              note: '(250만원)',
            },
            {
              label: '과세표준',
              value: formatKRW(result.taxableBase),
            },
            {
              label: '양도소득세',
              value: formatKRW(result.grossTax),
            },
            {
              label: '지방소득세',
              value: formatKRW(result.localIncomeTax),
              note: '(10%)',
            },
            {
              label: '총 납부액',
              value: formatKRW(result.totalTax),
              emphasize: true,
            },
          ]}
        />
        <ResultBanner note="누진공제 적용 후 결과입니다. 1세대 1주택·일시적 2주택 등 특례는 직접 확인 필요." />

        {result.warnings.length > 0 && (
          <div className="mt-4 space-y-2 rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-4">
            {result.warnings.map((warning, idx) => (
              <p key={idx} className="text-sm text-highlight-500">
                ⚠️ {warning}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
