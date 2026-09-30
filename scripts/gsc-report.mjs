#!/usr/bin/env node
/**
 * GSC 기회분석 리포트 (의존성 0).
 *
 * .claude/reports/gsc-latest.json 을 읽어 "어디를 밀면 트래픽이 가장 빨리 느나"를
 * 사람·Claude 가 바로 행동할 수 있는 형태로 정리한다.
 *
 * 분류:
 *   📏 판정 지표      : 익명 노출 비율 + 헤드텀 순위 (12/31 판정 기준, STATE.md §7)
 *   🎯 1페이지 직전   : 참고용. 작업 할 일로 쓰지 않는다 (아래 2026-09-30 사유)
 *   🖱 CTR 회수       : 참고용. 작업 할 일로 쓰지 않는다
 *   ✅ 안착           : ≤5위 — 잘 되는 페이지(유지)
 *
 * 2026-09-30 강등 사유: 사이트 4~10위 CTR 0.53% 가 업계 곡선(AWR 2026-07, 0.46~1.71%)
 * 안에 있어 메울 격차가 없고, 6~7월 같은 페이지에 제목·링크 작업을 커밋 6개로 했지만
 * 클릭이 늘지 않았다. 노출의 92% 가 익명 희소 쿼리라 겨냥할 검색어도 보이지 않는다.
 * 이 리포트가 매번 CTR·리프트 할 일을 되살리지 않도록 참고 섹션으로만 남긴다.
 * 근거: .claude/reports/adsense-90day-plan-2026-09-30.md
 *
 * 사용: node scripts/gsc-report.mjs   → .claude/reports/gsc-opportunities.md
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const IN_PATH = resolve(process.cwd(), '.claude/reports/gsc-latest.json');
const OUT_PATH = resolve(process.cwd(), '.claude/reports/gsc-opportunities.md');

if (!existsSync(IN_PATH)) {
  console.error(`[gsc-report] 입력 없음: ${IN_PATH}`);
  console.error('  → 먼저 node scripts/gsc-pull.mjs (또는 --mock) 실행.');
  process.exit(2);
}

const data = JSON.parse(readFileSync(IN_PATH, 'utf8'));
const pages = data.byPage || [];
const queries = data.byQuery || [];

const path = (u) => u.replace('https://calculatorhost.com', '') || u;
const pct = (n) => `${(n * 100).toFixed(1)}%`;
const pos = (n) => n.toFixed(1);

// 우선순위 점수: 노출 많고 + 1페이지에 가까울수록 높음 (8~20위 구간에서 의미)
const liftScore = (p) => p.impressions / Math.max(p.position - 9, 1);

const nearPage1 = pages
  .filter((p) => p.position >= 8 && p.position <= 20 && p.impressions >= 3)
  .sort((a, b) => liftScore(b) - liftScore(a));

const ctrRecover = pages
  .filter((p) => p.position < 8 && p.clicks === 0 && p.impressions >= 3)
  .sort((a, b) => b.impressions - a.impressions);

const settled = pages
  .filter((p) => p.position <= 5)
  .sort((a, b) => b.impressions - a.impressions);

const totalClicks = pages.reduce((s, p) => s + p.clicks, 0);
const totalImpr = pages.reduce((s, p) => s + p.impressions, 0);
const avgPos = pages.length ? pages.reduce((s, p) => s + p.position * p.impressions, 0) / (totalImpr || 1) : 0;

// 익명(희소) 쿼리 노출 비율: GSC 는 소수 사용자 쿼리를 쿼리 리포트에서 숨긴다.
// 페이지 합과 쿼리 합의 차이가 곧 "아무도 거의 안 치는 검색어" 에서 나온 노출이다.
const queryImpr = queries.reduce((s, q) => s + q.impressions, 0);
const anonRatio = totalImpr ? 1 - queryImpr / totalImpr : 0;

// 12/31 판정 헤드텀 (기준선 2026-08-31~09-28 순위). STATE.md §7 과 동기 유지.
const HEAD_TERMS = [
  ['상속세 계산기', 60],
  ['증여세 계산기', 51],
  ['dti 계산기', 41],
  ['종합부동산세 계산기', 44],
  ['재산세 계산기', 46],
  ['자동차세 계산기', 34],
  ['청약가점 계산기', 30],
  ['주택담보대출 한도 계산기', 76],
  ['프리랜서 종합소득세 계산기', 50],
];
const JUDGE_TERMS = new Set(['상속세 계산기', '증여세 계산기', 'dti 계산기']);
const norm = (s) => s.replace(/\s+/g, '').toLowerCase();
const headRows = HEAD_TERMS.map(([term, base]) => {
  const q = queries.find((x) => norm(x.key) === norm(term));
  return { term, base, q };
});
const judgeHit = headRows.some((r) => JUDGE_TERMS.has(r.term) && r.q && r.q.position <= 20);
const clickHit = totalClicks >= 30;

// 액션 매핑 (페이지 종류별 권장 보완)
function action(p) {
  const u = p.key;
  if (u.includes('/calculator/')) return '내부링크 보강(같은 클러스터 가이드→이 계산기) + 도표/즉답 블록';
  if (u.includes('/guide/')) return '관련 계산기·가이드 cross-link + 답블록 첫문장 결론화';
  return '내부링크 보강';
}

const lines = [];
lines.push('# GSC 기회분석 리포트');
lines.push('');
lines.push(`> 생성 데이터: ${data.fetchedAt}${data.range.mock ? ' · ⚠️ MOCK(샘플)' : ''}`);
lines.push(`> 기간: ${data.range.startDate} ~ ${data.range.endDate} (${data.range.days}일)`);
lines.push('');
lines.push(`**요약**: 노출 ${totalImpr} · 클릭 ${totalClicks} · 평균순위 ${pos(avgPos)} · 페이지 ${pages.length} · 쿼리 ${queries.length}`);
lines.push('');

lines.push('## 📏 판정 지표 (12/31 기준, STATE.md §7)');
lines.push('');
lines.push(`- 익명 노출 비율: **${pct(anonRatio)}** (기준선 92.3%) — 쿼리 합 ${queryImpr} / 페이지 합 ${totalImpr}`);
lines.push(`- 28일 클릭: **${totalClicks}** (기준선 14, 유지 조건 ≥ 30) → ${clickHit ? '충족' : '미달'}`);
lines.push(`- 상속세·증여세·dti 계산기 중 20위 이내: ${judgeHit ? '있음 (충족)' : '없음 (미달)'}`);
lines.push('');
lines.push('| 헤드텀 | 기준선 순위 | 현재 순위 | 노출 | 클릭 |');
lines.push('|---|---|---|---|---|');
headRows.forEach(({ term, base, q }) => {
  lines.push(`| ${term} | ${base} | ${q ? pos(q.position) : '-'} | ${q ? q.impressions : 0} | ${q ? q.clicks : 0} |`);
});
lines.push('');
lines.push('_순위 ±10위 변동은 잡음으로 본다. 판정은 28일 창 1회가 아니라 STATE.md §7 규칙(계절·코어 업데이트 보정)을 따른다._');
lines.push('');

lines.push('## 🎯 1페이지 직전 — 참고용 (작업 금지, 2026-09-30)');
lines.push('');
if (nearPage1.length === 0) {
  lines.push('_해당 없음(8~20위·노출 3+ 페이지 없음)_');
} else {
  lines.push('| # | 페이지 | 순위 | 노출 | 클릭 | 권장 보완 |');
  lines.push('|---|---|---|---|---|---|');
  nearPage1.slice(0, 12).forEach((p, i) => {
    lines.push(`| ${i + 1} | ${path(p.key)} | ${pos(p.position)} | ${p.impressions} | ${p.clicks} | ${action(p)} |`);
  });
}
lines.push('');

lines.push('## 🖱 1페이지인데 클릭 0 — 참고용 (제목·스니펫 작업 금지, 2026-09-30)');
lines.push('');
if (ctrRecover.length === 0) {
  lines.push('_해당 없음_');
} else {
  lines.push('| 페이지 | 순위 | 노출 | 권장 |');
  lines.push('|---|---|---|---|');
  ctrRecover.slice(0, 10).forEach((p) => {
    lines.push(`| ${path(p.key)} | ${pos(p.position)} | ${p.impressions} | 참고만 (CTR 격차 없음) |`);
  });
}
lines.push('');

lines.push('## ✅ 안착(≤5위) — 유지');
lines.push('');
if (settled.length === 0) {
  lines.push('_아직 없음_');
} else {
  settled.slice(0, 10).forEach((p) => lines.push(`- ${path(p.key)} (${pos(p.position)}위, 노출 ${p.impressions})`));
}
lines.push('');

lines.push('## 🔑 상위 노출 쿼리 (수요 신호)');
lines.push('');
queries
  .slice()
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 15)
  .forEach((q) => lines.push(`- "${q.key}" — 노출 ${q.impressions} · 클릭 ${q.clicks} · ${pos(q.position)}위`));
lines.push('');
lines.push('---');
lines.push('_다음 단계: 판정 지표만 추적한다. 🎯·🖱 목록으로 제목·링크 작업을 만들지 말 것(2026-09-30 검증 기각). 실행 계획은 .claude/reports/adsense-90day-plan-2026-09-30.md._');

writeFileSync(OUT_PATH, lines.join('\n'), 'utf8');
console.log(`[gsc-report] 저장: ${OUT_PATH}`);
console.log(`  📏 익명 ${pct(anonRatio)} · 클릭 ${totalClicks} (${clickHit ? '≥30' : '<30'}) · 헤드텀 20위내 ${judgeHit ? '있음' : '없음'} · ✅ 안착 ${settled.length}`);
