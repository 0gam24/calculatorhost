'use client';

import { CalculatorWorkspace } from '@/components/calculator/CalculatorWorkspace';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';

/**
 * D-day 계산기 (MVP #14)
 *
 * 명세: docs/calculator-spec/D-day.md
 * 공식: src/lib/utils/dday.ts
 *
 * 4 모드:
 * - A: D-day (기준일 → 목표일, 빠른 선택 일정)
 * - B: 기간 계산 (시작일 - 종료일, 포함 여부)
 * - C: N일 후 (기준일 + 일수)
 * - D: 기념일 (시작일 = 1일째, 100일·1000일)
 */

import { useMemo } from 'react';
import { FormCard } from '@/components/calculator/Form';
import { NumberInput } from '@/components/calculator/NumberInput';
import { RadioGroup } from '@/components/calculator/RadioGroup';
import { ResultCard, type ResultRowProps } from '@/components/calculator/Result';
import { ResultBanner } from '@/components/calculator/ResultBanner';
import {
  calculateDday,
  calculateDuration,
  calculateAfterNDays,
  calculateNthDay,
  upcomingEvents,
  type InclusionMode,
} from '@/lib/utils/dday';
import { DDAY_EVENTS } from '@/lib/constants/dday-events';

/** 기념일 모드에서 함께 보여 주는 날수 */
const MILESTONES = [100, 200, 300, 500, 1000, 2000, 3000] as const;

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

type DdayMode = 'dday' | 'duration' | 'after-n-days' | 'nth-day';

export function DdayCalculator() {
  // 모드 선택
  const [mode, setMode] = useCalculatorState<DdayMode>('d-day:mode', 'dday');

  // 모드 A: D-day
  const [ddayBase, setDdayBase] = useCalculatorState('d-day:ddayBase', getTodayString());
  const [ddayTarget, setDdayTarget] = useCalculatorState('d-day:ddayTarget', '');

  // 모드 B: 기간 계산
  const [durationStart, setDurationStart] = useCalculatorState('d-day:durationStart', '');
  const [durationEnd, setDurationEnd] = useCalculatorState('d-day:durationEnd', '');
  const [inclusionMode, setInclusionMode] = useCalculatorState<InclusionMode>(
    'd-day:inclusionMode',
    'both',
  );

  // 모드 C: N일 후
  const [afterBase, setAfterBase] = useCalculatorState('d-day:afterBase', getTodayString());
  const [afterDays, setAfterDays] = useCalculatorState('d-day:afterDays', 100);

  // 모드 D: 기념일 (시작일 = 1일째)
  const [nthBase, setNthBase] = useCalculatorState('d-day:nthBase', getTodayString());
  const [nthN, setNthN] = useCalculatorState('d-day:nthN', 100);

  const quickEvents = useMemo(() => upcomingEvents(DDAY_EVENTS, ddayBase), [ddayBase]);

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

  const nthResult = useMemo(() => {
    if (mode !== 'nth-day') return null;
    return calculateNthDay({ baseDate: nthBase, n: nthN });
  }, [mode, nthBase, nthN]);

  // ===== 결과 카드 행 구성 =====

  const resultRows: ResultRowProps[] = useMemo(() => {
    if (mode === 'dday' && ddayResult && ddayTarget) {
      return [
        {
          label: '남은/지난 일수',
          value: `${ddayResult.diffDays > 0 ? '+' : ''}${ddayResult.diffDays.toLocaleString('ko-KR')}일`,
        },
        {
          label: '목표일 요일',
          value: `${ddayTarget} (${ddayResult.targetWeekday})`,
        },
        ...(ddayResult.nthDay != null
          ? [
              {
                label: '목표일을 1일로 세면',
                value: `기준일이 ${ddayResult.nthDay.toLocaleString('ko-KR')}일째`,
              },
            ]
          : []),
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

    if (mode === 'nth-day' && nthResult && nthResult.resultDate !== '-') {
      return MILESTONES.map((n) => {
        const r = calculateNthDay({ baseDate: nthBase, n });
        return { label: `${n.toLocaleString('ko-KR')}일째`, value: `${r.resultDate} (${r.weekday})` };
      });
    }

    return [];
  }, [mode, ddayResult, durationResult, afterResult, nthResult, nthBase, ddayTarget, durationStart, durationEnd]);

  // ===== 경고 메시지 =====

  const warningElements = useMemo(() => {
    let warnings: string[] = [];

    if (mode === 'dday' && ddayResult) {
      warnings = ddayResult.warnings;
    } else if (mode === 'duration' && durationResult) {
      warnings = durationResult.warnings;
    } else if (mode === 'after-n-days' && afterResult) {
      warnings = afterResult.warnings;
    } else if (mode === 'nth-day' && nthResult) {
      warnings = nthResult.warnings;
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
  }, [mode, ddayResult, durationResult, afterResult, nthResult]);

  // ===== 히어로 레이블 결정 =====

  const getHeroLabel = (): string => {
    if (mode === 'dday') return 'D-day 카운트';
    if (mode === 'duration') return '기간 계산';
    if (mode === 'nth-day') return `${nthN.toLocaleString('ko-KR')}일째 (시작일 = 1일째)`;
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
    if (mode === 'nth-day' && nthResult && nthResult.resultDate !== '-') {
      return `${nthResult.resultDate} (${nthResult.weekday})`;
    }
    return '입력 필요';
  };

  const hasValidResult = (): boolean => {
    if (mode === 'dday') return !!(ddayResult && ddayTarget);
    if (mode === 'duration') return !!(durationResult && durationStart && durationEnd);
    if (mode === 'after-n-days') return !!(afterResult && afterResult.resultDate !== '-');
    if (mode === 'nth-day') return !!(nthResult && nthResult.resultDate !== '-');
    return false;
  };

  return (
    <CalculatorWorkspace className="grid gap-6 lg:grid-cols-2" slug="d-day">
      <div className="min-w-0 space-y-5">
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
              { value: 'nth-day', label: '기념일 (100일·1000일)' },
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
                    required
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
                    required
                    value={ddayTarget}
                    onChange={(e) => setDdayTarget(e.target.value)}
                    className="w-full rounded-lg border border-border-base bg-bg-card px-4 py-3 text-text-primary focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                    lang="ko"
                  />
                </div>
              </div>
              {quickEvents.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-text-primary">목표일 빠른 선택</p>
                  <div className="flex flex-wrap gap-2">
                    {quickEvents.map((ev) => (
                      <button
                        key={ev.date}
                        type="button"
                        onClick={() => setDdayTarget(ev.date)}
                        aria-pressed={ddayTarget === ev.date}
                        className={
                          ddayTarget === ev.date
                            ? 'min-h-12 rounded-xl border border-primary-500 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-700 dark:text-primary-300'
                            : 'min-h-12 rounded-xl border border-border-base px-4 py-2 text-sm text-text-secondary hover:border-primary-500'
                        }
                      >
                        {ev.name} {ev.date.slice(5).replace('-', '/')}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
                    required
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
                    required
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
                  required
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
                min={-100_000}
                max={100_000}
                integer
                helpText="음수 가능 (과거 날짜)"
              />
            </div>
          </FormCard>
        )}

        {/* ===== 모드 D: 기념일 ===== */}
        {mode === 'nth-day' && (
          <FormCard title="기념일 계산 (시작일 = 1일째)">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="nth-base" className="text-sm font-medium text-text-primary">
                  시작일 (출생일·사귄 날·입사일)
                </label>
                <input
                  id="nth-base"
                  type="date"
                  required
                  value={nthBase}
                  onChange={(e) => setNthBase(e.target.value)}
                  className="w-full rounded-lg border border-border-base bg-bg-card px-4 py-3 text-text-primary focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  lang="ko"
                />
              </div>

              <NumberInput
                id="nth-n"
                label="며칠째"
                value={nthN}
                onChange={setNthN}
                placeholder="100"
                unit="일째"
                min={1}
                max={100_000}
                integer
                helpText="시작일을 1일째로 셉니다. 백일 = 출생일 + 99일"
              />
            </div>
          </FormCard>
        )}

        {/* ===== 결과 카드 ===== */}
      </div>
      <div className="min-w-0 space-y-4">
        <ResultCard
          title="계산 결과"
          empty={!hasValidResult()}
          heroLabel={getHeroLabel()}
          heroValue={hasValidResult() ? getHeroValue() : '필요한 날짜를 입력해 주세요'}
          rows={hasValidResult() ? resultRows : []}
        >
          {warningElements}
        </ResultCard>
        <ResultBanner />
      </div>
    </CalculatorWorkspace>
  );
}
