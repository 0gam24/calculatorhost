'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCalculatorState } from './useCalculatorState';
import { trackNextCalculator } from '@/lib/analytics/calculator-events';
import { formatKRW } from '@/lib/utils';

const NEXT: Record<string, { to: string; label: string; reason: string }> = {
  'acquisition-tax': {
    to: 'broker-fee',
    label: '중개보수 확인하기',
    reason: '집을 구할 때 필요한 다른 비용도 살펴보세요.',
  },
  area: {
    to: 'acquisition-tax',
    label: '취득 비용 알아보기',
    reason: '주택 매매를 계획한다면 가격과 전용면적을 별도로 확인해 취득세를 계산해 보세요.',
  },
  'averaging-down': {
    to: 'split-buy',
    label: '분할 매수 계산하기',
    reason: '매수 차수별 가격과 수량을 비교해 보세요.',
  },
  bmi: {
    to: 'd-day',
    label: '목표일까지 남은 날짜',
    reason: '원하는 목표일을 직접 정해 기간을 확인하세요.',
  },
  'broker-fee': {
    to: 'acquisition-tax',
    label: '취득세 계산하기',
    reason: '매매 계획이라면 세금도 함께 확인하세요.',
  },
  'capital-gains-tax': {
    to: 'acquisition-tax',
    label: '다음 주택 취득세 확인',
    reason: '다음 집을 구할 때 드는 비용을 살펴보세요.',
  },
  'child-tax-credit': {
    to: 'salary',
    label: '월 실수령액 확인하기',
    reason: '가족 조건을 확인한 뒤 월 소득을 살펴보세요.',
  },
  'comprehensive-property-tax': {
    to: 'property-tax',
    label: '재산세 함께 확인하기',
    reason: '보유 비용을 더 넓게 살펴보세요.',
  },
  'd-day': {
    to: 'savings',
    label: '목표일까지 저축 계획',
    reason: '매달 저축할 금액과 기간을 직접 정해 보세요.',
  },
  deposit: {
    to: 'savings',
    label: '매달 모으는 적금 계산',
    reason: '목돈 예치와 매달 저축을 비교하려면 월 저축액을 직접 정해 적금도 계산해 보세요.',
  },
  dti: {
    to: 'loan-limit',
    label: 'DSR·LTV 한도도 확인',
    reason: '대출 심사에는 DTI 외의 기준도 적용될 수 있습니다.',
  },
  exchange: {
    to: 'savings',
    label: '목표 금액 저축 계획',
    reason: '월 납입금을 직접 정해 목표 금액을 살펴보세요.',
  },
  'freelancer-tax': {
    to: 'n-jobber-insurance',
    label: '겸업 건강보험료 확인',
    reason: '직장과 부업을 함께 한다면 추가 부담을 확인하세요.',
  },
  'gift-tax': {
    to: 'acquisition-tax',
    label: '부동산 취득 비용 확인',
    reason: '부동산을 받는 경우 취득세도 별도로 검토하세요.',
  },
  'housing-subscription': {
    to: 'loan-limit',
    label: '주택 자금 계획하기',
    reason: '소득과 주택 가격으로 대출 한도를 살펴보세요.',
  },
  inflation: {
    to: 'retirement',
    label: '은퇴 생활비 계획하기',
    reason: '물가와 지출을 반영한 장기 계획을 세워 보세요.',
  },
  'inheritance-tax': {
    to: 'acquisition-tax',
    label: '부동산 취득세 확인',
    reason: '상속받는 부동산이 있다면 취득세도 살펴보세요.',
  },
  loan: {
    to: 'dti',
    label: '내 소득 대비 상환 부담',
    reason: '연간 상환액을 직접 입력해 소득 대비 부담을 확인하세요.',
  },
  'loan-limit': {
    to: 'loan',
    label: '대출 월 상환액 계산',
    reason: '원하는 대출액과 실제 금리로 상환 계획을 확인하세요.',
  },
  'n-jobber-insurance': {
    to: 'freelancer-tax',
    label: '부업 세금도 확인하기',
    reason: '보험료 다음으로 소득세 부담을 살펴보세요.',
  },
  'property-tax': {
    to: 'comprehensive-property-tax',
    label: '종부세 함께 확인하기',
    reason: '주택 공시가격 합계와 보유 조건을 살펴보세요.',
  },
  'rent-conversion': {
    to: 'broker-fee',
    label: '임대차 중개보수 확인',
    reason: '보증금과 월세 조건에 따른 거래 비용을 확인하세요.',
  },
  'rental-yield': {
    to: 'loan',
    label: '월 대출 상환액 확인',
    reason: '임대 수입과 별도로 상환할 금액을 확인하세요.',
  },
  retirement: {
    to: 'savings',
    label: '월 저축 계획 구체화',
    reason: '저축액과 기간을 직접 정해 만기액을 계산하세요.',
  },
  salary: {
    to: 'savings',
    label: '적금 만기액 계산하기',
    reason: '생활비를 고려해 매달 저축할 금액을 직접 정하세요.',
  },
  savings: {
    to: 'deposit',
    label: '만기 후 예금 이자 확인',
    reason: '모은 목돈의 예치 기간과 금리를 직접 정해 보세요.',
  },
  severance: {
    to: 'deposit',
    label: '퇴직금 예금 계획하기',
    reason: '실제 퇴직금 지급액을 확인한 뒤 생활비를 남겨 두고 예치할 금액을 직접 정하세요.',
  },
  'split-buy': {
    to: 'averaging-down',
    label: '추가 매수 평균단가 확인',
    reason: '보유분과 추가 매수의 평균 가격을 계산하세요.',
  },
  'split-sell': {
    to: 'split-buy',
    label: '분할 매수도 비교하기',
    reason: '매수와 매도 계획을 독립적으로 검토하세요.',
  },
  vat: {
    to: 'freelancer-tax',
    label: '소득세 예상액 살펴보기',
    reason: '부가세와 별도로 소득세를 확인하세요.',
  },
  'vehicle-tax': {
    to: 'savings',
    label: '차량 비용 저축 계획',
    reason: '매달 준비할 금액을 직접 정해 보세요.',
  },
};

export function NextCalculation({ from, monthlyNet }: { from: string; monthlyNet?: number }) {
  const next = NEXT[from];
  const router = useRouter();
  const [saving, setSaving] = useCalculatorState('salary:chosenMonthlySaving', 0);
  const [savingDraft, setSavingDraft] = useState('0');
  const [error, setError] = useState('');
  useEffect(() => {
    setSavingDraft(String(saving));
  }, [saving]);
  if (!next) return null;
  const isSalaryFlow = from === 'salary' && monthlyNet !== undefined;
  const proceed = () => {
    const chosen = Number(savingDraft.replaceAll(',', ''));
    if (
      !/^\d+$/.test(savingDraft.replaceAll(',', '')) ||
      !Number.isFinite(chosen) ||
      chosen <= 0 ||
      chosen > 10_000_000
    ) {
      setError('월 저축액을 1원 이상 1,000만원 이하로 입력해 주세요.');
      return;
    }
    try {
      sessionStorage.setItem(
        'calculatorhost:handoff:v1:savings',
        JSON.stringify({ monthlyDeposit: chosen, createdAt: Date.now() }),
      );
    } catch {
      setError('이 브라우저에서는 값 전달이 제한됩니다. 적금 계산기에서 직접 입력해 주세요.');
      return;
    }
    trackNextCalculator(from, next.to);
    router.push(`/calculator/${next.to}`);
  };
  return (
    <aside
      data-next-calculation
      className="rounded-xl border border-border-base bg-bg-card p-4 sm:p-5"
      aria-label="다음 계산"
    >
      <h3 className="text-base font-semibold text-text-primary">다음으로 해볼 계산</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-primary">{next.reason}</p>
      {isSalaryFlow ? (
        <>
          <p className="mt-2 text-xs leading-relaxed text-text-secondary">
            월 실수령액 {formatKRW(monthlyNet, { truncateTen: false })}에서 생활비와 다른 지출을
            고려하세요. 실수령액 전체를 저축액으로 사용하지 않습니다.
          </p>
          <label htmlFor="chosen-monthly-saving" className="mt-4 block text-sm font-medium">
            내가 정한 월 저축액 (원)
          </label>
          <input
            id="chosen-monthly-saving"
            type="text"
            inputMode="numeric"
            value={savingDraft}
            onChange={(event) => {
              const raw = event.target.value.replaceAll(',', '');
              setSavingDraft(raw);
              if (/^\d+$/.test(raw)) {
                setSaving(Number(raw));
                setError('');
              } else
                setError(
                  raw === '' ? '저축할 금액을 입력해 주세요.' : '원 단위 정수로 입력해 주세요.',
                );
            }}
            aria-invalid={!!error}
            aria-describedby={error ? 'chosen-monthly-saving-error' : undefined}
            className="mt-2 min-h-12 w-full rounded-xl border border-border-base bg-bg-card px-4 py-3 text-right text-base font-semibold tabular-nums focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          />
          {error ? (
            <p
              id="chosen-monthly-saving-error"
              role="alert"
              className="mt-2 text-sm text-danger-500"
            >
              {error}
            </p>
          ) : null}
          <button
            type="button"
            onClick={proceed}
            className="mt-3 min-h-12 w-full rounded-lg border border-primary-500 px-3 py-3 text-sm font-semibold text-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:text-primary-300"
          >
            이 저축액으로 적금 계산 →
          </button>
          <p className="mt-2 text-xs text-text-secondary">
            버튼을 누를 때 저축액 하나만 현재 탭 안에서 전달합니다.
          </p>
        </>
      ) : (
        <Link
          href={`/calculator/${next.to}`}
          onClick={() => trackNextCalculator(from, next.to)}
          className="mt-3 inline-flex min-h-12 items-center text-sm font-semibold text-primary-700 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:text-primary-300"
        >
          {next.label} →
        </Link>
      )}
    </aside>
  );
}
