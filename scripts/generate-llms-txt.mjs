#!/usr/bin/env node
/**
 * public/llms.txt 자동 갱신 (AUTO 마커 구간만).
 *
 * 배경 (2026-08-12 SEO 감사): llms.txt 가 "계산기 30종(2026-05 기준)" 에서 멈춰 있었고
 * 가이드 313편이 단 하나도 실려 있지 않았다. LLM 인용 유도 표면(GEO)을 통째로 낭비한 셈.
 * 수기 관리는 반드시 다시 낡으므로 소스에서 생성한다.
 *
 * 갱신 대상 (마커 밖은 절대 건드리지 않음):
 *   <!-- AUTO:COUNTS:START --> ... <!-- AUTO:COUNTS:END -->
 *   <!-- AUTO:GUIDES:START --> ... <!-- AUTO:GUIDES:END -->
 *
 * [revenue-lever: traffic] — LLM/AI 검색 인용 표면 확대.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BASE = 'https://calculatorhost.com';

function countDirs(dir, exclude = []) {
  if (!fs.existsSync(dir)) return 0;
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !exclude.includes(e.name)).length;
}

/** src/app/guide/page.tsx 의 GUIDES 배열에서 slug·title·category 추출. */
export function parseGuides(src) {
  const out = [];
  const re = /\{\s*slug:\s*'([^']+)'[\s\S]*?title:\s*'((?:\\.|[^'\\])*)'[\s\S]*?category:\s*'([^']*)'/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    out.push({ slug: m[1], title: m[2].replace(/\\'/g, "'"), category: m[3] });
  }
  return out;
}

function replaceBlock(text, marker, body) {
  const start = `<!-- AUTO:${marker}:START -->`;
  const end = `<!-- AUTO:${marker}:END -->`;
  const re = new RegExp(`${start}[\\s\\S]*?${end}`);
  if (!re.test(text)) {
    throw new Error(`llms.txt 에 ${start} ~ ${end} 마커가 없습니다.`);
  }
  return text.replace(re, `${start}\n${body}\n${end}`);
}

export function buildGuideBlock(guides) {
  const byCategory = new Map();
  for (const g of guides) {
    const key = g.category || '기타';
    if (!byCategory.has(key)) byCategory.set(key, []);
    byCategory.get(key).push(g);
  }
  const lines = [];
  for (const [category, items] of [...byCategory].sort((a, b) => b[1].length - a[1].length)) {
    lines.push(`### ${category} (${items.length}편)`);
    lines.push('');
    for (const g of items.sort((a, b) => a.slug.localeCompare(b.slug))) {
      lines.push(`- [${g.title}](${BASE}/guide/${g.slug}/)`);
    }
    lines.push('');
  }
  return lines.join('\n').trimEnd();
}

const isCli = process.argv[1]
  ? fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
  : false;

if (isCli) {
  const llmsPath = path.join(ROOT, 'public', 'llms.txt');
  const guideIndex = path.join(ROOT, 'src', 'app', 'guide', 'page.tsx');

  const guides = parseGuides(fs.readFileSync(guideIndex, 'utf8'));
  const calcCount = countDirs(path.join(ROOT, 'src', 'app', 'calculator'));

  let text = fs.readFileSync(llmsPath, 'utf8');
  text = replaceBlock(text, 'COUNTS', `- 계산기: ${calcCount}종\n- 가이드: ${guides.length}편`);
  text = replaceBlock(text, 'GUIDES', buildGuideBlock(guides));
  fs.writeFileSync(llmsPath, text, 'utf8');

  console.log(`[llms.txt] 계산기 ${calcCount}종 · 가이드 ${guides.length}편 반영 완료`);
}
