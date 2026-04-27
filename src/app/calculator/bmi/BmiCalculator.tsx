'use client';

/**
 * BMI 계산기 (MVP #13)
 *
 * 명세: docs/calculator-spec/BMI.md
 * 공식: src/lib/finance/bmi.ts
 */

import { useMemo, useState } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { ResultCard, type ResultRowProps } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import { calculateBmi, type BmiCategory } from '@/lib/utils/bmi';

export function BmiCalculator() {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);

  const result = useMemo(() => {
    return calculateBmi({
      heightCm: Math.max(100, height),
      weightKg: Math.max(30, weight),
    });
  }, [height, weight]);

  const getCategoryColor = (category: BmiCategory) => {
    const colors: Record<BmiCategory, string> = {
      underweight: 'text-sky-500',
      normal: 'text-primary-500',
      overweight: 'text-warning-500',
      obesity1: 'text-danger-500',
      obesity2: 'text-danger-500',
      obesity3: 'text-danger-500',
    };
    return colors[category];
  };

  const getCategoryBg = (category: BmiCategory) => {
    const colors: Record<BmiCategory, string> = {
      underweight: 'bg-sky-500/5 border-sky-500/30',
      normal: 'bg-primary-500/5 border-primary-500/30',
      overweight: 'bg-warning-500/5 border-warning-500/30',
      obesity1: 'bg-danger-500/5 border-danger-500/30',
      obesity2: 'bg-danger-500/5 border-danger-500/30',
      obesity3: 'bg-danger-500/5 border-danger-500/30',
    };
    return colors[category];
  };

  const warningOrInfoElements = useMemo(() => {
    if (result.category === 'normal') {
      return (
        <div className="rounded-lg bg-primary-500/5 border border-primary-500/30 px-4 py-3">
          <p className="text-sm text-text-primary font-medium">✓ 정상 범위입니다.</p>
        </div>
      );
    }
    if (result.category === 'underweight') {
      return (
        <div className="rounded-lg bg-sky-500/5 border border-sky-500/30 px-4 py-3">
          <p className="text-sm text-sky-600 dark:text-sky-300">
            저체중입니다. 균형 잡힌 식단과 운동으로 건강을 관리하세요.
          </p>
        </div>
      );
    }
    if (result.category === 'overweight') {
      return (
        <div className="rounded-lg bg-warning-500/5 border border-warning-500/30 px-4 py-3">
          <p className="text-sm text-warning-600 dark:text-warning-300">
            과체중입니다. 꾸준한 운동과 식습관 개선을 권장합니다.
          </p>
        </div>
      );
    }
    return (
      <div className="rounded-lg bg-danger-500/5 border border-danger-500/30 px-4 py-3">
        <p className="text-sm text-danger-600 dark:text-danger-300">
          비만입니다. 의료 전문가와 상담하여 건강 계획을 수립하시기 바랍니다.
        </p>
      </div>
    );
  }, [result.category]);

  const resultRows: ResultRowProps[] = [
    {
      label: '정상 체중 범위',
      value: `${Math.round(result.normalWeightLower)} ~ ${Math.round(result.normalWeightUpper)} kg`,
    },

  ];

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2">
      <div className="order-2 lg:order-1">
        <FormCard title="입력">
          <NumberInput
            id="bmi-height"
            label="키"
            value={height}
            onChange={setHeight}
            placeholder="170"
            unit="cm"
            min={100}
            max={250}
          />
          <NumberInput
            id="bmi-weight"
            label="몸무게"
            value={weight}
            onChange={setWeight}
            placeholder="65"
            unit="kg"
            min={30}
            max={200}
          />
        </FormCard>
      </div>

      <div className="order-1 lg:order-2">
        {result ? (
        <ResultCard
          title="계산 결과"
          heroLabel="BMI"
          heroValue={result.bmi.toString()}
          rows={resultRows}
        >
          {/* 분류 칩 */}
          <div className="flex flex-col gap-3">
            <div
              className={`rounded-lg border p-4 ${getCategoryBg(result.category)}`}
            >
              <p className={`text-lg font-bold ${getCategoryColor(result.category)}`}>
                {result.categoryLabel}
              </p>
            </div>

            {warningOrInfoElements}
          </div>
        </ResultCard>
        ) : (
        <div className="rounded-lg border border-border-base bg-bg-card p-6 text-center">
          <p className="text-text-secondary">
            키와 몸무게를 입력하면 BMI가 자동 계산됩니다.
          </p>
        <ResultBanner />
        </div>
        )}
      </div>
    </div>
  );
}
