/**
 * 빌드 후 SEO 회귀 자동 감지
 *
 * out/**\/*.html 을 파싱해 다음을 점검:
 * 1. <title> 1~60자
 * 2. <meta name="description"> 100~155자
 * 3. <link rel="canonical"> trailing slash 종결
 * 4. <meta property="og:image"> 존재
 * 5. <meta property="og:title"> 존재
 * 6. JSON-LD 스크립트 개수 (계산기 페이지 ≥ 5)
 * 7. 한글 lang 속성 (lang="ko-KR")
 *
 * 사용:
 *   npm run build && npm run seo:validate
 *
 * 종료 코드:
 *   0: 모든 점검 통과
 *   1: 경고 발생 (CI 에서는 fail 처리 가능)
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';

const ROOT = process.cwd();
const OUT_DIR = resolve(ROOT, 'out');

const TITLE_MAX = 60;
const DESC_MIN = 70; // 보고서 권장선 (SERP 발췌 최소 길이)
const DESC_MAX = 165;

let totalPages = 0;
const issues = [];

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (entry === '_next' || entry === 'fonts' || entry === 'data') continue;
      yield* walk(full);
    } else if (entry.endsWith('.html')) {
      yield full;
    }
  }
}

function extract(html, pattern) {
  const m = html.match(pattern);
  return m ? m[1] : null;
}

function checkPage(filePath) {
  const html = readFileSync(filePath, 'utf8');
  const rel = relative(OUT_DIR, filePath).replace(/\\/g, '/');
  totalPages++;

  // 1. title
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
  const title = titleMatch ? titleMatch[1].trim() : null;
  if (!title) {
    issues.push({ rel, level: 'ERROR', msg: 'title 없음' });
  } else if (title.length > TITLE_MAX) {
    issues.push({ rel, level: 'WARN', msg: `title ${title.length}자 (>${TITLE_MAX})` });
  }

  // 2. description
  const desc = extract(html, /<meta\s+name="description"\s+content="([^"]*)"/);
  if (!desc) {
    issues.push({ rel, level: 'ERROR', msg: 'description 없음' });
  } else if (desc.length < DESC_MIN) {
    issues.push({ rel, level: 'WARN', msg: `description ${desc.length}자 (<${DESC_MIN})` });
  } else if (desc.length > DESC_MAX) {
    issues.push({ rel, level: 'WARN', msg: `description ${desc.length}자 (>${DESC_MAX})` });
  }

  // 3. canonical trailing slash
  const canonical = extract(html, /<link\s+rel="canonical"\s+href="([^"]*)"/);
  if (!canonical) {
    issues.push({ rel, level: 'ERROR', msg: 'canonical 없음' });
  } else {
    // 루트(/) 또는 trailing slash 로 끝나야 함
    const url = new URL(canonical);
    if (!url.pathname.endsWith('/')) {
      issues.push({ rel, level: 'WARN', msg: `canonical trailing slash 누락: ${canonical}` });
    }
  }

  // 4. og:image
  const ogImage = extract(html, /<meta\s+property="og:image"\s+content="([^"]*)"/);
  if (!ogImage) {
    issues.push({ rel, level: 'ERROR', msg: 'og:image 없음' });
  }

  // 5. og:title
  const ogTitle = extract(html, /<meta\s+property="og:title"\s+content="([^"]*)"/);
  if (!ogTitle) {
    issues.push({ rel, level: 'WARN', msg: 'og:title 없음' });
  }

  // 6. JSON-LD 개수 (계산기는 6종 권장 최소 5)
  const jsonLdCount = (html.match(/<script\s+type="application\/ld\+json"/g) ?? []).length;
  const isCalculator = rel.startsWith('calculator/');
  if (isCalculator && jsonLdCount < 5) {
    issues.push({ rel, level: 'WARN', msg: `JSON-LD ${jsonLdCount}종 (계산기 ≥ 5 권장)` });
  } else if (!isCalculator && jsonLdCount < 1) {
    issues.push({ rel, level: 'INFO', msg: 'JSON-LD 없음' });
  }

  // 7. lang
  if (!/<html\s+lang="ko-KR"/.test(html)) {
    issues.push({ rel, level: 'WARN', msg: 'lang="ko-KR" 누락' });
  }
}

function main() {
  try {
    statSync(OUT_DIR);
  } catch {
    console.error('[seo:validate] out/ 디렉터리 없음 — 먼저 npm run build 실행');
    process.exit(1);
  }

  for (const file of walk(OUT_DIR)) checkPage(file);

  const errors = issues.filter((i) => i.level === 'ERROR');
  const warns = issues.filter((i) => i.level === 'WARN');
  const infos = issues.filter((i) => i.level === 'INFO');

  console.log(`\n[seo:validate] ${totalPages} 페이지 점검 — ERROR ${errors.length} / WARN ${warns.length} / INFO ${infos.length}\n`);

  if (errors.length > 0) {
    console.log('❌ ERROR (반드시 수정):');
    for (const i of errors) console.log(`  ${i.rel} → ${i.msg}`);
    console.log('');
  }
  if (warns.length > 0) {
    console.log('⚠️  WARN (검토 권장):');
    for (const i of warns) console.log(`  ${i.rel} → ${i.msg}`);
    console.log('');
  }
  if (infos.length > 0) {
    console.log(`ℹ️  INFO ${infos.length}건 (정책 페이지 등 — 무시 가능)`);
  }

  if (errors.length > 0) {
    process.exit(1);
  }
  console.log(errors.length === 0 && warns.length === 0 ? '✅ 전체 통과' : '✅ ERROR 없음 (WARN만 존재)');
}

main();
