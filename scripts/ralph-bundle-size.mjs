#!/usr/bin/env node

/**
 * Ralph Bundle Size Monitor (YORO Phase P-I)
 *
 * 역할:
 * 1. npm run build 후 _next/static/chunks 크기 측정
 * 2. 베이스라인과 비교 (첫 실행 시 베이스라인 자동 생성)
 * 3. +20KB 이상 증가 시 stuck.md 등재 권고
 * 4. 페이지별 First Load JS 크기 표 생성
 * 5. 결과를 .claude/reports/bundle-size-{date}.md 저장
 *
 * 의존성: fs + path (Node.js 표준)
 */

import fs from 'fs';
import path from 'path';

const REPORTS_DIR = '.claude/reports';
const BASELINE_FILE = path.join(REPORTS_DIR, 'bundle-baseline.json');
const BUILD_DIR = 'out/_next/static/chunks';
const THRESHOLD_MAJOR = 20 * 1024; // 20KB in bytes
const THRESHOLD_WARN = 10 * 1024; // 10KB warning

// 타임스탐프 (YYYY-MM-DD)
function getDateStr() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 디렉토리 크기 계산
function getDirSize(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.warn(`⚠️  디렉토리 없음: ${dirPath}`);
    return 0;
  }

  let totalSize = 0;
  try {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        totalSize += stat.size;
      }
    });
  } catch (err) {
    console.warn(`⚠️  디렉토리 읽기 실패: ${err.message}`);
  }
  return totalSize;
}

// 페이지별 JS 청크 크기 분석
function analyzePageChunks() {
  const result = {};
  if (!fs.existsSync(BUILD_DIR)) {
    return result;
  }

  try {
    const files = fs.readdirSync(BUILD_DIR);
    const jsFiles = files.filter(
      (f) => f.endsWith('.js') && !f.startsWith('main-')
    );

    // 파일별 크기 (바이트)
    jsFiles.forEach((file) => {
      const filePath = path.join(BUILD_DIR, file);
      const stat = fs.statSync(filePath);
      const sizeKb = (stat.size / 1024).toFixed(2);

      // 페이지 이름 추출 (청크 패턴: app-{hash}.js 등)
      let pageName = file.replace(/^app-/, '').replace(/\.js$/, '');
      if (pageName.length > 20) {
        pageName = pageName.substring(0, 20) + '...';
      }

      result[file] = {
        sizeBytes: stat.size,
        sizeKb: parseFloat(sizeKb),
      };
    });
  } catch (err) {
    console.warn(`⚠️  청크 분석 실패: ${err.message}`);
  }

  return result;
}

// 베이스라인 로드
function loadBaseline() {
  if (fs.existsSync(BASELINE_FILE)) {
    try {
      const data = fs.readFileSync(BASELINE_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.warn(`⚠️  베이스라인 읽기 실패: ${err.message}`);
    }
  }
  return null;
}

// 베이스라인 저장
function saveBaseline(baseline) {
  try {
    // reports 디렉토리 생성
    if (!fs.existsSync(REPORTS_DIR)) {
      fs.mkdirSync(REPORTS_DIR, { recursive: true });
    }

    fs.writeFileSync(BASELINE_FILE, JSON.stringify(baseline, null, 2), 'utf-8');
    console.log(`✅ 베이스라인 저장: ${BASELINE_FILE}`);
  } catch (err) {
    console.error(`❌ 베이스라인 저장 실패: ${err.message}`);
  }
}

// 포맷팅 (바이트 → KB)
function formatSize(bytes) {
  return (bytes / 1024).toFixed(2);
}

// 보고서 생성
function generateReport(current, baseline) {
  const dateStr = getDateStr();
  const reportPath = path.join(REPORTS_DIR, `bundle-size-${dateStr}.md`);

  let markdown = `# 번들 크기 분석 리포트\n\n`;
  markdown += `**실행 시간**: ${new Date().toISOString()}\n\n`;

  // 전체 크기
  const totalSize = getDirSize(BUILD_DIR);
  const totalSizeKb = formatSize(totalSize);

  markdown += `## 전체 통계\n\n`;
  markdown += `- **현재 번들 크기**: ${totalSizeKb} KB\n`;

  if (baseline) {
    const delta = totalSize - baseline.totalSizeBytes;
    const deltaKb = formatSize(delta);
    const deltaPercent = ((delta / baseline.totalSizeBytes) * 100).toFixed(1);
    const trend = delta > 0 ? '📈' : '📉';

    markdown += `- **이전 베이스라인**: ${formatSize(baseline.totalSizeBytes)} KB\n`;
    markdown += `- **변화**: ${trend} ${deltaKb} KB (${deltaPercent}%)\n`;

    if (Math.abs(delta) > THRESHOLD_MAJOR) {
      markdown += `- **⚠️  경고**: ${Math.abs(deltaKb)} KB 초과 변화 (임계: ${formatSize(THRESHOLD_MAJOR)} KB)\n`;
    } else if (Math.abs(delta) > THRESHOLD_WARN) {
      markdown += `- **⚡ 주의**: ${Math.abs(deltaKb)} KB 변화\n`;
    }
  } else {
    markdown += `- **상태**: 첫 측정 (베이스라인 설정됨)\n`;
  }

  markdown += `\n## 페이지별 청크 크기\n\n`;
  markdown += `| 파일 | 크기 (KB) |\n`;
  markdown += `|---|---|\n`;

  // 크기 기준 정렬
  const chunks = Object.entries(current.chunks)
    .sort(([, a], [, b]) => b.sizeBytes - a.sizeBytes)
    .slice(0, 15); // 상위 15개만

  chunks.forEach(([file, { sizeKb }]) => {
    const indicator = sizeKb > 50 ? '🔴' : sizeKb > 30 ? '🟡' : '🟢';
    markdown += `| ${indicator} ${file} | ${sizeKb} |\n`;
  });

  markdown += `\n## 조치 권고\n\n`;

  const delta =
    baseline && totalSize - baseline.totalSizeBytes > 0
      ? totalSize - baseline.totalSizeBytes
      : 0;

  if (delta > THRESHOLD_MAJOR) {
    markdown += `**🔴 차단 조치 필요**\n`;
    markdown += `- 번들이 ${formatSize(delta)} KB 증가함\n`;
    markdown += `- 스크립트 분석: \`npm run build -- --analyze\` (Next.js Bundle Analyzer)\n`;
    markdown += `- stuck.md에 등재 및 검토 필요\n`;
  } else if (delta > THRESHOLD_WARN) {
    markdown += `**⚡ 검토 권고**\n`;
    markdown += `- 번들이 ${formatSize(delta)} KB 증가함\n`;
    markdown += `- 큰 의존성 추가 여부 확인\n`;
    markdown += `- dynamic import 재평가\n`;
  } else {
    markdown += `**✅ 양호**\n`;
    markdown += `- 번들 크기 변화 없음 또는 개선됨\n`;
  }

  markdown += `\n## 베이스라인\n\n`;
  markdown += `- 저장 위치: \`.claude/reports/bundle-baseline.json\`\n`;
  markdown += `- 업데이트: 실행마다 자동 (덮어쓰기)\n`;
  markdown += `- 용도: 추세 추적\n`;

  // 보고서 저장
  try {
    if (!fs.existsSync(REPORTS_DIR)) {
      fs.mkdirSync(REPORTS_DIR, { recursive: true });
    }
    fs.writeFileSync(reportPath, markdown, 'utf-8');
    console.log(`\n📄 보고서 저장: ${reportPath}`);
  } catch (err) {
    console.error(`❌ 보고서 저장 실패: ${err.message}`);
  }

  return { markdown, delta };
}

// 메인
async function main() {
  console.log('🎯 Ralph Bundle Size Monitor (YORO Phase P-I)\n');

  // 현재 측정
  console.log('📦 번들 크기 측정 중...');
  const totalSizeBytes = getDirSize(BUILD_DIR);
  const chunks = analyzePageChunks();

  const current = {
    timestamp: new Date().toISOString(),
    totalSizeBytes,
    chunks,
  };

  // 베이스라인 로드
  const baseline = loadBaseline();

  // 보고서 생성
  const { delta } = generateReport(current, baseline);

  // 베이스라인 갱신
  saveBaseline(current);

  console.log(`\n📊 요약:`);
  console.log(`   총 크기: ${formatSize(totalSizeBytes)} KB`);
  if (baseline) {
    console.log(
      `   변화: ${delta > 0 ? '+' : ''}${formatSize(delta)} KB ${delta > 0 ? '📈' : '📉'}`
    );
  }

  console.log('\n✨ 완료\n');
}

main().catch((err) => {
  console.error('🚨 오류:', err.message);
  process.exit(1);
});
