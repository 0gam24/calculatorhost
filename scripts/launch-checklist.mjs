#!/usr/bin/env node

/**
 * YORO+TDD Day 0 발사 전 자동화 체크리스트
 *
 * 기능:
 * 1. ads.txt: pub-XXX 값이 placeholder(7830821732287404)가 아닌지 확인
 * 2. .env.production: 파일 존재 여부 확인 (파일 읽기 금지, 위치만)
 * 3. public/sitemap.xml: 존재 확인
 * 4. public/og-*.png: 53개 페이지 OG 이미지 검사 (대략)
 * 5. audit:adsense: 정책 위반 여부 (npm run audit:adsense 호출)
 * 6. 정책 페이지 존재: /privacy, /terms, /contact
 *
 * 사용:
 *   npm run launch:checklist
 *
 * 출력:
 *   console 요약 + .claude/reports/launch-checklist-YYYY-MM-DD.md
 *
 * 종료 코드:
 *   0: 모든 자동 점검 통과 (manual 체크는 운영자 확인)
 *   1: 자동 점검 실패 (배포 불가)
 */

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';

const ROOT = process.cwd();
const PUBLIC_DIR = resolve(ROOT, 'public');
const SRC_DIR = resolve(ROOT, 'src');
const REPORT_DIR = resolve(ROOT, '.claude', 'reports');

const checks = {
  auto: [], // 자동 점검 항목
  manual: [], // 운영자 확인 항목
};

const CHECKLIST = [
  { id: 'ads-txt', name: 'ads.txt 확인', category: 'auto' },
  { id: 'env-prod', name: '.env.production 파일 존재', category: 'auto' },
  { id: 'sitemap', name: 'public/sitemap.xml 존재', category: 'auto' },
  { id: 'og-images', name: 'OG 이미지 샘플링 (5개)', category: 'auto' },
  { id: 'policy-pages', name: '정책 페이지 존재 (/privacy, /terms, /contact)', category: 'auto' },
  { id: 'adsense-audit', name: 'npm run audit:adsense (정책 위반)', category: 'auto' },
  { id: 'cloudflare-env', name: 'Cloudflare Pages 환경변수 설정 (NEXT_PUBLIC_ADSENSE_CLIENT)', category: 'manual' },
  { id: 'search-console', name: 'Google Search Console 등록 + sitemap 제출', category: 'manual' },
  { id: 'analytics', name: 'Google Analytics 4 + Web Vitals 연결 확인', category: 'manual' },
  { id: 'dns-switch', name: 'DNS 스위치 (calculatorhost.com → Cloudflare Pages)', category: 'manual' },
  { id: 'prev-cleanup', name: '기존 Trend Money Lab 사이트 삭제', category: 'manual' },
];

const results = {
  timestamp: new Date().toISOString(),
  totalAuto: 0,
  passAuto: 0,
  failAuto: 0,
  items: [],
};

/**
 * 1. ads.txt 확인
 */
function checkAdsTxt() {
  const adsTxtPath = resolve(PUBLIC_DIR, 'ads.txt');
  const result = { id: 'ads-txt', status: 'PASS', message: '' };

  try {
    if (!existsSync(adsTxtPath)) {
      result.status = 'FAIL';
      result.message = 'ads.txt 파일 없음';
      return result;
    }

    const content = readFileSync(adsTxtPath, 'utf8');
    if (content.includes('7830821732287404')) {
      result.status = 'FAIL';
      result.message = 'ads.txt에 placeholder pub-ID(7830821732287404) 포함 — 실제 AdSense Client ID로 교체 필수';
      return result;
    }

    // pub-로 시작하는 라인이 있는지 확인
    const pubMatch = content.match(/pub-\d+/);
    if (!pubMatch) {
      result.status = 'FAIL';
      result.message = 'ads.txt에 유효한 pub-ID 없음';
      return result;
    }

    result.message = `pub-ID 확인: ${pubMatch[0]}`;
  } catch (e) {
    result.status = 'FAIL';
    result.message = `파일 읽기 오류: ${e.message}`;
  }

  return result;
}

/**
 * 2. .env.production 파일 존재 확인
 */
function checkEnvProduction() {
  const envPath = resolve(ROOT, '.env.production');
  const result = { id: 'env-prod', status: 'PASS', message: '' };

  try {
    if (!existsSync(envPath)) {
      result.status = 'FAIL';
      result.message = '.env.production 파일 없음 — 프로덕션 빌드 시 필요 (Cloudflare Pages 대시보드 설정)';
      return result;
    }

    // 파일 크기만 확인 (내용 읽기 금지)
    const stat = statSync(envPath);
    result.message = `파일 존재 (크기: ${stat.size} bytes)`;
  } catch (e) {
    result.status = 'FAIL';
    result.message = `파일 접근 오류: ${e.message}`;
  }

  return result;
}

/**
 * 3. public/sitemap.xml 확인
 */
function checkSitemap() {
  const sitemapPath = resolve(PUBLIC_DIR, 'sitemap.xml');
  const result = { id: 'sitemap', status: 'PASS', message: '' };

  try {
    if (!existsSync(sitemapPath)) {
      result.status = 'FAIL';
      result.message = 'sitemap.xml 없음 — prebuild 스크립트 실행 필요';
      return result;
    }

    const content = readFileSync(sitemapPath, 'utf8');
    const urlCount = (content.match(/<url>/g) ?? []).length;
    result.message = `sitemap.xml 확인: ${urlCount} URLs`;
  } catch (e) {
    result.status = 'FAIL';
    result.message = `파일 읽기 오류: ${e.message}`;
  }

  return result;
}

/**
 * 4. OG 이미지 샘플링 (5개)
 */
function checkOgImages() {
  const result = { id: 'og-images', status: 'PASS', message: '' };

  try {
    const files = readdirSync(PUBLIC_DIR);
    const ogImages = files.filter(f => f.startsWith('og-') && f.endsWith('.png'));

    if (ogImages.length === 0) {
      result.status = 'WARN';
      result.message = 'OG 이미지 없음 (og-*.png) — gen-og 스크립트 실행 필요';
      return result;
    }

    if (ogImages.length < 5) {
      result.status = 'WARN';
      result.message = `OG 이미지 ${ogImages.length}개만 발견 (목표: 53개+) — 계산기 페이지마다 필요`;
      return result;
    }

    result.message = `OG 이미지: ${ogImages.length}개 (샘플: ${ogImages.slice(0, 3).join(', ')}, ...)`;
  } catch (e) {
    result.status = 'FAIL';
    result.message = `public/ 읽기 오류: ${e.message}`;
  }

  return result;
}

/**
 * 5. 정책 페이지 존재 확인
 */
function checkPolicyPages() {
  const result = { id: 'policy-pages', status: 'PASS', message: '' };
  const policyRoutes = ['privacy', 'terms', 'contact'];
  const missing = [];

  for (const route of policyRoutes) {
    const pagePath = resolve(SRC_DIR, 'app', route, 'page.tsx');
    if (!existsSync(pagePath)) {
      missing.push(`/${route}`);
    }
  }

  if (missing.length > 0) {
    result.status = 'FAIL';
    result.message = `필수 정책 페이지 없음: ${missing.join(', ')}`;
  } else {
    result.message = `필수 정책 페이지 확인 완료`;
  }

  return result;
}

/**
 * 6. npm run audit:adsense 실행 및 결과 확인
 */
function checkAdsenseAudit() {
  const result = { id: 'adsense-audit', status: 'PASS', message: '' };

  try {
    console.log('\n[체크] npm run audit:adsense 실행 중...\n');
    execSync('npm run audit:adsense', { stdio: 'inherit', cwd: ROOT });
    result.message = 'AdSense 정책 감사 통과';
  } catch (e) {
    result.status = 'FAIL';
    result.message = 'AdSense 정책 위반 발견 — audit:adsense 리포트 확인';
  }

  return result;
}

/**
 * 리포트 생성
 */
function generateReport() {
  const now = new Date().toISOString().split('T')[0];
  const reportFile = resolve(REPORT_DIR, `launch-checklist-${now}.md`);

  let md = `# Day 0 발사 전 체크리스트\n\n`;
  md += `**날짜**: ${now}  \n`;
  md += `**시간**: ${new Date().toLocaleTimeString('ko-KR')}  \n\n`;

  const autoPass = results.items.filter(i => i.id !== 'adsense-audit' && i.status === 'PASS').length;
  const autoFail = results.items.filter(i => i.id !== 'adsense-audit' && i.status === 'FAIL').length;
  const autoWarn = results.items.filter(i => i.id !== 'adsense-audit' && i.status === 'WARN').length;

  md += `## 📋 자동 점검 결과\n\n`;
  if (autoFail === 0) {
    md += `✅ **통과** (${autoPass} 항목 성공)\n\n`;
  } else {
    md += `❌ **실패** (${autoFail} 항목 / ${autoWarn} 경고)\n\n`;
  }

  md += `| 항목 | 상태 | 메시지 |\n`;
  md += `|---|---|---|\n`;

  for (const item of results.items) {
    const icon = item.status === 'PASS' ? '✅' : item.status === 'WARN' ? '⚠️' : '❌';
    md += `| ${item.id} | ${icon} ${item.status} | ${item.message} |\n`;
  }
  md += `\n`;

  md += `## 👤 운영자 확인 사항\n\n`;
  md += `다음 항목들은 GUI/대시보드에서 수동 확인이 필요합니다:\n\n`;

  const manualItems = CHECKLIST.filter(i => i.category === 'manual');
  for (let i = 0; i < manualItems.length; i++) {
    md += `${i + 1}. [ ] **${manualItems[i].name}**\n`;
  }

  md += `\n## 🚀 배포 판정\n\n`;
  if (autoFail === 0) {
    md += `**GO**: 자동 점검 통과. 위 운영자 항목 확인 후 배포 진행 가능.\n`;
  } else {
    md += `**NO-GO**: 자동 점검 실패. 위 ❌ 항목들을 먼저 수정한 후 재실행.\n`;
  }

  md += `\n## 📝 배포 예상 소요 시간\n\n`;
  md += `- 자동 점검: 3~5분\n`;
  md += `- 운영자 수동 확인: 10~15분\n`;
  md += `- Cloudflare Pages 빌드: 2~5분\n`;
  md += `- **총: 15~25분**\n`;

  md += `\n## 📚 근거 문서\n\n`;
  md += `- docs/architecture.md §11\n`;
  md += `- CLAUDE.md "배포 체크리스트"\n`;
  md += `- .claude/skills/adsense-policy-reference/REFERENCE.md\n`;

  mkdirSync(dirname(reportFile), { recursive: true });
  writeFileSync(reportFile, md, 'utf8');
  return reportFile;
}

function main() {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║           YORO+TDD Day 0 발사 전 체크리스트 자동화              ║
║                   ${new Date().toLocaleDateString('ko-KR')}                    ║
╚════════════════════════════════════════════════════════════════╝
`);

  // 자동 점검 실행
  const autoChecks = [
    { fn: checkAdsTxt, name: 'ads.txt' },
    { fn: checkEnvProduction, name: '.env.production' },
    { fn: checkSitemap, name: 'sitemap.xml' },
    { fn: checkOgImages, name: 'OG 이미지' },
    { fn: checkPolicyPages, name: '정책 페이지' },
  ];

  console.log(`\n📋 자동 점검 (${autoChecks.length}개)\n`);
  for (const check of autoChecks) {
    process.stdout.write(`  [체크] ${check.name}... `);
    try {
      const r = check.fn();
      results.items.push(r);
      console.log(`${r.status === 'PASS' ? '✅' : r.status === 'WARN' ? '⚠️ ' : '❌'}`);
      console.log(`         → ${r.message}`);
    } catch (e) {
      results.items.push({ id: check.name, status: 'FAIL', message: e.message });
      console.log(`❌ (예외: ${e.message})`);
    }
  }

  // AdSense 감사
  const auditResult = checkAdsenseAudit();
  results.items.push(auditResult);

  // 리포트 생성
  const reportFile = generateReport();

  // 요약 출력
  const failCount = results.items.filter(i => i.status === 'FAIL').length;
  const warnCount = results.items.filter(i => i.status === 'WARN').length;
  const passCount = results.items.filter(i => i.status === 'PASS').length;

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 결과 요약
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✅ 통과:   ${passCount}
  ⚠️  경고:   ${warnCount}
  ❌ 실패:   ${failCount}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📂 상세 리포트: ${reportFile}

`);

  if (failCount === 0) {
    console.log(`
✅ GO: 자동 점검 통과!

📝 다음 단계:
  1. 위 리포트의 "운영자 확인 사항" 완료
  2. npm run build 로 로컬 빌드 확인
  3. git push (또는 CLI 명령어 대기)
  4. Cloudflare Pages 배포 모니터링

⏱️  예상 소요 시간: 15~25분
`);
    process.exit(0);
  } else {
    console.log(`
❌ NO-GO: 자동 점검 실패

⚠️  조치 사항:
  1. 위 리포트에서 ❌ 항목 확인
  2. 해당 파일/설정 수정
  3. npm run launch:checklist 재실행

🔗 참고: docs/launch-runbook.md
`);
    process.exit(1);
  }
}

main();
