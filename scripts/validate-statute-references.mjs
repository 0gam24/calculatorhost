#!/usr/bin/env node
/**
 * 법조항 §N 정확도 사전 검증 (CI 게이트) — CLI 진입점.
 *
 * 레지스트리와 검증 로직은 shebang 없는 scripts/statute-registry-core.mjs 에 있다.
 * (shebang 파일은 vitest 가 변환하지 못해 테스트 수집이 실패 — STATE.md §8)
 *
 * 판정:
 *   - unregistered        → ❌ 차단. 신규 도입된 미등록 조항 = hallucination 후보.
 *   - unknown-law         → ❌ 차단. 레지스트리에 없는 법명.
 *   - pending-verification→ ⚠️ 경고. 이미 인용 중이나 1차출처 미검증(부채).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  STATUTE_REGISTRY,
  PENDING_VERIFICATION,
  validateFile,
  normalize,
  PATTERN,
} from './statute-registry-core.mjs';

// 기존 import 경로 호환 유지
export { STATUTE_REGISTRY, PENDING_VERIFICATION, validateFile, normalize, PATTERN };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function listFilesRecursive(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) listFilesRecursive(abs, out);
    else if (entry.isFile() && entry.name.endsWith('.tsx')) out.push(abs);
  }
  return out;
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

  const blocking = allViolations.filter((v) => v.reason !== 'pending-verification');
  const pending = allViolations.filter((v) => v.reason === 'pending-verification');

  // 미검증 조항은 파일별로 쏟아내지 않고 고유 조항 단위로 요약 (노이즈 방지).
  if (pending.length > 0) {
    const uniq = new Map();
    for (const v of pending) {
      const key = `${v.lawName} §${v.articleNum}`;
      uniq.set(key, (uniq.get(key) ?? 0) + 1);
    }
    console.warn(`⚠️  1차출처 미검증 조항 ${uniq.size}종 (인용 ${pending.length}회) — 게이트는 통과, 검증 후 승격 필요`);
    for (const [key, count] of [...uniq].sort()) {
      console.warn(`     ${key} (${count}회)`);
    }
    console.warn('');
  }

  if (blocking.length === 0) {
    console.log('✅ 법조항 §N 정확도 검증 PASS (검사 파일 ' + files.length + '개)');
    process.exit(0);
  }

  console.error('❌ 법조항 §N 위반 ' + blocking.length + '건:');
  for (const v of blocking) {
    const rel = path.relative(ROOT, v.filePath);
    const reason = v.reason === 'unknown-law'
      ? `법명 SSoT 미등재: "${v.lawName}"`
      : `미등록 §번호: ${v.lawName} §${v.articleNum} (실재 확인 필요)`;
    console.error(`  ${rel}: ${reason}`);
  }
  console.error('\nSSoT: scripts/statute-registry-core.mjs');
  console.error('가짜 조항이면 본문 정정, 1차출처로 확인된 실재 조항이면 STATUTE_REGISTRY 에 등재.');
  process.exit(1);
}
