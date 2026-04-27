'use client';

/**
 * 자동차세 계산기 (MVP Phase 2 #4)
 *
 * 명세: docs/calculator-spec/자동차세.md
 * 공식: src/lib/tax/vehicle.ts
 *
 * 기능:
 * - 차량 용도 (MVP: 비영업용 승용만)
 * - 배기량(cc) 입력
 * - 차령(연수) 입력
 * - 연납 할인 선택
 * - 자동차세·지방교육세·연납 할인 결과
 */

import { useMemo, useState } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard, type ResultRowProps } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import { calculateVehicleTax, type VehicleUsage } from '@/lib/tax/vehicle';

export function VehicleTaxCalculator() {
  const [usage, setUsage] = useState<VehicleUsage>('passengerNonBusiness');
  const [engineCc, setEngineCc] = useState<number>(1998);
  const [vehicleAgeYears, setVehicleAgeYears] = useState<number>(0);
  const [includeAnnualDiscount, setIncludeAnnualDiscount] = useState<boolean>(false);

  // 즉시 계산 (useMemo)
  const result = useMemo(() => {
    return calculateVehicleTax({
      usage,
      engineCc,
      vehicleAgeYears,
      includeAnnualDiscount,
    });
  }, [usage, engineCc, vehicleAgeYears, includeAnnualDiscount]);

  // 결과 카드 행 구성
  const resultRows: ResultRowProps[] = useMemo(() => {
    const rows: ResultRowProps[] = [];

    if (result.warnings.length === 0 && result.totalAnnual > 0) {
      // 기본 자동차세
      rows.push({
        label: '기본 자동차세',
        value: `${result.grossVehicleTax.toLocaleString()}원`,
        note: `${engineCc.toLocaleString()}cc × ${result.baseRate}원/cc`,
      });

      // 차령경감 (있으면)
      if (result.reductionRate > 0) {
        rows.push({
          label: `차령경감 (${vehicleAgeYears}년 기준)`,
          value: `-${result.reductionAmount.toLocaleString()}원`,
          note: `${(result.reductionRate * 100).toFixed(0)}% 경감`,
        });

        rows.push({
          label: '경감 후 자동차세',
          value: `${result.vehicleTaxAfterReduction.toLocaleString()}원`,
          emphasize: false,
        });
      }

      // 지방교육세
      rows.push({
        label: '지방교육세',
        value: `${result.localEducationTax.toLocaleString()}원`,
        note: `자동차세 × 30%`,
      });

      // 연간 총액
      rows.push({
        label: '연간 총액',
        value: `${result.totalAnnual.toLocaleString()}원`,
        emphasize: false,
      });

      // 연납 할인 (있으면)
      if (includeAnnualDiscount && result.annualPaymentDiscount > 0) {
        rows.push({
          label: '연납 할인 (1월 납부)',
          value: `-${result.annualPaymentDiscount.toLocaleString()}원`,
          note: `6.4% 할인`,
        });

        rows.push({
          label: '최종 연납액',
          value: `${result.finalAnnualPayment.toLocaleString()}원`,
          emphasize: true,
        });
      }

      // 반기별 납부액
      rows.push({
        label: '반기별 납부액 (6월·12월)',
        value: `${result.semiAnnualPayment.toLocaleString()}원`,
        note: '연납 미사용 시',
      });
    }

    return rows;
  }, [result, engineCc, vehicleAgeYears, includeAnnualDiscount]);

  // 경고 또는 안내 섹션
  const warningOrInfoElements = useMemo(() => {
    if (result.warnings.length > 0) {
      return (
        <div className="rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-4">
          <p className="text-sm font-medium text-text-primary">알림</p>
          <ul className="mt-2 space-y-1">
            {result.warnings.map((warn, idx) => (
              <li key={idx} className="text-sm text-text-secondary">
                • {warn}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (result.totalAnnual > 0) {
      return (
        <div className="rounded-lg border border-border-base bg-bg-card p-4">
          <p className="text-sm font-medium text-text-primary mb-2">납부 일정</p>
          <p className="text-sm text-text-secondary">
            일반: 6월(상반기), 12월(하반기) 분할 납부. 연납(1월): 6.4% 할인 가능.
          </p>
        </div>
      );
    }

    return null;
  }, [result.warnings, result.totalAnnual]);

  const hasValidResult = result.warnings.length === 0 && result.totalAnnual > 0;

  // Hero 값 결정: 연납 할인 체크 시 finalAnnualPayment, 아니면 totalAnnual
  const heroValue = includeAnnualDiscount ? result.finalAnnualPayment : result.totalAnnual;
  const heroLabel = includeAnnualDiscount ? '최종 연납액' : '연간 총액';

  return (
    <div className="flex flex-col gap-6">
      {/* 기본 입력 폼 */}
      <FormCard title="자동차 정보 입력">
        <div className="flex flex-col gap-5">
          {/* 차량 용도 */}
          <RadioGroup<VehicleUsage>
            id="vehicle-usage"
            label="차량 용도"
            value={usage}
            onChange={setUsage}
            options={[
              { value: 'passengerNonBusiness', label: '비영업용 승용 (MVP 지원)' },
            ]}
          />
          <p className="text-xs text-text-secondary">
            영업용·승합·화물 차량은 세무 전문가 상담이 필요합니다.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* 배기량 */}
            <NumberInput
              id="vehicle-engine-cc"
              label="배기량"
              value={engineCc}
              onChange={setEngineCc}
              placeholder="1998"
              unit="cc"
              min={0}
              max={5000}
              helpText="엔진 배기량을 입력하세요"
            />

            {/* 차령(연수) */}
            <NumberInput
              id="vehicle-age-years"
              label="차령(년)"
              value={vehicleAgeYears}
              onChange={setVehicleAgeYears}
              placeholder="0"
              unit="년"
              min={0}
              max={30}
              helpText="현재 연도 - 등록 연도 = 경과 연수"
            />
          </div>

          {/* 연납 할인 체크박스 */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeAnnualDiscount}
                onChange={(e) => setIncludeAnnualDiscount(e.target.checked)}
                className="w-4 h-4 rounded border-2 border-border-base checked:bg-primary-500 checked:border-primary-500"
              />
              <span className="text-sm font-medium text-text-primary">
                연납 할인 적용 (1월 일괄 납부)
              </span>
            </label>
            <span className="text-xs text-text-secondary">약 6.4% 할인</span>
          </div>
        </div>
      </FormCard>

      {/* 결과 카드 */}
      {hasValidResult ? (
        <ResultCard
          title="계산 결과"
          heroLabel={heroLabel}
          heroValue={`${heroValue.toLocaleString()}원`}
          rows={resultRows}
        >
          {warningOrInfoElements}
        </ResultCard>
      ) : (
        <div className="rounded-lg border border-border-base bg-bg-card p-6 text-center">
          <p className="text-text-secondary">
            배기량과 차령을 입력하면 자동차세가 자동 계산됩니다.
          </p>
        <ResultBanner />
        </div>
      )}
    </div>
  );
}
