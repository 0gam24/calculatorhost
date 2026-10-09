// 파이프라인 순수 로직: 후보 생성 · 기존 글 겹침 · 큐 상태 보존.
//
// 원본: awoo `scripts/keyword-pipeline.mjs` (2282줄) 의 후보 생성·큐 병합 부분을 calculatorhost 에 맞게 줄여 이식.
// 이식 지침서 3단계. 지원금 전용(T1 지역 물결·의회 가결·지역 롤업)은 뺐다.
// 잠금 장부(awoo build-cluster-intents, 1043줄)는 간이판으로 대체했다: 가이드 제목에 검색어가 통째로
// 들어 있으면 "이미 다룬 글" 로 보고 새 글 대신 그 글 보강을 권한다.

const norm = (s) => String(s ?? '').replace(/\s+/g, '').toLowerCase();
const MANUAL_PREFIX = '빈틈:';
const MANUAL_KEEP_DAYS = 21; // awoo 2026-09-14 사고: 손으로 넣은 항목을 자동 실행이 지웠다
const KEEP_STATUSES = new Set(['hold', 'published', 'approved', 'rejected']);

const daysBetween = (a, b) =>
  Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400_000);

/** 별칭에 클러스터 단어(2글자 이상)가 하나도 없으면 클러스터를 앞에 붙인다. "주 15시간" → "주휴수당 주 15시간" */
export function withCluster(alias, cluster) {
  const tokens = String(cluster).split(/\s+/).filter((t) => t.length >= 2);
  return tokens.some((t) => norm(alias).includes(norm(t))) ? alias : `${cluster} ${alias}`;
}

const familyOf = (q) => (/계산기|계산법|계산 방법/.test(q) ? 'A' : 'B');

/** 피크 달 마지막 날 (writeBy 기준으로 다음에 오는 피크) */
function peakEnd(writeBy, peakMonth) {
  const [y, m] = writeBy.split('-').map(Number);
  const year = peakMonth >= m ? y : y + 1;
  return new Date(Date.UTC(year, peakMonth, 0)).toISOString().slice(0, 10);
}

/**
 * 후보 생성. T2 = 큰 키워드 대표 형태 + 별칭, T3 = writeBy 가 지난 캘린더 항목. 같은 검색어(공백 무시)는 한 번만.
 * @returns {Array<{id,query,track,family,cluster?,calculator,action,inWindow?,kind?,widgetRisk?,note?}>}
 */
export function buildCandidates({ bigKeywords, calendar, today }) {
  const seen = new Set();
  const out = [];
  const push = (item) => {
    const k = norm(item.query);
    if (seen.has(k)) return;
    seen.add(k);
    out.push(item);
  };
  for (const k of bigKeywords?.keywords ?? []) {
    const queries = [k.term, ...(k.aliases ?? []).map((a) => withCluster(a, k.cluster))];
    for (const q of queries) {
      // 대표 형태는 "계산기"가 없어도(연봉 실수령액·증여세 등) 맞는 계산기가 있으면 그 계산기를 키운다
      const isHead = q === k.term;
      push({
        id: `T2:${norm(q)}`,
        query: q,
        track: 'T2',
        family: familyOf(q),
        cluster: k.cluster,
        calculator: k.calculator ?? null,
        ...(k.widgetRisk ? { widgetRisk: true } : {}),
        action: !isHead
          ? { type: 'new', target: null }
          : k.calculator
            ? { type: 'calculator', target: k.calculator }
            : /계산기/.test(q)
              ? { type: 'new-calculator', target: null }
              : { type: 'new', target: null },
      });
    }
  }
  for (const c of calendar?.items ?? []) {
    if (!c.writeBy || c.writeBy > today) continue;
    const end = peakEnd(c.writeBy, c.peakMonth);
    push({
      id: `T3:${c.key}`,
      query: c.query,
      track: 'T3',
      family: c.family ?? 'A',
      cluster: c.query,
      calculator: c.calculator ?? null,
      kind: c.kind,
      inWindow: today >= c.writeBy && today <= end,
      note: c.note,
      action: calendarAction(c),
    });
  }
  return out;
}

const calendarAction = (c) =>
  c.kind === 'new-calculator'
    ? { type: 'new-calculator', target: null }
    : c.calculator
      ? { type: 'calculator', target: c.calculator }
      : { type: 'new', target: null };

/**
 * 운영자가 손으로 넣는 항목(위젯 [실측]·[선점] 버튼). id 는 '빈틈:' 으로 시작해 21일 보존된다.
 * 캘린더에 있는 주제면 writeBy 가 아직 안 됐어도 그 항목의 처리 방식(계산기 보강·신규 계산기)을 그대로 쓴다.
 */
export function manualItem(query, calendar, today) {
  const c = (calendar?.items ?? []).find((x) => norm(x.query) === norm(query));
  const base = { id: `${MANUAL_PREFIX}${query}`, query, addedAt: today };
  if (!c) return { ...base, track: 'T2', family: familyOf(query), action: { type: 'new', target: null } };
  const end = peakEnd(c.writeBy, c.peakMonth);
  return {
    ...base,
    track: 'T3',
    family: c.family ?? 'A',
    cluster: c.query,
    calculator: c.calculator ?? null,
    kind: c.kind,
    inWindow: today >= c.writeBy && today <= end,
    note: c.note,
    action: calendarAction(c),
  };
}

const MANUAL_FIELDS = ['id', 'query', 'track', 'family', 'cluster', 'calculator', 'kind', 'inWindow', 'note', 'action', 'addedAt'];

/**
 * 이전 큐의 '빈틈:' 항목(21일 안)을 이번 후보에 다시 넣는다. 검색량·실측·점수는 이번 실행이 다시 붙이도록
 * 원래 입력 필드만 남긴다. 상태(hold 등)는 mergeQueue 가 옮긴다. 같은 검색어가 이미 후보면 넣지 않는다.
 */
export function carryManual(prev, candidates, today) {
  const have = new Set((candidates ?? []).map((c) => norm(c.query)));
  return (prev ?? [])
    .filter(
      (i) =>
        String(i.id).startsWith(MANUAL_PREFIX) &&
        i.addedAt &&
        daysBetween(i.addedAt, today) <= MANUAL_KEEP_DAYS &&
        !have.has(norm(i.query)),
    )
    .map((i) => Object.fromEntries(MANUAL_FIELDS.filter((k) => i[k] !== undefined).map((k) => [k, i[k]])));
}

/** src/app/guide/page.tsx 의 GUIDES 배열에서 {slug, title} 목록 */
export function parseGuideIndex(src) {
  const re = /slug:\s*'([^']+)',\s*\r?\n\s*title:\s*(?:'((?:\\.|[^'\\])*)'|"((?:\\.|[^"\\])*)")/g;
  return [...String(src).matchAll(re)].map((m) => ({ slug: m[1], title: (m[2] ?? m[3]).replace(/\\(.)/g, '$1') }));
}

/** 가이드 제목에 검색어가 통째로(공백 무시) 들어 있으면 그 글 slug. 없으면 null. */
export function coverageOf(query, guides) {
  const nq = norm(query);
  return guides.find((g) => norm(g.title).includes(nq))?.slug ?? null;
}

/**
 * 새 큐에 운영자가 바꾼 상태를 옮기고, 손으로 넣은 '빈틈:' 항목은 21일 보존한다.
 * @param {object[]} prev  이전 큐 items
 * @param {object[]} next  이번에 만든 items
 * @param {string} today   KST YYYY-MM-DD
 */
export function mergeQueue(prev, next, today) {
  const prevById = new Map((prev ?? []).map((i) => [i.id, i]));
  const merged = next.map((i) => {
    const p = prevById.get(i.id);
    if (p && KEEP_STATUSES.has(p.status)) {
      return { ...i, status: p.status, statusAt: p.statusAt, ...(p.publishedSlug ? { publishedSlug: p.publishedSlug } : {}) };
    }
    return i;
  });
  const nextIds = new Set(next.map((i) => i.id));
  const manual = (prev ?? []).filter(
    (i) =>
      String(i.id).startsWith(MANUAL_PREFIX) &&
      !nextIds.has(i.id) &&
      i.addedAt &&
      daysBetween(i.addedAt, today) <= MANUAL_KEEP_DAYS,
  );
  return [...merged, ...manual];
}

/**
 * 목록 정렬: 노출 점수 높은 순, 점수가 같으면 하루 달러(모르면 검색량) 큰 순. 원본 배열은 건드리지 않는다.
 * 운영자 지시(2026-10-10): "점수 높은 순서로".
 */
export function rankByScore(items, usd) {
  const size = (i) => usd(i) ?? i.recent7 ?? 0;
  return [...items].sort((a, b) => (b.exposure?.score ?? -1) - (a.exposure?.score ?? -1) || size(b) - size(a));
}
