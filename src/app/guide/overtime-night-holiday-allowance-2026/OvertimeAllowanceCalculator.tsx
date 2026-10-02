'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  CalculatorWorkspace,
  useCalculatorWorkspace,
} from '@/components/calculator/CalculatorWorkspace';
import { CalculatorDetails } from '@/components/calculator/CalculatorDetails';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard, ResultRow } from '@/components/calculator/Result';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';
import { trackNextCalculator } from '@/lib/analytics/calculator-events';
import {
  calculateOvertimeAllowance,
  type AllowanceMode,
} from '@/lib/work/overtime-allowance';

const GUIDE_SLUG = 'overtime-night-holiday-allowance-2026';
const formatWon = (value: number) =>
  `${value.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}원`;

function AllowanceReadiness({ error }: { error?: string }) {
  const reportValidity = useCalculatorWorkspace()?.reportValidity;
  useEffect(() => {
    reportValidity?.('overtime-allowance:conditions', error);
    return () => reportValidity?.('overtime-allowance:conditions');
  }, [error, reportValidity]);
  if (!error) return null;
  return (
    <div
      data-testid="allowance-conditions"
      aria-invalid="true"
      tabIndex={-1}
      className="rounded-xl border border-border-base bg-bg-base p-4 text-sm text-text-primary focus-visible:ring-2 focus-visible:ring-primary-500"
    >
      <strong>입력 확인 필요</strong>
      <p role="alert" className="mt-1">{error}</p>
    </div>
  );
}

export function OvertimeAllowanceCalculator() {
  const [mode, setMode] = useCalculatorState<AllowanceMode>('overtime-allowance:mode', 'overtime');
  const [hourlyWage, setHourlyWage] = useCalculatorState('overtime-allowance:hourlyWage', 12_000);
  const [totalHours, setTotalHours] = useCalculatorState('overtime-allowance:totalHours', 3);
  const [nightHours, setNightHours] = useCalculatorState('overtime-allowance:nightHours', 0);
  const { result, error } = useMemo(() => {
    try {
      return {
        result: calculateOvertimeAllowance({ mode, hourlyWage, totalHours, nightHours }),
        error: undefined,
      };
    } catch (cause) {
      return {
        result: null,
        error: cause instanceof Error ? cause.message : '근로 유형과 입력값을 확인해 주세요.',
      };
    }
  }, [mode, hourlyWage, totalHours, nightHours]);
  const isScheduledNight = mode === 'scheduledNight';
  const modeLabel =
    mode === 'overtime' ? '연장근로' : mode === 'holiday' ? '휴일근로' : '소정근로 중 야간';
  const scopeNote = isScheduledNight
    ? '한 근무일 · 소정근로 중 야간 추가 가산분만 계산 · 이미 지급되는 기본임금 제외 · 표시용 원 단위 반올림'
    : '한 근무일 · 해당 근로분과 가산분의 세전 참고액 · 별도 유급휴일 임금·기지급액·공제 제외 · 표시용 원 단위 반올림';

  return (
    <CalculatorWorkspace slug={GUIDE_SLUG} className="grid gap-6 lg:grid-cols-2">
      <FormCard title="수당 계산에 필요한 값">
        <RadioGroup<AllowanceMode>
          id="allowance-mode"
          label="근로 유형"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'overtime', label: '비휴일 연장' },
            { value: 'holiday', label: '휴일' },
            { value: 'scheduledNight', label: '소정 야간' },
          ]}
        />
        <p className="text-sm text-text-secondary">
          성인 일반근로 · 제56조 적용 사업장 · 휴게 제외.
          휴일은 하루만 입력하세요. 여러 날을 합산하지 않습니다.
        </p>
        <NumberInput
          id="allowance-hourly-wage"
          label="확인한 통상시급"
          value={hourlyWage}
          onChange={setHourlyWage}
          min={0}
          max={1_000_000}
          integer
          debounceMs={0}
          unit="원"
          helpText="별도로 확인한 통상시급을 원 단위 정수로 입력하세요."
        />
        <NumberInput
          id="allowance-total-hours"
          label="실제 근로시간 (휴게시간 제외)"
          value={totalHours}
          onChange={setTotalHours}
          min={0}
          max={isScheduledNight ? 8 : 24}
          debounceMs={0}
          unit="시간"
          helpText={
            mode === 'overtime'
              ? '비휴일의 연장으로 확인한 시간만 입력하세요. 소수 둘째 자리까지 지원합니다.'
              : mode === 'holiday'
                ? '같은 휴일 하루의 실제 시간입니다. 소수 둘째 자리까지 지원합니다.'
                : '소정근로 최대 8시간만 지원합니다. 연장·휴일근로는 제외하세요.'
          }
        />
        <NumberInput
          id="allowance-night-hours"
          label="그중 야간근로 시간 (22~06시)"
          value={nightHours}
          onChange={setNightHours}
          min={0}
          max={Math.min(totalHours, 8)}
          debounceMs={0}
          unit="시간"
          helpText="총 근로시간 이내·최대 8시간. 야간이 없으면 0입니다."
        />
        {isScheduledNight ? (
          <p className="rounded-xl bg-primary-50 p-3 text-sm text-text-primary dark:bg-primary-900/30">
            소정 야간근로는 야간 추가 가산분 0.5배만 계산합니다. 소정근로의 기본임금은 이미
            지급되는 것으로 보고 여기서 다시 더하지 않습니다.
          </p>
        ) : null}
        <p className="text-xs text-text-secondary">
          사업장 적용·통상시급·근로시간의 적법성은 별도로 확인하세요.
        </p>
        <AllowanceReadiness error={error} />
      </FormCard>
      <ResultCard
        title={error ? '입력 확인 필요' : `${modeLabel} 수당 참고 계산`}
        heroLabel={isScheduledNight ? '세전 야간 추가 가산분' : '세전 수당 참고 금액'}
        heroValue={result ? formatWon(result.totalPay) : '입력값을 확인해 주세요'}
        heroNote={scopeNote}
        empty={!result}
        rows={
          result
            ? [
                {
                  label: isScheduledNight ? '이 계산에 더한 기본임금' : '해당 근로분 임금',
                  value: formatWon(result.workPay),
                  note: isScheduledNight ? '이미 지급되는 소정근로 기본임금을 제외해 0원입니다.' : undefined,
                },
                { label: '가산분 합계', value: formatWon(result.premiumPay) },
              ]
            : []
        }
        visibleRowCount={2}
        nextStep={
          <aside aria-label="다음 계산" className="card">
            <h3 className="text-base font-semibold text-text-primary">월 실수령액도 확인하기</h3>
            <p className="mt-2 text-sm text-text-secondary">
              참고 금액을 그대로 넘기지 않습니다. 실제 월 급여와 과세·비과세 항목을 확인한 뒤
              연봉 계산기에 직접 입력하세요.
            </p>
            <Link
              href="/calculator/salary/"
              onClick={() => trackNextCalculator(GUIDE_SLUG, 'salary')}
              className="mt-3 inline-flex min-h-12 items-center rounded-xl border border-border-base px-4 py-3 text-sm font-semibold text-primary-700 hover:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-primary-300"
            >
              월 실수령액 계산하기
            </Link>
          </aside>
        }
      >
        <CalculatorDetails title="계산 기준">
          {result ? (
            <div aria-label="가산분 상세">
              <ResultRow label="연장 가산분" value={formatWon(result.overtimePremium)} />
              <ResultRow label="휴일 가산분" value={formatWon(result.holidayPremium)} />
              <ResultRow label="야간 가산분" value={formatWon(result.nightPremium)} />
            </div>
          ) : null}
          <p className="text-sm text-text-secondary">
            연장근로는 확인된 연장 시간의 근로분과 연장 가산분을 계산합니다. 휴일근로는 한
            근무일의 8시간 이내·초과 구간을 나누며 연장 가산을 다시 중복해서 더하지 않습니다.
            그 시간에 야간근로가 포함되면 야간 가산분을 함께 계산합니다.
          </p>
          <p className="text-sm text-text-secondary">
            소정근로 중 야간 모드는 기본임금을 제외한 야간 추가 가산분만 계산합니다. 별도
            유급휴일 임금·이미 받은 금액·계약상 추가 지급·세금과 보험료 공제는 반영하지 않습니다.
          </p>
          <p className="text-xs text-text-secondary">
            24시간과 시급 100만 원은 입력 지원 범위이며 법정 허용 한도가 아닙니다.
            화면의 원 단위 반올림은 읽기 위한 표시이며 법정 정산의 반올림·절사 규칙을 뜻하지
            않습니다. 각 항목의 표시 합계와 총액은 표시용 반올림으로 차이가 날 수 있습니다.
          </p>
        </CalculatorDetails>
      </ResultCard>
    </CalculatorWorkspace>
  );
}
