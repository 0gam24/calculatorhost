'use client';

import { useMemo, useState } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { ResultCard } from '@/components/calculator/Result';
import {
  calculateSplitSell,
  priceFromTargetReturn,
  type SplitSellEntry,
} from '@/lib/finance/split-sell';
import { formatKRW } from '@/lib/utils';

type AssetType = 'stock' | 'coin';

const FEE_PRESETS: Record<AssetType, { sell: number; tax: number }> = {
  stock: { sell: 0.015, tax: 0.18 },
  coin: { sell: 0.05, tax: 0 },
};

const QUANTITY_UNIT: Record<AssetType, string> = {
  stock: '주',
  coin: '개',
};

const MAX_STEPS = 10;
const MIN_STEPS = 2;

function makeInitialEntries(): SplitSellEntry[] {
  return [
    { price: 11_000, quantity: 100 },
    { price: 12_000, quantity: 100 },
    { price: 13_000, quantity: 100 },
  ];
}

function formatSigned(value: number): string {
  if (value === 0) return formatKRW(0);
  const sign = value > 0 ? '+' : '−';
  return `${sign}${formatKRW(Math.abs(value))}`;
}

function formatSignedPercent(value: number): string {
  const sign = value > 0 ? '+' : value < 0 ? '−' : '';
  return `${sign}${Math.abs(value).toFixed(2)}%`;
}

export function SplitSellCalculator() {
  const [asset, setAsset] = useState<AssetType>('stock');
  const [averagePrice, setAveragePrice] = useState(10_000);
  const [holdingQuantity, setHoldingQuantity] = useState(300);
  const [entries, setEntries] = useState<SplitSellEntry[]>(makeInitialEntries);

  const fee = FEE_PRESETS[asset];
  const unit = QUANTITY_UNIT[asset];

  const result = useMemo(
    () =>
      calculateSplitSell({
        averagePrice,
        holdingQuantity,
        entries,
        sellFeeRate: fee.sell,
        taxRate: fee.tax,
      }),
    [averagePrice, holdingQuantity, entries, fee.sell, fee.tax]
  );

  const updateEntry = (idx: number, patch: Partial<SplitSellEntry>) => {
    setEntries((prev) => prev.map((e, i) => (i === idx ? { ...e, ...patch } : e)));
  };

  const addEntry = () => {
    if (entries.length >= MAX_STEPS) return;
    const last = entries[entries.length - 1];
    setEntries((prev) => [
      ...prev,
      { price: last ? last.price + 1_000 : averagePrice, quantity: last?.quantity ?? 100 },
    ]);
  };

  const removeEntry = (idx: number) => {
    if (entries.length <= MIN_STEPS) return;
    setEntries((prev) => prev.filter((_, i) => i !== idx));
  };

  const applyTargetReturn = (idx: number, returnPercent: number) => {
    const newPrice = priceFromTargetReturn(averagePrice, returnPercent);
    if (newPrice > 0) updateEntry(idx, { price: newPrice });
  };

  return (
    <div className="space-y-6">
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
          매도 수수료 {fee.sell}% {asset === 'stock' ? `+ 거래세 ${fee.tax}%` : '(거래세 없음)'}
        </p>
      </FormCard>

      <FormCard title="보유 포지션">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <NumberInput
            id="averagePrice"
            label="평균 매입단가"
            value={averagePrice}
            onChange={setAveragePrice}
            unit="원"
            unitButtons={[
              { label: '10,000', value: 10_000 },
              { label: '5,000', value: 5_000 },
              { label: '1,000', value: 1_000 },
            ]}
          />
          <NumberInput
            id="holdingQuantity"
            label="보유 수량"
            value={holdingQuantity}
            onChange={setHoldingQuantity}
            unit={unit}
            unitButtons={[
              { label: '1,000', value: 1_000 },
              { label: '100', value: 100 },
              { label: '10', value: 10 },
            ]}
          />
        </div>
      </FormCard>

      <FormCard title={`차수별 매도 (${entries.length}회)`}>
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
                  id={`sell-price-${idx}`}
                  label="매도 단가"
                  value={entry.price}
                  onChange={(v) => updateEntry(idx, { price: v })}
                  unit="원"
                />
                <NumberInput
                  id={`sell-qty-${idx}`}
                  label="매도 수량"
                  value={entry.quantity}
                  onChange={(v) => updateEntry(idx, { quantity: v })}
                  unit={unit}
                />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs text-text-tertiary">평단 대비 빠른 설정:</span>
                {[5, 10, 20, 30, 50].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => applyTargetReturn(idx, pct)}
                    className="rounded-chip border border-border-base px-2.5 py-1 text-caption font-medium hover:border-primary-500 hover:text-primary-500"
                  >
                    +{pct}%
                  </button>
                ))}
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
        title="분할매도 결과 (세후 기준)"
        heroLabel="누적 실현손익"
        heroValue={formatSigned(result.totalRealizedPnL)}
        heroNote={`평단 대비 ${formatSignedPercent(result.totalRealizedPnLPercent)} · 매도 ${result.totalSoldQuantity.toLocaleString()}${unit}`}
        rows={[
          {
            label: '총 매도금액 (세전)',
            value: formatKRW(result.totalGrossProceeds),
            emphasize: false,
          },
          {
            label: '매도 수수료',
            value: `− ${formatKRW(result.totalFee)}`,
            note: `${fee.sell}% × 매도금액`,
            emphasize: false,
          },
          {
            label: asset === 'stock' ? '증권거래세' : '거래세',
            value: `− ${formatKRW(result.totalTax)}`,
            note: asset === 'stock' ? `${fee.tax}% × 매도금액` : '코인은 거래세 없음',
            emphasize: false,
          },
          {
            label: '세후 매도 수령액',
            value: formatKRW(result.totalNetProceeds),
            emphasize: true,
          },
          {
            label: '잔여 보유 수량',
            value: `${result.remainingQuantity.toLocaleString()}${unit}`,
            note: '평단은 변하지 않음',
            emphasize: false,
          },
        ]}
      />

      {result.entries.length > 0 && (
        <section
          aria-label="차수별 실현손익"
          className="card overflow-x-auto"
        >
          <h2 className="mb-3 text-lg font-semibold">차수별 실현손익</h2>
          <table className="w-full min-w-[700px] text-sm">
            <thead className="border-b border-border-base text-text-tertiary">
              <tr>
                <th className="py-2 text-left">차수</th>
                <th className="py-2 text-right">매도가</th>
                <th className="py-2 text-right">수량</th>
                <th className="py-2 text-right">세후 수령액</th>
                <th className="py-2 text-right">실현손익</th>
                <th className="py-2 text-right">수익률</th>
                <th className="py-2 text-right">잔여수량</th>
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
                  <td className="py-2 text-right tabular-nums">{formatKRW(e.netProceeds)}</td>
                  <td
                    className={`py-2 text-right font-semibold tabular-nums ${
                      e.realizedPnL > 0
                        ? 'text-primary-500'
                        : e.realizedPnL < 0
                        ? 'text-danger-500'
                        : 'text-text-primary'
                    }`}
                  >
                    {formatSigned(e.realizedPnL)}
                  </td>
                  <td
                    className={`py-2 text-right tabular-nums ${
                      e.realizedPnLPercent > 0
                        ? 'text-primary-500'
                        : e.realizedPnLPercent < 0
                        ? 'text-danger-500'
                        : ''
                    }`}
                  >
                    {formatSignedPercent(e.realizedPnLPercent)}
                  </td>
                  <td className="py-2 text-right tabular-nums">
                    {e.remainingQuantity.toLocaleString()}
                    {unit}
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
          평단·보유 수량과 차수별 매도 단가·수량을 입력하면 차수별 실현손익(수수료·거래세
          차감)과 누적 손익이 자동 계산됩니다. 자산 유형에 따라 매도 수수료·거래세
          프리셋이 자동 적용됩니다. 차수별 "+5%·+10%·+20%" 버튼으로 평단 대비 목표
          수익률에서 매도가를 빠르게 환산할 수 있습니다. <strong>분할매도 후에도 잔여 수량의 평단은 변하지 않습니다.</strong>
        </p>
      </div>
    </div>
  );
}
