#!/usr/bin/env node
/**
 * §N (법조항) 인용 audit.
 *
 * YMYL E-E-A-T 신호: 계산기·가이드 페이지마다 최소 1개 이상의 법조항을 인용해야
 * Google·LLM 이 신뢰 신호로 인식. calc-logic-verifier + seo-auditor 합의.
 *
 * 분류:
 *   - missing: 0개 (즉시 보강 필요)
 *   - minimal: 1~2개 (보강 권장)
 *   - strong: 3개 이상 (적정)
 *
 * 의존성 0. CLI 가드로 단위 테스트 가능.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * §N + 제N조 + 제N조의M 패턴 모두 카운트.
 *  - §148, §148의4
 *  - 제111조, 제13의2조, 제111조의2
 */
import {
  countCitations,
  CITATION_EXEMPT,
  partitionMissing,
  classifyCitations,
} from './section-citation-core.mjs';
export {
  countCitations,
  CITATION_EXEMPT,
  partitionMissing,
  classifyCitations,
} from './section-citation-core.mjs';

// ─── CLI 가드 ──────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const STATE_FILE = path.join(ROOT_DIR, '.claude', 'STATE.md');

function listCalculatorAndGuidePages(appDir) {
  const out = [];
  function walk(dir, base = '') {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = base ? path.join(base, entry.name) : entry.name;
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(abs, rel);
      } else if (entry.isFile() && entry.name === 'page.tsx') {
        const route = '/' + rel.replace(/\\/g, '/').replace(/page\.tsx$/, '');
        if (route.startsWith('/calculator/') || route.startsWith('/guide/')) {
          out.push({ path: route, abs });
        }
      }
    }
  }
  walk(appDir);
  return out;
}

const isCli = process.argv[1]
  ? fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
  : false;

if (isCli) {
  const appDir = path.join(ROOT_DIR, 'src', 'app');
  const pages = listCalculatorAndGuidePages(appDir);

  const entries = pages.map(({ path: p, abs }) => {
    const src = fs.readFileSync(abs, 'utf8');
    return { path: p, count: countCitations(src) };
  });

  const result = classifyCitations(entries);
  console.log(`\n📋 §N 법조항 인용 audit (${entries.length}개 페이지)\n`);
  console.log(`  ✅ strong (3+): ${result.strong.length}`);
  console.log(`  🟡 minimal (1~2): ${result.minimal.length}`);
  console.log(`  🔴 missing (0): ${result.missing.length}\n`);

  const { blocking, exempted } = partitionMissing(result.missing);

  if (blocking.length > 0) {
    console.log(`🔴 §N 인용 0건 — 게이트 차단 (즉시 보강 필요):`);
    for (const p of blocking) console.log(`  - ${p}`);
    console.log('');
  }
  if (exempted.length > 0) {
    console.log(`⚪ §N 인용 0건 — 명시 면제 (${exempted.length}개, 사유 등재됨):`);
    for (const p of exempted) console.log(`  - ${p}  · ${CITATION_EXEMPT[p]}`);
    console.log('');
  }
  if (result.minimal.length > 0) {
    console.log(`🟡 §N 인용 1~2건 페이지 (보강 권장):`);
    for (const p of result.minimal) console.log(`  - ${p}`);
    console.log('');
  }

  // STATE.md 알려진 이슈 섹션에 누락 페이지 기록 (수동 영역, 마커 없음 → 운영자 검토)
  const total = blocking.length + result.minimal.length;
  if (total > 0) {
    console.log(`📌 보강 필요 합계: ${total}개 페이지 (면제 ${exempted.length}개 제외)`);
    console.log(`   STATE.md "8. 알려진 이슈" 섹션에 추가 권장.\n`);
  }

  // 면제 등재되지 않은 0건 페이지만 게이트를 막는다.
  process.exit(blocking.length > 0 ? 1 : 0);
}
