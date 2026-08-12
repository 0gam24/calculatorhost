#!/usr/bin/env node
/**
 * §N (법조항) 인용 audit.
 *
 * YMYL E-E-A-T 신호: 계산기·가이드 페이지마다 최소 1개 이상의 법조항을 인용해야
 * Google·LLM 이 신뢰 신호로 인식. calc-logic-verifier + seo-auditor 합의.
 *
 * 분류:
 *   - missing: 0개 (즉시 보강 필요)
 *   - minimal: 1~2개 (보강 권장)
 *   - strong: 3개 이상 (적정)
 *
 * 의존성 0. CLI 가드로 단위 테스트 가능.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * §N + 제N조 + 제N조의M 패턴 모두 카운트.
 *  - §148, §148의4
 *  - 제111조, 제13의2조, 제111조의2
 */
export function countCitations(src) {
  if (!src) return 0;
  let count = 0;
  // §N 또는 §N의M 패턴 (영문 §)
  const sectionA = src.match(/§\s*\d+(?:의\d+)?/g) || [];
  count += sectionA.length;
  // 제N조 또는 제N조의M 패턴 (한국어 표기)
  const sectionB = src.match(/제\s*\d+\s*조(?:의\s*\d+)?/g) || [];
  count += sectionB.length;
  return count;
}

/**
 * §N 인용 0건이어도 게이트를 막지 않는 경로 — **명시 등재된 것만** 면제한다(default-deny).
 *
 * 배경 (2026-08-12 SEO 감사): missing 1건만 있어도 exit 1 이라 SEO+AEO+GEO Gate 가
 * 상시 실패했고, 그 결과 게이트 자체가 무시되어 진짜 YMYL 회귀를 막지 못했다.
 * 면제는 "법조항 개념이 성립하지 않는 페이지"로 한정하며 사유를 반드시 남긴다.
 * 세금 페이지는 어떤 경우에도 면제하지 않는다 (tests 가 이를 강제).
 */
export const CITATION_EXEMPT = {
  // 계산 유틸 — 법령이 아니라 산술 공식만 다룸
  '/calculator/bmi/': '건강 지표 계산 — 근거 법령 없음',
  '/calculator/d-day/': '날짜 계산 유틸 — 근거 법령 없음',
  '/calculator/area/': '단위 환산 유틸 — 근거 법령 없음',
  '/calculator/inflation/': '화폐가치 환산 — 통계 기반, 법령 없음',
  '/calculator/exchange/': '환율 환산 — 시장 시세 기반, 법령 없음',
  '/calculator/averaging-down/': '투자 평단 시뮬 — 법령 없음',
  '/calculator/split-buy/': '분할매수 시뮬 — 법령 없음',
  '/calculator/split-sell/': '분할매도 시뮬 — 법령 없음',

  // 카테고리 허브 — 개별 가이드로 보내는 목록 페이지
  '/guide/category/tax/': '카테고리 허브(목록) — 본문 없음',
  '/guide/category/tax-real-estate/': '카테고리 허브(목록) — 본문 없음',
  '/guide/category/finance/': '카테고리 허브(목록) — 본문 없음',
  '/guide/category/investment/': '카테고리 허브(목록) — 본문 없음',
  '/guide/category/work/': '카테고리 허브(목록) — 본문 없음',

  // 금융 상품·산식 가이드 — 근거가 법률 조문이 아니라 감독규정·약관·상품 고시
  '/guide/dsr-dti-ltv-difference-2026/': '금융위 감독규정·행정지도 기반 — 법률 §N 부재',
  '/guide/dti-calculation-2026/': '금융위 감독규정 기반 — 법률 §N 부재',
  '/guide/ltv-calculation-2026/': '금융위 감독규정 기반 — 법률 §N 부재',
  '/guide/stress-dsr-stage3-2026/': '금융위 행정지도(스트레스 DSR) 기반 — 법률 §N 부재',
  '/guide/equal-payment-vs-equal-principal-2026/': '상환방식 산식 비교 — 법령 없음',
  '/guide/prepayment-penalty-fee-2026/': '은행 약관·상품설명서 기반',
  '/guide/mortgage-fixed-vs-variable-rate-2026/': '금리 유형 비교 — 상품 약관 기반',
  '/guide/mortgage-refinance-savings-2026/': '대환 시뮬 — 상품 약관 기반',
  '/guide/jeonse-loan-limit-interest-2026/': '보증기관 상품 기준 기반',
  '/guide/didimdol-loan-conditions-2026/': '주택도시기금 상품 기준(기금운용계획) 기반',
  '/guide/newborn-special-mortgage-loan-2026/': '주택도시기금 상품 기준 기반',
  '/guide/credit-score-loan-interest-rate-2026/': '신용평가사 산정 기준 — 법률 §N 부재',
  '/guide/currency-exchange-fee-preferential-rate-2026/': '은행 환전 수수료 약관 기반',
  '/guide/car-installment-vs-lease-vs-rent-2026/': '금융상품 비교 — 상품 약관 기반',
  '/guide/rental-yield-calculation-2026/': '수익률 산식 — 법령 없음',
  '/guide/inflation-money-value-2026/': '물가 환산 — 통계 기반',
  '/guide/split-sell-profit-taking-strategy-2026/': '투자 전략 시뮬 — 법령 없음',
  '/guide/ipo-subscription-allocation-2026/': '증권사 배정 규정·인수업무규정 기반',

  // 공급·지원 제도 — 국토부 규칙·지자체 고시 기반 (법률 조문 아님)
  '/guide/housing-subscription-first-priority-2026/': '주택공급규칙(국토부령)·고시 기반',
  '/guide/housing-subscription-no-house-period-2026/': '주택공급규칙(국토부령)·고시 기반',
  '/guide/housing-subscription-score-84-points-2026/': '주택공급규칙(국토부령)·고시 기반',
  '/guide/housing-pension-reverse-mortgage-2026/': 'HF 주택연금 상품 기준 기반',
  '/guide/youth-monthly-rent-support-2026/': '지자체·국토부 사업 공고 기반',
  '/guide/income-contingent-loan-repayment-2026/': '한국장학재단 상환 기준 기반',
};

/**
 * missing 목록을 "게이트 차단(blocking)" 과 "명시 면제(exempted)" 로 가른다.
 * 등재되지 않은 경로는 전부 blocking — 신규 페이지가 조용히 빠져나가지 못한다.
 */
export function partitionMissing(missingPaths, exempt = CITATION_EXEMPT) {
  const blocking = [];
  const exempted = [];
  for (const p of missingPaths) {
    if (Object.prototype.hasOwnProperty.call(exempt, p)) exempted.push(p);
    else blocking.push(p);
  }
  return { blocking, exempted };
}

/**
 * 페이지별 카운트를 missing/minimal/strong 으로 분류.
 *  - 0     → missing
 *  - 1~2   → minimal
 *  - 3+    → strong
 */
export function classifyCitations(entries) {
  const missing = [];
  const minimal = [];
  const strong = [];
  for (const e of entries) {
    if (e.count === 0) missing.push(e.path);
    else if (e.count <= 2) minimal.push(e.path);
    else strong.push(e.path);
  }
  return { missing, minimal, strong };
}

// ─── CLI 가드 ──────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const STATE_FILE = path.join(ROOT_DIR, '.claude', 'STATE.md');

function listCalculatorAndGuidePages(appDir) {
  const out = [];
  function walk(dir, base = '') {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = base ? path.join(base, entry.name) : entry.name;
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(abs, rel);
      } else if (entry.isFile() && entry.name === 'page.tsx') {
        const route = '/' + rel.replace(/\\/g, '/').replace(/page\.tsx$/, '');
        if (route.startsWith('/calculator/') || route.startsWith('/guide/')) {
          out.push({ path: route, abs });
        }
      }
    }
  }
  walk(appDir);
  return out;
}

const isCli = process.argv[1]
  ? fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
  : false;

if (isCli) {
  const appDir = path.join(ROOT_DIR, 'src', 'app');
  const pages = listCalculatorAndGuidePages(appDir);

  const entries = pages.map(({ path: p, abs }) => {
    const src = fs.readFileSync(abs, 'utf8');
    return { path: p, count: countCitations(src) };
  });

  const result = classifyCitations(entries);
  console.log(`\n📋 §N 법조항 인용 audit (${entries.length}개 페이지)\n`);
  console.log(`  ✅ strong (3+): ${result.strong.length}`);
  console.log(`  🟡 minimal (1~2): ${result.minimal.length}`);
  console.log(`  🔴 missing (0): ${result.missing.length}\n`);

  const { blocking, exempted } = partitionMissing(result.missing);

  if (blocking.length > 0) {
    console.log(`🔴 §N 인용 0건 — 게이트 차단 (즉시 보강 필요):`);
    for (const p of blocking) console.log(`  - ${p}`);
    console.log('');
  }
  if (exempted.length > 0) {
    console.log(`⚪ §N 인용 0건 — 명시 면제 (${exempted.length}개, 사유 등재됨):`);
    for (const p of exempted) console.log(`  - ${p}  · ${CITATION_EXEMPT[p]}`);
    console.log('');
  }
  if (result.minimal.length > 0) {
    console.log(`🟡 §N 인용 1~2건 페이지 (보강 권장):`);
    for (const p of result.minimal) console.log(`  - ${p}`);
    console.log('');
  }

  // STATE.md 알려진 이슈 섹션에 누락 페이지 기록 (수동 영역, 마커 없음 → 운영자 검토)
  const total = blocking.length + result.minimal.length;
  if (total > 0) {
    console.log(`📌 보강 필요 합계: ${total}개 페이지 (면제 ${exempted.length}개 제외)`);
    console.log(`   STATE.md "8. 알려진 이슈" 섹션에 추가 권장.\n`);
  }

  // 면제 등재되지 않은 0건 페이지만 게이트를 막는다.
  process.exit(blocking.length > 0 ? 1 : 0);
}
