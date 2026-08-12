#!/usr/bin/env node
/**
 * 콘텐츠 깊이 감사 (Content Depth Audit) — CLI 진입점.
 *
 * 순수 로직은 shebang 없는 scripts/content-depth-core.mjs 로 분리했다.
 * (shebang 이 있는 파일은 vitest 가 변환하지 못해 테스트 수집이 실패 — STATE.md §8)
 *
 * 목적: 배포전 AdSense '가치 낮은 콘텐츠' 판정 회피 가드(가이드라인 G5).
 * SSoT: .claude/rules/calculators.md '본문 2000자 하한'.
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { stripHtmlToText, countKorean, auditCalculators } from './content-depth-core.mjs';

// 기존 import 경로 호환 유지
export { stripHtmlToText, countKorean, auditCalculators };

// ─── CLI 가드 ─────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const isCli = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);

if (isCli) {
  const strict = process.argv.includes('--strict');
  const ROOT = path.join(path.dirname(__filename), '..');
  const outCalcDir = path.join(ROOT, 'out', 'calculator');
  const { results, floor, missing } = auditCalculators(outCalcDir);

  if (missing) {
    console.error('⚠️  out/calculator 없음. 먼저 `npm run build` 를 실행하세요.');
    process.exit(strict ? 1 : 0);
  }

  console.log('\n📏 콘텐츠 깊이 감사 (본문 한글 글자수, 계산기 UI 포함 근사)\n');
  console.log(`  기준(floor): ${floor}자   ·   페이지: ${results.length}개\n`);
  const thin = results.filter((r) => r.thin);
  for (const r of results) {
    const mark = r.thin ? '🔴' : '✅';
    console.log(`  ${mark} ${String(r.korean).padStart(6)}자  /calculator/${r.slug}/`);
  }
  console.log(`\n  얇은 페이지(${floor}자 미만): ${thin.length}개` + (thin.length ? ` — ${thin.map((r) => r.slug).join(', ')}` : ''));
  console.log('  (BMI·D-day·평수 등 의도적 저CPC 유틸은 미끼 페이지로 허용 — 운영자 판단)\n');

  process.exit(strict && thin.length > 0 ? 1 : 0);
}
