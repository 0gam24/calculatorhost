'use client';

import { useEffect, useMemo } from 'react';
import {
  CalculatorWorkspace,
  useCalculatorWorkspace,
} from '@/components/calculator/CalculatorWorkspace';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import {
  calculateAcquisitionTax,
  type AcquisitionMethod,
  type AcquisitionTarget,
  type HouseCount,
} from '@/lib/tax/acquisition';
import { formatKRW } from '@/lib/utils';

const PRICE_BUTTONS = [
  { label: '1억', value: 100_000_000 },
  { label: '천만', value: 10_000_000 },
  { label: '백만', value: 1_000_000 },
  { label: '십만', value: 100_000 },
];
type SpecialCondition = 'unknown' | 'applicable' | 'notApplicable';
type PurchaseCondition = 'unknown' | 'ordinary' | 'special';
type BurdenedCondition = 'unknown' | 'yes' | 'no';

// The confirmation button checks aria-invalid before recording completion.
function AcquisitionReadiness({ error }: { error?: string }) {
  const reportValidity = useCalculatorWorkspace()?.reportValidity;
  useEffect(() => {
    reportValidity?.('acquisition-tax:conditions', error);
    return () => reportValidity?.('acquisition-tax:conditions');
  }, [error, reportValidity]);
  if (!error) return null;
  return (
    <div
      aria-live="polite"
      tabIndex={-1}
      aria-invalid="true"
      data-testid="acquisition-conditions"
      className="rounded-xl border border-border-base bg-bg-base p-4 text-sm text-text-primary focus-visible:ring-2 focus-visible:ring-primary-500"
    >
      <strong className="block">조건 확인 필요</strong>
      <p className="mt-1">{error}</p>
    </div>
  );
}

export function AcquisitionCalculator() {
  const [method, setMethod] = useCalculatorState<AcquisitionMethod>(
    'acquisition-tax:method',
    'purchase',
  );
  const [target, setTarget] = useCalculatorState<AcquisitionTarget>(
    'acquisition-tax:target',
    'residential',
  );
  const [houseCount, setHouseCount] = useCalculatorState<HouseCount>(
    'acquisition-tax:houseCount',
    1,
  );
  const [areaOver85, setAreaOver85] = useCalculatorState('acquisition-tax:areaOver85', false);
  const [adjustedArea, setAdjustedArea] = useCalculatorState('acquisition-tax:adjustedArea', false);
  const [acquisitionPrice, setAcquisitionPrice] = useCalculatorState(
    'acquisition-tax:acquisitionPrice',
    600_000_000,
  );
  // Keep this legacy amount for inheritance; never copy it into either gift amount.
  const [standardPrice, setStandardPrice] = useCalculatorState(
    'acquisition-tax:standardPrice',
    600_000_000,
  );
  const [firstHomeBuyer, setFirstHomeBuyer] = useCalculatorState(
    'acquisition-tax:firstHomeBuyer',
    false,
  );
  const [purchaseSpecial, setPurchaseSpecial] = useCalculatorState<PurchaseCondition>(
    'acquisition-tax:purchaseSpecial',
    'ordinary',
  );
  const [giftTaxBase, setGiftTaxBase] = useCalculatorState('acquisition-tax:giftTaxBase', '');
  const [giftWholeHouseStandardPrice, setGiftWholeHouseStandardPrice] = useCalculatorState(
    'acquisition-tax:giftWholeHouseStandardPrice',
    '',
  );
  const [giftBurdened, setGiftBurdened] = useCalculatorState<BurdenedCondition>(
    'acquisition-tax:giftBurdened',
    'unknown',
  );
  const [giftOneHouseFamilyExemption, setGiftOneHouseFamilyExemption] =
    useCalculatorState<SpecialCondition>('acquisition-tax:giftOneHouseFamilyExemption', 'unknown');
  const [inheritanceSpecial, setInheritanceSpecial] = useCalculatorState<SpecialCondition>(
    'acquisition-tax:inheritanceSpecial',
    'unknown',
  );

  const { result, error } = useMemo(() => {
    try {
      if (target !== 'residential' || method === 'primitive')
        throw new Error(
          '주택의 매매·일반 증여·일반 상속만 지원합니다. 이 취득 유형은 관할 지방자치단체에 세액을 확인해 주세요.',
        );
      if (method === 'gift' && (!giftTaxBase.trim() || !(Number(giftTaxBase) > 0)))
        throw new Error(
          '증여 취득의 과세표준을 확인해 입력해 주세요. 기존 시가표준액을 증여 과세표준으로 자동 적용하지 않습니다.',
        );
      const value = calculateAcquisitionTax({
        method,
        target,
        houseCount,
        areaOver85,
        adjustedArea,
        acquisitionPrice:
          method === 'purchase'
            ? acquisitionPrice
            : method === 'gift'
              ? Number(giftTaxBase)
              : standardPrice,
        firstHomeBuyerDiscount: firstHomeBuyer && method === 'purchase',
        purchaseSpecial,
        giftWholeHouseStandardPrice: giftWholeHouseStandardPrice.trim()
          ? Number(giftWholeHouseStandardPrice)
          : undefined,
        giftOneHouseFamilyExemption,
        giftBurdened: giftBurdened === 'unknown' ? null : giftBurdened === 'yes',
        inheritanceSpecial,
      });
      return { result: value, error: undefined };
    } catch (cause) {
      return {
        result: null,
        error: cause instanceof Error ? cause.message : '취득 조건을 확인해 주세요.',
      };
    }
  }, [
    method,
    target,
    houseCount,
    areaOver85,
    adjustedArea,
    acquisitionPrice,
    standardPrice,
    firstHomeBuyer,
    purchaseSpecial,
    giftTaxBase,
    giftWholeHouseStandardPrice,
    giftBurdened,
    giftOneHouseFamilyExemption,
    inheritanceSpecial,
  ]);

  const showGiftExemption =
    method === 'gift' && adjustedArea && Number(giftWholeHouseStandardPrice) >= 300_000_000;
  return (
    <CalculatorWorkspace className="grid gap-6 lg:grid-cols-2" slug="acquisition-tax">
      <FormCard title="입력">
        <RadioGroup<AcquisitionMethod>
          id="method"
          label="취득 방법"
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
            { value: 'residential', label: '주택' },
            { value: 'farmland', label: '농지 (미지원)' },
            { value: 'land', label: '토지 (미지원)' },
            { value: 'other', label: '기타 (미지원)' },
          ]}
        />
        {method === 'purchase' && (
          <>
            <NumberInput
              id="acquisition-price"
              label="취득가액"
              value={acquisitionPrice}
              onChange={setAcquisitionPrice}
              unitButtons={PRICE_BUTTONS}
              min={1}
              max={10_000_000_000}
              debounceMs={150}
              unit="원"
            />
            <RadioGroup
              id="house-count"
              label="취득 후 세대 기준 주택 수"
              value={String(houseCount)}
              onChange={(value) => setHouseCount(Number(value) as HouseCount)}
              options={[
                { value: '1', label: '1주택' },
                { value: '2', label: '2주택' },
                { value: '3', label: '3주택' },
                { value: '4', label: '4주택 이상' },
              ]}
            />
            <p className="text-sm text-text-secondary">
              본인만의 주택 수가 아니라 세대 기준입니다. 주택 수 산정 제외 등 예외가 있으면 아래에서
              특례·예외를 선택해 주세요.
            </p>
            <RadioGroup<PurchaseCondition>
              id="purchase-special"
              label="매매 취득 조건"
              value={purchaseSpecial}
              onChange={setPurchaseSpecial}
              options={[
                { value: 'ordinary', label: '일반 주택 전체 취득' },
                { value: 'special', label: '특례·지분·일시적 다주택 등' },
                { value: 'unknown', label: '확인 필요' },
              ]}
            />
            <div className="flex items-center gap-3">
              <input
                id="first-home"
                type="checkbox"
                checked={firstHomeBuyer}
                onChange={(event) => setFirstHomeBuyer(event.target.checked)}
                className="h-5 w-5 rounded border-border-base text-primary-500"
              />
              <label
                htmlFor="first-home"
                className="flex min-h-12 items-center text-sm font-medium text-text-primary"
              >
                생애최초 주택 감면 검토 필요
              </label>
            </div>
            <p className="text-sm text-text-secondary">
              생애최초 감면은 본인·배우자의 취득 이력과 대상 주택 등 요건에 따라 달라집니다. 선택 시
              자동 감면액을 표시하지 않으며, 관할 지방자치단체 확인이 필요합니다.
            </p>
          </>
        )}
        {method === 'gift' && (
          <>
            <NumberInput
              id="gift-tax-base"
              label="확인한 증여 취득 과세표준"
              value={Number(giftTaxBase || 0)}
              onChange={(value) => setGiftTaxBase(String(value))}
              helpText="원칙적으로 시가인정액이며, 법정 예외에 해당하면 그 기준을 확인해 입력하세요. 중과 판정용 시가표준액과 다릅니다. 초기 0은 미확인 상태입니다."
              unitButtons={PRICE_BUTTONS}
              max={10_000_000_000}
              debounceMs={150}
              unit="원"
            />
            {adjustedArea && (
              <NumberInput
                id="gift-whole-house-standard-price"
                label="증여 주택 전체의 시가표준액"
                value={Number(giftWholeHouseStandardPrice || 0)}
                onChange={(value) => setGiftWholeHouseStandardPrice(String(value))}
                helpText="증여 지분의 금액이 아닌 주택 전체 금액입니다. 조정대상지역의 3억원 이상 주택 중과 판정에 사용합니다. 과세표준을 자동 복사하지 않습니다."
                unitButtons={PRICE_BUTTONS}
                max={10_000_000_000}
                debounceMs={150}
                unit="원"
              />
            )}
            <RadioGroup<BurdenedCondition>
              id="gift-burdened"
              label="채무를 함께 인수하는 부담부증여인가요?"
              value={giftBurdened}
              onChange={setGiftBurdened}
              options={[
                { value: 'unknown', label: '확인 필요' },
                { value: 'no', label: '아니요' },
                { value: 'yes', label: '예 (미지원)' },
              ]}
            />
          </>
        )}
        {method === 'inheritance' && (
          <>
            <NumberInput
              id="standard-price"
              label="상속 취득 시가표준액"
              value={standardPrice}
              onChange={setStandardPrice}
              helpText="취득세 과세표준으로 적용할 시가표준액을 관할 지방자치단체에서 확인하세요."
              unitButtons={PRICE_BUTTONS}
              min={1}
              max={10_000_000_000}
              debounceMs={150}
              unit="원"
            />
            <RadioGroup<SpecialCondition>
              id="inheritance-special"
              label="상속 1가구 1주택 취득 특례 적용 여부"
              value={inheritanceSpecial}
              onChange={setInheritanceSpecial}
              options={[
                { value: 'unknown', label: '확인 필요' },
                { value: 'notApplicable', label: '해당 없음' },
                { value: 'applicable', label: '특례 해당 (미지원)' },
              ]}
            />
            <p className="text-sm text-text-secondary">
              일반 상속 취득만 계산합니다. 상속 1가구 1주택 특례가 적용되거나 적용 여부를 모르면
              일반 세율의 금액을 표시하지 않습니다.
            </p>
          </>
        )}
        {target === 'residential' && method !== 'primitive' && (
          <>
            <RadioGroup
              id="housing-size"
              label="국민주택규모를 초과하나요?"
              value={areaOver85 ? 'yes' : 'no'}
              onChange={(value) => setAreaOver85(value === 'yes')}
              options={[
                { value: 'no', label: '초과하지 않음' },
                { value: 'yes', label: '초과함' },
              ]}
            />
            <p className="text-sm text-text-secondary">
              전용면적 기준 일반 85㎡ 이하이며, 수도권 밖 도시지역이 아닌 읍·면은 100㎡ 이하입니다.
              해당 지역의 법정 기준을 확인해 초과 여부를 선택하세요. 농어촌특별세 판단에 사용합니다.
            </p>
          </>
        )}
        {target === 'residential' && (method === 'purchase' || method === 'gift') && (
          <RadioGroup
            id="adjusted-area"
            label="조정대상지역인가요?"
            value={adjustedArea ? 'yes' : 'no'}
            onChange={(value) => setAdjustedArea(value === 'yes')}
            options={[
              { value: 'no', label: '아니요' },
              { value: 'yes', label: '예' },
            ]}
          />
        )}
        {showGiftExemption && (
          <>
            <RadioGroup<SpecialCondition>
              id="gift-family-exemption"
              label="증여자가 1세대 1주택이고, 배우자·직계존비속에게 증여하나요?"
              value={giftOneHouseFamilyExemption}
              onChange={setGiftOneHouseFamilyExemption}
              options={[
                { value: 'unknown', label: '확인 필요' },
                { value: 'applicable', label: '두 조건 모두 해당' },
                { value: 'notApplicable', label: '해당하지 않음' },
              ]}
            />
            <p className="text-sm text-text-secondary">
              증여자의 1세대 1주택 여부와 수증자가 배우자 또는 직계존비속인지 모두 확인해야 중과
              예외를 적용합니다. 수증자의 주택 수만으로 판단하지 않습니다.
            </p>
          </>
        )}
        <AcquisitionReadiness error={error} />
      </FormCard>
      <div className="flex flex-col gap-4">
        <ResultCard
          title={error ? '조건 확인 필요' : '총 납부액'}
          heroLabel="취득세 + 농어촌특별세 + 지방교육세"
          heroValue={result ? formatKRW(result.totalPayment) : '—'}
          heroNote={result ? `취득세율 ${(result.appliedRate * 100).toFixed(2)}%` : undefined}
          empty={!result}
          rows={
            result
              ? [
                  { label: '과세표준', value: formatKRW(result.taxBase) },
                  { label: '취득세', value: formatKRW(result.acquisitionTax) },
                  { label: '농어촌특별세', value: formatKRW(result.specialRuralTax) },
                  { label: '지방교육세', value: formatKRW(result.localEducationTax) },
                ]
              : []
          }
        />
        {error && (
          <p
            role="status"
            className="rounded-xl border border-border-base p-4 text-sm text-text-primary"
          >
            {error}
          </p>
        )}
        {result?.note && <p className="text-sm text-text-secondary">계산 조건: {result.note}</p>}
        <p className="text-sm text-text-secondary">
          취득세 추정액입니다. 취득일의 법령과 지방자치단체의 과세표준·세대·특례 판단을 확인하세요.
          국민주택규모는 전용면적 일반 85㎡, 수도권 밖 비도시 읍·면 100㎡ 기준의 해당 여부를 확인해야
          합니다. 미지원 조건에는 금액을 제시하지 않습니다.
        </p>
      </div>
      <ResultBanner />
    </CalculatorWorkspace>
  );
}
