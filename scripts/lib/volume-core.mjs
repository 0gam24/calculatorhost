// 검색량 환산 (순수 함수). 데이터랩 상대지수를 기준어 눈금으로 바꾼다.
//
// 원본: awoo `scripts/keyword-volume.mjs` (alignToAxis · recent 행 · analyseSeason · season 판정).
// 데이터랩 ratio 는 "그 요청 안에서" 최고치=100 인 상대값이라 요청끼리 비교할 수 없다.
// 그래서 모든 요청에 기준어를 함께 넣고 그 평균 대비 % 로 환산한다. 기준어는 awoo 와 같은
// '실업급여' (운영자 결정 2026-10-07) — 사이트 간 같은 눈금이 된다.
//
// 검색량은 발행 판단의 게이트가 아니라 정렬용이다 (이식 지침서 §0). 판정은 정찰(naver-rank-check)이 한다.

export const BENCHMARK = '실업급여';
export const GROUP_SIZE = 5; // 데이터랩 1요청당 키워드 그룹 상한 (1자리는 기준어)
export const EVERGREEN_FLOOR = 10; // 평평하면서 이 이상이면 연중 고른 상시 수요 (애드센스에 가장 좋다)
export const PEAK_FLOOR = 3; // 계절 피크가 이 미만이면 선점해도 트래픽이 안 온다
export const NOISE_FLOOR = 1.5; // 이 미만은 사실상 수요 없음
export const WAVE_RATIO = 1.5; // 최근 7일 / 30일 평균이 이 이상이면 진행 중 물결

export const avg = (a) => (a.length ? a.reduce((s, v) => s + v, 0) / a.length : 0);
const round2 = (n) => Math.round(n * 100) / 100;

/** 기준어 자리를 뺀 4개씩 묶는다. */
export function chunkTerms(terms, groupSize = GROUP_SIZE) {
  const size = groupSize - 1;
  const out = [];
  for (let i = 0; i < terms.length; i += size) out.push(terms.slice(i, i + size));
  return out;
}

/** 희소 시계열을 날짜 축에 맞춰 빈 날을 0 으로 채운다. 축이 없으면 그대로. */
export function alignToAxis(pts, axis) {
  if (!axis || axis.length === 0) return pts.map((p) => p.ratio);
  const byPeriod = new Map(pts.map((p) => [p.period, p.ratio]));
  return axis.map((d) => byPeriod.get(d) ?? 0);
}

/**
 * 일별 30일 창 → 기준어 대비 행.
 * 정렬은 최근 7일(recentRelative)이 먼저다. 물결은 7일 안에 뜨고 지므로 30일 평균은 한 달 전 물결을
 * 지금 것으로 착각하게 만든다 (awoo 2026-09-10).
 * 신생(born): 창 안에서 방금 생긴 키워드. awoo 정의 그대로 —
 *   (0인 날 8일 이상 OR 첫 값이 7일째 이후 OR 값 있는 기간 21일 이하) AND 최근 7일 ≥ 3.
 * @param {number[]} vals  축에 맞춘 일별 ratio
 * @param {number} base  같은 요청의 기준어 평균
 */
export function recentRow(vals, base) {
  if (!(base > 0)) throw new Error('[volume] 기준어 응답 없음 (base 0)');
  const recent7 = avg(vals.slice(-7));
  const prior = avg(vals.slice(0, -7));
  const firstNonZero = vals.findIndex((v) => v > 0);
  const zeroDays = vals.filter((v) => v === 0).length;
  const days = firstNonZero < 0 ? 0 : vals.length - firstNonZero;
  const recentRelative = round2((recent7 / base) * 100);
  return {
    recentRelative,
    relative: round2((avg(vals) / base) * 100),
    trend: prior > 0 ? round2(recent7 / prior) : null,
    zeroDays,
    window: vals.length,
    firstNonZeroIndex: firstNonZero,
    days,
    born: (zeroDays >= 8 || firstNonZero >= 7 || days <= 21) && recentRelative >= 3,
  };
}

/**
 * 13개월 월별 시계열 → 계절성·선점 판정.
 * "지금 검색량 0" 에는 (가) 아직 안 왔다(비수기)와 (나) 애초에 없다가 섞여 있다. 13개월로 가른다.
 * @param {{period:string, ratio:number}[]} points  오름차순 월별
 * @param {number} baseAvg  기준어 월 평균
 * @param {number} nowMonth  지금 달(KST, 1~12)
 */
export function analyseSeason(points, baseAvg, nowMonth) {
  const vals = points.map((p) => p.ratio);
  const peakIdx = vals.reduce((mi, v, i, a) => (v > a[mi] ? i : mi), 0);
  const peakMonth = Number(points[peakIdx].period.slice(5, 7));
  const maxV = vals[peakIdx];
  const minV = Math.min(...vals);
  const meanV = avg(vals);
  const last = points[points.length - 1];
  const lastYearSame = points.find(
    (p) => p !== last && Number(p.period.slice(5, 7)) === Number(last.period.slice(5, 7)),
  );
  return {
    peakMonth,
    peakRelative: baseAvg > 0 ? round2((maxV / baseAvg) * 100) : 0,
    monthsToPeak: (peakMonth - nowMonth + 12) % 12,
    troughRelative: baseAvg > 0 ? round2((minV / baseAvg) * 100) : 0,
    lastYearSameMonth:
      lastYearSame && lastYearSame.ratio > 0 ? round2(last.ratio / lastYearSame.ratio) : null,
    peakOverNow: last.ratio > 0 ? round2(maxV / last.ratio) : null,
    // 최대/평균이 1.6 미만이면 계절성이 없다
    flat: meanV > 0 ? maxV / meanV < 1.6 : true,
    months: points.length,
  };
}

/**
 * season 행 판정. 평평하다고 다 나쁜 게 아니다 — 크고 평평하면 연중 고른 상시 수요라 애드센스에 가장 좋다.
 * @returns {{code:'wave'|'evergreen'|'thin'|'none'|'tiny-peak'|'landgrab'|'wait', label:string}}
 */
export function seasonVerdict(r) {
  if (r.inProgressWave) {
    return { code: 'wave', label: `진행 중 물결 (최근 7일 = 30일 평균 x${r.waveRatio}), 피크 판정 무효` };
  }
  if (r.flat) {
    if (r.relative >= EVERGREEN_FLOOR) return { code: 'evergreen', label: `상시 수요 (평균 ${r.relative})` };
    if (r.relative >= NOISE_FLOOR) return { code: 'thin', label: '얇은 상시 수요' };
    return { code: 'none', label: '수요 없음, 선점해도 트래픽이 안 온다' };
  }
  if (r.peakRelative < PEAK_FLOOR) {
    return { code: 'tiny-peak', label: `피크도 미미(${r.peakRelative}), 계절성은 있으나 값이 없다` };
  }
  if (r.monthsToPeak <= 2) {
    return { code: 'landgrab', label: `선점 적기 (${r.peakMonth}월 피크 ${r.peakRelative}, D-${r.monthsToPeak}개월)` };
  }
  return { code: 'wait', label: `대기 (${r.peakMonth}월 피크 ${r.peakRelative}, D-${r.monthsToPeak}개월)` };
}
