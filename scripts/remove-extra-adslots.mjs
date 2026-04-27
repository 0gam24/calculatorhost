#!/usr/bin/env node
/**
 * 각 페이지에서 첫 번째 AdSlot 만 남기고 나머지 모두 제거.
 * 자동 광고가 중간/하단을 채우도록 전환.
 *
 * 처리 패턴:
 *  - <AdSlot ... />  (self-closing, 단일/복수 줄)
 *  - 직전 한 줄 주석 ({/* ... *\/}) 도 함께 제거 (라벨/주석 잔여 방지)
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { glob } from 'node:fs/promises';

const FILES = [
  'src/app/page.tsx',
  'src/app/category/work/page.tsx',
  'src/app/category/tax/page.tsx',
  'src/app/category/real-estate/page.tsx',
  'src/app/category/lifestyle/page.tsx',
  'src/app/category/finance/page.tsx',
  'src/app/calculator/n-jobber-insurance/page.tsx',
  'src/app/calculator/housing-subscription/page.tsx',
  'src/app/calculator/exchange/page.tsx',
  'src/app/calculator/child-tax-credit/page.tsx',
  'src/app/calculator/vehicle-tax/page.tsx',
  'src/app/calculator/severance/page.tsx',
  'src/app/calculator/savings/page.tsx',
  'src/app/calculator/salary/page.tsx',
  'src/app/calculator/retirement/page.tsx',
  'src/app/calculator/rental-yield/page.tsx',
  'src/app/calculator/rent-conversion/page.tsx',
  'src/app/calculator/property-tax/page.tsx',
  'src/app/calculator/loan/page.tsx',
  'src/app/calculator/loan-limit/page.tsx',
  'src/app/calculator/inheritance-tax/page.tsx',
  'src/app/calculator/inflation/page.tsx',
  'src/app/calculator/gift-tax/page.tsx',
  'src/app/calculator/freelancer-tax/page.tsx',
  'src/app/calculator/deposit/page.tsx',
  'src/app/calculator/d-day/page.tsx',
  'src/app/calculator/comprehensive-property-tax/page.tsx',
  'src/app/calculator/capital-gains-tax/page.tsx',
  'src/app/calculator/broker-fee/page.tsx',
  'src/app/calculator/bmi/page.tsx',
  'src/app/calculator/averaging-down/page.tsx',
  'src/app/calculator/area/page.tsx',
  'src/app/calculator/acquisition-tax/page.tsx',
];

/**
 * 텍스트에서 모든 <AdSlot ... /> 블록의 (start, end) 인덱스 배열 반환.
 * self-closing 만 처리 — open/close 페어는 사용 안 함.
 */
function findAdSlotBlocks(text) {
  const blocks = [];
  let i = 0;
  while (i < text.length) {
    const start = text.indexOf('<AdSlot', i);
    if (start === -1) break;
    // 다음 '/>' 찾기 (문자열 안에 들어있을 가능성 낮음 — JSX 단순 가정)
    const end = text.indexOf('/>', start);
    if (end === -1) break;
    blocks.push({ start, end: end + 2 });
    i = end + 2;
  }
  return blocks;
}

/**
 * 블록 직전의 한 줄짜리 JSX 주석 ({/* ... *\/}) 도 함께 제거 범위에 포함.
 * 그리고 블록 직후 trailing 빈 줄도 1개 흡수해서 빈 줄 누적 방지.
 */
function expandRange(text, start, end) {
  // 직전 라인 시작점 찾기
  let lineStart = text.lastIndexOf('\n', start - 1) + 1;
  const prevLineStart = text.lastIndexOf('\n', lineStart - 2) + 1;
  const prevLine = text.slice(prevLineStart, lineStart);
  // {/* ... */} 한 줄 주석이면 함께 제거
  if (/^\s*\{\/\*[\s\S]*?\*\/\}\s*\n$/.test(prevLine)) {
    lineStart = prevLineStart;
  }
  // 블록 끝 이후 줄 끝까지 + 그 다음 라인이 공백뿐이면 흡수
  let lineEnd = text.indexOf('\n', end);
  if (lineEnd === -1) lineEnd = text.length;
  else lineEnd += 1;
  const nextLineEnd = text.indexOf('\n', lineEnd);
  if (nextLineEnd !== -1) {
    const nextLine = text.slice(lineEnd, nextLineEnd + 1);
    if (/^\s*\n$/.test(nextLine)) {
      lineEnd = nextLineEnd + 1;
    }
  }
  return { rangeStart: lineStart, rangeEnd: lineEnd };
}

let totalRemoved = 0;
const summary = [];

for (const rel of FILES) {
  const path = rel;
  let text;
  try {
    text = readFileSync(path, 'utf8');
  } catch (e) {
    console.error(`SKIP (read failed): ${path}`);
    continue;
  }

  const blocks = findAdSlotBlocks(text);
  if (blocks.length <= 1) {
    summary.push(`${path}: ${blocks.length} block — keep`);
    continue;
  }

  // 첫 번째는 유지, 2번째부터 제거 (뒤에서부터 잘라야 인덱스 안 깨짐)
  const toRemove = blocks.slice(1).reverse();
  let modified = text;
  for (const { start, end } of toRemove) {
    const { rangeStart, rangeEnd } = expandRange(modified, start, end);
    modified = modified.slice(0, rangeStart) + modified.slice(rangeEnd);
  }

  // AdSlot 임포트 사용 횟수 확인 — 0개면 제거 (지금은 1개 남으므로 유지됨)
  // MobileAnchorAd 도 동일 확인
  const adSlotCount = (modified.match(/<AdSlot[\s/>]/g) || []).length;
  // 임포트 문은 그대로 둠 (1개 남았으면 필요)

  if (adSlotCount === 0) {
    // import 라인 제거
    modified = modified.replace(
      /^import\s+\{[^}]*AdSlot[^}]*\}\s+from\s+['"]@\/components\/ads\/AdSlot['"];?\n/gm,
      ''
    );
  }

  // MobileAnchorAd 사용 제거 (자동 광고로 대체)
  // 사용처 + 임포트 함께 정리
  const beforeMobile = modified;
  modified = modified.replace(
    /^\s*\{\/\*[^}]*\*\/\}\s*\n\s*<MobileAnchorAd[^/]*\/>\s*\n/gm,
    ''
  );
  modified = modified.replace(
    /^\s*<MobileAnchorAd[^/]*\/>\s*\n/gm,
    ''
  );
  if (modified !== beforeMobile) {
    modified = modified.replace(
      /^import\s+\{[^}]*MobileAnchorAd[^}]*\}\s+from\s+['"][^'"]+['"];?\n/gm,
      ''
    );
  }

  if (modified !== text) {
    writeFileSync(path, modified, 'utf8');
    const removed = blocks.length - 1;
    totalRemoved += removed;
    summary.push(`${path}: ${blocks.length} → 1 (removed ${removed})`);
  } else {
    summary.push(`${path}: no change`);
  }
}

console.log(summary.join('\n'));
console.log(`\nTotal AdSlot removed: ${totalRemoved}`);
