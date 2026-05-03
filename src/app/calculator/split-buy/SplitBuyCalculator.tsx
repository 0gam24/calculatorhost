'use client';

import { useMemo, useState } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { ResultCard } from '@/components/calculator/Result';
import {
  calculateSplitBuy,
  generateEqualSplit,
  type SplitBuyEntry,
} from '@/lib/finance/split-buy';
import { formatKRW } from '@/lib/utils';

type AssetType = 'stock' | 'coin';

const FEE_PRESETS: Record<AssetType, { buy: number; sell: number; tax: number }> = {
  stock: { buy: 0.015, sell: 0.015, tax: 0.18 },
  coin: { buy: 0.05, sell: 0.05, tax: 0 },
};

const QUANTITY_UNIT: Record<AssetType, string> = {
  stock: '주',
  coin: '개',
};

const MAX_STEPS = 10;
const MIN_STEPS = 2;

function makeInitialEntries(): SplitBuyEntry[] {
  return [
    { price: 10_000, quantity: 100 },
    { price: 8_000, quantity: 100 },
    { price: 6_000, quantity: 100 },
  ];
}

export function SplitBuyCalculator() {
  const [asset, setAsset] = useState<AssetType>('stock');
  const [entries, setEntries] = useState<SplitBuyEntry[]>(makeInitialEntries);
  const [equalAmount, setEqualAmount] = useState(3_000_000);

  const fee = FEE_PRESETS[asset];
  const unit = QUANTITY_UNIT[asset];

  const result = useMemo(
    () =>
      calculateSplitBuy({
        entries,
        buyFeeRate: fee.buy,
        sellFeeRate: fee.sell,
        taxRate: fee.tax,
      }),
    [entries, fee.buy, fee.sell, fee.tax]
  );

  const updateEntry = (idx: number, patch: Partial<SplitBuyEntry>) => {
    setEntries((prev) => prev.map((e, i) => (i === idx ? { ...e, ...patch } : e)));
  };

  const addEntry = () => {
    if (entries.length >= MAX_STEPS) return;
    const last = entries[entries.length - 1];
    setEntries((prev) => [
      ...prev,
      { price: last ? Math.max(0, Math.floor(last.price * 0.9)) : 10_000, quantity: last?.quantity ?? 100 },
    ]);
  };

  const removeEntry = (idx: number) => {
    if (entries.length <= MIN_STEPS) return;
    setEntries((prev) => prev.filter((_, i) => i !== idx));
  };

  const applyEqualSplit = () => {
    const prices = entries.map((e) => e.price);
    const out = generateEqualSplit({ totalAmount: equalAmount, prices });
    if (out.entries.length === 0) return;
    setEntries(out.entries);
  };

  return (
    <div className="space-y-6">
      {/* 자산 유형 선택 */}
      <FormCard title="자산 유형">
        <div className="flex flex-wrap gap-3">
          {(['stock', 'coin'] as const).map((opt) => (
            <label
              key={opt}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border-base bg-bg-raised px-4 py-2"
            >
              <input
                type="radio"
                name="asset"
                value={opt}
                checked={asset === opt}
                onChange={() => setAsset(opt)}
                className="h-4 w-4 accent-primary-500"
              />
              <span className="text-sm font-medium">{opt === 'stock' ? '주식' : '코인'}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-text-tertiary">
          수수료 프리셋 — 주식: 매수/매도 {FEE_PRESETS.stock.buy}% + 거래세 {FEE_PRESETS.stock.tax}% / 코인: 매수/매도 {FEE_PRESETS.coin.buy}% (거래세 없음)
        </p>
      </FormCard>

      {/* 차수별 매수 입력 */}
      <FormCard title={`차수별 매수 (${entries.length}회)`}>
        <div className="space-y-4">
          {entries.map((entry, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-border-base bg-bg-raised p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-primary-500">{idx + 1}차</span>
                {entries.length > MIN_STEPS && (
                  <button
                    type="button"
                    onClick={() => removeEntry(idx)}
                    className="text-xs text-text-tertiary hover:text-danger-500"
                  >
                    삭제
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <NumberInput
                  id={`price-${idx}`}
                  label="단가"
                  value={entry.price}
                  onChange={(v) => updateEntry(idx, { price: v })}
                  unit="원"
                />
                <NumberInput
                  id={`qty-${idx}`}
                  label="수량"
                  value={entry.quantity}
                  onChange={(v) => updateEntry(idx, { quantity: v })}
                  unit={unit}
                />
              </div>
            </div>
          ))}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={addEntry}
              disabled={entries.length >= MAX_STEPS}
              className="rounded-chip border border-border-base px-4 py-2 text-sm font-medium hover:border-primary-500 hover:text-primary-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              + 차수 추가
            </button>
            <span className="text-xs text-text-tertiary self-center">
              (최대 {MAX_STEPS}회까지)
            </span>
          </div>
        </div>
      </FormCard>

      {/* 균등분할 자동채움 */}
      <FormCard title="균등분할 자동채움 (선택)">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <NumberInput
            id="equalAmount"
            label="총 투자금"
            value={equalAmount}
            onChange={setEqualAmount}
            unit="원"
            unitButtons={[
              { label: '100만', value: 1_000_000 },
              { label: '500만', value: 5_000_000 },
              { label: '1,000만', value: 10_000_000 },
            ]}
            helpText="입력한 단가는 유지하고, 차수별 수량만 균등 분배해 자동 채웁니다."
          />
          <button
            type="button"
            onClick={applyEqualSplit}
            className="h-[50px] rounded-lg bg-primary-500 px-4 text-sm font-semibold text-white hover:bg-primary-600"
          >
            균등분할 적용
          </button>
        </div>
      </FormCard>

      {result.warnings.length > 0 && (
        <div className="rounded-lg border-l-4 border-danger-500 bg-danger-50 p-4 dark:border-danger-400 dark:bg-red-950 dark:bg-opacity-20">
          <h3 className="mb-2 font-semibold text-danger-700 dark:text-danger-200">
            ⚠ 주의사항
          </h3>
          <ul className="space-y-1 text-sm text-danger-600 dark:text-danger-300">
            {result.warnings.map((w, i) => (
              <li key={i}>• {w}</li>
            ))}
          </ul>
        </div>
      )}

      <ResultCard
        title="분할매수 결과"
        heroLabel="가중평균 평단가"
        heroValue={`${result.averagePrice.toLocaleString()}원`}
        heroNote={`총 ${result.totalQuantity.toLocaleString()}${unit} · 총 투자금 ${formatKRW(result.totalAmount)}`}
        rows={[
          {
            label: '수수료 포함 실효 평단가',
            value: `${result.effectiveAveragePrice.toLocaleString()}원`,
            note: `매수 수수료율 ${fee.buy}% 반영`,
            emphasize: false,
          },
          {
            label: '손익분기점 (매도 기준)',
            value: `${result.breakEvenPrice.toLocaleString()}원`,
            note:
              asset === 'stock'
                ? `매도 수수료 ${fee.sell}% + 거래세 ${fee.tax}% 차감 후 본전`
                : `매도 수수료 ${fee.sell}% 차감 후 본전 (코인은 거래세 없음)`,
            emphasize: true,
          },
          {
            label: '총 매수 수수료',
            value: formatKRW(result.totalFee),
            emphasize: false,
          },
          {
            label: '총 투자금 (수수료 제외)',
            value: formatKRW(result.totalAmount),
            emphasize: false,
          },
          {
            label: '총 보유 수량',
            value: `${result.totalQuantity.toLocaleString()}${unit}`,
            emphasize: false,
          },
        ]}
      />

      {/* 차수별 누적 평단 추이 */}
      {result.entries.length > 0 && (
        <section
          aria-label="차수별 누적 추이"
          className="card overflow-x-auto"
        >
          <h2 className="mb-3 text-lg font-semibold">차수별 누적 평단 추이</h2>
          <table className="w-full min-w-[600px] text-sm">
            <thead className="border-b border-border-base text-text-tertiary">
              <tr>
                <th className="py-2 text-left">차수</th>
                <th className="py-2 text-right">단가</th>
                <th className="py-2 text-right">수량</th>
                <th className="py-2 text-right">매수금액</th>
                <th className="py-2 text-right">누적수량</th>
                <th className="py-2 text-right">누적평단</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {result.entries.map((e) => (
                <tr key={e.step} className="border-b border-border-subtle">
                  <td className="py-2 font-semibold text-primary-500">{e.step}차</td>
                  <td className="py-2 text-right tabular-nums">{e.price.toLocaleString()}원</td>
                  <td className="py-2 text-right tabular-nums">
                    {e.quantity.toLocaleString()}
                    {unit}
                  </td>
                  <td className="py-2 text-right tabular-nums">{formatKRW(e.amount)}</td>
                  <td className="py-2 text-right tabular-nums">
                    {e.cumulativeQuantity.toLocaleString()}
                    {unit}
                  </td>
                  <td className="py-2 text-right font-semibold tabular-nums text-text-primary">
                    {e.cumulativeAverage.toLocaleString()}원
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <div className="rounded-lg border border-border-base p-4 bg-bg-raised">
        <h3 className="mb-2 font-semibold">💡 사용 안내</h3>
        <p className="text-xs text-text-secondary">
          차수별로 단가와 수량을 입력하면 가중평균 평단가, 차수별 누적 평단 추이, 수수료
          포함 실효 평단가, 손익분기점이 자동 계산됩니다. 자산 유형(주식/코인)에 따라
          수수료·거래세 프리셋이 자동 적용됩니다. "균등분할 자동채움"으로 총 투자금에서
          역산해 차수별 수량을 한 번에 채울 수 있습니다.
        </p>
      </div>
    </div>
  );
}
