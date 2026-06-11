#!/usr/bin/env node
/**
 * GSC 기회분석 리포트 (의존성 0).
 *
 * .claude/reports/gsc-latest.json 을 읽어 "어디를 밀면 트래픽이 가장 빨리 느나"를
 * 사람·Claude 가 바로 행동할 수 있는 형태로 정리한다.
 *
 * 분류:
 *   🎯 1페이지 직전   : 순위 8~20위(2페이지) + 노출↑ → 내부링크·도표로 밀면 1페이지 가능
 *   🖱 CTR 회수       : 1페이지(≤10위)인데 클릭 0 → 제목·스니펫·답블록 손볼 것
 *   ✅ 안착           : ≤5위 — 잘 되는 페이지(유지)
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

lines.push('## 🎯 1페이지 직전 (밀면 가장 빨리 트래픽) — 우선순위 순');
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

lines.push('## 🖱 CTR 회수 (1페이지인데 클릭 0) — 제목·스니펫 손볼 것');
lines.push('');
if (ctrRecover.length === 0) {
  lines.push('_해당 없음_');
} else {
  lines.push('| 페이지 | 순위 | 노출 | 권장 |');
  lines.push('|---|---|---|---|');
  ctrRecover.slice(0, 10).forEach((p) => {
    lines.push(`| ${path(p.key)} | ${pos(p.position)} | ${p.impressions} | title/description를 검색어에 맞춰 조정 |`);
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
lines.push('_다음 단계: 🎯 목록 상위부터 내부링크·도표로 보완 → 1~2주 뒤 재측정. 세율·§N 수치는 1차출처 검증 필수(자동 금지)._');

writeFileSync(OUT_PATH, lines.join('\n'), 'utf8');
console.log(`[gsc-report] 저장: ${OUT_PATH}`);
console.log(`  🎯 1페이지 직전 ${nearPage1.length} · 🖱 CTR 회수 ${ctrRecover.length} · ✅ 안착 ${settled.length}`);
