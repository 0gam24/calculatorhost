#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 한글 글자수 계산 (코드포인트 기준)
function countKoreanChars(str) {
  return Array.from(str).length;
}

// 정규식으로 metadata 객체 추출
function extractMetadata(content) {
  // metadata = { ... } 패턴 찾기
  const match = content.match(/export const metadata[:\s]*=\s*{([\s\S]*?)^}/m);
  if (!match) return null;

  const metadataBlock = match[1];

  // title 추출
  const titleMatch = metadataBlock.match(/title[:\s]*['"](.*?)['"]/);
  const title = titleMatch ? titleMatch[1] : '';

  // description 추출
  const descMatch = metadataBlock.match(/description[:\s]*['"](.*?)['"]/);
  const description = descMatch ? descMatch[1] : '';

  return { title, description };
}

// 모든 page.tsx 파일 탐색
const appDir = path.join(__dirname, '../src/app');
const files = [];

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name === 'page.tsx') {
      files.push(fullPath);
    }
  }
}

walkDir(appDir);

// 측정 및 결과 수집
const results = [];
let violationCount = 0;

for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const metadata = extractMetadata(content);

  if (!metadata) {
    continue;
  }

  const { title, description } = metadata;
  const titleLen = countKoreanChars(title);
  const descLen = countKoreanChars(description);

  // title은 60자, description은 100~155자 기준
  const titleViolation = titleLen > 60;
  const descViolation = descLen < 100 || descLen > 155;
  const violation = titleViolation || descViolation;

  if (violation) {
    violationCount++;
  }

  const relativePath = path.relative(appDir, filePath);
  const category = relativePath.split(path.sep)[0]; // calculator, guide, category 등

  results.push({
    path: relativePath,
    category,
    title,
    titleLen,
    description,
    descLen,
    titleViolation,
    descViolation,
    violation
  });
}

// 결과 정렬 및 출력
results.sort((a, b) => {
  // 위반 먼저, 그 다음 카테고리 순
  if (a.violation !== b.violation) return b.violation ? 1 : -1;
  return a.category.localeCompare(b.category);
});

console.log('=== 메타데이터 길이 측정 결과 ===\n');

// 요약
const calcViolations = results.filter(r => r.category === 'calculator' && r.violation).length;
const guideViolations = results.filter(r => r.category === 'guide' && r.violation).length;
const otherViolations = results.filter(r => r.category !== 'calculator' && r.category !== 'guide' && r.violation).length;

console.log(`총 페이지: ${results.length}`);
console.log(`위반 페이지: ${violationCount} (계산기 ${calcViolations}, 가이드 ${guideViolations}, 기타 ${otherViolations})`);
console.log('\n--- 위반 페이지 상세 ---\n');

for (const r of results.filter(r => r.violation)) {
  console.log(`[${r.category}] ${r.path}`);
  if (r.titleViolation) {
    console.log(`  ❌ title: ${r.titleLen}자 (권장 60자 이내)`);
    console.log(`     "${r.title}"`);
  }
  if (r.descViolation) {
    const status = r.descLen < 100 ? '미만' : '초과';
    console.log(`  ❌ description: ${r.descLen}자 (권장 100~155자, 현재 ${status})`);
    console.log(`     "${r.description}"`);
  }
  console.log();
}

// JSON으로도 저장
const reportPath = path.join(__dirname, '../.claude/measure-meta-report.json');
fs.writeFileSync(reportPath, JSON.stringify({
  timestamp: new Date().toISOString(),
  summary: {
    total: results.length,
    violations: violationCount,
    byCategory: {
      calculator: results.filter(r => r.category === 'calculator').length,
      calculatorViolations: calcViolations,
      guide: results.filter(r => r.category === 'guide').length,
      guideViolations: guideViolations,
      other: results.filter(r => r.category !== 'calculator' && r.category !== 'guide').length,
      otherViolations: otherViolations
    }
  },
  violations: results.filter(r => r.violation)
}, null, 2));

console.log(`\n리포트 저장: ${reportPath}`);
