#!/usr/bin/env node
/**
 * check-guide-quality.mjs
 *
 * 가이드 자동 발행 PR 품질 게이트.
 *
 * 검사 항목:
 *  1. 본문 2,000자 하한 (JSX 마크업·메타 제외)
 *  2. 외부 권위 링크 2개 이상 (홈택스·국세청·기재부·위택스·한은·금감원·법령정보 등)
 *  3. 금지 표현 (투자 권유·수익 보장·확정 절세·100%·1위·유일)
 *  4. AI 보조 작성 표기 ("AI 보조" / "Claude" / "자동 생성")
 *  5. 본문 내 세율 % / 법조항 §번호를 추출하고
 *     `src/lib/constants/tax-rates-2026.ts` SSoT 와 자동 대조 (별도 스크립트에서 활용)
 *
 * 사용 (CLI):
 *   node scripts/check-guide-quality.mjs src/app/guide/<slug>/page.tsx
 *   → exit 0 (green) / 1 (yellow) / 2 (red, 차단)
 *
 * 사용 (라이브러리):
 *   import { validateGuideContent } from './check-guide-quality.mjs';
 *
 * 정책 근거: .claude/rules/seo-content.md, src/app/about/page.tsx 자동 발행 프로세스 섹션,
 * NETWORK adsense-guardian / seo-auditor / content-writer 분석 (2026-05-10).
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// ─────────────────────────────────────────────────────────────
// 권위 외부 링크 화이트리스트 (.claude/rules/calculators.md §"외부 권위 링크" 동기)
// ─────────────────────────────────────────────────────────────
const AUTHORITY_DOMAINS = [
  'hometax.go.kr',
  'nts.go.kr',
  'moef.go.kr',
  'wetax.go.kr',
  'rt.molit.go.kr',
  'reb.or.kr',
  'bok.or.kr',
  'fss.or.kr',
  'finlife.fss.or.kr',
  'ecos.bok.or.kr',
  'koreaexim.go.kr',
  'nhis.or.kr',
  'nps.or.kr',
  'moel.go.kr',
  'comwel.or.kr',
  'applyhome.co.kr',
  'lh.or.kr',
  'kosis.kr',
  'kostat.go.kr',
  'krx.co.kr',
  'kosso.or.kr',
  'mohw.go.kr',
  'law.go.kr',
  '4insure.or.kr',
];

// ─────────────────────────────────────────────────────────────
// 금지 표현 (.claude/rules/seo-content.md §"금지", AdSense YMYL 보호)
// ─────────────────────────────────────────────────────────────
const FORBIDDEN_PATTERNS = [
  { pattern: /투자\s*권유/g, label: '투자 권유' },
  { pattern: /수익\s*보장/g, label: '수익 보장' },
  { pattern: /원금\s*보장/g, label: '원금 보장' },
  { pattern: /확정\s*절세/g, label: '확정 절세' },
  { pattern: /확정\s*수익/g, label: '확정 수익' },
  { pattern: /100\s*%\s*절세/g, label: '100% 절세' },
  { pattern: /국내\s*1위/g, label: '국내 1위' },
  { pattern: /국내\s*유일/g, label: '국내 유일' },
  { pattern: /최고의\s*절세/g, label: '최고의 절세' },
  { pattern: /절대\s*안전/g, label: '절대 안전' },
];

// ─────────────────────────────────────────────────────────────
// AI 보조 표기 패턴
// ─────────────────────────────────────────────────────────────
const AI_DISCLOSURE_PATTERNS = [
  /AI\s*보조/i,
  /Claude/i,
  /자동\s*생성/,
  /Anthropic/i,
];

// ─────────────────────────────────────────────────────────────
// JSX/TSX 본문에서 마크업·import·메타 객체 제거 후 본문만 카운트
// ─────────────────────────────────────────────────────────────
function stripJsxAndMeta(src) {
  return src
    // import / export 라인 제거
    .replace(/^\s*import[\s\S]*?from\s*['"][^'"]+['"];?\s*$/gm, '')
    .replace(/^\s*export\s+(const|default|function|interface|type)[\s\S]*?\}\s*;?\s*$/gm, '')
    // JSX 태그 제거 (단순 tag, attributes 포함)
    .replace(/<\/?[a-zA-Z][^>]*>/g, '')
    // className·href·alt 등 attribute 잔여물 제거
    .replace(/(className|href|src|alt|id|key|target|rel|type|aria-[a-z]+)=["'][^"']*["']/g, '')
    // 중괄호 표현식 제거 ({var}, {/* comment */})
    .replace(/\{[^{}]*\}/g, '')
    // 다중 공백·개행 정리
    .replace(/\s+/g, ' ')
    .trim();
}

// ─────────────────────────────────────────────────────────────
// 1. 본문 길이 검사
// ─────────────────────────────────────────────────────────────
export function checkContentLength(src, threshold = 2000) {
  const cleaned = stripJsxAndMeta(src);
  const length = cleaned.length;
  return {
    pass: length >= threshold,
    severity: length >= threshold ? 'green' : 'red',
    length,
    threshold,
    label: '본문 길이',
  };
}

// ─────────────────────────────────────────────────────────────
// 2. 외부 권위 링크 카운트
// ─────────────────────────────────────────────────────────────
export function checkAuthorityLinks(src, threshold = 2) {
  const found = AUTHORITY_DOMAINS.reduce((count, domain) => {
    // domain 이 escape 되지 않은 정규식 안전 형태로 사용
    const escaped = domain.replace(/\./g, '\\.');
    const regex = new RegExp(`https?://[a-zA-Z0-9._-]*${escaped}`, 'g');
    const matches = src.match(regex);
    return count + (matches ? matches.length : 0);
  }, 0);

  return {
    pass: found >= threshold,
    severity: found >= threshold ? 'green' : 'red',
    found,
    threshold,
    label: '외부 권위 링크',
  };
}

// ─────────────────────────────────────────────────────────────
// 3. 금지 표현 검출
// ─────────────────────────────────────────────────────────────
export function checkForbiddenPatterns(src) {
  const violations = [];
  for (const { pattern, label } of FORBIDDEN_PATTERNS) {
    if (pattern.test(src)) {
      violations.push(label);
    }
  }
  return {
    pass: violations.length === 0,
    severity: violations.length === 0 ? 'green' : 'red',
    violations,
    label: '금지 표현',
  };
}

// ─────────────────────────────────────────────────────────────
// 4. AI 보조 작성 표기
// ─────────────────────────────────────────────────────────────
export function checkAiDisclosure(src) {
  const found = AI_DISCLOSURE_PATTERNS.some((p) => p.test(src));
  return {
    pass: found,
    severity: found ? 'green' : 'red',
    label: 'AI 보조 작성 표기',
  };
}

// ─────────────────────────────────────────────────────────────
// 5. 본문에서 세율 % 추출 (SSoT cross-check 입력용)
// ─────────────────────────────────────────────────────────────
export function extractTaxRatePercents(src) {
  // 정수 또는 소수점 % 매치 — "4.5%", "15%", "12.95%" 등.
  // 앞뒤 영문자/숫자 없는 경계로 가짜 매치(예: "abc15%" 같은 코드) 방지.
  const regex = /(?<![\w.])(\d+(?:\.\d+)?)\s*%/g;
  const rates = new Set();
  let m;
  while ((m = regex.exec(src))) {
    rates.add(parseFloat(m[1]));
  }
  return Array.from(rates).sort((a, b) => a - b);
}

// ─────────────────────────────────────────────────────────────
// 6. 본문에서 법조항 § 추출 (SSoT cross-check 입력용)
// ─────────────────────────────────────────────────────────────
export function extractStatuteSections(src) {
  const sections = new Set();

  // "소득세법 §55", "지방세법 §92", "§59의2" 형식
  const sigilRegex = /([가-힣]+법)\s*§\s*(\d+(?:의\d+)?)/g;
  let m;
  while ((m = sigilRegex.exec(src))) {
    sections.add(`${m[1]} §${m[2]}`);
  }

  // "소득세법 제55조" 형식
  const koreanRegex = /([가-힣]+법)\s*제\s*(\d+(?:의\d+)?)\s*조/g;
  while ((m = koreanRegex.exec(src))) {
    sections.add(`${m[1]} §${m[2]}`);
  }

  return Array.from(sections);
}

// ─────────────────────────────────────────────────────────────
// 통합 검증 (게이트 의사결정)
// ─────────────────────────────────────────────────────────────
export function validateGuideContent(src) {
  const checks = [
    checkContentLength(src),
    checkAuthorityLinks(src),
    checkForbiddenPatterns(src),
    checkAiDisclosure(src),
  ];

  const failures = checks.filter((c) => !c.pass);
  const hasRed = failures.some((c) => c.severity === 'red');
  const hasYellow = failures.some((c) => c.severity === 'yellow');

  return {
    overall: hasRed ? 'red' : hasYellow ? 'yellow' : 'green',
    checks,
    failures,
    extracted: {
      taxRatePercents: extractTaxRatePercents(src),
      statuteSections: extractStatuteSections(src),
    },
  };
}

// ─────────────────────────────────────────────────────────────
// CLI entry — node scripts/check-guide-quality.mjs <path>
// ─────────────────────────────────────────────────────────────
// Windows / POSIX 모두 지원: argv[1]을 file:// URL 로 정규화 후 비교.
const argvUrl = process.argv[1] ? fileURLToPath(import.meta.url) === resolve(process.argv[1]) : false;
if (argvUrl) {
  const targetPath = process.argv[2];
  if (!targetPath) {
    console.error('사용법: node scripts/check-guide-quality.mjs <path/to/page.tsx>');
    process.exit(2);
  }
  const fullPath = resolve(process.cwd(), targetPath);
  if (!existsSync(fullPath)) {
    console.error(`파일 없음: ${fullPath}`);
    process.exit(2);
  }
  const src = readFileSync(fullPath, 'utf8');
  const result = validateGuideContent(src);

  console.log(`[check-guide-quality] ${targetPath}`);
  console.log(`  종합 판정: ${result.overall.toUpperCase()}`);
  for (const c of result.checks) {
    const mark = c.pass ? '✓' : '✗';
    const detail =
      c.length !== undefined
        ? `(${c.length}/${c.threshold}자)`
        : c.found !== undefined
          ? `(${c.found}/${c.threshold}개)`
          : c.violations !== undefined
            ? `(위반: ${c.violations.join(', ') || 'none'})`
            : '';
    console.log(`  ${mark} ${c.label} [${c.severity}] ${detail}`);
  }
  console.log(`  추출 세율: ${result.extracted.taxRatePercents.join('%, ')}%`);
  console.log(`  추출 법조항: ${result.extracted.statuteSections.join(' / ')}`);

  process.exit(result.overall === 'green' ? 0 : result.overall === 'yellow' ? 1 : 2);
}
