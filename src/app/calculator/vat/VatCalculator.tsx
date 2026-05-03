'use client';

import { useMemo, useState } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { ResultCard } from '@/components/calculator/Result';
import {
  calculateVat,
  extractVatFromTotal,
  addVatToSupplyValue,
  type BusinessType,
  type SimplifiedIndustry,
} from '@/lib/tax/vat';
import { formatKRW } from '@/lib/utils';

type Mode = 'business' | 'extract' | 'add';

const INDUSTRY_LABELS: Record<SimplifiedIndustry, string> = {
  utility: '전기·가스·수도 (5%)',
  retail: '소매·음식점 (15%)',
  manufacturing: '제조·운수·금융 (20%)',
  service: '건설·임대·서비스 (30%)',
  other: '부동산매매·기타 (40%)',
};

export function VatCalculator() {
  const [mode, setMode] = useState<Mode>('business');

  // 사업자 부가세 모드
  const [businessType, setBusinessType] = useState<BusinessType>('general');
  const [salesAmount, setSalesAmount] = useState(100_000_000);
  const [purchaseAmount, setPurchaseAmount] = useState(50_000_000);
  const [industry, setIndustry] = useState<SimplifiedIndustry>('retail');

  // 환산 모드
  const [totalPrice, setTotalPrice] = useState(110_000);
  const [supplyValue, setSupplyValue] = useState(100_000);

  const businessResult = useMemo(
    () =>
      calculateVat({
        businessType,
        salesAmount,
        purchaseAmount,
        simplifiedIndustry: industry,
      }),
    [businessType, salesAmount, purchaseAmount, industry]
  );

  const extractResult = useMemo(() => extractVatFromTotal(totalPrice), [totalPrice]);
  const addResult = useMemo(() => addVatToSupplyValue(supplyValue), [supplyValue]);

  return (
    <div className="space-y-6">
      <FormCard title="계산 모드">
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              value="business"
              checked={mode === 'business'}
              onChange={() => setMode('business')}
              className="mt-1 h-4 w-4 accent-primary-500"
            />
            <span className="text-sm">
              <strong>사업자 부가세 계산</strong> — 일반/간이과세 매출세액 − 매입세액
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              value="extract"
              checked={mode === 'extract'}
              onChange={() => setMode('extract')}
              className="mt-1 h-4 w-4 accent-primary-500"
            />
            <span className="text-sm">
              <strong>VAT 포함 → 공급가액 환산</strong> — 부가세 분리
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              value="add"
              checked={mode === 'add'}
              onChange={() => setMode('add')}
              className="mt-1 h-4 w-4 accent-primary-500"
            />
            <span className="text-sm">
              <strong>공급가액 → VAT 포함 환산</strong> — 부가세 추가
            </span>
          </label>
        </div>
      </FormCard>

      {mode === 'business' && (
        <>
          <FormCard title="사업자 유형">
            <div className="flex flex-wrap gap-3">
              {(['general', 'simplified'] as const).map((opt) => (
                <label
                  key={opt}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-border-base bg-bg-raised px-4 py-2"
                >
                  <input
                    type="radio"
                    name="businessType"
                    value={opt}
                    checked={businessType === opt}
                    onChange={() => setBusinessType(opt)}
                    className="h-4 w-4 accent-primary-500"
                  />
                  <span className="text-sm font-medium">
                    {opt === 'general' ? '일반과세자' : '간이과세자'}
                  </span>
                </label>
              ))}
            </div>
            <p className="text-xs text-text-tertiary">
              일반과세자: 매출세액 − 매입세액 / 간이과세자: 매출 × 부가가치율 × 10% (연 매출 4,800만 원 미만 면제)
            </p>
          </FormCard>

          {businessType === 'simplified' && (
            <FormCard title="업종 (간이과세 부가가치율)">
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value as SimplifiedIndustry)}
                className="w-full rounded-lg border border-border-base bg-bg-card px-4 py-3 text-text-primary focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              >
                {(Object.keys(INDUSTRY_LABELS) as SimplifiedIndustry[]).map((key) => (
                  <option key={key} value={key}>
                    {INDUSTRY_LABELS[key]}
                  </option>
                ))}
              </select>
              <p className="text-xs text-text-tertiary">
                업종별 부가가치율: 부가가치세법 §63의2 / 시행령 §111
              </p>
            </FormCard>
          )}

          <FormCard title="매출·매입 입력">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <NumberInput
                id="sales"
                label="연 매출액 (공급가액)"
                value={salesAmount}
                onChange={setSalesAmount}
                unit="원"
                unitButtons={[
                  { label: '1억', value: 100_000_000 },
                  { label: '천만', value: 10_000_000 },
                  { label: '백만', value: 1_000_000 },
                ]}
                helpText="VAT 미포함 공급가액 기준"
              />
              <NumberInput
                id="purchase"
                label="연 매입액 (공급가액)"
                value={purchaseAmount}
                onChange={setPurchaseAmount}
                unit="원"
                unitButtons={[
                  { label: '천만', value: 10_000_000 },
                  { label: '백만', value: 1_000_000 },
                ]}
                helpText={businessType === 'general' ? '매입세액공제 대상' : '간이과세자는 부분 공제'}
              />
            </div>
          </FormCard>

          {businessResult.warnings.length > 0 && (
            <div className="rounded-lg border-l-4 border-danger-500 bg-danger-50 p-4 dark:border-danger-400 dark:bg-red-950 dark:bg-opacity-20">
              <h3 className="mb-2 font-semibold text-danger-700 dark:text-danger-200">
                ⚠ 주의사항
              </h3>
              <ul className="space-y-1 text-sm text-danger-700 dark:text-danger-300">
                {businessResult.warnings.map((w, i) => (
                  <li key={i}>• {w}</li>
                ))}
              </ul>
            </div>
          )}

          <ResultCard
            title="부가세 산출 결과"
            heroLabel={businessResult.isRefund ? '환급세액' : businessResult.isExempt ? '면세 (납부 0)' : '납부할 부가세'}
            heroValue={
              businessResult.isExempt
                ? '0원 (면세)'
                : `${Math.abs(businessResult.payableVat).toLocaleString()}원${businessResult.isRefund ? ' 환급' : ''}`
            }
            heroNote={businessResult.formula}
            rows={[
              {
                label: '매출세액 (매출 × 10%)',
                value: formatKRW(businessResult.outputVat),
                emphasize: false,
              },
              {
                label: '매입세액공제',
                value: `− ${formatKRW(businessResult.inputVatDeduction)}`,
                note: businessType === 'simplified' ? `부가가치율 ${businessResult.valueAddedRate}% 적용` : undefined,
                emphasize: false,
              },
              {
                label: businessResult.isRefund ? '환급세액' : '납부세액',
                value: `${businessResult.isRefund ? '+' : ''}${Math.abs(businessResult.payableVat).toLocaleString()}원`,
                emphasize: true,
              },
            ]}
          />
        </>
      )}

      {mode === 'extract' && (
        <>
          <FormCard title="VAT 포함 가격 입력">
            <NumberInput
              id="totalPrice"
              label="VAT 포함 총 가격"
              value={totalPrice}
              onChange={setTotalPrice}
              unit="원"
              unitButtons={[
                { label: '110,000', value: 110_000 },
                { label: '1,100,000', value: 1_100_000 },
                { label: '11,000,000', value: 11_000_000 },
              ]}
              helpText="영수증·세금계산서의 합계 금액"
            />
          </FormCard>

          <ResultCard
            title="VAT 분리 결과"
            heroLabel="공급가액 (VAT 제외)"
            heroValue={`${extractResult.supplyValue.toLocaleString()}원`}
            heroNote={`총 가격 ${totalPrice.toLocaleString()}원에서 부가세 10% 제외`}
            rows={[
              {
                label: '총 가격 (VAT 포함)',
                value: formatKRW(totalPrice),
                emphasize: false,
              },
              {
                label: '부가세 (VAT 10%)',
                value: formatKRW(extractResult.vat),
                emphasize: false,
              },
              {
                label: '공급가액 (VAT 제외)',
                value: formatKRW(extractResult.supplyValue),
                emphasize: true,
              },
            ]}
          />
        </>
      )}

      {mode === 'add' && (
        <>
          <FormCard title="공급가액 입력">
            <NumberInput
              id="supplyValue"
              label="공급가액 (VAT 제외)"
              value={supplyValue}
              onChange={setSupplyValue}
              unit="원"
              unitButtons={[
                { label: '100,000', value: 100_000 },
                { label: '1,000,000', value: 1_000_000 },
                { label: '10,000,000', value: 10_000_000 },
              ]}
              helpText="견적서·세금계산서의 공급가액"
            />
          </FormCard>

          <ResultCard
            title="VAT 추가 결과"
            heroLabel="총 청구 가격 (VAT 포함)"
            heroValue={`${addResult.totalPrice.toLocaleString()}원`}
            heroNote={`공급가액 ${supplyValue.toLocaleString()}원 + 부가세 ${addResult.vat.toLocaleString()}원`}
            rows={[
              {
                label: '공급가액 (VAT 제외)',
                value: formatKRW(supplyValue),
                emphasize: false,
              },
              {
                label: '부가세 (VAT 10%)',
                value: formatKRW(addResult.vat),
                emphasize: false,
              },
              {
                label: '총 가격 (VAT 포함)',
                value: formatKRW(addResult.totalPrice),
                emphasize: true,
              },
            ]}
          />
        </>
      )}

      <div className="rounded-lg border border-border-base p-4 bg-bg-raised">
        <h3 className="mb-2 font-semibold">💡 사용 안내</h3>
        <p className="text-xs text-text-secondary">
          본 계산기는 <strong>표준 부가세율 10%</strong>를 적용합니다 (한국 부가가치세법 기준).
          영세율(0%) 또는 면세 항목은 별도 처리되며, 정확한 신고는 홈택스 또는 세무사 상담을 권장합니다.
          간이과세자 부가가치율은 <strong>부가가치세법 §63의2</strong>에 따라 업종별로 달라집니다.
        </p>
      </div>
    </div>
  );
}
