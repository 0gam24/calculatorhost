'use client';

/**
 * 재산세 계산기 (MVP #7)
 *
 * 명세: docs/calculator-spec/재산세.md
 * 공식: src/lib/tax/property.ts
 */

import { useMemo, useState } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import { calculatePropertyTaxTotal } from '@/lib/tax/property';
import { formatKRW } from '@/lib/utils';

const PUBLISHED_PRICE_UNIT_BUTTONS = [
  { label: '1억', value: 100_000_000 },
  { label: '천만', value: 10_000_000 },
  { label: '백만', value: 1_000_000 },
  { label: '십만', value: 100_000 },
];

export function PropertyTaxCalculator() {
  const [publishedPrice, setPublishedPrice] = useState(600_000_000);
  const [oneHouseholdOneHouse, setOneHouseholdOneHouse] = useState(true);
  const [urbanArea, setUrbanArea] = useState(false);

  const result = useMemo(
    () =>
      calculatePropertyTaxTotal({
        publishedPrice,
        oneHouseholdOneHouse,
        urbanArea,
      }),
    [publishedPrice, oneHouseholdOneHouse, urbanArea],
  );

  // 세율 표기
  const rateLabel =
    result.appliedBracket === 'oneHouseSpecial' ? '1세대1주택 특례 적용' : '일반세율 적용';

  // 1세대1주택 특례 표시 여부
  const showSpecialWarning =
    oneHouseholdOneHouse && publishedPrice > 900_000_000;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <FormCard title="입력">
        {/* 공시가격 */}
        <NumberInput
          id="published-price"
          label="공시가격"
          value={publishedPrice}
          onChange={setPublishedPrice}
          placeholder="예: 600,000,000"
          unitButtons={PUBLISHED_PRICE_UNIT_BUTTONS}
          max={10_000_000_000}
        />

        {/* 1세대1주택 특례 */}
        <div className="flex items-center gap-3">
          <input
            id="one-household"
            type="checkbox"
            checked={oneHouseholdOneHouse}
            onChange={(e) => setOneHouseholdOneHouse(e.target.checked)}
            className="h-5 w-5 rounded border-border-base text-primary-500 focus:ring-2 focus:ring-primary-500/30"
            aria-label="1세대1주택 특례 신청"
          />
          <label htmlFor="one-household" className="text-sm font-medium text-text-primary">
            1세대1주택 특례
            <span className="ml-1 text-caption text-text-tertiary">(공시 9억 이하)</span>
          </label>
        </div>

        {/* 도시지역 */}
        <div className="flex items-start gap-3">
          <input
            id="urban-area"
            type="checkbox"
            checked={urbanArea}
            onChange={(e) => setUrbanArea(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-border-base text-primary-500 focus:ring-2 focus:ring-primary-500/30"
            aria-label="도시지역분 포함"
          />
          <div className="flex-1">
            <label htmlFor="urban-area" className="text-sm font-medium text-text-primary">
              도시지역
            </label>
            <p className="mt-1 text-caption text-text-tertiary">
              도시계획구역 내 주택인 경우 체크하세요. 도시지역분(0.14%)이 추가됩니다.
            </p>
          </div>
        </div>

        {/* 지역자원시설세 고지 */}
        <div className="rounded-lg border border-border-base bg-bg-card/50 p-3">
          <p className="text-caption text-text-secondary">
            <strong>지역자원시설세</strong>
            <br />
            도시 및 광역시의 재산세에 부과되는 지역자원시설세는 현재 MVP에서 미반영되어 있습니다.
            추후 업데이트 예정입니다.
          </p>
        </div>
      </FormCard>

      <ResultCard
        title="총 납부액"
        heroLabel="연간 총 재산세"
        heroValue={formatKRW(result.totalTax)}
        heroNote={rateLabel}
        rows={[
          {
            label: '공시가격',
            value: formatKRW(result.taxBase),
            note: '(과세표준: 공시가 × 60%)',
          },
          {
            label: '재산세 본세',
            value: formatKRW(result.propertyTax),
          },
          ...(result.urbanAreaTax > 0
            ? [
                {
                  label: '도시지역분',
                  note: '(과표 × 0.14%)',
                  value: formatKRW(result.urbanAreaTax),
                },
              ]
            : []),
          {
            label: '지방교육세',
            note: '(본세 × 20%)',
            value: formatKRW(result.localEducationTax),
          },
          {
            label: '7월 분납',
            value: formatKRW(result.installmentJuly),
          },
          {
            label: '9월 분납',
            value: formatKRW(result.installmentSeptember),
          },
          {
            label: '총 납부액',
            value: formatKRW(result.totalTax),
            emphasize: true,
          },
        ]}
      >
        {showSpecialWarning && (
          <div className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-3">
            <p className="text-sm text-text-primary">
              <strong>주의:</strong> 공시가격이 9억 원을 초과하여 1세대1주택 특례가 적용되지
              않습니다. 일반세율을 적용했습니다.
            </p>
          </div>
        )}
        {result.warnings && result.warnings.length > 0 && (
          <div className="mt-4 space-y-2">
            {result.warnings.map((msg, idx) => (
              <div key={idx} className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
                <p className="text-sm text-text-primary">{msg}</p>
              </div>
            ))}
          </div>
        )}
      </ResultCard>
        <ResultBanner />
    </div>
  );
}
