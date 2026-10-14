import { calculateHousingSubscriptionScore } from '@/lib/utils/housing-subscription';
import type { QuickTableData } from './types';

/**
 * 청약 가점 기간별 점수표 (무주택 기간 · 청약통장 가입 기간).
 * 모든 점수는 계산기 함수로 구한다. 부양가족 점수와 만점 합계도 함수 값으로 note 에 적는다.
 */
const score = (noHomeYears: number, accountYears: number, dependents = 0) =>
  calculateHousingSubscriptionScore({ noHomeYears, dependents, accountYears });

/** [행 제목, 그 구간에 들어가는 대표 연수] */
const PERIODS: Array<[string, number]> = [
  ['6개월 미만', 0],
  ['6개월 이상 1년 미만', 0.5],
  ...Array.from({ length: 14 }, (_, i): [string, number] => [
    `${i + 1}년 이상 ${i + 2}년 미만`,
    i + 1,
  ]),
  ['15년 이상', 15],
];

export function housingSubscriptionQuickTable(): QuickTableData {
  const max = score(15, 15, 6);
  const noHomeStep = score(2, 0).noHomeScore - score(1, 0).noHomeScore;
  const accountStep = score(0, 2).accountScore - score(0, 1).accountScore;
  const dependentsZero = score(0, 0, 0).dependentsScore;
  const dependentsStep = score(0, 0, 1).dependentsScore - dependentsZero;
  return {
    title: '무주택 기간과 청약통장 가입 기간은 몇 점인가요?',
    caption: `청약 가점제 기간별 점수 (무주택 기간 최고 ${max.noHomeScore}점, 청약통장 최고 ${max.accountScore}점)`,
    headers: ['기간', '무주택 기간', '청약통장 가입 기간'],
    rows: PERIODS.map(([label, years]) => {
      const s = score(years, years);
      return [label, `${s.noHomeScore}점`, `${s.accountScore}점`];
    }),
    note: `무주택 기간은 1년마다 ${noHomeStep}점, 청약통장 가입 기간은 1년마다 ${accountStep}점씩 올라갑니다. 부양가족 수는 0명 ${dependentsZero}점에서 1명마다 ${dependentsStep}점씩 늘어 6명 이상이면 ${max.dependentsScore}점이고, 세 항목을 더한 만점은 ${max.totalScore}점입니다. 기간을 세는 시작일과 부양가족으로 인정되는 사람은 모집공고 기준을 따르니, 세 항목을 합한 내 점수는 위 계산기에서 확인하세요.`,
  };
}
