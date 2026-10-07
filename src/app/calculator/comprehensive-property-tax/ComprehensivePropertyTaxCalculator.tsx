'use client';

import { CalculatorWorkspace } from '@/components/calculator/CalculatorWorkspace';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';

/**
 * 종합부동산세 계산기 (MVP #2)
 *
 * 명세: docs/calculator-spec/종합부동산세.md
 * 공식: src/lib/tax/comprehensive-property.ts
 * 상수: src/lib/constants/tax-rates-2026.ts
 */

import { ResultBanner } from '@/components/calculator/ResultBanner';
import { useMemo } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup, type RadioOption } from '@/components/calculator/RadioGroup';
import { ResultCard } from '@/components/calculator/Result';
import {
  calculateComprehensivePropertyTax,
  type HouseCount,
} from '@/lib/tax/comprehensive-property';
import { formatKRW } from '@/lib/utils';

const PUBLISHED_PRICE_UNIT_BUTTONS = [
  { label: '1억', value: 100_000_000 },
  { label: '천만', value: 10_000_000 },
  { label: '백만', value: 1_000_000 },
  { label: '십만', value: 100_000 },
];

const HOUSE_COUNT_OPTIONS: RadioOption<HouseCount>[] = [
  { value: 'one', label: '1주택' },
  { value: 'two', label: '2주택' },
  { value: 'threeOrMore', label: '3주택 이상' },
];

export function ComprehensivePropertyTaxCalculator() {
  const [houseCount, setHouseCount] = useCalculatorState<HouseCount>(
    'comprehensive-property-tax:houseCount',
    'one',
  );
  const [totalPublishedPrice, setTotalPublishedPrice] = useCalculatorState(
    'comprehensive-property-tax:totalPublishedPrice',
    1_500_000_000,
  );
  const [isOneHouseholdOneHouse, setIsOneHouseholdOneHouse] = useCalculatorState(
    'comprehensive-property-tax:isOneHouseholdOneHouse',
    true,
  );
  const [seniorAgeYears, setSeniorAgeYears] = useCalculatorState(
    'comprehensive-property-tax:seniorAgeYears',
    60,
  );
  const [holdingYears, setHoldingYears] = useCalculatorState(
    'comprehensive-property-tax:holdingYears',
    5,
  );
  const [includesAdjustedArea, setIncludesAdjustedArea] = useCalculatorState(
    'comprehensive-property-tax:includesAdjustedArea',
    false,
  );

  const result = useMemo(
    () =>
      calculateComprehensivePropertyTax({
        houseCount,
        totalPublishedPrice,
        isOneHouseholdOneHouse,
        seniorAgeYears,
        holdingYears,
        includesAdjustedArea,
      }),
    [
      houseCount,
      totalPublishedPrice,
      isOneHouseholdOneHouse,
      seniorAgeYears,
      holdingYears,
      includesAdjustedArea,
    ],
  );

  // 세율 표기
  const rateLabel = result.appliedBracket === 'multi' ? '3주택 이상 중과세율' : '일반세율 적용';

  // 세액공제 표시 여부
  const showCredits = isOneHouseholdOneHouse && houseCount === 'one' && result.totalCreditRate > 0;

  // 1세대1주택 입력 표시 여부
  const show1HouseholdInputs = houseCount === 'one';

  // 3주택 이상 조정지역 입력 표시
  const show3PlusOptions = houseCount === 'threeOrMore';

  return (
    <CalculatorWorkspace className="grid gap-6 lg:grid-cols-2" slug="comprehensive-property-tax">
      <FormCard title="입력">
        {/* 보유 주택 수 */}
        <RadioGroup
          id="house-count"
          label="보유 주택 수"
          value={houseCount}
          options={HOUSE_COUNT_OPTIONS}
          onChange={setHouseCount}
        />

        {/* 보유 주택 공시가 합계 */}
        <NumberInput
          id="total-published-price"
          label="보유 주택 공시가 합계"
          value={totalPublishedPrice}
          onChange={setTotalPublishedPrice}
          placeholder="예: 1,500,000,000"
          unitButtons={PUBLISHED_PRICE_UNIT_BUTTONS}
          max={100_000_000_000}
          unit="원"
        />

        {/* 1세대1주택자 여부 (1주택 선택 시만) */}
        {show1HouseholdInputs && (
          <div className="flex items-center gap-3">
            <input
              id="one-household"
              type="checkbox"
              checked={isOneHouseholdOneHouse}
              onChange={(e) => setIsOneHouseholdOneHouse(e.target.checked)}
              className="h-5 w-5 rounded border-border-base text-primary-500 focus:ring-2 focus:ring-primary-500/30"
              aria-label="1세대1주택자 여부"
            />
            <label htmlFor="one-household" className="text-sm font-medium text-text-primary">
              1세대1주택자
              <span className="ml-1 text-caption text-text-tertiary">(공제 12억 적용)</span>
            </label>
          </div>
        )}

        {/* 만 나이 (1세대1주택자 선택 시만) */}
        {show1HouseholdInputs && isOneHouseholdOneHouse && (
          <NumberInput
            id="senior-age"
            label="만 나이 (고령자공제용)"
            value={seniorAgeYears}
            onChange={setSeniorAgeYears}
            placeholder="예: 70"
            min={0}
            max={150}
            helpText="60세 이상: 20~40% 고령자공제 적용"
            integer
            unit="세"
          />
        )}

        {/* 보유기간(년) (1세대1주택자 선택 시만) */}
        {show1HouseholdInputs && isOneHouseholdOneHouse && (
          <NumberInput
            id="holding-years"
            label="보유기간 (년)"
            value={holdingYears}
            onChange={setHoldingYears}
            placeholder="예: 10"
            min={0}
            max={100}
            helpText="5년 이상: 20~50% 장기보유공제 적용"
            integer
            unit="년"
          />
        )}

        {/* 조정대상지역 포함 (3주택 이상 선택 시만) */}
        {show3PlusOptions && (
          <div className="flex items-start gap-3">
            <input
              id="adjusted-area"
              type="checkbox"
              checked={includesAdjustedArea}
              onChange={(e) => setIncludesAdjustedArea(e.target.checked)}
              className="mt-1 h-5 w-5 rounded border-border-base text-primary-500 focus:ring-2 focus:ring-primary-500/30"
              aria-label="조정대상지역 포함"
            />
            <div className="flex-1">
              <label htmlFor="adjusted-area" className="text-sm font-medium text-text-primary">
                조정대상지역 주택 포함
              </label>
              <p className="mt-1 text-caption text-text-tertiary">
                2023년 개정으로 조정지역 중과는 폐지되었습니다. 참고용으로만 제공됩니다.
              </p>
            </div>
          </div>
        )}
      </FormCard>

      <ResultCard
        title="최종 납부세액"
        heroLabel="총 납부액 (종부세 + 농특세)"
        heroValue={formatKRW(result.totalTax)}
        heroNote={rateLabel}
        rows={[
          {
            label: '공시가 합계',
            value: formatKRW(result.totalPublishedPrice),
          },
          {
            label: '기본공제',
            value: formatKRW(result.basicDeduction),
            note: `(${houseCount === 'one' && isOneHouseholdOneHouse ? '1세대1주택 12억' : '일반 9억'})`,
          },
          {
            label: '과세표준',
            value: formatKRW(result.taxableBase),
            note: '((공시가 − 공제) × 60%)',
          },
          {
            label: '종부세 산출세액',
            value: formatKRW(result.grossTax),
          },
          ...(result.propertyTaxCredit > 0
            ? [
                {
                  label: '공제할 재산세액',
                  value: `− ${formatKRW(result.propertyTaxCredit)}`,
                  note: '(과세표준 × 재산세 공정시장가액비율 × 0.4%, 종부세법 §9③)',
                },
              ]
            : []),
          ...(showCredits
            ? [
                {
                  label: '세액공제',
                  value: `${(result.totalCreditRate * 100).toFixed(0)}% (${formatKRW(result.creditAmount)})`,
                  note: `고령자 ${(result.seniorCreditRate * 100).toFixed(0)}% + 장기보유 ${(result.longHoldCreditRate * 100).toFixed(0)}%`,
                },
              ]
            : []),
          {
            label: '종부세 순세액',
            value: formatKRW(result.netTax),
          },
          {
            label: '농어촌특별세',
            value: formatKRW(result.ruralSpecialTax),
            note: '(순세액 × 20%)',
          },
          {
            label: '최종 납부액',
            value: formatKRW(result.totalTax),
            emphasize: true,
          },
        ]}
      >
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
      <ResultBanner note="입력한 공시가격과 보유 조건을 기준으로 한 예상 결과입니다." />
    </CalculatorWorkspace>
  );
}
