/**
 * .my 파일 정밀 진단 도구
 *
 * 키 값은 절대 출력하지 않음 — 메타데이터만 검사:
 *  - 파일 존재·크기·인코딩(BOM)·줄바꿈 종류
 *  - 각 키별 채움/빈 상태 (값 길이만)
 *  - 시스템 환경변수와 충돌 여부
 *  - 다른 폴더의 동명 파일이 우선 읽혔는지
 */

import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

const cwd = process.cwd();
console.log(`\n📂 현재 작업 디렉토리: ${cwd}`);
console.log(`   (이 폴더의 .my 가 npm run sync-data 시 읽힘)\n`);

const myPath = resolve(cwd, '.my');
console.log('═══════════════════════════════════════════════════');
console.log(' 1. 파일 존재·기본 정보');
console.log('═══════════════════════════════════════════════════');

if (!existsSync(myPath)) {
  console.log(`❌ ${myPath} 파일 없음`);
  console.log('   → 메모장으로 ".my" 새 파일 만들고 키 입력 필요');
  process.exit(0);
}

const stat = statSync(myPath);
console.log(`✅ 경로: ${myPath}`);
console.log(`   크기: ${stat.size} 바이트`);
console.log(`   수정시각: ${stat.mtime.toISOString()}`);

const buf = readFileSync(myPath);

console.log('\n═══════════════════════════════════════════════════');
console.log(' 2. 인코딩·BOM·줄바꿈 검사');
console.log('═══════════════════════════════════════════════════');

if (buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
  console.log('⚠️  UTF-8 BOM 있음 — 첫 줄 KEY 가 인식 안 될 수 있음');
} else if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) {
  console.log('❌ UTF-16 LE BOM — 메모장이 UTF-16 으로 저장한 경우. UTF-8 로 다시 저장 필요');
} else if (buf.length >= 2 && buf[0] === 0xfe && buf[1] === 0xff) {
  console.log('❌ UTF-16 BE BOM — UTF-8 로 변환 필요');
} else {
  console.log('✅ BOM 없음 (정상 UTF-8)');
}

// 줄바꿈 종류
const text = buf.toString('utf8').replace(/^﻿/, ''); // BOM 제거
const crlfCount = (text.match(/\r\n/g) || []).length;
const loneCRCount = (text.match(/\r(?!\n)/g) || []).length;
const loneLFCount = (text.match(/(?<!\r)\n/g) || []).length;
console.log(`   CRLF(Windows): ${crlfCount}, LF(Unix): ${loneLFCount}, CR(Mac old): ${loneCRCount}`);

console.log('\n═══════════════════════════════════════════════════');
console.log(' 3. 라인별 분석 (값 노출 X, 키 이름 + 길이만)');
console.log('═══════════════════════════════════════════════════');

const lines = text.split(/\r?\n/);
console.log(`총 라인 수: ${lines.length}\n`);

const filled = [];
const emptyValue = [];
const malformed = [];
let comments = 0;
let blanks = 0;

for (let i = 0; i < lines.length; i++) {
  const raw = lines[i];
  const trimmed = raw.trim();

  if (!trimmed) { blanks++; continue; }
  if (trimmed.startsWith('#')) { comments++; continue; }

  const eq = trimmed.indexOf('=');
  if (eq === -1) {
    malformed.push({ line: i + 1, content: trimmed.length > 50 ? trimmed.slice(0, 50) + '...' : trimmed });
    continue;
  }

  const key = trimmed.slice(0, eq).trim();
  let value = trimmed.slice(eq + 1).trim();

  // 따옴표 자동 제거 (값 검증 시 길이만 출력)
  let dequoted = value;
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    dequoted = value.slice(1, -1).trim();
  }

  if (!key) {
    malformed.push({ line: i + 1, content: '(KEY 부분 빈)' });
    continue;
  }

  if (dequoted.length === 0) {
    emptyValue.push({ line: i + 1, key });
  } else {
    filled.push({ line: i + 1, key, length: dequoted.length, hasQuotes: value !== dequoted });
  }
}

console.log(`주석 줄: ${comments}, 빈 줄: ${blanks}, 키=값(채워짐): ${filled.length}, 키=값(빈값): ${emptyValue.length}, 잘못된 형식: ${malformed.length}\n`);

if (filled.length > 0) {
  console.log(`✅ 값이 채워진 키 (${filled.length}개):`);
  for (const f of filled) {
    const note = f.hasQuotes ? ' [따옴표 포함 — 자동 제거됨]' : '';
    console.log(`   line ${String(f.line).padStart(3)}: ${f.key}  (길이: ${f.length})${note}`);
  }
}

if (emptyValue.length > 0) {
  console.log(`\n⊘ 값이 비어있는 키 (${emptyValue.length}개):`);
  for (const e of emptyValue) {
    console.log(`   line ${String(e.line).padStart(3)}: ${e.key}=`);
  }
}

if (malformed.length > 0) {
  console.log(`\n⚠️  형식 오류 줄 (${malformed.length}개):`);
  for (const m of malformed) {
    console.log(`   line ${String(m.line).padStart(3)}: ${m.content}`);
  }
}

console.log('\n═══════════════════════════════════════════════════');
console.log(' 4. 시스템 환경변수 충돌 확인');
console.log('═══════════════════════════════════════════════════');
console.log('(시스템 환경변수가 이미 있으면 .my 가 덮어쓰지 못함)\n');

const checkVars = [
  'NEXT_PUBLIC_ADSENSE_CLIENT',
  'NEXT_PUBLIC_GA_ID',
  'NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION',
  'ECOS_API_KEY',
  'EXIM_FX_API_KEY',
  'FSS_FINLIFE_API_KEY',
  'KOSIS_API_KEY',
  'MOLIT_REALTOR_API_KEY',
  'JUSO_API_KEY',
];

let conflicts = 0;
for (const v of checkVars) {
  if (process.env[v]) {
    console.log(`   ⚠️  ${v}: 시스템 환경변수에 이미 설정 (길이: ${process.env[v].length}) — .my 무시됨`);
    conflicts++;
  }
}
if (conflicts === 0) {
  console.log('   ✅ 충돌 없음');
}

console.log('\n═══════════════════════════════════════════════════');
console.log(' 5. 다른 폴더의 .my 파일 검사');
console.log('═══════════════════════════════════════════════════');

const candidates = [
  join(cwd, '..', '.my'),
  join(cwd, 'src', '.my'),
  join(cwd, 'scripts', '.my'),
];
let foundElsewhere = false;
for (const p of candidates) {
  if (existsSync(p)) {
    const s = statSync(p);
    console.log(`   ⚠️  발견: ${p} (${s.size} 바이트, 수정 ${s.mtime.toISOString()})`);
    console.log(`        → 이 파일은 sync-data 가 읽지 않음. 위치 정확한지 확인.`);
    foundElsewhere = true;
  }
}
if (!foundElsewhere) {
  console.log('   ✅ 다른 위치에 .my 없음');
}

console.log('\n═══════════════════════════════════════════════════');
console.log(' 6. 모든 KEY= 줄의 raw 정보 (값은 마스킹, 길이만)');
console.log('═══════════════════════════════════════════════════');
console.log('이 표를 사용자가 메모장에서 보는 .my 와 직접 비교해야 합니다.\n');
console.log('  line │ KEY                                         │ 값 길이 │ 값 첫 4자(마스킹) │ 끝 2자');
console.log('  ─────┼─────────────────────────────────────────────┼─────────┼───────────────────┼────────');

const allKeyLines = [];
for (let i = 0; i < lines.length; i++) {
  const raw = lines[i];
  const trimmed = raw.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eq = trimmed.indexOf('=');
  if (eq === -1) continue;
  const key = trimmed.slice(0, eq).trim();
  let value = trimmed.slice(eq + 1).trim();
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1).trim();
  }
  allKeyLines.push({ line: i + 1, key, value, rawLine: raw });
}

for (const it of allKeyLines) {
  const len = it.value.length;
  let head = '';
  let tail = '';
  if (len > 0) {
    // 첫 4자: 첫 2자 + ** (개인정보 보호 위해 일부만)
    head = it.value.slice(0, Math.min(2, len)) + (len > 2 ? '..' : '');
    tail = len > 4 ? it.value.slice(-2) : '';
  }
  const lenStr = len === 0 ? '0 (빈)' : String(len);
  console.log(
    `  ${String(it.line).padStart(4)} │ ${it.key.padEnd(43)} │ ${lenStr.padStart(7)} │ ${head.padEnd(17)} │ ${tail}`,
  );
}

console.log('\n═══════════════════════════════════════════════════');
console.log(' 7. 라인 34 (ECOS_API_KEY) 의 raw 바이트 검사');
console.log('═══════════════════════════════════════════════════');
console.log('보이지 않는 문자(NBSP, zero-width 등) 검출용\n');

const sampleLine = lines[33] ?? ''; // 0-index
console.log(`라인 34 raw: "${sampleLine}"`);
console.log(`바이트 길이: ${Buffer.byteLength(sampleLine, 'utf8')}`);

// 각 코드포인트 출력 (값 부분은 마스킹)
const eq = sampleLine.indexOf('=');
const keyPart = eq >= 0 ? sampleLine.slice(0, eq + 1) : sampleLine;
const valuePart = eq >= 0 ? sampleLine.slice(eq + 1) : '';

console.log(`\nKEY 부분 "${keyPart}" 코드포인트:`);
for (const ch of keyPart) {
  const cp = ch.codePointAt(0);
  const visible = ch === ' ' ? '<SPACE>' : ch === '\t' ? '<TAB>' : ch;
  if (cp > 32 && cp < 127) {
    console.log(`   ${visible}  : U+${cp.toString(16).toUpperCase().padStart(4, '0')} (정상)`);
  } else {
    console.log(`   "${visible}" : U+${cp.toString(16).toUpperCase().padStart(4, '0')}  ⚠️ 비표준`);
  }
}

console.log(`\n값 부분 길이: ${valuePart.length}`);
if (valuePart.length > 0) {
  console.log(`값 부분 (마스킹) 첫 글자 코드포인트:`);
  const ch = valuePart[0];
  const cp = ch.codePointAt(0);
  console.log(`   첫 글자: U+${cp.toString(16).toUpperCase().padStart(4, '0')}`);
  console.log(`   값에 비표준 문자 있는지 검사:`);
  let nonStd = 0;
  for (const c of valuePart) {
    const code = c.codePointAt(0);
    // 표준 ASCII printable(33-126) 또는 한글(가-힣) 또는 일반 영숫자가 아닌 것
    if (code < 32 || (code > 126 && code < 0xac00) || (code > 0xd7a3 && code < 0xff)) {
      nonStd++;
    }
    // BOM, zero-width 등 의심 문자
    if ([0xfeff, 0x200b, 0x200c, 0x200d, 0x00a0].includes(code)) {
      console.log(`   ⚠️ U+${code.toString(16).toUpperCase().padStart(4, '0')} (보이지 않는 특수 문자) 검출`);
    }
  }
  console.log(`   비표준 문자 개수: ${nonStd}`);
}

console.log('\n═══════════════════════════════════════════════════');
console.log(' 진단 완료');
console.log('═══════════════════════════════════════════════════\n');
