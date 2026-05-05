#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const METADATA_FILE = path.join(__dirname, '../src/data/sync-metadata.json');

const THRESHOLDS = {
  warn: 7 * 24 * 60 * 60 * 1000, // 7일
  error: 30 * 24 * 60 * 60 * 1000, // 30일
};

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getElapsedDays(isoString) {
  const syncTime = new Date(isoString).getTime();
  const now = Date.now();
  const elapsedMs = now - syncTime;
  return Math.floor(elapsedMs / (24 * 60 * 60 * 1000));
}

function getStatusBadge(status, elapsedMs) {
  if (elapsedMs >= THRESHOLDS.error) {
    return '🔴 에러 (30일 이상 미동기)';
  }
  if (elapsedMs >= THRESHOLDS.warn) {
    return '🟡 경고 (7일 이상 미동기)';
  }
  if (status === 'failed') {
    return '⚠️  마지막 실패';
  }
  return '✅ 정상';
}

function main() {
  console.log('\n📊 API 동기화 헬스 체크\n');
  console.log('2026-05-04 기준\n');

  if (!fs.existsSync(METADATA_FILE)) {
    console.log('❌ sync-metadata.json을 찾을 수 없습니다.');
    console.log('   먼저 npm run sync-data를 실행하세요.\n');
    process.exit(0);
  }

  let metadata;
  try {
    metadata = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf8'));
  } catch (e) {
    console.error('❌ sync-metadata.json 파일을 읽을 수 없습니다:', e.message);
    process.exit(1);
  }

  const now = Date.now();
  let hasError = false;
  let hasWarning = false;

  // 테이블 헤더
  console.log('┌─────────────────────┬──────────────────────────┬──────────┬─────────────────┐');
  console.log('│ API 이름            │ 마지막 동기화            │ 경과일   │ 상태            │');
  console.log('├─────────────────────┼──────────────────────────┼──────────┼─────────────────┤');

  const apis = metadata.apis || {};
  for (const [key, info] of Object.entries(apis)) {
    const lastSync = info.lastSync || 'Unknown';
    const elapsedMs = now - new Date(lastSync).getTime();
    const elapsedDays = getElapsedDays(lastSync);
    const status = info.status || 'unknown';
    const badge = getStatusBadge(status, elapsedMs);

    // 테이블 행
    const apiName = (info.name || key).substring(0, 18);
    const dateStr = formatDate(lastSync).substring(0, 23);
    const daysStr = `${elapsedDays}일`;

    console.log(`│ ${apiName.padEnd(19)} │ ${dateStr.padEnd(24)} │ ${daysStr.padEnd(8)} │ ${badge.padEnd(15)} │`);

    if (elapsedMs >= THRESHOLDS.error) {
      hasError = true;
    } else if (elapsedMs >= THRESHOLDS.warn) {
      hasWarning = true;
    }

    // 에러 메시지 출력
    if (info.lastError) {
      console.log(`│ ✗ 에러: ${info.lastError.substring(0, 60)}${info.lastError.length > 60 ? '...' : ''}`.padEnd(82) + '│');
    }
  }

  console.log('└─────────────────────┴──────────────────────────┴──────────┴─────────────────┘');
  console.log('');

  // 권고사항
  if (hasError) {
    console.log('🚨 액션 필요: 30일 이상 미동기화된 API가 있습니다.');
    console.log('   실행: npm run sync-data\n');
  } else if (hasWarning) {
    console.log('⚠️  주의: 7일 이상 미동기화된 API가 있습니다.');
    console.log('   곧 npm run sync-data 실행을 권장합니다.\n');
  } else {
    console.log('✅ 모든 API가 정상 동기화 상태입니다.\n');
  }

  // exit code
  // 경고만 있으면 0 (prebuild 계속), 에러는 1 (실패)
  process.exit(hasError ? 1 : 0);
}

main();
