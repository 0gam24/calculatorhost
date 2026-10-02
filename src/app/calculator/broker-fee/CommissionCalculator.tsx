'use client';

import {
  CalculatorWorkspace,
  useCalculatorWorkspace,
} from '@/components/calculator/CalculatorWorkspace';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';

/**
 * 부동산 중개수수료 계산기 (MVP #8)
 *
 * 명세: docs/calculator-spec/중개수수료.md
 * 공식: src/lib/finance/realty-commission.ts
 */

import { useEffect, useMemo } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import {
  calculateRealtyCommission,
  type TransactionType,
  type PropertyKind,
  type CommissionResult,
} from '@/lib/finance/realty-commission';
import { formatKRW, formatPercent } from '@/lib/utils';

const PRICE_UNIT_BUTTONS = [
  { label: '1억', value: 100_000_000 },
  { label: '천만', value: 10_000_000 },
  { label: '백만', value: 1_000_000 },
  { label: '십만', value: 100_000 },
];

function CommissionReadiness({ error }: { error?: string }) {
  const reportValidity = useCalculatorWorkspace()?.reportValidity;
  useEffect(() => {
    reportValidity?.('broker-fee:conditions', error);
    return () => reportValidity?.('broker-fee:conditions');
  }, [error, reportValidity]);
  return null;
}

export function CommissionCalculator() {
  // 입력 상태
  const [transactionType, setTransactionType] = useCalculatorState<TransactionType>(
    'broker-fee:transactionType',
    'sale',
  );
  const [propertyKind, setPropertyKind] = useCalculatorState<PropertyKind>(
    'broker-fee:propertyKind',
    'house',
  );
  const [salePrice, setSalePrice] = useCalculatorState('broker-fee:salePrice', 500_000_000);
  const [deposit, setDeposit] = useCalculatorState('broker-fee:deposit', 200_000_000);
  const [monthlyRent, setMonthlyRent] = useCalculatorState('broker-fee:monthlyRent', 3_000_000);
  const [negotiatedRateDraft, setNegotiatedRateDraft] = useCalculatorState(
    'broker-fee:negotiatedRateDraft',
    '',
  );
  const [includeVat, setIncludeVat] = useCalculatorState('broker-fee:includeVat', false);

  // Preserve the old numeric key; migrate only when no new draft has been saved.
  useEffect(() => {
    try {
      const prefix = 'calculatorhost:input:v1:broker-fee:';
      if (sessionStorage.getItem(`${prefix}negotiatedRateDraft`) !== null) return;
      const saved = sessionStorage.getItem(`${prefix}negotiatedRate`);
      if (saved === null) return;
      const legacy: unknown = JSON.parse(saved);
      if (typeof legacy === 'number' && Number.isFinite(legacy) && legacy >= 0) {
        setNegotiatedRateDraft(String(legacy * 100));
      }
    } catch {
      // Storage is optional; continue with the current draft.
    }
  }, [setNegotiatedRateDraft]);

  const rateText = negotiatedRateDraft.trim();
  const parsedRate = /^(?:\d+\.?\d*|\.\d+)$/.test(rateText) ? Number(rateText) : NaN;
  const rateError =
    rateText === ''
      ? undefined
      : !Number.isFinite(parsedRate)
        ? '협의 요율을 올바른 숫자로 입력해 주세요.'
        : parsedRate === 0
          ? '0% 협의는 이 계산기에서 지원하지 않습니다. 상한요율을 사용하려면 비워 주세요.'
          : undefined;
  const negotiatedRate = rateText !== '' && !rateError ? parsedRate / 100 : undefined;

  // 계산 실행
  const calculation = useMemo((): { result: CommissionResult | null; error?: string } => {
    if (rateError) return { result: null, error: rateError };
    try {
      return {
        result: calculateRealtyCommission({
          transactionType,
          propertyKind,
          salePrice: transactionType === 'monthly' ? undefined : salePrice,
          deposit: transactionType === 'monthly' ? deposit : undefined,
          monthlyRent: transactionType === 'monthly' ? monthlyRent : undefined,
          negotiatedRate,
          includeVat,
        }),
      };
    } catch (e) {
      return {
        result: null,
        error: e instanceof Error ? e.message : '입력 조건을 확인해 주세요.',
      };
    }
  }, [
    transactionType,
    propertyKind,
    salePrice,
    deposit,
    monthlyRent,
    negotiatedRate,
    includeVat,
    rateError,
  ]);

  const { result, error } = calculation;
  const rateLabel = result ? `상한요율 ${formatPercent(result.appliedRate)}` : undefined;

  return (
    <CalculatorWorkspace className="grid gap-6 lg:grid-cols-2" slug="broker-fee">
      <FormCard title="입력">
        {/* 거래 유형 */}
        <RadioGroup<TransactionType>
          id="transaction-type"
          label="거래 유형"
          value={transactionType}
          onChange={setTransactionType}
          options={[
            { value: 'sale', label: '매매·교환' },
            { value: 'jeonse', label: '전세' },
            { value: 'monthly', label: '월세' },
          ]}
        />

        {/* 물건 종류 */}
        <RadioGroup<PropertyKind>
          id="property-kind"
          label="물건 종류"
          value={propertyKind}
          onChange={setPropertyKind}
          options={[
            { value: 'house', label: '주택' },
            { value: 'officetel', label: '오피스텔 (주거용 85㎡ 이하)' },
            { value: 'other', label: '기타 (상가·토지·원룸)' },
          ]}
        />

        {/* 거래금액 입력, 거래 유형에 따라 노출 필드 변경 */}
        {transactionType === 'monthly' ? (
          <>
            <NumberInput
              id="deposit"
              label="보증금"
              value={deposit}
              onChange={setDeposit}
              placeholder="예: 200,000,000"
              unitButtons={PRICE_UNIT_BUTTONS}
              max={10_000_000_000}
              unit="원"
            />
            <NumberInput
              id="monthly-rent"
              label="월세"
              value={monthlyRent}
              onChange={setMonthlyRent}
              placeholder="예: 3,000,000"
              unitButtons={[
                { label: '백만', value: 1_000_000 },
                { label: '십만', value: 100_000 },
                { label: '만', value: 10_000 },
              ]}
              max={100_000_000}
              unit="원"
            />
          </>
        ) : transactionType === 'jeonse' ? (
          <NumberInput
            id="jeonse-price"
            label="전세보증금"
            value={salePrice}
            onChange={setSalePrice}
            placeholder="예: 500,000,000"
            unitButtons={PRICE_UNIT_BUTTONS}
            max={10_000_000_000}
            unit="원"
          />
        ) : (
          <NumberInput
            id="sale-price"
            label="매매가"
            value={salePrice}
            onChange={setSalePrice}
            placeholder="예: 500,000,000"
            unitButtons={PRICE_UNIT_BUTTONS}
            max={10_000_000_000}
            unit="원"
          />
        )}

        {/* 협의 요율 (선택) */}
        <div className="flex flex-col gap-2">
          <label htmlFor="negotiated-rate" className="text-sm font-medium text-text-primary">
            협의 요율 (선택)
          </label>
          <div className="relative">
            <input
              id="negotiated-rate"
              type="text"
              inputMode="decimal"
              value={negotiatedRateDraft}
              onChange={(e) => setNegotiatedRateDraft(e.target.value)}
              onBlur={() => setNegotiatedRateDraft((draft) => draft.trim())}
              placeholder="예: 0.3"
              className="min-h-12 w-full rounded-lg border border-border-base bg-bg-card py-3 pl-4 pr-10 text-right text-lg font-semibold text-text-primary placeholder:text-text-tertiary focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              aria-invalid={!!rateError}
              aria-describedby={`negotiated-rate-help${rateError ? ' negotiated-rate-error' : ''}`}
            />
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-text-secondary">
              %
            </span>
          </div>
          <p id="negotiated-rate-help" className="text-caption text-text-tertiary">
            법정 상한 이하에서 협의한 요율을 입력하세요. 공란이면 상한요율 적용.
          </p>
          {rateError ? (
            <p id="negotiated-rate-error" role="alert" className="text-sm text-danger-500">
              {rateError}
            </p>
          ) : null}
        </div>

        {/* 부가세 포함 */}
        <div className="flex items-center gap-3">
          <input
            id="include-vat"
            type="checkbox"
            checked={includeVat}
            onChange={(e) => setIncludeVat(e.target.checked)}
            className="h-5 w-5 rounded border-border-base text-primary-500 focus:ring-2 focus:ring-primary-500/30"
            aria-label="부가세(VAT 10%) 포함"
          />
          <label htmlFor="include-vat" className="text-sm font-medium text-text-primary">
            부가세 (VAT 10%) 포함
          </label>
        </div>
        <CommissionReadiness error={error} />
        {error && !rateError ? (
          <div
            data-testid="commission-conditions"
            aria-invalid="true"
            tabIndex={-1}
            className="text-sm text-danger-500"
          >
            <p role="alert">{error}</p>
          </div>
        ) : null}
      </FormCard>

      <ResultCard
        title="총 지급액"
        heroLabel="중개수수료 + 부가세"
        heroValue={result ? formatKRW(result.total) : '입력을 확인해 주세요'}
        heroNote={rateLabel}
        empty={!result}
        rows={
          result
            ? [
                {
                  label: '거래금액',
                  value: formatKRW(result.transactionAmount),
                },
                {
                  label: '적용 상한요율',
                  value: formatPercent(result.appliedRate),
                  ...(result.limit !== null && {
                    note: `한도액 ${formatKRW(result.limit)}`,
                  }),
                },
                {
                  label: '상한 중개수수료',
                  value: formatKRW(result.maxCommission),
                },
                ...(negotiatedRate !== undefined && result.negotiatedCommission !== null
                  ? [
                      {
                        label: '협의 요율 반영 수수료',
                        value: formatKRW(result.negotiatedCommission),
                      },
                    ]
                  : []),
                ...(includeVat
                  ? [
                      {
                        label: '부가세',
                        note: '(10%)',
                        value: formatKRW(result.vat),
                      },
                    ]
                  : []),
                {
                  label: '총 지급액',
                  value: formatKRW(result.total),
                  emphasize: true,
                },
                {
                  label: '양측 합계',
                  note: '(매도자+매수자 참고용)',
                  value: formatKRW(result.bothSideTotal),
                },
              ]
            : []
        }
      >
        {/* 경고 메시지 */}
        {result && result.warnings.length > 0 && (
          <div className="rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-3">
            {result.warnings.map((warning, idx) => (
              <p key={idx} className="text-sm font-medium text-highlight-500">
                주의: {warning}
              </p>
            ))}
          </div>
        )}
      </ResultCard>
      <ResultBanner />
    </CalculatorWorkspace>
  );
}
