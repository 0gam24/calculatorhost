'use client';

import { CalculatorWorkspace } from '@/components/calculator/CalculatorWorkspace';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';

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

import { useMemo } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard, type ResultRowProps } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import { calculateVehicleTax, type VehicleUsage } from '@/lib/tax/vehicle';
import { YEAR } from '@/lib/constants/tax-rates-2026';

export function VehicleTaxCalculator() {
  const [usage, setUsage] = useCalculatorState<VehicleUsage>(
    'vehicle-tax:usage',
    'passengerNonBusiness',
  );
  const [engineCc, setEngineCc] = useCalculatorState<number>('vehicle-tax:engineCc', 1998);
  const [vehicleAgeYears, setVehicleAgeYears] = useCalculatorState<number>(
    'vehicle-tax:vehicleAgeYears',
    0,
  );
  const [secondHalfOlder, setSecondHalfOlder] = useCalculatorState<boolean>(
    'vehicle-tax:secondHalfOlder',
    false,
  );
  const [includeAnnualDiscount, setIncludeAnnualDiscount] = useCalculatorState<boolean>(
    'vehicle-tax:includeAnnualDiscount',
    false,
  );

  // 즉시 계산 (useMemo)
  const result = useMemo(() => {
    return calculateVehicleTax({
      usage,
      engineCc,
      vehicleAgeYears,
      vehicleAgeYearsSecondHalf: vehicleAgeYears + (secondHalfOlder ? 1 : 0),
      includeAnnualDiscount,
      taxYear: YEAR,
    });
  }, [usage, engineCc, vehicleAgeYears, secondHalfOlder, includeAnnualDiscount]);

  // 결과 카드 행 구성
  const resultRows: ResultRowProps[] = useMemo(() => {
    const rows: ResultRowProps[] = [];

    if (result.warnings.length === 0 && result.totalAnnual > 0) {
      rows.push({
        label: '상반기 예상 납부액',
        value: `${result.firstHalfPayment.toLocaleString()}원`,
        note: `상반기 차령 ${vehicleAgeYears}년 · ${(result.reductionRate * 100).toFixed(0)}% 경감 · 연납 미사용 시`,
      });
      rows.push({
        label: '하반기 예상 납부액',
        value: `${result.secondHalfPayment.toLocaleString()}원`,
        note: `하반기 차령 ${vehicleAgeYears + (secondHalfOlder ? 1 : 0)}년 · ${(result.reductionRateSecondHalf * 100).toFixed(0)}% 경감 · 연납 미사용 시`,
      });

      // 기본 자동차세
      rows.push({
        label: '기본 자동차세',
        value: `${result.grossVehicleTax.toLocaleString()}원`,
        note: `${engineCc.toLocaleString()}cc × ${result.baseRate}원/cc`,
      });

      // 차령경감 (있으면)
      if (result.reductionAmount > 0) {
        rows.push({
          label: '상·하반기 차령경감 참고 합계',
          value: `-${result.reductionAmount.toLocaleString()}원`,
          note: '끝수 처리 전 참고액 · 각 반기 5% × (차령 - 2), 최대 50% · 0~2년 경감 없음',
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
        label: '연간 참고액',
        value: `${result.totalAnnual.toLocaleString()}원`,
        emphasize: false,
      });

      // 연납 할인 (있으면)
      if (includeAnnualDiscount && result.annualPaymentDiscount > 0) {
        rows.push({
          label: '연납 시 예상 감소액',
          value: `-${result.annualPaymentDiscount.toLocaleString()}원`,
          note: '2026년 1월: 334/365 × 5% ≒ 4.58% · 최종 각 세목 끝수 처리 반영',
          emphasize: true,
        });

        rows.push({
          label: '1월 연납 예상액',
          value: `${result.finalAnnualPayment.toLocaleString()}원`,
          emphasize: false,
        });
      }
    }

    return rows;
  }, [result, engineCc, vehicleAgeYears, secondHalfOlder, includeAnnualDiscount]);

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
          <p className="mb-2 text-sm font-medium text-text-primary">납부 일정</p>
          <p className="text-sm text-text-secondary">
            일반 납부는 각 반기를 따로 계산합니다. 2026년 1월 연납은 2~12월분에 법정 이자율
            5%를 적용하며 연세액 대비 약 4.58%를 공제합니다. 연간 참고액과 반기 납부액 합계는
            각 세목의 10원 미만 끝수 처리로 차이가 날 수 있습니다. 연 본세 10만 원 이하 차량의
            정기 일괄납부 특례(추가 공제·고지 일정)는 반영하지 않습니다. 실제 고지액·납부기한·횟수는
            고지서를 확인하세요.
          </p>
          {result.vehicleTaxAfterReduction <= 100_000 && (
            <p className="mt-3 rounded-lg bg-highlight-500/10 p-3 text-sm text-text-primary">
              이 차량은 연 본세가 10만 원 이하입니다. 정기 일괄납부 특례의 추가 공제와 고지
              일정은 계산에 반영하지 않았으므로 실제 고지액과 납부기한·횟수를 확인하세요.
            </p>
          )}
        </div>
      );
    }

    return null;
  }, [result.warnings, result.totalAnnual, result.vehicleTaxAfterReduction]);

  const hasValidResult = result.warnings.length === 0 && result.totalAnnual > 0;

  // Hero 값 결정: 연납 할인 체크 시 finalAnnualPayment, 아니면 totalAnnual
  const heroValue = includeAnnualDiscount ? result.finalAnnualPayment : result.totalAnnual;
  const heroLabel = includeAnnualDiscount ? '1월 연납 예상액' : '연간 예상 총액';

  return (
    <CalculatorWorkspace className="grid gap-6 lg:grid-cols-2" slug="vehicle-tax">
      <div className="min-w-0 space-y-5">
        {/* 기본 입력 폼 */}
        <FormCard title="자동차 정보 입력">
          <div className="flex flex-col gap-5">
            {/* 차량 용도 */}
            <RadioGroup<VehicleUsage>
              id="vehicle-usage"
              label="차량 용도"
              value={usage}
              onChange={setUsage}
              options={[{ value: 'passengerNonBusiness', label: '비영업용 승용' }]}
            />
            <p className="text-xs text-text-secondary">
              배기량으로 과세하는 비영업용 승용차의 일반 조건을 계산합니다. 신규 등록·말소·이전의
              일할 계산, 별도 감면·조례, 영업용·승합·화물·전기차 정액 과세 특례는 지원하지
              않습니다. 연 본세 10만 원 이하 정기 일괄납부 특례의 추가 공제·고지 일정도 반영하지
              않습니다. 실제 고지액과 납부기한·횟수는 고지서에서 확인하세요.
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
                integer
              />

              {/* 차령(연수) */}
              <NumberInput
                id="vehicle-age-years"
                label="상반기 법정 차령"
                value={vehicleAgeYears}
                onChange={setVehicleAgeYears}
                placeholder="0"
                unit="년"
                min={0}
                max={30}
                helpText="고지서 등에서 확인한 상반기 법정 차령을 입력하세요. 0~2년은 경감이 없습니다. 법정 기산일이나 등록일로 자동 추정하지 않습니다."
                integer
              />
            </div>

            <div>
              <label className="flex min-h-[48px] cursor-pointer items-center gap-3">
                <input
                  id="vehicle-second-half-older"
                  type="checkbox"
                  checked={secondHalfOlder}
                  onChange={(e) => setSecondHalfOlder(e.target.checked)}
                  aria-describedby="vehicle-second-half-help"
                  className="h-4 w-4 rounded border-2 border-border-base checked:border-primary-500 checked:bg-primary-500"
                />
                <span className="text-sm font-medium text-text-primary">
                  하반기 차령이 1년 높아요
                </span>
              </label>
              <p id="vehicle-second-half-help" className="text-xs text-text-secondary">
                법정 기산일이 7~12월인 일반 조건에서는 하반기 차령이 1년 높을 수 있습니다.
                고지서나 기산일 기준으로 두 반기의 차령을 확인한 경우에만 선택하세요.
              </p>
            </div>

            {/* 연납 할인 체크박스 */}
            <div className="flex items-center gap-3">
              <label className="flex min-h-[48px] cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeAnnualDiscount}
                  onChange={(e) => setIncludeAnnualDiscount(e.target.checked)}
                  className="h-4 w-4 rounded border-2 border-border-base checked:border-primary-500 checked:bg-primary-500"
                />
                <span className="text-sm font-medium text-text-primary">
                  연납 할인 적용 (1월 일괄 납부)
                </span>
              </label>
              <span className="text-xs text-text-secondary">2026년 약 4.58% 공제</span>
            </div>
          </div>
        </FormCard>

        {/* 결과 카드 */}
      </div>
      <div className="min-w-0 space-y-4">
        {hasValidResult ? (
          <ResultCard
            title="계산 결과"
            heroLabel={heroLabel}
            heroValue={`${heroValue.toLocaleString()}원`}
            heroNote={
              result.vehicleTaxAfterReduction <= 100_000
                ? '2026년 일반 조건 예상액 · 일할·별도 감면 제외 · 연 본세 10만 원 이하 정기 일괄납부 특례의 추가 공제·고지 일정 미반영'
                : '2026년 · 배기량 과세 비영업용 승용차의 일반 조건 · 일할 계산·별도 감면 제외'
            }
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
    </CalculatorWorkspace>
  );
}
