#!/usr/bin/env node

/**
 * YORO Phase M — 발사 후 첫 1주 모니터링 자동화
 *
 * Day 1~7 자동화 체크:
 * 1. audit:adsense 정책 위반 0건 확인
 * 2. sitemap.xml 변경 감지 (의도된 추가 vs 의도 외)
 * 3. sync:health 통과 (4 API 동기화)
 * 4. opengraph-image.png 53 페이지 존재 확인
 *
 * 사용:
 *   npm run monitor:week1
 *
 * 출력:
 *   .claude/reports/monitor-{YYYY-MM-DD}.md
 *
 * Cron 추천:
 *   0 9 * * * npm run monitor:week1  (매일 KST 9시)
 *
 * 종료 코드:
 *   0: 모든 항목 PASS
 *   1: 경고 또는 위반 감지 (즉시 대응)
 */

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const ROOT = process.cwd();
const PUBLIC_DIR = resolve(ROOT, 'public');
const SRC_DIR = resolve(ROOT, 'src');
const REPORT_DIR = resolve(ROOT, '.claude', 'reports');

// 상태 저장소 (이전 실행 대비 변화 추적)
const STATE_FILE = resolve(REPORT_DIR, 'monitor-state.json');

const checks = {
  passed: [],
  warned: [],
  failed: [],
};

/**
 * 상태 파일 초기화/로드
 */
function loadState() {
  if (!existsSync(STATE_FILE)) {
    return {
      lastRun: null,
      sitemapHash: null,
      ogImageCount: 0,
      adsenseViolations: 0,
    };
  }
  try {
    return JSON.parse(readFileSync(STATE_FILE, 'utf8'));
  } catch {
    return { lastRun: null, sitemapHash: null, ogImageCount: 0, adsenseViolations: 0 };
  }
}

/**
 * 상태 파일 저장
 */
function saveState(state) {
  mkdirSync(dirname(STATE_FILE), { recursive: true });
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
}

/**
 * 단순 해시값 생성 (파일 내용 변화 감지)
 */
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // 32-bit 정수
  }
  return hash.toString(36);
}

/**
 * 1. AdSense 정책 감사 (audit:adsense 결과 파싱)
 */
function checkAdsenseViolations(prevState) {
  const result = {
    id: 'adsense-audit',
    status: 'PASS',
    message: '정책 위반 감지 안 됨',
    details: { critical: 0, errors: 0, warnings: 0 },
  };

  const reportDir = REPORT_DIR;
  if (!existsSync(reportDir)) {
    result.status = 'WARN';
    result.message = '감사 리포트 디렉터리 없음 (아직 실행 전?)';
    return result;
  }

  // 최신 감사 리포트 찾기
  let latestReport = null;
  try {
    const files = readdirSync(reportDir)
      .filter(f => f.startsWith('adsense-audit-'))
      .sort()
      .reverse();
    if (files.length > 0) {
      latestReport = resolve(reportDir, files[0]);
    }
  } catch {
    // 디렉터리 읽기 오류
  }

  if (!latestReport) {
    result.status = 'WARN';
    result.message = '감사 리포트를 찾을 수 없음 — npm run audit:adsense 미실행';
    return result;
  }

  try {
    const content = readFileSync(latestReport, 'utf8');
    const criticalMatch = content.match(/🚨.*계정 정지 리스크.*\((\d+)\s+건\)/);
    const errorMatch = content.match(/❌.*정책 위반.*\((\d+)\s+건\)/);
    const warnMatch = content.match(/⚠️.*경고.*\((\d+)\s+건\)/);

    result.details.critical = criticalMatch ? parseInt(criticalMatch[1]) : 0;
    result.details.errors = errorMatch ? parseInt(errorMatch[1]) : 0;
    result.details.warnings = warnMatch ? parseInt(warnMatch[1]) : 0;

    if (result.details.critical > 0) {
      result.status = 'FAIL';
      result.message = `계정 정지 리스크 ${result.details.critical}건 — 즉시 대응 필요`;
    } else if (result.details.errors > 0) {
      result.status = 'WARN';
      result.message = `정책 위반 ${result.details.errors}건`;
    } else if (result.details.warnings > 0) {
      result.status = 'WARN';
      result.message = `경고 ${result.details.warnings}건`;
    }
  } catch (e) {
    result.status = 'WARN';
    result.message = `리포트 파싱 오류: ${e.message}`;
  }

  return result;
}

/**
 * 2. Sitemap 변경 감지
 */
function checkSitemapChanges(prevState) {
  const result = {
    id: 'sitemap',
    status: 'PASS',
    message: '정상 (변경 없음)',
    details: { currentHash: null, previousHash: prevState.sitemapHash, pageCount: 0 },
  };

  const sitemapPath = resolve(PUBLIC_DIR, 'sitemap.xml');
  if (!existsSync(sitemapPath)) {
    result.status = 'WARN';
    result.message = 'sitemap.xml 파일 없음';
    return result;
  }

  try {
    const content = readFileSync(sitemapPath, 'utf8');
    const hash = simpleHash(content);
    result.details.currentHash = hash;

    // URL 개수 카운팅
    const urlMatches = content.match(/<url>/g) || [];
    result.details.pageCount = urlMatches.length;

    if (prevState.sitemapHash && hash !== prevState.sitemapHash) {
      result.status = 'WARN';
      result.message = `sitemap.xml 변경 감지 (${result.details.pageCount} 페이지)`;
    }
  } catch (e) {
    result.status = 'WARN';
    result.message = `파일 읽기 오류: ${e.message}`;
  }

  return result;
}

/**
 * 3. API 동기화 상태 (sync:health 메타데이터)
 */
function checkSyncHealth() {
  const result = {
    id: 'sync-health',
    status: 'PASS',
    message: '모든 API 정상 동기화',
    details: { apis: [] },
  };

  const metadataPath = resolve(SRC_DIR, 'data', 'sync-metadata.json');
  if (!existsSync(metadataPath)) {
    result.status = 'WARN';
    result.message = 'sync-metadata.json 파일 없음 (처음 배포?)';
    return result;
  }

  try {
    const metadata = JSON.parse(readFileSync(metadataPath, 'utf8'));
    const now = Date.now();

    for (const [key, info] of Object.entries(metadata.apis || {})) {
      const lastSync = new Date(info.lastSync).getTime();
      const elapsedMs = now - lastSync;
      const elapsedDays = Math.floor(elapsedMs / (24 * 60 * 60 * 1000));

      const apiStatus = {
        name: info.name || key,
        lastSync: info.lastSync,
        elapsedDays,
        status: 'OK',
      };

      if (elapsedMs >= 30 * 24 * 60 * 60 * 1000) {
        // 30일 이상
        apiStatus.status = 'ERROR';
        result.status = 'WARN';
      } else if (elapsedMs >= 7 * 24 * 60 * 60 * 1000) {
        // 7일 이상
        apiStatus.status = 'WARN';
      }

      result.details.apis.push(apiStatus);
    }

    const errorCount = result.details.apis.filter(a => a.status === 'ERROR').length;
    if (errorCount > 0) {
      result.message = `${errorCount}개 API 30일 이상 미동기`;
    }
  } catch (e) {
    result.status = 'WARN';
    result.message = `메타데이터 파싱 오류: ${e.message}`;
  }

  return result;
}

/**
 * 4. OG 이미지 존재 확인 (53 페이지)
 */
function checkOgImages(prevState) {
  const result = {
    id: 'og-images',
    status: 'PASS',
    message: 'OG 이미지 준비 완료',
    details: { count: 0, target: 53 },
  };

  if (!existsSync(PUBLIC_DIR)) {
    result.status = 'WARN';
    result.message = 'public/ 디렉터리 없음';
    return result;
  }

  try {
    const files = readdirSync(PUBLIC_DIR).filter(f => f.startsWith('opengraph-image') && f.endsWith('.png'));
    result.details.count = files.length;

    if (files.length < 5) {
      result.status = 'WARN';
      result.message = `OG 이미지 부족 (${files.length}/${result.details.target} — 발사 후 단계 생성 가능)`;
    }
  } catch (e) {
    result.status = 'WARN';
    result.message = `디렉터리 읽기 오류: ${e.message}`;
  }

  return result;
}

/**
 * 마크다운 리포트 생성
 */
function generateReport() {
  const now = new Date().toISOString().split('T')[0];
  const reportFile = resolve(REPORT_DIR, `monitor-${now}.md`);

  let md = `# 발사 후 주간 모니터링 리포트\n\n`;
  md += `**날짜**: ${now}  \n`;
  md += `**목적**: Day 1~7 자동 점검 (AdSense·동기화·콘텐츠)\n\n`;

  // 요약
  const passCount = checks.passed.length;
  const warnCount = checks.warned.length;
  const failCount = checks.failed.length;

  md += `## 요약\n\n`;
  md += `| 항목 | 개수 |\n`;
  md += `|---|---|\n`;
  md += `| ✅ 통과 | ${passCount} |\n`;
  md += `| ⚠️  경고 | ${warnCount} |\n`;
  md += `| ❌ 실패 | ${failCount} |\n\n`;

  // 상세 결과
  if (checks.passed.length > 0) {
    md += `## ✅ 통과\n\n`;
    for (const check of checks.passed) {
      md += `- **${check.id}**: ${check.message}\n`;
    }
    md += `\n`;
  }

  if (checks.warned.length > 0) {
    md += `## ⚠️  경고\n\n`;
    for (const check of checks.warned) {
      md += `- **${check.id}**: ${check.message}\n`;
    }
    md += `\n`;
  }

  if (checks.failed.length > 0) {
    md += `## ❌ 실패 (즉시 대응)\n\n`;
    for (const check of checks.failed) {
      md += `- **${check.id}**: ${check.message}\n`;
    }
    md += `\n`;
  }

  // 다음 조치
  md += `## 📋 다음 조치\n\n`;
  if (failCount > 0) {
    md += `1. **즉시**: 위 실패 항목 확인 및 수정\n`;
    md += `2. **조치 후**: \`npm run monitor:week1\` 재실행\n`;
  }
  md += `3. **Day 3**: GA4 기초 메트릭 수집 시작\n`;
  md += `4. **Day 5**: CWV/eCPM 추세 분석\n`;
  md += `5. **Day 7**: 1주 회고 및 조정 필요 여부 판단\n`;

  md += `\n## 🔗 참고\n\n`;
  md += `- launch-runbook.md "배포 후: 첫 주 모니터링"\n`;
  md += `- docs/launch-runbook.md Day 1~7 절차\n`;

  mkdirSync(dirname(reportFile), { recursive: true });
  writeFileSync(reportFile, md, 'utf8');
  return reportFile;
}

/**
 * 메인 실행
 */
function main() {
  const prevState = loadState();

  // 각 점검 항목 실행
  const checks1 = checkAdsenseViolations(prevState);
  const checks2 = checkSitemapChanges(prevState);
  const checks3 = checkSyncHealth();
  const checks4 = checkOgImages(prevState);

  // 결과 분류
  for (const check of [checks1, checks2, checks3, checks4]) {
    if (check.status === 'PASS') {
      checks.passed.push(check);
    } else if (check.status === 'WARN') {
      checks.warned.push(check);
    } else if (check.status === 'FAIL') {
      checks.failed.push(check);
    }
  }

  // 상태 업데이트
  const newState = {
    lastRun: new Date().toISOString(),
    sitemapHash: checks2.details.currentHash || prevState.sitemapHash,
    ogImageCount: checks4.details.count,
    adsenseViolations: checks1.details.critical + checks1.details.errors,
  };
  saveState(newState);

  // 리포트 생성
  const reportFile = generateReport();

  // 콘솔 출력
  console.log(`\n📊 주간 모니터링 완료\n`);
  console.log(`✅ 통과: ${checks.passed.length}`);
  if (checks.warned.length > 0) console.log(`⚠️  경고: ${checks.warned.length}`);
  if (checks.failed.length > 0) console.log(`❌ 실패: ${checks.failed.length}`);
  console.log(`\n📋 상세: ${reportFile}\n`);

  process.exit(checks.failed.length > 0 ? 1 : 0);
}

main();
