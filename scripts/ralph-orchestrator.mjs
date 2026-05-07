#!/usr/bin/env node

/**
 * Ralph Orchestrator — Phase P
 * 모든 ralph:* 감시 명령을 순차 실행하고 통합 리포트 생성.
 * 의존성: fs, path (번들)
 *
 * 실행:
 *   node scripts/ralph-orchestrator.mjs
 *
 * exit code:
 *   0 = 모두 통과
 *   1 = 1개 이상 실패 (GitHub Actions에서 Issue 생성)
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const reportDir = path.join(rootDir, '.claude', 'reports');

// 리포트 디렉토리 생성
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

const today = new Date().toISOString().split('T')[0];
const reportFile = path.join(reportDir, `ralph-daily-${today}.md`);
const stuckFile = path.join(rootDir, '.claude', 'stuck.md');

const results = {
  meta: null,
  links: null,
  sync: null,
  checklist: null,
  types: null,
  tests: null,
  adsense: null,
};

const startTime = Date.now();
let hasFailure = false;

console.log('[Ralph Orchestrator] Starting daily audit...\n');

/**
 * 단계별 실행 (continue-on-error)
 */
function runStep(name, command) {
  console.log(`[Ralph] ${name}...`);
  try {
    execSync(command, { cwd: rootDir, stdio: 'pipe' });
    console.log(`✅ ${name} PASS\n`);
    return true;
  } catch (err) {
    console.log(`❌ ${name} FAIL\n`);
    hasFailure = true;
    return false;
  }
}

// 1. Meta Audit
results.meta = runStep('Meta Audit', 'npm run ralph:meta');

// 2. Link Health
results.links = runStep('Link Health', 'npm run ralph:link-health');

// 3. Sync Health
results.sync = runStep('Sync Health', 'npm run sync:health');

// 4. Launch Checklist
results.checklist = runStep('Launch Checklist', 'npm run launch:checklist');

// 5. Type Check
results.types = runStep('Type Check', 'npm run typecheck');

// 6. Unit Tests
results.tests = runStep('Unit Tests', 'npm test -- --run');

// 7. AdSense Audit
results.adsense = runStep('AdSense Audit', 'npm run audit:adsense');

const duration = Math.round((Date.now() - startTime) / 1000);

/**
 * 통합 리포트 생성
 */
const reportContent = `# Ralph Daily Audit Report

**Date**: ${today}
**Duration**: ${duration}s
**Status**: ${hasFailure ? '❌ FAILURES DETECTED' : '✅ ALL PASS'}

## Summary

| Step | Result | Status |
|---|---|---|
| Meta Audit | ${results.meta ? '✅' : '❌'} | Description length, OG tags |
| Link Health | ${results.links ? '✅' : '❌'} | External links (404/timeout) |
| Sync Health | ${results.sync ? '✅' : '❌'} | Public API freshness |
| Launch Checklist | ${results.checklist ? '✅' : '❌'} | ads.txt, privacy, robots.txt |
| Type Check | ${results.types ? '✅' : '❌'} | TypeScript compilation |
| Unit Tests | ${results.tests ? '✅' : '❌'} | Coverage thresholds |
| AdSense Audit | ${results.adsense ? '✅' : '❌'} | Policy compliance |

## Details

### Meta Audit
${results.meta ? '모든 페이지의 메타데이터가 규칙을 준수합니다.' : '하나 이상의 페이지가 메타데이터 규칙을 위반합니다. 상세: `.claude/reports/ralph-meta-audit-${today}.md`'}

### Link Health
${results.links ? '모든 외부 링크가 정상 응답합니다.' : '하나 이상의 외부 링크에 문제가 있습니다. 상세: `.claude/reports/ralph-link-health-${today}.md`'}

### Sync Health
${results.sync ? '공공데이터 API 동기화가 최신 상태입니다.' : '공공데이터 동기화 주기가 지났습니다. \`npm run sync-data\` 실행 권장.'}

### Type Check
${results.types ? 'TypeScript가 모든 타입 검사를 통과했습니다.' : 'TypeScript 컴파일 오류가 있습니다. 로그 확인.'}

### Tests
${results.tests ? '모든 단위 테스트가 커버리지 임계값을 충족합니다.' : '하나 이상의 테스트가 실패했거나 커버리지 임계값 미만입니다. \`npm test\` 재실행.'}

### AdSense
${results.adsense ? '광고 배치가 모든 정책을 준수합니다.' : 'AdSense 정책 위반이 감지되었습니다. 상세: \`npm run audit:adsense\`'}

## Action Items

${
  !hasFailure
    ? '모든 점검을 통과했습니다. 추가 조치 불필요.'
    : `
다음 점검이 실패했습니다:
${!results.meta ? '- [ ] Meta Audit 실패 → src/app 메타데이터 검토' : ''}
${!results.links ? '- [ ] Link Health 실패 → content/ 링크 수정' : ''}
${!results.sync ? '- [ ] Sync Health 실패 → npm run sync-data 수동 실행' : ''}
${!results.checklist ? '- [ ] Launch Checklist 실패 → ads.txt/privacy 확인' : ''}
${!results.types ? '- [ ] Type Check 실패 → npm run typecheck 결과 검토' : ''}
${!results.tests ? '- [ ] Tests 실패 → npm test 결과 검토' : ''}
${!results.adsense ? '- [ ] AdSense Audit 실패 → 광고 정책 재점검' : ''}
`
}

## Next Steps

1. 실패 항목의 상세 리포트 확인 (`./.claude/reports/ralph-*-${today}.md`)
2. 필요시 로컬에서 재현 (\`npm run ralph:meta\` 등)
3. 수정 후 커밋: \`git commit -m "ralph(...): {수정내용}"\`
4. 자동 재실행: 내일 03:00 KST 또는 \`gh workflow run ralph-daily.yml\`

---

**Ralph**: Automated monitoring agent for calculatorhost.com
**Phase**: YORO Phase P (2026-05-06)
`;

fs.writeFileSync(reportFile, reportContent, 'utf8');
console.log(`\n📄 Report written: ${reportFile}`);

/**
 * 차단 파일 정리 (모두 통과 시)
 */
if (!hasFailure && fs.existsSync(stuckFile)) {
  fs.unlinkSync(stuckFile);
  console.log('✅ Cleared: .claude/stuck.md (issue resolved)');
}

/**
 * 진행 상황 갱신 (GitHub Actions 환경에서만)
 */
if (process.env.GITHUB_RUN_ID) {
  const progressFile = path.join(rootDir, '.claude', 'progress.md');
  if (fs.existsSync(progressFile)) {
    const progressContent = fs.readFileSync(progressFile, 'utf8');
    const newLine = `- **${today}** — Phase P Ralph Daily: ${hasFailure ? 'issues detected' : 'all pass'} | [View Report](https://github.com/$\{repo}/actions/runs/${process.env.GITHUB_RUN_ID})`;

    // 마지막 빈 줄 제거 후 추가
    const updated = progressContent.trimEnd() + '\n' + newLine + '\n';
    fs.writeFileSync(progressFile, updated, 'utf8');
    console.log('✅ Updated: .claude/progress.md');
  }
}

/**
 * 종료 코드
 */
if (hasFailure) {
  console.log('\n🚨 One or more checks failed.');
  console.log('💡 Tip: Run detailed audit with `npm run ralph:meta`, etc.\n');

  // stuck.md 생성 (심각 실패 시)
  const criticalFailures = !results.types || !results.tests;
  if (criticalFailures) {
    const stuckContent = `# Ralph Blocked

**Date**: ${today}
**Critical Failures**:
${!results.types ? '- TypeScript compilation error' : ''}
${!results.tests ? '- Unit test failure' : ''}

## Resolution

1. Review logs: \`npm run ${!results.types ? 'typecheck' : 'test'}\`
2. Fix errors
3. Delete this file: \`rm .claude/stuck.md\`
4. Re-run: \`gh workflow run ralph-daily.yml\`
`;
    fs.writeFileSync(stuckFile, stuckContent, 'utf8');
    console.log('⛔ Created: .claude/stuck.md (critical issues require manual intervention)');
  }

  process.exit(1);
} else {
  console.log('\n✅ All checks passed. Proceeding to next day.\n');
  process.exit(0);
}
