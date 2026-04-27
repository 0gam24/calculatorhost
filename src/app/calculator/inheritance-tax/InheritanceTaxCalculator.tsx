'use client';

/**
 * 상속세 계산기 (MVP Phase 2 #2)
 *
 * 명세: docs/calculator-spec/상속세.md
 * 공식: src/lib/tax/inheritance.ts
 *
 * MVP 스코프:
 * - 기초공제 2억 + 자녀공제 5천만/인 + 미성년자공제 1천만/연
 * - 배우자 상속공제 (5억~30억 범위)
 * - 일괄공제 5억 vs 기초+인적공제 자동 비교
 * - 신고세액공제 3% (기한 내 신고 시)
 */

import { useMemo, useState } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import { cn } from '@/lib/utils';
import { calculateInheritanceTax, type DeductionMode } from '@/lib/tax/inheritance';
import { formatKRW } from '@/lib/utils';

const ASSET_UNIT_BUTTONS = [
  { label: '1억', value: 100_000_000 },
  { label: '천만', value: 10_000_000 },
  { label: '백만', value: 1_000_000 },
];

const DEDUCTION_MODE_OPTIONS: Array<{ value: DeductionMode; label: string; description: string }> =
  [
    {
      value: 'auto',
      label: '자동 선택 (유리한 것)',
      description: '기초+인적 vs 일괄 5억 중 세금이 적은 방식 자동 적용',
    },
    {
      value: 'lumpSum',
      label: '일괄공제 (5억)',
      description: '기초공제 2억과 관계없이 일괄공제 5억만 적용',
    },
    {
      value: 'basicAndPersonal',
      label: '기초+인적공제',
      description: '기초공제 2억 + 자녀·미성년자공제 합산',
    },
  ];

export function InheritanceTaxCalculator() {
  // ─── 상속재산 총액 ───
  const [totalAssets, setTotalAssets] = useState(1_000_000_000);

  // ─── 장례비·공과금 ───
  const [funeralAndDebts, setFuneralAndDebts] = useState(0);

  // ─── 배우자 상속 여부 ───
  const [hasSpouse, setHasSpouse] = useState(true);

  // ─── 배우자 실제 상속액 ───
  const [spouseInheritedAmount, setSpouseInheritedAmount] = useState(500_000_000);

  // ─── 자녀 수 ───
  const [childrenCount, setChildrenCount] = useState(2);

  // ─── 미성년 자녀 수 ───
  const [minorChildrenCount, setMinorChildrenCount] = useState(0);

  // ─── 미성년 자녀 평균 나이 ───
  const [minorChildrenAverageAgeYears, setMinorChildrenAverageAgeYears] = useState(10);

  // ─── 공제 방식 선택 ───
  const [deductionMode, setDeductionMode] = useState<DeductionMode>('auto');

  // ─── 기한 내 신고 여부 ───
  const [reportWithinDeadline, setReportWithinDeadline] = useState(true);

  // ─── 계산 실행 ───
  const result = useMemo(
    () =>
      calculateInheritanceTax({
        totalAssets: Math.max(0, totalAssets),
        funeralAndDebts: Math.max(0, funeralAndDebts),
        hasSpouse,
        spouseInheritedAmount: hasSpouse ? Math.max(0, spouseInheritedAmount) : 0,
        childrenCount: Math.max(0, childrenCount),
        minorChildrenCount: Math.max(0, Math.min(minorChildrenCount, childrenCount)),
        minorChildrenAverageAgeYears: Math.max(0, Math.min(minorChildrenAverageAgeYears, 18)),
        deductionMode,
        reportWithinDeadline,
      }),
    [
      totalAssets,
      funeralAndDebts,
      hasSpouse,
      spouseInheritedAmount,
      childrenCount,
      minorChildrenCount,
      minorChildrenAverageAgeYears,
      deductionMode,
      reportWithinDeadline,
    ],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <FormCard title="입력">
        {/* 상속재산 총액 */}
        <NumberInput
          id="total-assets"
          label="상속재산 총액"
          value={totalAssets}
          onChange={setTotalAssets}
          placeholder="0"
          unit="원"
          unitButtons={ASSET_UNIT_BUTTONS}
          helpText="상속인이 받는 모든 재산의 합계 (부동산·예금·주식 등)"
        />

        {/* 장례비·공과금 */}
        <NumberInput
          id="funeral-debts"
          label="장례비·공과금 (차감액)"
          value={funeralAndDebts}
          onChange={setFuneralAndDebts}
          placeholder="0"
          unit="원"
          unitButtons={ASSET_UNIT_BUTTONS}
          helpText="상증세법 §14: 장례비·채무·공과금은 상속재산에서 차감"
        />

        {/* 배우자 상속 여부 */}
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={hasSpouse}
            onChange={(e) => setHasSpouse(e.target.checked)}
            className="h-4 w-4 accent-primary-500"
          />
          <span className="text-sm font-medium text-text-primary">배우자가 상속을 받음</span>
        </label>

        {/* 배우자 실제 상속액 (조건부 노출) */}
        {hasSpouse && (
          <div className="rounded-lg border border-border-base/50 bg-primary-500/5 p-4">
            <NumberInput
              id="spouse-inherited"
              label="배우자 실제 상속액"
              value={spouseInheritedAmount}
              onChange={setSpouseInheritedAmount}
              placeholder="0"
              unit="원"
              unitButtons={ASSET_UNIT_BUTTONS}
              helpText="배우자가 실제로 상속받는 재산액 (최소 5억, 최대 30억 공제 적용)"
            />
            <p className="text-xs text-text-tertiary">
              배우자공제는 법정상속분(1/2) 내에서 최소 5억, 최대 30억 적용됩니다.
            </p>
          </div>
        )}

        {/* 자녀 수 */}
        <NumberInput
          id="children-count"
          label="자녀 수 (20세 이상 포함)"
          value={childrenCount}
          onChange={setChildrenCount}
          placeholder="0"
          unit="명"
          min={0}
          max={10}
          helpText="성년 자녀와 미성년 자녀를 모두 포함한 전체 자녀 수"
        />

        {/* 미성년 자녀 수 (childrenCount > 0 일 때만) */}
        {childrenCount > 0 && (
          <>
            <NumberInput
              id="minor-children-count"
              label="미성년 자녀 수"
              value={minorChildrenCount}
              onChange={setMinorChildrenCount}
              placeholder="0"
              unit="명"
              min={0}
              max={childrenCount}
              helpText="미성년 자녀는 추가로 공제를 받습니다"
            />

            {/* 미성년 자녀 평균 나이 (minorChildrenCount > 0 일 때만) */}
            {minorChildrenCount > 0 && (
              <NumberInput
                id="minor-age"
                label="미성년 자녀 평균 나이"
                value={minorChildrenAverageAgeYears}
                onChange={setMinorChildrenAverageAgeYears}
                placeholder="10"
                unit="세"
                min={0}
                max={18}
                helpText="미성년자공제 = 1천만원 × (19세 - 현재나이) × 미성년자 수"
              />
            )}
          </>
        )}

        {/* 공제 방식 선택 */}
        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium text-text-primary">공제 방식 선택</legend>
          <div className="flex flex-col gap-2">
            {DEDUCTION_MODE_OPTIONS.map(({ value, label, description }) => (
              <label
                key={value}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3 transition-colors',
                  deductionMode === value
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-border-base hover:border-border-base/80',
                )}
              >
                <input
                  type="radio"
                  name="deductionMode"
                  value={value}
                  checked={deductionMode === value}
                  onChange={(e) => setDeductionMode(e.target.value as DeductionMode)}
                  className="h-4 w-4 accent-primary-500"
                />
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-text-primary">{label}</span>
                  <span className="text-xs text-text-tertiary">{description}</span>
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        {/* 기한 내 신고 여부 */}
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={reportWithinDeadline}
            onChange={(e) => setReportWithinDeadline(e.target.checked)}
            className="h-4 w-4 accent-primary-500"
          />
          <span className="text-sm font-medium text-text-primary">
            기한 내 신고 (신고세액공제 3% 적용)
          </span>
        </label>
        <p className="text-xs text-text-tertiary">
          신고 기한: 상속개시일(피상속인 사망일) + 6개월 이내
        </p>
      </FormCard>

      {/* 결과 카드 */}
      <div>
        <ResultCard
          title="납부액"
          heroLabel="최종 납부 상속세"
          heroValue={formatKRW(result.finalTax)}
          rows={[
            {
              label: '상속재산 총액',
              value: formatKRW(result.totalAssets),
            },
            ...(result.funeralAndDebts > 0
              ? [
                  {
                    label: '장례비·공과금',
                    value: `-${formatKRW(result.funeralAndDebts)}`,
                    note: '(차감)',
                  },
                ]
              : []),
            {
              label: '과세대상 상속재산',
              value: formatKRW(result.taxableAssets),
            },
            {
              label: '상속공제 합계',
              value: `-${formatKRW(result.effectiveDeduction)}`,
              note: '(적용됨)',
            },
            {
              label: '과세표준',
              value: formatKRW(result.taxableBase),
            },
            {
              label: '산출세액',
              value: formatKRW(result.grossTax),
            },
            ...(result.reportingCredit > 0
              ? [
                  {
                    label: '신고세액공제',
                    value: `-${formatKRW(result.reportingCredit)}`,
                    note: '(3%)',
                  },
                ]
              : []),
            {
              label: '최종 납부세액',
              value: formatKRW(result.finalTax),
              emphasize: true,
            },
          ]}
        />
        <ResultBanner />

        {/* 공제 구성 상세 */}
        <div className="mt-4 rounded-lg border border-border-base bg-bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold text-text-primary">적용된 상속공제</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">기초공제</span>
              <span className="font-medium text-text-primary">
                {formatKRW(result.basicDeduction)}
              </span>
            </div>
            {result.childrenDeduction > 0 && (
              <div className="flex justify-between">
                <span className="text-text-secondary">자녀공제 ({childrenCount}명)</span>
                <span className="font-medium text-text-primary">
                  {formatKRW(result.childrenDeduction)}
                </span>
              </div>
            )}
            {result.minorDeduction > 0 && (
              <div className="flex justify-between">
                <span className="text-text-secondary">미성년자공제</span>
                <span className="font-medium text-text-primary">
                  {formatKRW(result.minorDeduction)}
                </span>
              </div>
            )}
            <div className="border-t border-border-base/50 pt-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  {result.selectedMode === 'lumpSum' ? '일괄공제' : '기초+인적공제 합계'}
                </span>
                <span className="font-medium text-text-primary">
                  {formatKRW(
                    result.selectedMode === 'lumpSum'
                      ? result.lumpSumDeduction
                      : result.personalDeductionSubtotal,
                  )}
                </span>
              </div>
            </div>
            {result.spouseDeduction > 0 && (
              <div className="flex justify-between text-primary-500">
                <span className="font-medium">배우자공제</span>
                <span className="font-medium">+ {formatKRW(result.spouseDeduction)}</span>
              </div>
            )}
          </div>
          <p className="mt-3 text-xs text-text-tertiary">
            {result.selectedMode === 'lumpSum'
              ? '일괄공제 5억이 기초·인적공제보다 유리해 적용되었습니다.'
              : '기초·인적공제가 일괄공제 5억보다 유리해 적용되었습니다.'}
          </p>
        </div>

        {/* 경고/안내 메시지 */}
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
