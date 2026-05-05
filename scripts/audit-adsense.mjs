#!/usr/bin/env node

/**
 * AdSense 정책 감사 스크립트
 *
 * src/app/calculator/**\/*.tsx 를 파싱해 다음을 점검:
 * 1. 페이지당 광고 슬롯 개수 (≤ 4 정책)
 * 2. 금칙어 검출 ("투자 권유", "수익 보장", "정확한 수익률" 등 면책 외)
 * 3. 정책 페이지에서 광고 호출 여부 (금지)
 * 4. AdSlot/SkyscraperAd/InfeedAd/MobileAnchorAd 슬롯 명이 유일한지 확인
 *
 * 사용:
 *   npm run audit:adsense
 *
 * 출력:
 *   .claude/reports/adsense-audit-YYYY-MM-DD.md
 *
 * 종료 코드:
 *   0: 모든 점검 통과 (또는 WARN만)
 *   1: ERROR 발생 (정책 위반)
 */

import { readdirSync, readFileSync, writeFileSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, join, relative, dirname } from 'node:path';

const ROOT = process.cwd();
const SRC_DIR = resolve(ROOT, 'src');
const REPORT_DIR = resolve(ROOT, '.claude', 'reports');

// AdSense 정책 상수
const MAX_ADS_PER_PAGE = 4;
const FORBIDDEN_TERMS = [
  /투자\s+권유/gi,
  /주식\s+(추천|추천인)/gi,
  /수익\s+보장/gi,
  /수익률\s+보장/gi,
  /확정\s+수익/gi,
  /수익\s+확보/gi,
  /높은\s+수익/gi,
  /무조건\s+수익/gi,
];

// 면책조항 키워드 — 이들과 동반 사용 시 금칙어 무시
const DISCLAIMER_KEYWORDS = [
  /면책/gi,
  /권유\s+아님/gi,
  /투자\s+판단/gi,
  /전문가\s+상담/gi,
  /법적\s+책임/gi,
  /법적\s+판단/gi,
  /참고\s+용/gi,
  /일반\s+정보/gi,
];

// 광고 단위 ID 패턴
const ADSENSE_SLOT_PATTERN = /NEXT_PUBLIC_ADSENSE_SLOT_\w+/g;
const VALID_SLOT_ID = /\d{10,}/;

const FORBIDDEN_PAGES = [
  '/privacy',
  '/terms',
  '/contact',
  '/about',
  '/affiliate-disclosure',
];

let totalPages = 0;
const findings = { critical: [], error: [], warn: [], info: [] };
const slotStats = {};

/**
 * 파일 시스템 재귀 탐색
 */
function* walk(dir) {
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      try {
        const st = statSync(full);
        if (st.isDirectory()) {
          if (entry.startsWith('_') || entry === 'node_modules') continue;
          yield* walk(full);
        } else if (entry === 'page.tsx') {
          yield full;
        }
      } catch {
        // 파일 접근 오류 무시
      }
    }
  } catch {
    // 디렉토리 접근 오류 무시
  }
}

/**
 * AdSlot, SkyscraperAd, InfeedAd, MobileAnchorAd 호출 카운팅
 */
function countAdSlots(content) {
  const adSlots = (content.match(/<AdSlot/g) ?? []).length;
  const skyscraper = (content.match(/<SkyscraperAd/g) ?? []).length;
  const infeed = (content.match(/<InfeedAd/g) ?? []).length;
  const mobileAnchor = (content.match(/<MobileAnchorAd/g) ?? []).length;
  return { adSlots, skyscraper, infeed, mobileAnchor, total: adSlots + skyscraper + infeed + mobileAnchor };
}

/**
 * 슬롯 이름 추출 (중복 여부 확인)
 */
function extractSlotNames(content) {
  const slots = [];
  // slot="..." 패턴 추출
  const matches = content.match(/slot="([^"]+)"/g) ?? [];
  for (const m of matches) {
    const slot = m.match(/slot="([^"]+)"/)[1];
    slots.push(slot);
  }
  return slots;
}

/**
 * 금칙어 검출 (면책조항 동반 여부 확인)
 */
function detectForbiddenTerms(content, filePath) {
  const violations = [];
  for (const term of FORBIDDEN_TERMS) {
    if (term.test(content)) {
      // 면책조항 동반 여부 확인
      const hasDisclaimer = DISCLAIMER_KEYWORDS.some(dk => dk.test(content));
      if (!hasDisclaimer) {
        violations.push(term.toString().slice(1, -3)); // /.../ 제거
      }
    }
  }
  return violations;
}

/**
 * 페이지 경로로부터 라우트 구분
 */
function getRouteFromPath(filePath) {
  const rel = relative(SRC_DIR, filePath).replace(/\\/g, '/');
  // app/calculator/salary/page.tsx → /calculator/salary
  return '/' + rel.replace('/page.tsx', '').replace(/\\/g, '/');
}

/**
 * 단일 파일 감사
 */
function checkPage(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const route = getRouteFromPath(filePath);
  const rel = relative(ROOT, filePath).replace(/\\/g, '/');
  totalPages++;

  // 1. 페이지 타입 판정
  const isCalculator = route.startsWith('/calculator/');
  const isForbidden = FORBIDDEN_PAGES.some(p => route.startsWith(p));

  // 2. 광고 슬롯 개수 점검
  const adCount = countAdSlots(content);
  if (adCount.total > MAX_ADS_PER_PAGE) {
    findings.critical.push({
      file: rel,
      route,
      severity: 'CRITICAL',
      msg: `광고 슬롯 ${adCount.total}개 (≤ ${MAX_ADS_PER_PAGE} 정책) [AdSlot: ${adCount.adSlots}, Skyscraper: ${adCount.skyscraper}, Infeed: ${adCount.infeed}, Mobile: ${adCount.mobileAnchor}]`,
    });
  }

  // 3. 금지된 페이지에 광고 있는지 확인
  if (isForbidden && adCount.total > 0) {
    findings.critical.push({
      file: rel,
      route,
      severity: 'CRITICAL',
      msg: `정책 페이지(${route})에 광고 ${adCount.total}개 배치 — 금지`,
    });
  }

  // 4. 금칙어 검출 (계산기 페이지만)
  if (isCalculator) {
    const forbiddenTerms = detectForbiddenTerms(content, filePath);
    for (const term of forbiddenTerms) {
      findings.error.push({
        file: rel,
        route,
        severity: 'ERROR',
        msg: `금칙어 검출: "${term}" (면책조항 없이 사용됨)`,
      });
    }
  }

  // 5. 슬롯 이름 중복 확인
  const slots = extractSlotNames(content);
  const slotCounts = {};
  for (const slot of slots) {
    slotCounts[slot] = (slotCounts[slot] ?? 0) + 1;
    if (!slotStats[slot]) slotStats[slot] = [];
    slotStats[slot].push(route);
  }

  for (const [slot, count] of Object.entries(slotCounts)) {
    if (count > 1) {
      findings.warn.push({
        file: rel,
        route,
        severity: 'WARN',
        msg: `슬롯 "${slot}" 중복 사용 (${count}회) — 같은 페이지 내에서만 유효해야 함`,
      });
    }
  }

  // 6. 통계
  if (!findings._stats) findings._stats = {};
  findings._stats[route] = { calculatorPage: isCalculator, forbiddenPage: isForbidden, adCount };
}

/**
 * 크로스페이지 슬롯 중복 검출
 */
function detectGlobalSlotDupes() {
  for (const [slot, routes] of Object.entries(slotStats)) {
    if (routes.length > 1) {
      findings.error.push({
        file: '[GLOBAL]',
        route: '[CROSS-PAGE]',
        severity: 'ERROR',
        msg: `슬롯 "${slot}"이 다중 페이지에서 사용됨: ${routes.join(', ')} — 각 슬롯은 고유해야 함`,
      });
    }
  }
}

/**
 * 마크다운 리포트 생성
 */
function generateReport() {
  const now = new Date().toISOString().split('T')[0];
  const reportFile = resolve(REPORT_DIR, `adsense-audit-${now}.md`);

  let md = `# AdSense 감사 보고서\n\n`;
  md += `**날짜**: ${now}  \n`;
  md += `**대상**: src/app/calculator/**/*.tsx (${totalPages} 페이지)  \n`;
  md += `**판정**: `;

  const criticalCount = findings.critical.length;
  const errorCount = findings.error.length;
  const warnCount = findings.warn.length;

  if (criticalCount > 0) {
    md += `🚨 **계정 정지 리스크 (${criticalCount} 건)**\n\n`;
  } else if (errorCount > 0) {
    md += `❌ **정책 위반 (${errorCount} 건)**\n\n`;
  } else if (warnCount > 0) {
    md += `⚠️  **주의 필요 (${warnCount} 건)**\n\n`;
  } else {
    md += `✅ **안전**\n\n`;
  }

  // 요약 통계
  md += `## 요약 통계\n\n`;
  md += `| 항목 | 값 |\n`;
  md += `|---|---|\n`;
  md += `| 총 페이지 | ${totalPages} |\n`;
  md += `| 🚨 계정 정지 리스크 | ${criticalCount} |\n`;
  md += `| ❌ 정책 위반 | ${errorCount} |\n`;
  md += `| ⚠️  경고 | ${warnCount} |\n`;
  md += `| ℹ️  정보 | ${findings.info.length} |\n\n`;

  // 상세 결과
  if (findings.critical.length > 0) {
    md += `## 🚨 계정 정지 리스크\n\n`;
    for (const f of findings.critical) {
      md += `- **${f.route}** (${f.file})  \n`;
      md += `  \`${f.msg}\`\n\n`;
    }
  }

  if (findings.error.length > 0) {
    md += `## ❌ 정책 위반\n\n`;
    for (const f of findings.error) {
      md += `- **${f.route}** (${f.file})  \n`;
      md += `  \`${f.msg}\`\n\n`;
    }
  }

  if (findings.warn.length > 0) {
    md += `## ⚠️  경고 (검토 권장)\n\n`;
    for (const f of findings.warn) {
      md += `- **${f.route}** (${f.file})  \n`;
      md += `  \`${f.msg}\`\n\n`;
    }
  }

  // 슬롯 사용 현황
  md += `## 📊 광고 슬롯 사용 현황\n\n`;
  const slotUsage = {};
  for (const stats of Object.values(findings._stats ?? {})) {
    if (stats.adCount) {
      if (stats.adCount.adSlots > 0) slotUsage['AdSlot'] = (slotUsage['AdSlot'] ?? 0) + stats.adCount.adSlots;
      if (stats.adCount.skyscraper > 0) slotUsage['SkyscraperAd'] = (slotUsage['SkyscraperAd'] ?? 0) + stats.adCount.skyscraper;
      if (stats.adCount.infeed > 0) slotUsage['InfeedAd'] = (slotUsage['InfeedAd'] ?? 0) + stats.adCount.infeed;
      if (stats.adCount.mobileAnchor > 0) slotUsage['MobileAnchorAd'] = (slotUsage['MobileAnchorAd'] ?? 0) + stats.adCount.mobileAnchor;
    }
  }

  md += `| 슬롯 유형 | 페이지 수 |\n`;
  md += `|---|---|\n`;
  for (const [type, count] of Object.entries(slotUsage)) {
    md += `| ${type} | ${count} |\n`;
  }
  md += `\n`;

  // 측정 계획
  md += `## 📋 다음 조치\n\n`;
  if (criticalCount > 0) {
    md += `1. **즉시 수정**: 위 계정 정지 리스크 항목들을 모두 해결해야 배포 가능\n`;
  }
  if (errorCount > 0) {
    md += `2. **금칙어 수정**: 면책조항을 추가하거나 표현을 순화\n`;
  }
  md += `3. **발사 후 4주**: eCPM·CTR 비교 (Phase E/F 와 대비)\n`;
  md += `4. **월간**: 정기 감사 스크립트 실행 (GitHub Actions)\n`;

  // 근거
  md += `\n## 📚 근거\n\n`;
  md += `- REFERENCE.md §3 (허용 광고), §4 (금지 광고)\n`;
  md += `- docs/design-system.md §9 (광고 슬롯 규격 및 페이지당 ≤ 4개)\n`;
  md += `- support.google.com/adsense 공식 정책\n`;

  mkdirSync(dirname(reportFile), { recursive: true });
  writeFileSync(reportFile, md, 'utf8');
  return reportFile;
}

/**
 * .env.example 에서 광고 단위 ID 환경변수 검증
 */
function validateAdSenseSlotEnv() {
  const envExamplePath = resolve(ROOT, '.env.example');
  const result = { id: 'adsense-slot-env', status: 'PASS', msg: [] };

  try {
    if (!existsSync(envExamplePath)) {
      return result; // .env.example 없으면 스킵 (선택사항)
    }

    const content = readFileSync(envExamplePath, 'utf8');
    const requiredSlots = ['LEADERBOARD', 'RECTANGLE', 'SKYSCRAPER', 'INFEED', 'ANCHOR'];

    for (const slot of requiredSlots) {
      const pattern = new RegExp(`NEXT_PUBLIC_ADSENSE_SLOT_${slot}=(.+)`, 'i');
      const match = content.match(pattern);

      if (!match) {
        result.msg.push(`NEXT_PUBLIC_ADSENSE_SLOT_${slot} 환경변수 정의 없음`);
        result.status = 'WARN';
      } else {
        const value = match[1].trim();
        if (!VALID_SLOT_ID.test(value) && value !== 'YOUR_SLOT_ID' && value !== '0000000000') {
          result.msg.push(`${slot}: 형식 오류 (10자리 숫자 필요) — ${value}`);
          result.status = 'WARN';
        }
      }
    }
  } catch (e) {
    result.status = 'WARN';
    result.msg.push(`환경변수 검증 오류: ${e.message}`);
  }

  return result;
}

function main() {
  try {
    statSync(SRC_DIR);
  } catch {
    console.error('[audit:adsense] src/ 디렉터리 없음');
    process.exit(1);
  }

  for (const file of walk(join(SRC_DIR, 'app'))) {
    checkPage(file);
  }

  // 크로스 페이지 슬롯 중복 감지
  detectGlobalSlotDupes();

  // 환경변수 검증
  const slotEnvResult = validateAdSenseSlotEnv();
  if (slotEnvResult.msg.length > 0) {
    findings.warn.push({
      file: '.env.example',
      route: '[ENV]',
      severity: 'WARN',
      msg: `광고 단위 ID 환경변수: ${slotEnvResult.msg.join('; ')}`,
    });
  }

  const reportFile = generateReport();
  console.log(`\n[audit:adsense] ${totalPages} 페이지 점검 완료\n`);
  console.log(`📊 상세: ${reportFile}\n`);

  const crit = findings.critical.length;
  const err = findings.error.length;
  const warn = findings.warn.length;

  if (crit > 0) {
    console.log(`🚨 계정 정지 리스크: ${crit} 건 — 즉시 수정 필수\n`);
  }
  if (err > 0) {
    console.log(`❌ 정책 위반: ${err} 건\n`);
  }
  if (warn > 0) {
    console.log(`⚠️  경고: ${warn} 건\n`);
  }

  if (crit === 0 && err === 0) {
    console.log(`✅ 안전\n`);
    process.exit(0);
  } else {
    process.exit(1);
  }
}

main();
