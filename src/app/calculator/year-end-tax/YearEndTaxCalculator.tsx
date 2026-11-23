'use client';

/**
 * 2026년 귀속 연말정산 계산기 UI.
 *
 * 계산 로직: src/lib/tax/year-end-tax.ts (순수 함수 import 전용)
 * 상수: src/lib/constants/year-end-tax-2026.ts
 */

import { useMemo } from 'react';
import { CalculatorWorkspace } from '@/components/calculator/CalculatorWorkspace';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard, type ResultRowProps } from '@/components/calculator/Result';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';
import {
  calculateYearEndTax,
  type PrePaidTaxMode,
} from '@/lib/tax/year-end-tax';

const SLUG = 'year-end-tax';
const KEY_PREFIX = 'year-end-tax';

const SALARY_UNIT_BUTTONS = [
  { label: '천만', value: 10_000_000 },
  { label: '백만', value: 1_000_000 },
  { label: '십만', value: 100_000 },
];

const SPEND_UNIT_BUTTONS = [
  { label: '백만', value: 1_000_000 },
  { label: '십만', value: 100_000 },
  { label: '만', value: 10_000 },
];

const formatWon = (value: number) => `${Math.round(value).toLocaleString('ko-KR')}원`;
const formatPercent = (rate: number) => `${(rate * 100).toFixed(1)}%`;

export function YearEndTaxCalculator() {
  const [annualGrossSalary, setAnnualGrossSalary] = useCalculatorState<number>(
    `${KEY_PREFIX}:gross`,
    50_000_000,
  );
  const [dependents, setDependents] = useCalculatorState<number>(`${KEY_PREFIX}:dependents`, 1);
  const [children, setChildren] = useCalculatorState<number>(`${KEY_PREFIX}:children`, 0);
  const [prePaidTaxMode, setPrePaidTaxMode] = useCalculatorState<PrePaidTaxMode>(
    `${KEY_PREFIX}:prePaidMode`,
    'auto',
  );
  const [manualPrePaidTotalTax, setManualPrePaidTotalTax] = useCalculatorState<number>(
    `${KEY_PREFIX}:manualPrePaid`,
    2_500_000,
  );

  // 신용카드 등 소득공제
  const [creditCardSpend, setCreditCardSpend] = useCalculatorState<number>(
    `${KEY_PREFIX}:creditCard`,
    10_000_000,
  );
  const [debitAndCashSpend, setDebitAndCashSpend] = useCalculatorState<number>(
    `${KEY_PREFIX}:debitCash`,
    10_000_000,
  );
  const [marketAndTransitSpend, setMarketAndTransitSpend] = useCalculatorState<number>(
    `${KEY_PREFIX}:marketTransit`,
    0,
  );

  // 세액공제 항목
  const [pensionSavings, setPensionSavings] = useCalculatorState<number>(
    `${KEY_PREFIX}:pensionSavings`,
    0,
  );
  const [irpContribution, setIrpContribution] = useCalculatorState<number>(
    `${KEY_PREFIX}:irp`,
    0,
  );
  const [annualRent, setAnnualRent] = useCalculatorState<number>(`${KEY_PREFIX}:rent`, 0);
  const [insurancePremium, setInsurancePremium] = useCalculatorState<number>(
    `${KEY_PREFIX}:insurance`,
    0,
  );
  const [medicalExpense, setMedicalExpense] = useCalculatorState<number>(
    `${KEY_PREFIX}:medical`,
    0,
  );
  const [educationExpense, setEducationExpense] = useCalculatorState<number>(
    `${KEY_PREFIX}:education`,
    0,
  );
  const [donationAmount, setDonationAmount] = useCalculatorState<number>(
    `${KEY_PREFIX}:donation`,
    0,
  );

  const safeDependents = Math.max(1, Math.min(20, Math.floor(dependents || 1)));
  const maxChildren = Math.max(0, safeDependents - 1);
  const safeChildren = Math.max(0, Math.min(maxChildren, Math.floor(children || 0)));

  const { result, error } = useMemo(() => {
    try {
      const calc = calculateYearEndTax({
        annualGrossSalary: Math.max(0, annualGrossSalary || 0),
        dependents: safeDependents,
        children: safeChildren,
        prePaidTaxMode,
        manualPrePaidTotalTax: Math.max(0, manualPrePaidTotalTax || 0),
        creditCardSpend: Math.max(0, creditCardSpend || 0),
        debitAndCashSpend: Math.max(0, debitAndCashSpend || 0),
        marketAndTransitSpend: Math.max(0, marketAndTransitSpend || 0),
        pensionSavings: Math.max(0, pensionSavings || 0),
        irpContribution: Math.max(0, irpContribution || 0),
        annualRent: Math.max(0, annualRent || 0),
        insurancePremium: Math.max(0, insurancePremium || 0),
        medicalExpense: Math.max(0, medicalExpense || 0),
        educationExpense: Math.max(0, educationExpense || 0),
        donationAmount: Math.max(0, donationAmount || 0),
      });
      return { result: calc, error: '' };
    } catch (err) {
      return {
        result: null,
        error: err instanceof Error ? err.message : '입력 값을 다시 확인해 주세요.',
      };
    }
  }, [
    annualGrossSalary,
    safeDependents,
    safeChildren,
    prePaidTaxMode,
    manualPrePaidTotalTax,
    creditCardSpend,
    debitAndCashSpend,
    marketAndTransitSpend,
    pensionSavings,
    irpContribution,
    annualRent,
    insurancePremium,
    medicalExpense,
    educationExpense,
    donationAmount,
  ]);

  const heroLabel = (() => {
    if (!result) return '예상 연말정산 결과';
    if (result.refundAmount > 0) return '예상 환급액 (돌려받는 돈)';
    if (result.additionalTaxAmount > 0) return '예상 추가납부액 (더 낼 세금)';
    return '예상 정산 차액';
  })();

  const heroValue = (() => {
    if (!result) return '-';
    if (result.refundAmount > 0) return `+${formatWon(result.refundAmount)}`;
    if (result.additionalTaxAmount > 0) return `-${formatWon(result.additionalTaxAmount)}`;
    return '0원';
  })();

  const heroNote = (() => {
    if (!result) return '';
    const modeNote =
      result.prePaidTaxMode === 'auto'
        ? '2026 간이세액표(100%) × 12개월 기납부세액 추정 대비'
        : '직접 입력한 기납부세액 대비';
    return `${modeNote} · 지방소득세 10% 포함`;
  })();

  const rows: ResultRowProps[] = result
    ? [
        {
          label: '총 결정세액 (실제 낼 세금)',
          value: formatWon(result.determinedTotalTax),
          note: `소득세 ${formatWon(result.determinedIncomeTax)} + 지방소득세 ${formatWon(result.determinedLocalTax)}`,
        },
        {
          label: '연간 기납부세액 (이미 낸 세금)',
          value: formatWon(result.prePaidTotalTax),
          note:
            result.prePaidTaxMode === 'auto'
              ? '국세청 간이세액표 기준 자동 추정'
              : '원천징수영수증 직접 입력값',
        },
        {
          label: '과세표준 · 적용 세율 구간',
          value: `${formatWon(result.taxableBase)} (${Math.round(result.marginalTaxRate * 100)}%)`,
          note: `산출세액 ${formatWon(result.calculatedTax)}`,
        },
        {
          label: '총 세액공제 · 실효세율',
          value: `${formatWon(result.totalTaxCredits)} · ${formatPercent(result.effectiveTaxRate)}`,
          note: '세액공제는 소득세에서 직접 차감',
        },
      ]
    : [];

  const totalCardInput =
    Math.max(0, creditCardSpend || 0) +
    Math.max(0, debitAndCashSpend || 0) +
    Math.max(0, marketAndTransitSpend || 0);

  return (
    <CalculatorWorkspace className="grid gap-6 lg:grid-cols-2" slug={SLUG}>
      <FormCard title="2026년 귀속 연말정산 입력">
        <NumberInput
          id="year-end-tax-gross"
          label="연간 총급여 (비과세 제외)"
          value={annualGrossSalary}
          onChange={setAnnualGrossSalary}
          min={0}
          max={1_000_000_000}
          integer
          unit="원"
          unitButtons={SALARY_UNIT_BUTTONS}
          helpText="식대(월 20만 원) 등 비과세 수당을 뺀 1년 과세 급여 합계를 넣으세요."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <NumberInput
            id="year-end-tax-dependents"
            label="부양가족 수 (본인 포함)"
            value={dependents}
            onChange={(next) => {
              const clamped = Math.max(1, Math.min(20, Math.floor(next || 1)));
              setDependents(clamped);
              if (children > clamped - 1) {
                setChildren(Math.max(0, clamped - 1));
              }
            }}
            min={1}
            max={20}
            integer
            unit="명"
            debounceMs={0}
            helpText="기본공제 1인당 150만 원 (소득세법 §50)."
          />
          <NumberInput
            id="year-end-tax-children"
            label="8~20세 기본공제 자녀 수"
            value={safeChildren}
            onChange={(next) =>
              setChildren(Math.max(0, Math.min(maxChildren, Math.floor(next || 0))))
            }
            min={0}
            max={maxChildren}
            integer
            unit="명"
            debounceMs={0}
            helpText="자녀세액공제 + 2026 신용카드 자녀 한도 확대 반영."
          />
        </div>

        <RadioGroup<PrePaidTaxMode>
          id="year-end-tax-prepaid-mode"
          label="기납부세액 (1년간 월급에서 떼인 세금)"
          value={prePaidTaxMode}
          onChange={setPrePaidTaxMode}
          options={[
            { value: 'auto', label: '간이세액표 자동 추정' },
            { value: 'manual', label: '직접 입력' },
          ]}
        />

        {prePaidTaxMode === 'manual' ? (
          <NumberInput
            id="year-end-tax-manual-prepaid"
            label="기납부세액 합계 (소득세 + 지방소득세)"
            value={manualPrePaidTotalTax}
            onChange={setManualPrePaidTotalTax}
            min={0}
            integer
            unit="원"
            unitButtons={SPEND_UNIT_BUTTONS}
            helpText="급여명세서나 홈택스 원천징수영수증의 연간 소득세·지방소득세 합계를 넣으세요."
          />
        ) : null}

        <div className="border-t border-border-subtle pt-4">
          <p className="mb-3 text-sm font-semibold text-text-primary">
            신용카드·체크카드 소득공제 (조특법 §126의2)
          </p>
          <div className="space-y-4">
            <NumberInput
              id="year-end-tax-credit-card"
              label="신용카드 사용액 (15%)"
              value={creditCardSpend}
              onChange={setCreditCardSpend}
              min={0}
              integer
              unit="원"
              unitButtons={SPEND_UNIT_BUTTONS}
            />
            <NumberInput
              id="year-end-tax-debit-cash"
              label="체크카드·현금영수증 사용액 (30%)"
              value={debitAndCashSpend}
              onChange={setDebitAndCashSpend}
              min={0}
              integer
              unit="원"
              unitButtons={SPEND_UNIT_BUTTONS}
            />
            <NumberInput
              id="year-end-tax-market-transit"
              label="전통시장·대중교통 사용액 (40%)"
              value={marketAndTransitSpend}
              onChange={setMarketAndTransitSpend}
              min={0}
              integer
              unit="원"
              unitButtons={SPEND_UNIT_BUTTONS}
              helpText={
                result
                  ? `최저사용금액(25%) ${formatWon(result.cardMinimumUsage)} 초과분부터 적용 · 기본한도 ${formatWon(result.cardBasicLimit)} + 추가한도 ${formatWon(result.cardAdditionalLimit)}`
                  : undefined
              }
            />
          </div>
        </div>

        <div className="border-t border-border-subtle pt-4">
          <p className="mb-3 text-sm font-semibold text-text-primary">
            주요 세액공제 (연금·월세·의료·교육·기부)
          </p>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <NumberInput
                id="year-end-tax-pension-savings"
                label="연금저축 납입액"
                value={pensionSavings}
                onChange={setPensionSavings}
                min={0}
                integer
                unit="원"
                unitButtons={SPEND_UNIT_BUTTONS}
                helpText="연 600만 한도 (5,500만 이하 15%, 초과 12%)."
              />
              <NumberInput
                id="year-end-tax-irp"
                label="IRP 추가 납입액"
                value={irpContribution}
                onChange={setIrpContribution}
                min={0}
                integer
                unit="원"
                unitButtons={SPEND_UNIT_BUTTONS}
                helpText="연금저축 포함 총 900만 한도 (§59의3)."
              />
            </div>

            <NumberInput
              id="year-end-tax-rent"
              label="연간 월세 납입액 (무주택 세대주)"
              value={annualRent}
              onChange={setAnnualRent}
              min={0}
              integer
              unit="원"
              unitButtons={SPEND_UNIT_BUTTONS}
              helpText="총급여 8,000만 이하, 연 1,000만 한도 (5,500만 이하 17%, 초과 15%)."
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <NumberInput
                id="year-end-tax-insurance"
                label="보장성보험료"
                value={insurancePremium}
                onChange={setInsurancePremium}
                min={0}
                integer
                unit="원"
                helpText="연 100만 한도 × 12% (§59의4①)."
              />
              <NumberInput
                id="year-end-tax-medical"
                label="의료비 지출액"
                value={medicalExpense}
                onChange={setMedicalExpense}
                min={0}
                integer
                unit="원"
                helpText="총급여 3% 초과분 × 15%, 일반 700만 한도."
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <NumberInput
                id="year-end-tax-education"
                label="교육비 지출액"
                value={educationExpense}
                onChange={setEducationExpense}
                min={0}
                integer
                unit="원"
                helpText="공제대상 한도 내 금액 × 15% (§59의4③)."
              />
              <NumberInput
                id="year-end-tax-donation"
                label="기부금 지출액"
                value={donationAmount}
                onChange={setDonationAmount}
                min={0}
                integer
                unit="원"
                helpText="1,000만 이하 15%, 초과 30% (§59의4④)."
              />
            </div>
          </div>
        </div>

        {error ? (
          <p role="alert" className="text-sm text-danger-500">
            {error}
          </p>
        ) : null}
      </FormCard>

      <div className="min-w-0 lg:min-h-[28rem]">
        <ResultCard
          title="2026년 귀속 연말정산 추정 결과"
          heroLabel={heroLabel}
          heroValue={heroValue}
          heroNote={heroNote}
          rows={rows}
          empty={!result}
          visibleRowCount={4}
        >
          {result && annualRent > 0 && !result.monthlyRentEligible ? (
            <div className="rounded-xl border border-border-base bg-bg-base p-3 text-sm text-text-primary">
              총급여 8,000만 원을 초과해 월세 세액공제(조특법 §95의2) 대상에서 제외되었습니다.
              월세를 현금영수증으로 발급받았다면 위 체크카드·현금영수증 사용액에 합산해 소득공제를
              받을 수 있습니다.
            </div>
          ) : null}

          {result && totalCardInput > 0 && totalCardInput <= result.cardMinimumUsage ? (
            <div className="rounded-xl border border-primary-500/40 bg-primary-500/10 p-3 text-sm text-primary-700 dark:text-primary-200">
              카드·현금 사용액 합계({formatWon(totalCardInput)})가 총급여의 25%(
              {formatWon(result.cardMinimumUsage)}) 이하라 현재 카드 소득공제는 0원입니다.
            </div>
          ) : null}

          {result ? (
            <div className="min-w-0 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-text-primary">
                <caption className="pb-2 text-left text-xs text-text-secondary">
                  단계별 결정세액 산출 내역 (소득세법 §47~§59의4)
                </caption>
                <thead className="bg-bg-raised text-xs text-text-secondary">
                  <tr>
                    <th scope="col" className="px-3 py-2 font-medium">
                      단계 · 항목
                    </th>
                    <th scope="col" className="px-3 py-2 text-right font-medium">
                      금액
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border-subtle">
                    <td className="px-3 py-2">① 연간 총급여</td>
                    <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums">
                      {formatWon(result.annualGrossSalary)}
                    </td>
                  </tr>
                  <tr className="border-t border-border-subtle">
                    <td className="px-3 py-2 text-text-secondary">(-) 근로소득공제 (§47)</td>
                    <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums text-text-secondary">
                      -{formatWon(result.earnedIncomeDeduction)}
                    </td>
                  </tr>
                  <tr className="border-t border-border-subtle font-medium">
                    <td className="px-3 py-2">② 근로소득금액</td>
                    <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums">
                      {formatWon(result.earnedIncomeAmount)}
                    </td>
                  </tr>
                  <tr className="border-t border-border-subtle">
                    <td className="px-3 py-2 text-text-secondary">
                      (-) 인적공제 ({safeDependents}명 × 150만)
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums text-text-secondary">
                      -{formatWon(result.personalDeduction)}
                    </td>
                  </tr>
                  <tr className="border-t border-border-subtle">
                    <td className="px-3 py-2 text-text-secondary">
                      (-) 4대보험 본인부담금 (연금·건보·장기요양·고용)
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums text-text-secondary">
                      -
                      {formatWon(
                        result.nationalPensionDeduction + result.healthAndEmploymentDeduction,
                      )}
                    </td>
                  </tr>
                  <tr className="border-t border-border-subtle">
                    <td className="px-3 py-2 text-text-secondary">(-) 신용카드 등 소득공제</td>
                    <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums text-text-secondary">
                      -{formatWon(result.cardDeduction)}
                    </td>
                  </tr>
                  <tr className="border-t border-border-subtle font-medium">
                    <td className="px-3 py-2">③ 종합소득 과세표준</td>
                    <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums">
                      {formatWon(result.taxableBase)}
                    </td>
                  </tr>
                  <tr className="border-t border-border-subtle font-medium">
                    <td className="px-3 py-2">④ 산출세액 (§55 누진세율)</td>
                    <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums">
                      {formatWon(result.calculatedTax)}
                    </td>
                  </tr>
                  <tr className="border-t border-border-subtle">
                    <td className="px-3 py-2 text-text-secondary">(-) 근로소득세액공제 (§59)</td>
                    <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums text-text-secondary">
                      -{formatWon(result.earnedIncomeTaxCredit)}
                    </td>
                  </tr>
                  {result.childTaxCredit > 0 ? (
                    <tr className="border-t border-border-subtle">
                      <td className="px-3 py-2 text-text-secondary">(-) 자녀세액공제 (§59의2)</td>
                      <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums text-text-secondary">
                        -{formatWon(result.childTaxCredit)}
                      </td>
                    </tr>
                  ) : null}
                  {result.pensionAccountTaxCredit > 0 ? (
                    <tr className="border-t border-border-subtle">
                      <td className="px-3 py-2 text-text-secondary">
                        (-) 연금계좌세액공제 (§59의3)
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums text-text-secondary">
                        -{formatWon(result.pensionAccountTaxCredit)}
                      </td>
                    </tr>
                  ) : null}
                  {result.monthlyRentTaxCredit > 0 ? (
                    <tr className="border-t border-border-subtle">
                      <td className="px-3 py-2 text-text-secondary">(-) 월세 세액공제 (§95의2)</td>
                      <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums text-text-secondary">
                        -{formatWon(result.monthlyRentTaxCredit)}
                      </td>
                    </tr>
                  ) : null}
                  {result.insuranceTaxCredit +
                    result.medicalTaxCredit +
                    result.educationTaxCredit +
                    result.donationTaxCredit >
                  0 ? (
                    <tr className="border-t border-border-subtle">
                      <td className="px-3 py-2 text-text-secondary">
                        (-) 특별세액공제 (보험·의료·교육·기부)
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums text-text-secondary">
                        -
                        {formatWon(
                          result.insuranceTaxCredit +
                            result.medicalTaxCredit +
                            result.educationTaxCredit +
                            result.donationTaxCredit,
                        )}
                      </td>
                    </tr>
                  ) : null}
                  <tr className="border-t border-border-base bg-bg-raised font-semibold">
                    <td className="px-3 py-2">⑤ 총 결정세액 (소득세 + 지방세 10%)</td>
                    <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums">
                      {formatWon(result.determinedTotalTax)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : null}

          <p className="text-xs leading-relaxed text-text-secondary">
            2026년 4대보험 본인부담금은 총급여 기준으로 자동 산정해 소득공제에 반영했습니다.
            주택자금공제·추가인적공제(경로우대·장애인·한부모)·중소기업 청년감면 등 개별 특례가
            있으면 실제 환급액이 더 커질 수 있습니다.
          </p>
        </ResultCard>
      </div>
    </CalculatorWorkspace>
  );
}
