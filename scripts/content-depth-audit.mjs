#!/usr/bin/env node
/**
 * 콘텐츠 깊이 감사 (Content Depth Audit)
 *
 * 목적: 배포전 AdSense '가치 낮은 콘텐츠' 판정 회피 가드(가이드라인 G5).
 * out/calculator/**\/index.html 의 렌더된 본문 한글 글자수를 측정하여
 * 얇은(thin) 페이지를 리포트한다. (계산기 UI 라벨 포함 근사치이므로
 * 의도적 저CPC 유틸(BMI·D-day 등)은 floor 미만이어도 정상 — 진단용, 비차단 기본.)
 *
 * SSoT: .claude/rules/calculators.md '본문 2000자 하한'.
 * 의존성 0. CLI 가드 분리로 단위 테스트 가능(section-citation-audit.mjs 패턴).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const KOREAN_RE = /[가-힣]/g;

/** 렌더된 HTML → 가시 본문 텍스트 (script/style 제거 + main 영역 추출 + 태그 제거). */
export function stripHtmlToText(html) {
  let s = String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ');
  const main = s.match(/<main[^>]*id="main-content"[^>]*>([\s\S]*?)<\/main>/i);
  if (main) s = main[1];
  s = s.replace(/<[^>]+>/g, ' ');
  s = s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&quot;/g, '"');
  return s.replace(/\s+/g, ' ').trim();
}

/** 텍스트 내 한글(음절) 글자수. */
export function countKorean(text) {
  const m = String(text).match(KOREAN_RE);
  return m ? m.length : 0;
}

/** out/calculator 디렉터리를 감사. floor 미만 한글 글자수 페이지를 thin 으로 표기. */
export function auditCalculators(outCalcDir, floor = 2000) {
  if (!fs.existsSync(outCalcDir)) {
    return { results: [], floor, missing: true };
  }
  const results = [];
  for (const slug of fs.readdirSync(outCalcDir)) {
    const htmlPath = path.join(outCalcDir, slug, 'index.html');
    if (!fs.existsSync(htmlPath)) continue;
    const text = stripHtmlToText(fs.readFileSync(htmlPath, 'utf8'));
    const korean = countKorean(text);
    results.push({ slug, korean, total: text.length, thin: korean < floor });
  }
  results.sort((a, b) => a.korean - b.korean);
  return { results, floor, missing: false };
}

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
