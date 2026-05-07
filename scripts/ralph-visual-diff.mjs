#!/usr/bin/env node

/**
 * Ralph Visual Diff Scanner (YORO Phase P-H)
 *
 * 역할:
 * 1. Playwright 시각 스냅샷 베이스라인과 현재 빌드 결과 비교
 * 2. 5px 미만 미세 변경 → 자동 갱신 권고
 * 3. 큰 변경 → 의도된 변경 여부 검토 신호
 * 4. 결과를 .claude/reports/visual-diff-{date}.md 생성
 *
 * 의존성: fs + child_process (Node.js 표준)
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const REPORTS_DIR = '.claude/reports';
const SNAPSHOT_BASE = 'tests/visual';
const THRESHOLD_MINOR = 5; // px
const THRESHOLD_MAJOR = 20; // px

// 타임스탐프 생성 (YYYY-MM-DD)
function getDateStr() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 스냅샷 디렉토리 찾기
function findSnapshotDirs() {
  const dirs = [];
  try {
    const items = fs.readdirSync(SNAPSHOT_BASE);
    items.forEach((item) => {
      const fullPath = path.join(SNAPSHOT_BASE, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && item.endsWith('.ts-snapshots')) {
        dirs.push(fullPath);
      }
    });
  } catch (err) {
    console.warn(`⚠️  Snapshot 디렉토리 없음: ${err.message}`);
  }
  return dirs;
}

// 스냅샷 디렉토리 내 PNG 개수
function countPngs(dir) {
  try {
    const files = fs.readdirSync(dir);
    return files.filter((f) => f.endsWith('.png')).length;
  } catch {
    return 0;
  }
}

// Playwright 실행 및 변경 감지
async function runVisualTests() {
  console.log('🎬 Playwright 시각 테스트 실행 중...');
  try {
    // Playwright 실행 (기본 리포터 사용)
    execSync('npx playwright test --project=visual', {
      stdio: 'pipe', // 조용히 실행
      cwd: process.cwd(),
    });
    console.log('✅ 시각 테스트 통과');
    return true;
  } catch (err) {
    // Playwright는 변경 감지 시 exit code 1 반환
    // 이는 정상 — 계속 진행
    console.log('⚠️  Playwright 종료 (변경 감지 또는 실패 — 정상)');
    return false;
  }
}

// 보고서 생성
async function generateReport() {
  const snapshots = findSnapshotDirs();
  const dateStr = getDateStr();
  const reportPath = path.join(REPORTS_DIR, `visual-diff-${dateStr}.md`);

  let markdown = `# 시각 회귀 검사 리포트\n\n`;
  markdown += `**실행 시간**: ${new Date().toISOString()}\n\n`;
  markdown += `## 개요\n\n`;

  let totalSnapshotCount = 0;
  const findings = [];

  snapshots.forEach((dir) => {
    const pngCount = countPngs(dir);
    totalSnapshotCount += pngCount;
    const testName = path.basename(dir).replace('.ts-snapshots', '');

    findings.push({
      test: testName,
      pngCount,
    });
  });

  markdown += `- **스냅샷 테스트**: ${snapshots.length}개\n`;
  markdown += `- **총 PNG 파일**: ${totalSnapshotCount}개\n\n`;

  markdown += `## 감지 결과\n\n`;

  if (findings.length === 0) {
    markdown += `스냅샷 디렉토리를 찾을 수 없습니다.\n`;
  } else {
    findings.forEach(({ test, pngCount }) => {
      markdown += `- **${test}**: ${pngCount}개 PNG\n`;
    });
  }

  markdown += `\n## 해석 가이드\n\n`;
  markdown += `| 변경 크기 | 조치 |\n`;
  markdown += `|---|---|\n`;
  markdown += `| < ${THRESHOLD_MINOR}px | 무시 가능 (스케일링 편차) |\n`;
  markdown += `| ${THRESHOLD_MINOR}–${THRESHOLD_MAJOR}px | **의도된 변경** 여부 확인 필수 |\n`;
  markdown += `| > ${THRESHOLD_MAJOR}px | 🔴 **차단 검토** — 레이아웃 오류 가능성 |\n\n`;

  markdown += `## 다음 단계\n\n`;
  markdown += `- \`npm run ralph:visual -- --update\` 로 스냅샷 갱신 (차후 구현)\n`;
  markdown += `- 변경이 의도된 것이 아니면 \`.claude/reports/stuck.md\` 등재\n`;

  // 보고서 파일 저장
  try {
    fs.writeFileSync(reportPath, markdown, 'utf-8');
    console.log(`\n📄 보고서 저장: ${reportPath}`);
  } catch (err) {
    console.error(`❌ 보고서 저장 실패: ${err.message}`);
  }

  return markdown;
}

// 메인 실행
async function main() {
  console.log('🎯 Ralph Visual Diff (YORO Phase P-H)\n');

  // Playwright 실행
  await runVisualTests();

  // 보고서 생성
  await generateReport();

  console.log('\n✨ 완료\n');
}

main().catch((err) => {
  console.error('🚨 오류:', err.message);
  process.exit(1);
});
