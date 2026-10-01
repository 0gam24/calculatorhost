'use client';

import {
  CalculatorWorkspace,
  useCalculatorWorkspace,
} from '@/components/calculator/CalculatorWorkspace';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';

/**
 * 재산세 계산기 (MVP #7)
 *
 * 명세: docs/calculator-spec/재산세.md
 * 공식: src/lib/tax/property.ts
 */

import { useEffect, useMemo } from 'react';
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

function PropertyReadiness({ error }: { error?: string }) {
  const reportValidity = useCalculatorWorkspace()?.reportValidity;
  useEffect(() => {
    reportValidity?.('property-tax:conditions', error);
    return () => reportValidity?.('property-tax:conditions');
  }, [error, reportValidity]);
  if (!error) return null;
  return (
    <div
      tabIndex={-1}
      aria-invalid="true"
      aria-live="polite"
      data-testid="property-tax-conditions"
      className="rounded-lg border border-border-base p-4 text-sm text-text-primary"
    >
      {error}
    </div>
  );
}

export function PropertyTaxCalculator() {
  const [publishedPrice, setPublishedPrice] = useCalculatorState(
    'property-tax:publishedPrice',
    600_000_000,
  );
  const [oneHouseholdOneHouse, setOneHouseholdOneHouse] = useCalculatorState(
    'property-tax:oneHouseholdOneHouse',
    true,
  );
  const [urbanArea, setUrbanArea] = useCalculatorState('property-tax:urbanArea', false);

  const { result, error } = useMemo(() => {
    try {
      if (!Number.isFinite(publishedPrice) || publishedPrice <= 0)
        throw new Error(
          '주택 공시가격을 입력해 주세요. 0원이나 미입력 상태로 세액을 확정할 수 없습니다.',
        );
      return {
        result: calculatePropertyTaxTotal({ publishedPrice, oneHouseholdOneHouse, urbanArea }),
        error: undefined,
      };
    } catch (cause) {
      return {
        result: null,
        error: cause instanceof Error ? cause.message : '입력 조건을 확인해 주세요.',
      };
    }
  }, [publishedPrice, oneHouseholdOneHouse, urbanArea]);

  // 세율 표기
  const rateLabel =
    result?.appliedBracket === 'oneHouseSpecial'
      ? '9억원 이하 1세대1주택 세율 특례 적용'
      : '일반세율 적용';

  // 1세대1주택 특례 표시 여부
  const showSpecialWarning = oneHouseholdOneHouse && publishedPrice > 900_000_000;

  return (
    <CalculatorWorkspace className="grid gap-6 lg:grid-cols-2" slug="property-tax">
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
          min={1}
          unit="원"
        />

        {/* 1세대1주택 특례 */}
        <div className="flex items-center gap-3">
          <input
            id="one-household"
            type="checkbox"
            checked={oneHouseholdOneHouse}
            onChange={(e) => setOneHouseholdOneHouse(e.target.checked)}
            className="h-5 w-5 rounded border-border-base text-primary-500 focus:ring-2 focus:ring-primary-500/30"
            aria-label="1세대1주택 해당"
          />
          <label htmlFor="one-household" className="text-sm font-medium text-text-primary">
            1세대1주택 해당
          </label>
        </div>
        <p className="text-sm text-text-secondary">
          1세대1주택 자격에 해당하면 공정시장가액비율을 공시가격 구간에 따라 적용합니다. 공시가격
          9억원 이하의 세율 특례와는 별개이며, 9억원을 초과해도 해당 자격이면 비율은 45%입니다. 주택
          수 제외 등 자격 조건은 관할 지방자치단체에 확인하세요.
        </p>

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
        <div className="bg-bg-card/50 rounded-lg border border-border-base p-3">
          <p className="text-caption text-text-secondary">
            <strong>지역자원시설세</strong>
            <br />
            지역자원시설세와 세부담 상한은 반영하지 않습니다. 아래 금액은 재산세 본세·지방교육세와
            선택한 도시지역분의 추정 합계이며, 실제 고지액과 다를 수 있습니다.
          </p>
        </div>
        <PropertyReadiness error={error} />
      </FormCard>

      <ResultCard
        title={error ? '조건 확인 필요' : '연간 재산세 추정 합계'}
        heroLabel="지역자원시설세·세부담 상한 제외"
        heroValue={result ? formatKRW(result.totalTax) : '조건을 확인해 주세요'}
        heroNote={
          result
            ? `공정시장가액비율 ${Math.round(result.assessmentRatio * 100)}% · ${rateLabel}`
            : undefined
        }
        empty={!result}
        rows={
          result
            ? [
                {
                  label: '과세표준',
                  value: formatKRW(result.taxBase),
                  note: `(공시가격 × ${Math.round(result.assessmentRatio * 100)}%)`,
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
              ]
            : []
        }
      >
        {showSpecialWarning && (
          <div className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-3">
            <p className="text-sm text-text-primary">
              <strong>주의:</strong> 공시가격이 9억원을 초과하여 세율 특례는 적용되지 않습니다.
              일반세율을 적용하되 1세대1주택 공정시장가액비율 45%는 적용했습니다.
            </p>
          </div>
        )}
        {result && result.warnings.length > 0 && (
          <div className="mt-4 space-y-2">
            {result.warnings.map((msg, idx) => (
              <div key={idx} className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
                <p className="text-sm text-text-primary">{msg}</p>
              </div>
            ))}
          </div>
        )}
      </ResultCard>
      {error && (
        <p role="status" className="text-sm text-text-primary">
          {error}
        </p>
      )}
      <ResultBanner />
    </CalculatorWorkspace>
  );
}
