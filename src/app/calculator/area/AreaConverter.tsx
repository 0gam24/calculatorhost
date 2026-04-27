'use client';

/**
 * 평수 환산 계산기 (MVP #10)
 *
 * 명세: docs/calculator-spec/평수환산.md
 * 공식: src/lib/utils/area.ts
 */

import { useMemo, useState } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import { convertArea, type AreaUnit, type AreaKind, SQM_PER_PYEONG, PYEONG_PER_SQM } from '@/lib/utils/area';

/** 자주 쓰는 평수 환산표 */
const COMMON_CONVERSIONS = [
  { pyeong: 12, sqm: 39.67 },
  { pyeong: 18, sqm: 59.50 },
  { pyeong: 24, sqm: 79.34 },
  { pyeong: 32, sqm: 105.78 },
  { pyeong: 34, sqm: 112.40 },
  { pyeong: 45, sqm: 148.76 },
  { pyeong: 60, sqm: 198.35 },
];

export function AreaConverter() {
  const [inputValue, setInputValue] = useState(34);
  const [unit, setUnit] = useState<AreaUnit>('pyeong');
  const [areaKind, setAreaKind] = useState<AreaKind>('exclusive');

  const result = useMemo(
    () =>
      convertArea({
        value: inputValue,
        unit,
        kind: areaKind,
      }),
    [inputValue, unit, areaKind],
  );

  // 반대 단위 값
  const oppositeValue = unit === 'pyeong' ? result.sqm : result.pyeong;
  const oppositeUnit = unit === 'pyeong' ? '㎡' : '평';

  // 단위 교환 버튼 클릭
  const handleSwapUnit = () => {
    setUnit(unit === 'pyeong' ? 'sqm' : 'pyeong');
    setInputValue(oppositeValue);
  };

  // 면적 종류 라벨 (정보용)
  const areaKindLabel =
    areaKind === 'exclusive'
      ? '전용면적'
      : areaKind === 'supply'
        ? '공급면적'
        : '대지면적';

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* 입력 폼 */}
      <FormCard title="입력">
        {/* 입력 값 */}
        <NumberInput
          id="area-value"
          label={`면적 (${unit === 'pyeong' ? '평' : '㎡'})`}
          value={inputValue}
          onChange={setInputValue}
          placeholder={unit === 'pyeong' ? '예: 34' : '예: 112.40'}
          unit={unit === 'pyeong' ? '평' : '㎡'}
          max={10_000}
        />

        {/* 단위 선택 */}
        <RadioGroup<AreaUnit>
          id="area-unit"
          label="단위"
          value={unit}
          options={[
            { value: 'pyeong', label: '평' },
            { value: 'sqm', label: '제곱미터 (㎡)' },
          ]}
          onChange={setUnit}
        />

        {/* 면적 종류 (정보용) */}
        <RadioGroup<AreaKind>
          id="area-kind"
          label="면적 종류 (참고용)"
          value={areaKind}
          options={[
            { value: 'exclusive', label: '전용면적' },
            { value: 'supply', label: '공급면적' },
            { value: 'land', label: '대지면적' },
          ]}
          onChange={setAreaKind}
        />

        {/* 단위 교환 버튼 */}
        <button
          type="button"
          onClick={handleSwapUnit}
          className="w-full rounded-lg border border-primary-500 bg-primary-500/5 px-4 py-3 text-sm font-medium text-primary-500 transition hover:bg-primary-500/10"
          aria-label="단위 교환 (평 ↔ 제곱미터)"
        >
          🔁 {unit === 'pyeong' ? '㎡로 보기' : '평으로 보기'}
        </button>
      </FormCard>

      {/* 결과 카드 */}
      <div className="flex flex-col gap-6">
        {/* 변환 결과 */}
        <ResultCard
          title="변환 결과"
          heroLabel={`${unit === 'pyeong' ? '제곱미터' : '평'}`}
          heroValue={`${oppositeValue.toLocaleString('ko-KR', { maximumFractionDigits: 4, minimumFractionDigits: 2 })} ${oppositeUnit}`}
          heroNote={`선택한 면적 종류: ${areaKindLabel}`}
          rows={[
            {
              label: '입력 값',
              value: `${inputValue.toLocaleString('ko-KR', { maximumFractionDigits: 4 })} ${unit === 'pyeong' ? '평' : '㎡'}`,
            },
            {
              label: '변환 값',
              value: `${oppositeValue.toLocaleString('ko-KR', { maximumFractionDigits: 4, minimumFractionDigits: 2 })} ${oppositeUnit}`,
            },
          ]}
        >
          {/* 경고 메시지 */}
          {result.warnings && result.warnings.length > 0 && (
            <div className="mt-4 rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-3 text-sm text-highlight-500">
              {result.warnings.map((w, i) => (
                <p key={i}>{w}</p>
              ))}
            </div>
          )}

          {/* 공식 안내 */}
          <div className="mt-4 rounded-lg border border-border-base bg-bg-base p-3">
            <p className="text-caption text-text-tertiary">
              <strong>계량법 기준:</strong> 1평 = {(SQM_PER_PYEONG).toFixed(4)}㎡, 1㎡ = {(PYEONG_PER_SQM).toFixed(4)}평
            </p>
          </div>
        </ResultCard>
        <ResultBanner />

        {/* 자주 쓰는 평수 변환표 */}
        <section aria-label="자주 쓰는 평수 변환표" className="card">
          <h3 className="mb-3 text-lg font-semibold text-text-primary">자주 쓰는 평수 변환표</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border-base">
                  <th className="px-3 py-2 text-left font-semibold text-text-primary">평</th>
                  <th className="px-3 py-2 text-right font-semibold text-text-primary">제곱미터 (㎡)</th>
                </tr>
              </thead>
              <tbody>
                {COMMON_CONVERSIONS.map((conv) => (
                  <tr key={conv.pyeong} className="border-b border-border-base/50">
                    <td className="px-3 py-2 text-text-secondary">{conv.pyeong}평</td>
                    <td className="px-3 py-2 text-right text-text-primary font-medium tabular-nums">
                      {conv.sqm.toFixed(2)}㎡
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
