'use client';

/**
 * 취득세 계산기 (MVP #6)
 *
 * 명세: docs/calculator-spec/취득세.md
 * 공식: src/lib/tax/acquisition.ts
 */

import { useMemo, useState } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { cn } from '@/lib/utils';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import {
  calculateAcquisitionTax,
  type AcquisitionMethod,
  type AcquisitionTarget,
  type HouseCount,
} from '@/lib/tax/acquisition';
import { formatKRW } from '@/lib/utils';

const ACQUISITION_PRICE_UNIT_BUTTONS = [
  { label: '1억', value: 100_000_000 },
  { label: '천만', value: 10_000_000 },
  { label: '백만', value: 1_000_000 },
  { label: '십만', value: 100_000 },
];

export function AcquisitionCalculator() {
  const [method, setMethod] = useState<AcquisitionMethod>('purchase');
  const [target, setTarget] = useState<AcquisitionTarget>('residential');
  const [houseCount, setHouseCount] = useState<HouseCount>(1);
  const [areaOver85, setAreaOver85] = useState(false);
  const [adjustedArea, setAdjustedArea] = useState(false);
  const [acquisitionPrice, setAcquisitionPrice] = useState(600_000_000);
  const [standardPrice, setStandardPrice] = useState(600_000_000);
  const [firstHomeBuyer, setFirstHomeBuyer] = useState(false);

  // 증여·상속 시 시가표준액 사용, 아니면 취득가 사용
  const effectivePrice = method === 'purchase' ? acquisitionPrice : standardPrice;

  const result = useMemo(
    () =>
      calculateAcquisitionTax({
        method,
        target,
        houseCount,
        areaOver85,
        adjustedArea,
        acquisitionPrice: effectivePrice,
        firstHomeBuyerDiscount: firstHomeBuyer && method === 'purchase' && houseCount === 1,
      }),
    [method, target, houseCount, areaOver85, adjustedArea, effectivePrice, firstHomeBuyer],
  );

  // 세율 표기
  const ratePercent = (result.appliedRate * 100).toFixed(2);
  const rateLabel = `취득세율 ${ratePercent}%`;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <FormCard title="입력">
        <RadioGroup<AcquisitionMethod>
          id="method"
          label="취득방법"
          value={method}
          onChange={setMethod}
          options={[
            { value: 'purchase', label: '매매' },
            { value: 'gift', label: '증여' },
            { value: 'inheritance', label: '상속' },
            { value: 'primitive', label: '원시취득 (미지원)' },
          ]}
        />

        <RadioGroup<AcquisitionTarget>
          id="target"
          label="대상"
          value={target}
          onChange={setTarget}
          options={[
            { value: 'residential' as const, label: '주택' },
            { value: 'farmland' as const, label: '농지 (곧 지원)' },
            { value: 'land' as const, label: '토지 (곧 지원)' },
            { value: 'other' as const, label: '기타 (곧 지원)' },
          ]}
        />

        {/* 주택수 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-text-primary">취득 시점 주택수</label>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="취득 시점 주택수">
            {([1, 2, 3, 4] as HouseCount[]).map((count) => {
              const label = count === 4 ? '4주택↑' : `${count}주택`;
              const active = houseCount === count;
              return (
                <button
                  key={count}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setHouseCount(count)}
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

        {/* 면적 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-text-primary">대상 면적</label>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="대상 면적">
            {[false, true].map((over85) => {
              const label = over85 ? '85㎡ 초과' : '85㎡ 이하';
              const active = areaOver85 === over85;
              return (
                <button
                  key={String(over85)}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setAreaOver85(over85)}
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

        {/* 조정지역 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-text-primary">조정대상지역</label>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="조정대상지역">
            {[false, true].map((adjusted) => {
              const label = adjusted ? '예' : '아니오';
              const active = adjustedArea === adjusted;
              return (
                <button
                  key={String(adjusted)}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setAdjustedArea(adjusted)}
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

        {method === 'purchase' ? (
          <NumberInput
            id="acquisition-price"
            label="취득가액"
            value={acquisitionPrice}
            onChange={setAcquisitionPrice}
            placeholder="예: 600,000,000"
            unitButtons={ACQUISITION_PRICE_UNIT_BUTTONS}
            max={10_000_000_000}
            debounceMs={150}
          />
        ) : (
          <NumberInput
            id="standard-price"
            label="시가표준액"
            value={standardPrice}
            onChange={setStandardPrice}
            placeholder="예: 600,000,000"
            helpText="증여·상속 시 국세청 시가표준액 기준"
            unitButtons={ACQUISITION_PRICE_UNIT_BUTTONS}
            max={10_000_000_000}
            debounceMs={150}
          />
        )}

        {method === 'purchase' && houseCount === 1 && (
          <div className="flex items-center gap-3">
            <input
              id="first-home"
              type="checkbox"
              checked={firstHomeBuyer}
              onChange={(e) => setFirstHomeBuyer(e.target.checked)}
              className="h-5 w-5 rounded border-border-base text-primary-500 focus:ring-2 focus:ring-primary-500/30"
              aria-label="생애최초 주택 감면 적용"
            />
            <label htmlFor="first-home" className="text-sm font-medium text-text-primary">
              생애최초 주택 감면 (200만원 한도)
            </label>
          </div>
        )}
      </FormCard>

      <ResultCard
        title="총 납부액"
        heroLabel="취득세 + 농특세 + 지방교육세"
        heroValue={formatKRW(result.totalPayment)}
        heroNote={rateLabel}
        rows={[
          {
            label: '과세표준',
            value: formatKRW(result.taxBase),
          },
          {
            label: '취득세',
            value: formatKRW(result.acquisitionTax),
          },
          {
            label: '농어촌특별세',
            note: areaOver85 ? '(85㎡ 초과 0.2% 또는 1%)' : '(면적 85㎡ 이하)',
            value: formatKRW(result.specialRuralTax),
          },
          {
            label: '지방교육세',
            note: '(취득세의 10%)',
            value: formatKRW(result.localEducationTax),
          },
          ...(result.discountAmount > 0
            ? [
                {
                  label: '생애최초 감면액',
                  value: `-${formatKRW(result.discountAmount)}`,
                },
              ]
            : []),
          {
            label: '총 납부액',
            value: formatKRW(result.totalPayment),
            emphasize: true,
          },
        ]}
      />
        <ResultBanner />
    </div>
  );
}
