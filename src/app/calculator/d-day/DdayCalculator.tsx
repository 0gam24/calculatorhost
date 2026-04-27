'use client';

/**
 * D-day 계산기 (MVP #14)
 *
 * 명세: docs/calculator-spec/D-day.md
 * 공식: src/lib/utils/dday.ts
 *
 * 3 모드:
 * - A: D-day (기준일 → 목표일)
 * - B: 기간 계산 (시작일 - 종료일, 포함 여부)
 * - C: N일 후 (기준일 + 일수)
 */

import { useMemo, useState } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard, type ResultRowProps } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import {
  calculateDday,
  calculateDuration,
  calculateAfterNDays,
  type InclusionMode,
} from '@/lib/utils/dday';

// ============================================
// 유틸리티: 오늘 날짜를 YYYY-MM-DD로 포맷
// ============================================

function getTodayString(): string {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, '0');
  const d = String(today.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// ============================================
// 메인 계산기 컴포넌트
// ============================================

type DdayMode = 'dday' | 'duration' | 'after-n-days';

export function DdayCalculator() {
  // 모드 선택
  const [mode, setMode] = useState<DdayMode>('dday');

  // 모드 A: D-day
  const [ddayBase, setDdayBase] = useState(getTodayString());
  const [ddayTarget, setDdayTarget] = useState('');

  // 모드 B: 기간 계산
  const [durationStart, setDurationStart] = useState('');
  const [durationEnd, setDurationEnd] = useState('');
  const [inclusionMode, setInclusionMode] = useState<InclusionMode>('both');

  // 모드 C: N일 후
  const [afterBase, setAfterBase] = useState(getTodayString());
  const [afterDays, setAfterDays] = useState(100);

  // ===== 계산 수행 =====

  const ddayResult = useMemo(() => {
    if (mode !== 'dday') return null;
    return calculateDday({
      baseDate: ddayBase,
      targetDate: ddayTarget,
    });
  }, [mode, ddayBase, ddayTarget]);

  const durationResult = useMemo(() => {
    if (mode !== 'duration') return null;
    return calculateDuration({
      startDate: durationStart,
      endDate: durationEnd,
      inclusion: inclusionMode,
    });
  }, [mode, durationStart, durationEnd, inclusionMode]);

  const afterResult = useMemo(() => {
    if (mode !== 'after-n-days') return null;
    return calculateAfterNDays({
      baseDate: afterBase,
      offset: afterDays,
    });
  }, [mode, afterBase, afterDays]);

  // ===== 결과 카드 행 구성 =====

  const resultRows: ResultRowProps[] = useMemo(() => {
    if (mode === 'dday' && ddayResult && ddayTarget) {
      return [
        {
          label: '남은/지난 일수',
          value: `${ddayResult.diffDays > 0 ? '+' : ''}${ddayResult.diffDays.toLocaleString('ko-KR')}일`,
        },
        {
          label: '주 환산',
          value: `${ddayResult.weeks.toLocaleString('ko-KR')}주`,
        },
        {
          label: '개월 환산',
          value: `${ddayResult.months.toLocaleString('ko-KR')}개월`,
        },
        {
          label: '연 환산',
          value: `${ddayResult.years.toLocaleString('ko-KR')}년`,
        },
      ];
    }

    if (mode === 'duration' && durationResult && durationStart && durationEnd) {
      return [
        {
          label: '일수',
          value: `${durationResult.days.toLocaleString('ko-KR')}일`,
        },
        {
          label: '주 환산',
          value: `${durationResult.weeks.toLocaleString('ko-KR')}주`,
        },
        {
          label: '개월 환산',
          value: `${durationResult.months.toLocaleString('ko-KR')}개월`,
        },
        {
          label: '연 환산',
          value: `${durationResult.years.toLocaleString('ko-KR')}년`,
        },
      ];
    }

    if (mode === 'after-n-days' && afterResult && afterResult.resultDate !== '-') {
      const dateStr = afterResult.resultDate;
      const weekday = afterResult.weekday;
      return [
        {
          label: '도달 날짜',
          value: `${dateStr} (${weekday})`,
        },
      ];
    }

    return [];
  }, [mode, ddayResult, durationResult, afterResult, ddayTarget, durationStart, durationEnd]);

  // ===== 경고 메시지 =====

  const warningElements = useMemo(() => {
    let warnings: string[] = [];

    if (mode === 'dday' && ddayResult) {
      warnings = ddayResult.warnings;
    } else if (mode === 'duration' && durationResult) {
      warnings = durationResult.warnings;
    } else if (mode === 'after-n-days' && afterResult) {
      warnings = afterResult.warnings;
    }

    if (warnings.length === 0) return null;

    return (
      <div className="rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-4">
        <p className="text-sm font-medium text-text-primary">주의사항</p>
        <ul className="mt-2 space-y-1">
          {warnings.map((warn, idx) => (
            <li key={idx} className="text-sm text-text-secondary">
              • {warn}
            </li>
          ))}
        </ul>
      </div>
    );
  }, [mode, ddayResult, durationResult, afterResult]);

  // ===== 히어로 레이블 결정 =====

  const getHeroLabel = (): string => {
    if (mode === 'dday') return 'D-day 카운트';
    if (mode === 'duration') return '기간 계산';
    return 'N일 후 날짜';
  };

  const getHeroValue = (): string => {
    if (mode === 'dday' && ddayResult && ddayTarget) return ddayResult.label;
    if (mode === 'duration' && durationResult && durationStart && durationEnd) {
      return `${durationResult.days.toLocaleString('ko-KR')}일`;
    }
    if (mode === 'after-n-days' && afterResult && afterResult.resultDate !== '-') {
      return afterResult.resultDate;
    }
    return '입력 필요';
  };

  const hasValidResult = (): boolean => {
    if (mode === 'dday') return !!(ddayResult && ddayTarget);
    if (mode === 'duration') return !!(durationResult && durationStart && durationEnd);
    if (mode === 'after-n-days') return !!(afterResult && afterResult.resultDate !== '-');
    return false;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ===== 모드 선택 탭 ===== */}
      <FormCard title="계산 모드 선택">
        <RadioGroup<DdayMode>
          id="dday-mode"
          label="계산 방식"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'dday', label: 'D-day (기준→목표일)' },
            { value: 'duration', label: '기간 계산 (시작→종료일)' },
            { value: 'after-n-days', label: 'N일 후 (기준+일수)' },
          ]}
        />
      </FormCard>

      {/* ===== 모드 A: D-day ===== */}
      {mode === 'dday' && (
        <FormCard title="D-day 계산">
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="dday-base" className="text-sm font-medium text-text-primary">
                  기준일
                </label>
                <input
                  id="dday-base"
                  type="date"
                  value={ddayBase}
                  onChange={(e) => setDdayBase(e.target.value)}
                  className="w-full rounded-lg border border-border-base bg-bg-card px-4 py-3 text-text-primary focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  lang="ko"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="dday-target" className="text-sm font-medium text-text-primary">
                  목표일
                </label>
                <input
                  id="dday-target"
                  type="date"
                  value={ddayTarget}
                  onChange={(e) => setDdayTarget(e.target.value)}
                  className="w-full rounded-lg border border-border-base bg-bg-card px-4 py-3 text-text-primary focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  lang="ko"
                />
              </div>
            </div>
          </div>
        </FormCard>
      )}

      {/* ===== 모드 B: 기간 계산 ===== */}
      {mode === 'duration' && (
        <FormCard title="기간 계산">
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="duration-start" className="text-sm font-medium text-text-primary">
                  시작일
                </label>
                <input
                  id="duration-start"
                  type="date"
                  value={durationStart}
                  onChange={(e) => setDurationStart(e.target.value)}
                  className="w-full rounded-lg border border-border-base bg-bg-card px-4 py-3 text-text-primary focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  lang="ko"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="duration-end" className="text-sm font-medium text-text-primary">
                  종료일
                </label>
                <input
                  id="duration-end"
                  type="date"
                  value={durationEnd}
                  onChange={(e) => setDurationEnd(e.target.value)}
                  className="w-full rounded-lg border border-border-base bg-bg-card px-4 py-3 text-text-primary focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  lang="ko"
                />
              </div>
            </div>

            <RadioGroup<InclusionMode>
              id="inclusion-mode"
              label="포함 방식"
              value={inclusionMode}
              onChange={setInclusionMode}
              options={[
                { value: 'both', label: '양 끝 포함' },
                { value: 'start', label: '시작일만' },
                { value: 'end', label: '종료일만' },
                { value: 'exclude', label: '제외' },
              ]}
            />
          </div>
        </FormCard>
      )}

      {/* ===== 모드 C: N일 후 ===== */}
      {mode === 'after-n-days' && (
        <FormCard title="N일 후 계산">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="after-base" className="text-sm font-medium text-text-primary">
                기준일
              </label>
              <input
                id="after-base"
                type="date"
                value={afterBase}
                onChange={(e) => setAfterBase(e.target.value)}
                className="w-full rounded-lg border border-border-base bg-bg-card px-4 py-3 text-text-primary focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                lang="ko"
              />
            </div>

            <NumberInput
              id="after-days"
              label="일수"
              value={afterDays}
              onChange={setAfterDays}
              placeholder="100"
              unit="일"
              helpText="음수 가능 (과거 날짜)"
            />
          </div>
        </FormCard>
      )}

      {/* ===== 결과 카드 ===== */}
      {hasValidResult() ? (
        <ResultCard
          title="계산 결과"
          heroLabel={getHeroLabel()}
          heroValue={getHeroValue()}
          rows={resultRows}
        >
          {warningElements}
        </ResultCard>
      ) : null}
        <ResultBanner />
    </div>
  );
}
