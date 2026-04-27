'use client';

/**
 * 대출이자 계산기 (MVP #3)
 *
 * 명세: docs/calculator-spec/대출이자.md
 * 공식: src/lib/finance/loan.ts
 */

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import {
  calculateLoan,
  type RepaymentType,
  type TermUnit,
} from '@/lib/finance/loan';
import { formatKRW, formatPercent } from '@/lib/utils';

// Recharts 차트 컴포넌트 동적 import (번들 분리)
const LoanChart = dynamic(() => import('./LoanChart'), {
  ssr: false,
  loading: () => <div className="h-80 animate-pulse bg-bg-card rounded-lg" />,
});

const PRINCIPAL_UNIT_BUTTONS = [
  { label: '1억', value: 100_000_000 },
  { label: '천만', value: 10_000_000 },
  { label: '백만', value: 1_000_000 },
  { label: '십만', value: 100_000 },
];

interface ScheduleDisplayRow {
  month: number;
  principalPayment: string;
  interestPayment: string;
  totalPayment: string;
  balance: string;
}

interface RepaymentLabel {
  type: RepaymentType;
  label: string;
  subtitle: string;
}

interface DisplayRowsWithGap {
  hasGap: boolean;
  rows?: ScheduleDisplayRow[];
  first12?: ScheduleDisplayRow[];
  last12?: ScheduleDisplayRow[];
}

const REPAYMENT_LABELS: RepaymentLabel[] = [
  {
    type: 'amortization',
    label: '원리금균등',
    subtitle: '월 상환액 고정, 초기 이자 높음',
  },
  {
    type: 'principal-equal',
    label: '원금균등',
    subtitle: '월 상환액 점감, 초기 부담 높음',
  },
  {
    type: 'bullet',
    label: '만기일시',
    subtitle: '월 이자만, 만기에 원금',
  },
];

export function LoanCalculator() {
  const [principal, setPrincipal] = useState(100_000_000); // 1억
  const [annualRate, setAnnualRate] = useState(4.0);
  const [term, setTerm] = useState(30);
  const [termUnit, setTermUnit] = useState<TermUnit>('years');
  const [repayment, setRepayment] = useState<RepaymentType>('amortization');
  const [graceMonths, setGraceMonths] = useState(0);
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  const result = useMemo(() => {
    if (principal <= 0 || term <= 0 || annualRate < 0) {
      return null;
    }
    try {
      return calculateLoan({
        principal,
        annualRate,
        term,
        termUnit,
        repayment,
        graceMonths,
      });
    } catch {
      return null;
    }
  }, [principal, annualRate, term, termUnit, repayment, graceMonths]);

  // 상환 방식 라벨
  const repaymentLabel =
    REPAYMENT_LABELS.find((l) => l.type === repayment)?.label || '원리금균등';
  const repaymentSubtitle =
    REPAYMENT_LABELS.find((l) => l.type === repayment)?.subtitle || '';

  // 월 상환액 표시 (원금균등의 경우 범위, 나머지는 단일값)
  let monthlyPaymentDisplay = '';
  if (!result) {
    monthlyPaymentDisplay = '계산하려면 값을 입력해 주세요';
  } else if (repayment === 'principal-equal') {
    monthlyPaymentDisplay = `${formatKRW(result.firstMonthPayment)} ~ ${formatKRW(result.lastMonthPayment)}`;
  } else if (repayment === 'bullet') {
    monthlyPaymentDisplay = `${formatKRW(result.firstMonthPayment)} (월 이자)`;
  } else {
    monthlyPaymentDisplay = formatKRW(result.firstMonthPayment);
  }

  // 상환 스케줄 표시용 (처음 12개월 + 마지막 12개월, 또는 전체 24개월 이하)
  const scheduleDisplayRows: ScheduleDisplayRow[] = useMemo(() => {
    if (!result) return [];
    const schedule = result.schedule;
    let toDisplay = schedule;
    if (schedule.length > 24) {
      const first12 = schedule.slice(0, 12);
      const last12 = schedule.slice(-12);
      // 단순 배열로 병합하되, 나중에 렌더링 시에 생략 처리
      toDisplay = [...first12, ...last12];
    }
    return toDisplay.map((row) => ({
      month: row.month,
      principalPayment: formatKRW(row.principal),
      interestPayment: formatKRW(row.interest),
      totalPayment: formatKRW(row.totalPayment),
      balance: formatKRW(row.balance),
    }));
  }, [result]);

  // 차트 데이터 (모든 스케줄 사용)
  const chartData = useMemo(() => {
    if (!result) return [];
    return result.schedule.map((row) => ({
      month: row.month,
      balance: row.balance,
    }));
  }, [result]);

  // 표시할 스케줄 행 분리 (처음 12개월, 생략 표시, 마지막 12개월)
  const displayRowsWithGap: DisplayRowsWithGap = useMemo(
    () => {
      if (!result) {
        return { hasGap: false, rows: [] };
      }
      const schedule = result.schedule;
      if (schedule.length <= 24) {
        return { hasGap: false, rows: scheduleDisplayRows };
      }
      // scheduleDisplayRows는 first12 + last12이므로
      const first12 = scheduleDisplayRows.slice(0, 12);
      const last12 = scheduleDisplayRows.slice(12);
      return { hasGap: true, first12, last12 };
    },
    [result, scheduleDisplayRows]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <FormCard title="입력">
        <NumberInput
          id="principal"
          label="대출 금액"
          value={principal}
          onChange={setPrincipal}
          placeholder="예: 100,000,000"
          unitButtons={PRINCIPAL_UNIT_BUTTONS}
          max={10_000_000_000}
        />

        <NumberInput
          id="annual-rate"
          label="연 이자율 (%)"
          value={annualRate}
          onChange={setAnnualRate}
          placeholder="예: 4.5"
          min={0}
          max={20}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-text-primary">대출 기간</label>
          <div className="flex gap-2">
            <NumberInput
              id="term"
              label=""
              value={term}
              onChange={setTerm}
              placeholder="예: 30"
              min={1}
              max={50}
              className="flex-1"
            />
            <RadioGroup<TermUnit>
              id="term-unit"
              label=""
              value={termUnit}
              onChange={setTermUnit}
              options={[
                { value: 'years', label: '년' },
                { value: 'months', label: '개월' },
              ]}
            />
          </div>
        </div>

        <RadioGroup<RepaymentType>
          id="repayment"
          label="상환 방식"
          value={repayment}
          onChange={setRepayment}
          options={REPAYMENT_LABELS.map((l) => ({
            value: l.type,
            label: l.label,
          }))}
        />

        {repayment !== 'bullet' && (
          <NumberInput
            id="grace-months"
            label="거치 기간 (개월)"
            value={graceMonths}
            onChange={setGraceMonths}
            placeholder="기본값: 0 (거치 없음)"
            min={0}
            max={360}
            helpText="원리금균등·원금균등 선택 시에만 적용"
          />
        )}
      </FormCard>

      <ResultCard
        title="상환액 계산"
        heroLabel={`${repaymentLabel} — ${repaymentSubtitle}`}
        heroValue={monthlyPaymentDisplay}
        heroNote={result ? `연 ${formatPercent(result.monthlyRate * 12)}` : undefined}
        rows={
          result
            ? [
                {
                  label: '총 상환 기간',
                  value: `${result.totalMonths}개월`,
                },
                {
                  label: '총 이자',
                  value: formatKRW(result.totalInterest),
                },
                {
                  label: '총 상환액',
                  value: formatKRW(result.totalPayment),
                  emphasize: true,
                },
                ...(result.graceInterestTotal !== undefined && result.graceInterestTotal > 0
                  ? [
                      {
                        label: '거치 기간 이자',
                        value: formatKRW(result.graceInterestTotal),
                      },
                    ]
                  : []),
              ]
            : [
                {
                  label: '월 상환액',
                  value: '계산하려면 값을 입력해 주세요',
                },
              ]
        }
      />
        <ResultBanner />

      {result && (
        <>
          {/* 상환 스케줄 테이블 */}
          <div className="col-span-1 lg:col-span-2">
            <section aria-label="상환 스케줄" className="card">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">상환 스케줄</h3>
                {result.schedule.length > 24 && (
                  <button
                    type="button"
                    onClick={() => setShowFullSchedule(!showFullSchedule)}
                    className="text-sm text-primary-500 hover:text-primary-600"
                  >
                    {showFullSchedule ? '축약 보기' : '전체 보기'}
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="px-4 py-3 text-left font-semibold text-text-secondary">
                        개월
                      </th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold text-text-secondary tabular-nums">
                        원금
                      </th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold text-text-secondary tabular-nums">
                        이자
                      </th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold text-text-secondary tabular-nums">
                        상환액
                      </th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold text-text-secondary tabular-nums">
                        잔금
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {showFullSchedule
                      ? result.schedule.map((row, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-border-subtle last:border-0 hover:bg-bg-raised/50"
                          >
                            <td className="px-4 py-2">{row.month}</td>
                            <td className="px-4 py-2 text-right tabular-nums">
                              {formatKRW(row.principal)}
                            </td>
                            <td className="px-4 py-2 text-right tabular-nums">
                              {formatKRW(row.interest)}
                            </td>
                            <td className="px-4 py-2 text-right tabular-nums font-medium">
                              {formatKRW(row.totalPayment)}
                            </td>
                            <td className="px-4 py-2 text-right tabular-nums">
                              {formatKRW(row.balance)}
                            </td>
                          </tr>
                        ))
                      : displayRowsWithGap.hasGap
                        ? (() => {
                            const { first12, last12 } = displayRowsWithGap;
                            return (
                              <>
                                {(first12 || []).map((row: ScheduleDisplayRow, idx: number) => (
                                  <tr
                                    key={idx}
                                    className="border-b border-border-subtle hover:bg-bg-raised/50"
                                  >
                                    <td className="px-4 py-2">{row.month}</td>
                                    <td className="px-4 py-2 text-right tabular-nums">
                                      {row.principalPayment}
                                    </td>
                                    <td className="px-4 py-2 text-right tabular-nums">
                                      {row.interestPayment}
                                    </td>
                                    <td className="px-4 py-2 text-right tabular-nums font-medium">
                                      {row.totalPayment}
                                    </td>
                                    <td className="px-4 py-2 text-right tabular-nums">
                                      {row.balance}
                                    </td>
                                  </tr>
                                ))}
                                <tr>
                                  <td colSpan={5} className="px-4 py-3 text-center text-caption text-text-tertiary">
                                    · · · (총 {result.schedule.length}개월, 생략) · · ·
                                  </td>
                                </tr>
                                {(last12 || []).map((row: ScheduleDisplayRow, idx: number) => (
                                  <tr
                                    key={`last-${idx}`}
                                    className="border-b border-border-subtle last:border-0 hover:bg-bg-raised/50"
                                  >
                                    <td className="px-4 py-2">{row.month}</td>
                                    <td className="px-4 py-2 text-right tabular-nums">
                                      {row.principalPayment}
                                    </td>
                                    <td className="px-4 py-2 text-right tabular-nums">
                                      {row.interestPayment}
                                    </td>
                                    <td className="px-4 py-2 text-right tabular-nums font-medium">
                                      {row.totalPayment}
                                    </td>
                                    <td className="px-4 py-2 text-right tabular-nums">
                                      {row.balance}
                                    </td>
                                  </tr>
                                ))}
                              </>
                            );
                          })()
                        : (displayRowsWithGap.rows || []).map((row: ScheduleDisplayRow, idx: number) => (
                            <tr
                              key={idx}
                              className="border-b border-border-subtle last:border-0 hover:bg-bg-raised/50"
                            >
                              <td className="px-4 py-2">{row.month}</td>
                              <td className="px-4 py-2 text-right tabular-nums">
                                {row.principalPayment}
                              </td>
                              <td className="px-4 py-2 text-right tabular-nums">
                                {row.interestPayment}
                              </td>
                              <td className="px-4 py-2 text-right tabular-nums font-medium">
                                {row.totalPayment}
                              </td>
                              <td className="px-4 py-2 text-right tabular-nums">
                                {row.balance}
                              </td>
                            </tr>
                          ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* 잔금 추이 차트 */}
          <div className="col-span-1 lg:col-span-2">
            <section aria-label="잔금 추이 차트" className="card">
              <h3 className="mb-4 text-lg font-semibold">잔금 추이</h3>
              <div className="min-h-80 w-full">
                <LoanChart data={chartData} />
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
