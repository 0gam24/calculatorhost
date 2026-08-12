/**
 * 콘텐츠 깊이 감사 — 순수 로직 코어.
 *
 * shebang 이 있는 CLI 파일은 vitest(vite) 가 변환하지 못해 테스트 수집이 실패한다.
 * STATE.md §8 이 지정한 항구적 해결책(= cli.mjs / core.mjs 분리)을 적용한 파일.
 * CLI 진입점은 scripts/content-depth-audit.mjs 가 담당하고 여기서 로직을 가져다 쓴다.
 *
 * 목적: AdSense '가치 낮은 콘텐츠' 판정 회피 가드(가이드라인 G5).
 * SSoT: .claude/rules/calculators.md '본문 2000자 하한'.
 */

import fs from 'node:fs';
import path from 'node:path';

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
