#!/usr/bin/env node
/**
 * 법조항 §N 정확도 사전 검증 (CI 게이트).
 *
 * 모든 src/app/**\/page.tsx 본문에서 추출한 "{법명} §{번호}" 패턴을
 * SSoT(아래 STATUTE_REGISTRY)와 대조하여 가짜 항번호(예: §97의3 존재 X)를 차단.
 *
 * 의존성 0. 빌드/CI에서 `node scripts/validate-statute-references.mjs` 호출.
 * 위반 발견 시 exit 1.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// SSoT — 우리 사이트가 인용 중인 한국 세법·금융법 법조항.
// 자동 추출 (scripts/validate-statute-references.mjs 빌드 시점) + 수동 확장 가능.
// 참조: docs/data-model.md + .claude/skills/korean-tax-rates/REFERENCE.md
// 신규 § 추가 시 본 배열에 등재 — 가짜(§N의M 비실재) 차단용.
const STATUTE_REGISTRY = {
  '소득세법': new Set([
    '2의2', '4', '12', '14', '15', '19', '20', '20의3', '22', '25', '34',
    '37', '47', '47의2', '48', '50', '51', '51의3', '52', '54', '55', '56',
    '57', '59', '59의2', '59의3', '59의4', '59의5', '62', '64의2', '64의4',
    '67의3', '70', '70의2', '73', '77', '79', '80', '81', '84', '85', '89',
    '92', '93', '94', '95', '97의2', '98', '99', '100', '100의2', '101',
    '102', '103', '104', '104의2', '104의3', '104의7', '105', '118', '127',
    '129', '134', '148의4',
  ]),
  '소득세법 시행령': new Set([
    '53', '107', '118', '122의2', '143', '145', '154', '154의4', '155',
    '156', '159의3', '163의2', '208', '209',
  ]),
  '국세기본법': new Set([
    '5', '14', '26의2', '45의2', '47', '47의2', '47의3', '47의4', '47의5',
    '48', '51', '51의2', '52', '95',
  ]),
  '국세기본법 시행령': new Set(['43의3']),
  '조세특례제한법': new Set([
    '53', '69', '86의2', '89의2', '91', '95의2', '100의2', '100의3', '133',
  ]),
  '상속세 및 증여세법': new Set([
    '1', '3', '13', '21', '26', '28', '35', '41의4', '47', '50', '53', '56',
    '67', '68', '97의2',
  ]),
  '상속세 및 증여세법 시행령': new Set(['26', '31의5']),
  '지방세법': new Set([
    '3', '10', '11', '13의2', '92', '103의2', '107', '110', '111', '111의2',
    '112', '114', '117의2', '122', '127', '128', '137', '150', '151',
  ]),
  '조세범처벌법': new Set(['73']),
};

// 한국어 법명 → SSoT 키 정규화.
const NAME_ALIASES = {
  '상증법': '상속세 및 증여세법',
  '상속세및증여세법': '상속세 및 증여세법',
};

function normalize(name) {
  const trimmed = name.trim();
  return NAME_ALIASES[trimmed] ?? trimmed;
}

function listFilesRecursive(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) listFilesRecursive(abs, out);
    else if (entry.isFile() && entry.name.endsWith('.tsx')) out.push(abs);
  }
  return out;
}

// "소득세법 §97의3" / "국세기본법 §47의2" / "상증법 §35 ① 1호" 패턴.
// 의2/의3 같은 부속 번호 포함. ① 같은 항목·호는 검증 대상 아님 (가짜 §번호만 검증).
const PATTERN = /(소득세법(?:\s*시행령)?|국세기본법(?:\s*시행령)?|조세특례제한법|상속세 및 증여세법(?:\s*시행령)?|상증법|지방세법|조세범처벌법)\s*§\s*(\d+(?:의\d+)?)/g;

export function validateFile(filePath, content) {
  const violations = [];
  let m;
  // JSX 줄바꿈 케이스 (소득세법\n                시행령) 정규화 — 공백·줄바꿈 압축
  const normalized = content.replace(/\s+/g, ' ');
  PATTERN.lastIndex = 0;
  while ((m = PATTERN.exec(normalized)) !== null) {
    const lawName = normalize(m[1]);
    const articleNum = m[2];
    const registry = STATUTE_REGISTRY[lawName];
    if (!registry) {
      violations.push({ filePath, lawName, articleNum, reason: 'unknown-law' });
      continue;
    }
    if (!registry.has(articleNum)) {
      violations.push({ filePath, lawName, articleNum, reason: 'fake-article' });
    }
  }
  return violations;
}

const isCli = process.argv[1]
  ? fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
  : false;

if (isCli) {
  const targets = process.argv.slice(2);
  const files = targets.length > 0
    ? targets
    : listFilesRecursive(path.join(ROOT, 'src', 'app'));

  const allViolations = [];
  for (const f of files) {
    if (!fs.existsSync(f)) continue;
    const content = fs.readFileSync(f, 'utf8');
    allViolations.push(...validateFile(f, content));
  }

  if (allViolations.length === 0) {
    console.log('✅ 법조항 §N 정확도 검증 PASS (검사 파일 ' + files.length + '개)');
    process.exit(0);
  }

  console.error('❌ 법조항 §N 위반 ' + allViolations.length + '건:');
  for (const v of allViolations) {
    const rel = path.relative(ROOT, v.filePath);
    const reason = v.reason === 'unknown-law'
      ? `법명 SSoT 미등재: "${v.lawName}"`
      : `가짜 §번호: ${v.lawName} §${v.articleNum} (SSoT에 없음)`;
    console.error(`  ${rel}: ${reason}`);
  }
  console.error('\nSSoT: scripts/validate-statute-references.mjs (STATUTE_REGISTRY)');
  console.error('가짜 §번호일 시 정정, 신규 법조항이면 STATUTE_REGISTRY에 추가.');
  process.exit(1);
}
