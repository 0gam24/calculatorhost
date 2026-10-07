// 노출 가능성 점수: "이 키워드로 새 글을 내면 네이버 웹문서 상단에 들어갈 수 있나".
//
// 원본: awoo `scripts/lib/exposure.mjs` exposureOf (운영자 지시 2026-09-11
// "빈틈 네이버 상위노출 가능성 높은 순서대로"). 이식 지침서 3단계 기본식을 그대로 쓰되 calculatorhost 용으로:
// - 지원금 전용 규칙(지급 후 phaseB·지역 유입)은 뺐다.
// - '경쟁 계산기 자리' +5 를 더했다. 위에 있는 게 소형 계산기 사이트면 우리는 계산기로 정면 승부할 수 있다
//   (docs/ops/SITE-KEYWORD-PROFILE.md "결정적으로 다른 점" 1). 실측으로 가중치를 다시 맞춘다.
//
// 자리(최대 75) + 수요(최대 20) + 시기(5) − 조건 미충족(10). 0~100 으로 자른다.
// 실측(serp)이 없으면 null — 점수를 지어내지 않고 '실측 대기'로 따로 모은다.

/**
 * @param {{track?:string, serp?:object|null, recent7?:number, born?:boolean, inWindow?:boolean,
 *          inbound7d?:number, condition?:string}} item
 * @returns {{score:number|null, label:string, reasons:string[]}}
 */
export function exposureOf(item) {
  const s = item.serp;
  if (!s) return { score: null, label: '미측정', reasons: ['검색 결과 실측 전'] };
  // 이미 1~3위면 그 자리는 우리 것이다 — 새 글의 값이 0 (기존 글 갱신으로 보낸다)
  if (s.rank != null && s.rank <= 3) return { score: 0, label: '이미 노출', reasons: [`자사 ${s.rank}위`] };

  const reasons = [];
  let v = 0;
  const open = item.track === 'T1' ? s.verdictT1 === 'open' : s.verdictT2 === 'open';
  if (open) {
    v += 40;
    reasons.push('자리 열림');
  }
  if ((s.toolAbove ?? 0) >= 1) {
    v += 5;
    reasons.push('경쟁 계산기 자리');
  }
  const slots = s.openSlots ?? 0;
  if (slots >= 4) {
    v += 15;
    reasons.push(`빈자리 ${slots}`);
  } else if (slots >= 2) v += 10;
  else if (slots >= 1) v += 5;
  if (s.mainGovAbove === 0) {
    v += 10;
    reasons.push('위에 관공서 없음');
  } else if (s.mainGovAbove === 1) v += 5;
  // 언론: API 측정은 pressAbove 가 null 이다. null <= 3 이 참이 되는 JS 함정을 막으려고 먼저 거른다.
  if (s.pressAbove != null) {
    if (s.pressAbove === 0) {
      v += 10;
      reasons.push('위에 언론 없음');
    } else if (s.pressAbove <= 3) v += 5;
  }
  // 웹문서 블록 위치: 운영자 눈 확인. 없으면 0점(감점 없음).
  if (s.eyeOffset === 1) {
    v += 10;
    reasons.push('첫 화면(눈 확인)');
  } else if (s.eyeOffset === 2) v += 5;
  if (s.rank != null && s.rank >= 4 && s.rank <= 10) {
    v += 5;
    reasons.push(`자사 ${s.rank}위, 다른 의도로 재진입`);
  }
  const inbound = item.inbound7d ?? null;
  if (inbound != null && inbound >= 100) {
    v += 10;
    reasons.push(`주 ${inbound}명 유입`);
  } else if (inbound != null && inbound >= 30) v += 5;
  if ((item.recent7 ?? 0) >= 3) v += 5;
  if (item.born) {
    v += 5;
    reasons.push('신생');
  }
  if (item.inWindow) {
    v += 5;
    reasons.push('시기 창 안');
  }
  if (/확보/.test(String(item.condition ?? ''))) {
    v -= 10;
    reasons.push('출처 확보 필요');
  }
  const score = Math.max(0, Math.min(100, v));
  const label = score >= 70 ? '높음' : score >= 45 ? '중간' : '낮음';
  return { score, label, reasons: reasons.slice(0, 3) };
}
