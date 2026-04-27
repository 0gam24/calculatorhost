'use client';

import { useMemo, useState } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import {
  calculateNewAverage,
  calculateQuantityForTargetAverage,
  type AveragingDownInput,
  type TargetAverageInput,
} from '@/lib/finance/averaging-down';
import { formatKRW } from '@/lib/utils';

export function AveragingDownCalculator() {
  const [mode, setMode] = useState<'average' | 'target'>('average');

  // Mode 1: 평균단가 계산
  const [currentPrice1, setCurrentPrice1] = useState(10000);
  const [currentQty1, setCurrentQty1] = useState(100);
  const [additionalPrice1, setAdditionalPrice1] = useState(5000);
  const [additionalQty1, setAdditionalQty1] = useState(100);

  // Mode 2: 필요 수량 계산
  const [currentPrice2, setCurrentPrice2] = useState(10000);
  const [currentQty2, setCurrentQty2] = useState(100);
  const [newPurchasePrice, setNewPurchasePrice] = useState(5000);
  const [targetAveragePrice, setTargetAveragePrice] = useState(7500);

  const result1 = useMemo(() => {
    return calculateNewAverage({
      currentPosition: { price: currentPrice1, quantity: currentQty1 },
      additionalPurchase: { price: additionalPrice1, quantity: additionalQty1 },
    } as AveragingDownInput);
  }, [currentPrice1, currentQty1, additionalPrice1, additionalQty1]);

  const result2 = useMemo(() => {
    return calculateQuantityForTargetAverage({
      currentPosition: { price: currentPrice2, quantity: currentQty2 },
      newPurchasePrice,
      targetAveragePrice,
    } as TargetAverageInput);
  }, [currentPrice2, currentQty2, newPurchasePrice, targetAveragePrice]);

  const currentInvestment1 = currentPrice1 * currentQty1;
  const costBasisChangePercent1 =
    currentPrice1 > 0
      ? ((result1.averagePrice - currentPrice1) / currentPrice1) * 100
      : 0;

  return (
    <div className="space-y-6">
      {/* 계산 모드 선택 */}
      <FormCard title="계산 모드">
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              value="average"
              checked={mode === 'average'}
              onChange={(e) => setMode(e.target.value as 'average' | 'target')}
              className="h-4 w-4 accent-primary-500"
            />
            <span className="text-sm font-medium">평균단가 계산: 현재+추가 매수 → 새 평균단가</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              value="target"
              checked={mode === 'target'}
              onChange={(e) => setMode(e.target.value as 'average' | 'target')}
              className="h-4 w-4 accent-primary-500"
            />
            <span className="text-sm font-medium">필요 수량 계산: 목표 평균단가 → 필요 추가 수량</span>
          </label>
        </div>
      </FormCard>

      {mode === 'average' ? (
        <>
          {/* Mode 1: 평균단가 계산 */}
          <FormCard title="현재 보유">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <NumberInput
                id="currentPrice1"
                label="매입 단가"
                value={currentPrice1}
                onChange={setCurrentPrice1}
                unit="원"
                unitButtons={[
                  { label: '10,000', value: 10000 },
                  { label: '5,000', value: 5000 },
                  { label: '1,000', value: 1000 },
                ]}
              />
              <NumberInput
                id="currentQty1"
                label="보유 수량"
                value={currentQty1}
                onChange={setCurrentQty1}
                unit="주"
                unitButtons={[
                  { label: '1,000주', value: 1000 },
                  { label: '100주', value: 100 },
                  { label: '10주', value: 10 },
                ]}
              />
            </div>
          </FormCard>

          <FormCard title="추가 매수">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <NumberInput
                id="additionalPrice1"
                label="추가 매수 단가"
                value={additionalPrice1}
                onChange={setAdditionalPrice1}
                unit="원"
                unitButtons={[
                  { label: '5,000', value: 5000 },
                  { label: '3,000', value: 3000 },
                  { label: '1,000', value: 1000 },
                ]}
                helpText="현재 단가보다 낮아야 효과적"
              />
              <NumberInput
                id="additionalQty1"
                label="추가 매수 수량"
                value={additionalQty1}
                onChange={setAdditionalQty1}
                unit="주"
                unitButtons={[
                  { label: '1,000주', value: 1000 },
                  { label: '100주', value: 100 },
                  { label: '10주', value: 10 },
                ]}
              />
            </div>
          </FormCard>

          {result1.warnings.length > 0 && (
            <div className="rounded-lg border-l-4 border-danger-500 bg-danger-50 p-4 dark:border-danger-400 dark:bg-red-950 dark:bg-opacity-20">
              <h3 className="mb-2 font-semibold text-danger-700 dark:text-danger-200">
                ⚠ 주의사항
              </h3>
              <ul className="space-y-1 text-sm text-danger-600 dark:text-danger-300">
                {result1.warnings.map((w, i) => (
                  <li key={i}>• {w}</li>
                ))}
              </ul>
            </div>
          )}

          <ResultCard
            title="물타기 결과"
            heroLabel="새 평균단가"
            heroValue={`${result1.averagePrice.toLocaleString()}원`}
            heroNote={
              costBasisChangePercent1 < 0
                ? `기존 ${currentPrice1.toLocaleString()}원 대비 ${Math.abs(costBasisChangePercent1).toFixed(1)}% 인하`
                : '상승 (부적절한 입력)'
            }
            rows={[
              {
                label: '기존 투자금',
                value: formatKRW(currentInvestment1),
                emphasize: false,
              },
              {
                label: '추가 투자금',
                value: formatKRW(additionalPrice1 * additionalQty1),
                emphasize: false,
              },
              {
                label: '총 투자금',
                value: formatKRW(result1.totalInvestment),
                emphasize: false,
              },
              {
                label: '총 수량',
                value: `${result1.totalQuantity.toLocaleString()}주`,
                emphasize: false,
              },
              {
                label: '평균단가 하락률',
                value: `${Math.abs(costBasisChangePercent1).toFixed(2)}%`,
                note: '기존 단가 대비 인하된 비율',
                emphasize: true,
              },
            ]}
          />
        </>
      ) : (
        <>
          {/* Mode 2: 필요 수량 계산 */}
          <FormCard title="현재 보유">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <NumberInput
                id="currentPrice2"
                label="매입 단가"
                value={currentPrice2}
                onChange={setCurrentPrice2}
                unit="원"
              />
              <NumberInput
                id="currentQty2"
                label="보유 수량"
                value={currentQty2}
                onChange={setCurrentQty2}
                unit="주"
              />
            </div>
          </FormCard>

          <FormCard title="목표 설정">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <NumberInput
                id="newPurchasePrice"
                label="추가 매수 단가"
                value={newPurchasePrice}
                onChange={setNewPurchasePrice}
                unit="원"
                helpText="현재 단가보다 낮아야 효과적"
              />
              <NumberInput
                id="targetAveragePrice"
                label="목표 평균단가"
                value={targetAveragePrice}
                onChange={setTargetAveragePrice}
                unit="원"
                helpText="달성하고 싶은 평균단가"
              />
            </div>
          </FormCard>

          {result2.warnings.length > 0 && (
            <div className="rounded-lg border-l-4 border-danger-500 bg-danger-50 p-4 dark:border-danger-400 dark:bg-red-950 dark:bg-opacity-20">
              <h3 className="mb-2 font-semibold text-danger-700 dark:text-danger-200">
                ⚠ 주의사항
              </h3>
              <ul className="space-y-1 text-sm text-danger-600 dark:text-danger-300">
                {result2.warnings.map((w, i) => (
                  <li key={i}>• {w}</li>
                ))}
              </ul>
            </div>
          )}

          <ResultCard
            title="목표 달성 계획"
            heroLabel={result2.achievable ? '필요 수량' : '달성 불가'}
            heroValue={
              result2.achievable
                ? `${result2.requiredAdditionalQuantity.toLocaleString()}주`
                : '조건 불만족'
            }
            heroNote={
              result2.achievable
                ? `${formatKRW(result2.requiredAdditionalCost)} 추가 투자 필요`
                : '목표 단가가 추가 매수 단가와 같거나 높아야 함'
            }
            rows={[
              {
                label: '현재 투자금',
                value: formatKRW(currentPrice2 * currentQty2),
                emphasize: false,
              },
              {
                label: '현재 평균단가',
                value: `${currentPrice2.toLocaleString()}원`,
                emphasize: false,
              },
              {
                label: '목표 평균단가',
                value: `${targetAveragePrice.toLocaleString()}원`,
                emphasize: false,
              },
              {
                label: '필요 추가 수량',
                value: result2.achievable
                  ? `${result2.requiredAdditionalQuantity.toLocaleString()}주`
                  : '계산 불가',
                emphasize: true,
              },
              {
                label: '필요 추가 투자금',
                value: result2.achievable ? formatKRW(result2.requiredAdditionalCost) : '-',
                emphasize: false,
              },
            ]}
          />
        <ResultBanner />
        </>
      )}

      {/* 안내 메시지 */}
      <div className="rounded-lg border border-border-base p-4 bg-bg-raised">
        <h3 className="mb-2 font-semibold">💡 사용 안내</h3>
        <p className="text-xs text-text-secondary">
          {mode === 'average'
            ? '보유하고 있는 주식 정보와 추가로 매수할 계획을 입력하면, 새로운 평균단가가 계산됩니다. 평균단가가 낮아질수록 손익분기점이 낮아집니다.'
            : '원하는 목표 평균단가를 입력하면, 그것을 달성하기 위해 필요한 추가 매수 수량과 투자금이 계산됩니다. 목표 달성 가능 여부를 미리 확인할 수 있습니다.'}
        </p>
      </div>
    </div>
  );
}
