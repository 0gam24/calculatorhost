'use client';

import { CalculatorWorkspace } from '@/components/calculator/CalculatorWorkspace';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';

/**
 * 증여세 계산기 (MVP Phase 2 #1)
 *
 * 명세: docs/calculator-spec/증여세.md
 * 공식: src/lib/tax/gift.ts
 *
 * MVP 스코프:
 * - 관계: 배우자 / 성년 자녀 / 미성년 자녀 / 부모 / 기타 친족 (5가지)
 * - 10년 합산 공제 기본 적용
 * - 신고세액공제 3% (기한 내 신고 시)
 * - 부담부증여 채무인수 지원
 */

import { useMemo } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import { cn } from '@/lib/utils';
import { calculateGiftTax, type RelationType } from '@/lib/tax/gift';
import { formatKRW } from '@/lib/utils';

const GIFT_AMOUNT_UNIT_BUTTONS = [
  { label: '1억', value: 100_000_000 },
  { label: '천만', value: 10_000_000 },
  { label: '백만', value: 1_000_000 },
];

const RELATION_OPTIONS: Array<{ value: RelationType; label: string; description: string }> = [
  { value: 'spouse', label: '배우자', description: '공제 6억 원' },
  { value: 'adultDescendant', label: '성년 직계비속(자녀·손자)', description: '공제 5천만 원' },
  { value: 'minorDescendant', label: '미성년 직계비속', description: '공제 2천만 원' },
  { value: 'ascendant', label: '직계존속(부모·조부모)', description: '공제 5천만 원' },
  { value: 'otherRelative', label: '기타 친족', description: '공제 1천만 원' },
];

export function GiftTaxCalculator() {
  // ─── 증여재산 가액 ───
  const [giftValue, setGiftValue] = useCalculatorState('gift-tax:giftValue', 100_000_000);

  // ─── 관계 선택 ───
  const [relation, setRelation] = useCalculatorState<RelationType>(
    'gift-tax:relation',
    'adultDescendant',
  );

  // ─── 10년 내 기증여액 ───
  const [priorGiftValue, setPriorGiftValue] = useCalculatorState('gift-tax:priorGiftValue', 0);

  // ─── 부담부증여 채무인수 ───
  const [assumedDebt, setAssumedDebt] = useCalculatorState('gift-tax:assumedDebt', 0);

  // ─── 기한 내 신고 여부 ───
  const [reportWithinDeadline, setReportWithinDeadline] = useCalculatorState(
    'gift-tax:reportWithinDeadline',
    true,
  );

  // ─── 계산 실행 ───
  const result = useMemo(
    () =>
      calculateGiftTax({
        giftValue: Math.max(0, giftValue),
        relation,
        priorGiftValue: Math.max(0, priorGiftValue),
        assumedDebt: Math.max(0, assumedDebt),
        reportWithinDeadline,
      }),
    [giftValue, relation, priorGiftValue, assumedDebt, reportWithinDeadline],
  );

  // ─── 관계별 공제 표시 ───
  const relationLabel = RELATION_OPTIONS.find((opt) => opt.value === relation)?.label;

  return (
    <CalculatorWorkspace className="grid gap-6 lg:grid-cols-2" slug="gift-tax">
      <FormCard title="입력">
        {/* 증여재산 가액 */}
        <NumberInput
          id="gift-value"
          label="증여재산 가액"
          value={giftValue}
          onChange={setGiftValue}
          placeholder="0"
          unit="원"
          unitButtons={GIFT_AMOUNT_UNIT_BUTTONS}
          helpText="증여받는 재산의 공정시장가액"
        />

        {/* 관계 선택 */}
        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium text-text-primary">증여자와의 관계</legend>
          <div className="flex flex-col gap-2">
            {RELATION_OPTIONS.map(({ value, label, description }) => (
              <label
                key={value}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3 transition-colors',
                  relation === value
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'hover:border-border-base/80 border-border-base',
                )}
              >
                <input
                  type="radio"
                  name="relation"
                  value={value}
                  checked={relation === value}
                  onChange={(e) => setRelation(e.target.value as RelationType)}
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

        {/* 10년 내 기증여액 */}
        <NumberInput
          id="prior-gift"
          label="10년 내 동일 증여자로부터 받은 기증여액"
          value={priorGiftValue}
          onChange={setPriorGiftValue}
          placeholder="0"
          unit="원"
          helpText="상증세법 §53: 10년 내 증여는 공제를 합산하여 적용합니다"
          unitButtons={GIFT_AMOUNT_UNIT_BUTTONS}
        />

        {/* 부담부증여 채무인수 */}
        <NumberInput
          id="assumed-debt"
          label="부담부증여 (채무인수)"
          value={assumedDebt}
          onChange={setAssumedDebt}
          placeholder="0"
          unit="원"
          helpText="증여자가 진 채무를 수증자가 대신 갚기로 한 경우 (부담부증여)"
          unitButtons={GIFT_AMOUNT_UNIT_BUTTONS}
        />

        {/* 신고 기한 내 신고 체크박스 */}
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={reportWithinDeadline}
            onChange={(e) => setReportWithinDeadline(e.target.checked)}
            className="h-4 w-4 accent-primary-500"
          />
          <span className="text-sm font-medium text-text-primary">
            신고 기한 내 자진신고 (신고세액공제 3% 적용)
          </span>
        </label>
        <p className="text-xs text-text-tertiary">
          신고 기한: 증여일이 속하는 달의 말일부터 3개월 이내 (예: 2026년 1월 증여 → 2026년 4월
          30일까지). 공휴일 등 기한 특례는 별도로 확인하세요.
        </p>
      </FormCard>

      {/* 결과 카드 */}
      <div>
        <ResultCard
          title="납부액"
          heroLabel="최종 납부 증여세"
          heroValue={formatKRW(result.finalTax)}
          rows={[
            {
              label: '증여재산가액',
              value: formatKRW(result.giftValue),
            },
            ...(result.assumedDebt > 0
              ? [
                  {
                    label: '채무인수',
                    value: `-${formatKRW(result.assumedDebt)}`,
                    note: '(차감)',
                  },
                ]
              : []),
            {
              label: '과세가액',
              value: formatKRW(result.taxableValue),
              note: '(증여재산 + 기증여 - 채무)',
            },
            {
              label: `증여재산공제 (${relationLabel})`,
              value: `-${formatKRW(result.giftDeduction)}`,
              note: result.giftDeduction > 0 ? '(공제됨)' : undefined,
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
        {result.warnings.length > 0 && (
          <div className="mt-4 space-y-2 rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-4">
            {result.warnings.map((warning, idx) => (
              <p key={idx} className="text-sm text-highlight-500">
                주의: {warning}
              </p>
            ))}
          </div>
        )}
      </div>
    </CalculatorWorkspace>
  );
}
