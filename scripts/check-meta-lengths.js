#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 한글 + 영문 문자 개수 계산
function countChars(str) {
  // 공백 제외하고 실제 표시 문자만
  return str.replace(/\s/g, '').length;
}

// TypeScript 파일에서 metadata 객체 찾기
function parseMetadata(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // metadata 객체 단순 정규식 추출 (복잡한 중첩은 무시)
  const titleMatch = content.match(/title:\s*['"`](.*?)['"`]/);
  const descMatch = content.match(/description:\s*\n?\s*['"`](.*?)['"`]/s);

  return {
    title: titleMatch ? titleMatch[1] : null,
    description: descMatch ? descMatch[1] : null
  };
}

// 모든 page.tsx 재귀 탐색
function getAllPageFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllPageFiles(fullPath));
    } else if (entry.name === 'page.tsx') {
      files.push(fullPath);
    }
  }

  return files;
}

const appDir = path.join(__dirname, '../src/app');
const pageFiles = getAllPageFiles(appDir);

console.log(`\n✓ 발견된 page.tsx 파일: ${pageFiles.length}\n`);

const results = [];
const violations = {
  title: [],
  description: [],
  both: []
};

for (const filePath of pageFiles) {
  const meta = parseMetadata(filePath);

  if (!meta.title || !meta.description) {
    continue;
  }

  const titleLen = countChars(meta.title);
  const descLen = countChars(meta.description);

  const titleOk = titleLen <= 60;
  const descOk = descLen >= 100 && descLen <= 155;

  const relativePath = path.relative(appDir, filePath);

  results.push({
    path: relativePath,
    title: meta.title,
    titleLen,
    titleOk,
    description: meta.description,
    descLen,
    descOk
  });

  if (!titleOk && !descOk) {
    violations.both.push({ path: relativePath, titleLen, descLen });
  } else if (!titleOk) {
    violations.title.push({ path: relativePath, len: titleLen });
  } else if (!descOk) {
    violations.description.push({ path: relativePath, len: descLen });
  }
}

// 결과 출력
console.log('=== 메타데이터 길이 검증 결과 ===\n');
console.log(`총 분석 페이지: ${results.length}`);
console.log(`✅ 정상: ${results.length - violations.title.length - violations.description.length - violations.both.length}`);
console.log(`❌ title 위반: ${violations.title.length}`);
console.log(`❌ description 위반: ${violations.description.length}`);
console.log(`❌ 둘 다 위반: ${violations.both.length}`);
console.log(`❌ 총 위반: ${violations.title.length + violations.description.length + violations.both.length}\n`);

if (violations.title.length > 0) {
  console.log('--- title 초과 (60자 이내 권장) ---');
  for (const v of violations.title) {
    console.log(`[${v.len}자] ${v.path}`);
  }
  console.log();
}

if (violations.description.length > 0) {
  console.log('--- description 부적절 (100~155자 권장) ---');
  for (const v of violations.description) {
    console.log(`[${v.len}자] ${v.path}`);
  }
  console.log();
}

if (violations.both.length > 0) {
  console.log('--- title + description 둘 다 위반 ---');
  for (const v of violations.both) {
    console.log(`title: ${v.titleLen}자, description: ${v.descLen}자 — ${v.path}`);
  }
  console.log();
}

// 샘플 출력 (정상 5개, 위반 샘플 5개)
console.log('--- 샘플: 정상 페이지 (5개) ---');
const goodSamples = results.filter(r => r.titleOk && r.descOk).slice(0, 5);
for (const r of goodSamples) {
  console.log(`✅ [title ${r.titleLen}자, desc ${r.descLen}자] ${r.path}`);
}

if (violations.description.length > 0) {
  console.log('\n--- 샘플: description 위반 (5개) ---');
  for (const v of violations.description.slice(0, 5)) {
    const r = results.find(x => x.path === v.path);
    console.log(`❌ [${v.len}자] ${v.path}`);
    console.log(`   "${r.description.substring(0, 80)}..."`);
  }
}
