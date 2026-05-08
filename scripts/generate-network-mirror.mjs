#!/usr/bin/env node
/**
 * generate-network-mirror.mjs
 *
 * smartdata network HQ(메인 사이트, smartdatashop.kr)가 자매(calculatorhost)의
 * 페이지 list 를 일일 cron 으로 fetch 하여 sister-mirrors/calculatorhost/posts.json
 * 으로 sync 하기 위한 정적 manifest.
 *
 * 출력: public/network-mirror.json
 * 빌드 시 prebuild 단계에서 자동 생성 (package.json scripts.prebuild).
 *
 * 입력 SSoT:
 *  - 슬러그 목록: src/app/sitemap.ts 의 CALCULATOR_SLUGS / GUIDE_SLUGS 와 동기 유지
 *  - 메타: 각 page.tsx 의 export const metadata + DATE_PUBLISHED/DATE_MODIFIED
 *  - 카테고리: src/lib/network/main-backref.ts 의 SLUG_TO_CATEGORY 와 동기
 *  - 용어사전: src/app/glossary/page.tsx 의 GLOSSARY 배열 정규식 추출
 *
 * 금지:
 *  - 환경변수·시크릿 노출 X
 *  - 본문 전체 복제 X (summary 200자 이내만)
 *  - HQ spec 외 양식 변형 X
 */
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const REPO_ROOT = process.cwd();
const SITE = 'https://calculatorhost.com';
const SITE_NAME = 'calculatorhost';

// ─────────────────────────────────────────────────────────────
// SSoT — sitemap.ts·main-backref.ts 와 동기 유지
// ─────────────────────────────────────────────────────────────

const CALCULATOR_SLUGS = [
  'salary',
  'severance',
  'loan',
  'loan-limit',
  'capital-gains-tax',
  'acquisition-tax',
  'property-tax',
  'comprehensive-property-tax',
  'broker-fee',
  'rent-conversion',
  'area',
  'savings',
  'deposit',
  'retirement',
  'bmi',
  'd-day',
  'freelancer-tax',
  'gift-tax',
  'inheritance-tax',
  'vehicle-tax',
  'exchange',
  'housing-subscription',
  'child-tax-credit',
  'n-jobber-insurance',
  'rental-yield',
  'inflation',
  'averaging-down',
  'split-buy',
  'split-sell',
  'vat',
];

const GUIDE_SLUGS = [
  'tax-calendar-2026',
  'year-end-tax-settlement',
  'january-vehicle-tax-prepayment',
  'february-tax-refund-tracking',
  'march-corporate-tax',
  'april-vat-preliminary-q1',
  'april-comprehensive-property-tax-exclusion',
  'may-comprehensive-income-tax',
  'june-property-tax',
  'dsr-loan-limit-tips',
  'averaging-down-vs-loss-cut',
  'capital-gains-tax-tips',
  'dsr-regulation-zones',
  'freelancer-salary-comparison',
  'jeonse-deposit-safety',
  'capital-gains-tax-5-steps',
  'salary-negotiation-take-home',
  'earned-income-tax-credit-vs-child',
];

// 계산기 슬러그 → 자매 자체 카테고리 (main-backref.ts SLUG_TO_CATEGORY 와 동기)
const CALCULATOR_TO_CATEGORY = {
  salary: 'work',
  severance: 'work',
  retirement: 'work',
  'freelancer-tax': 'work',
  'n-jobber-insurance': 'work',
  'child-tax-credit': 'work',
  vat: 'tax',
  'acquisition-tax': 'tax',
  'capital-gains-tax': 'tax',
  'gift-tax': 'tax',
  'inheritance-tax': 'tax',
  'comprehensive-property-tax': 'tax',
  'vehicle-tax': 'tax',
  'property-tax': 'real-estate',
  'broker-fee': 'real-estate',
  'rent-conversion': 'real-estate',
  'rental-yield': 'real-estate',
  'housing-subscription': 'real-estate',
  loan: 'finance',
  'loan-limit': 'finance',
  deposit: 'finance',
  savings: 'finance',
  exchange: 'finance',
  inflation: 'finance',
  'split-buy': 'finance',
  'split-sell': 'finance',
  'averaging-down': 'finance',
  bmi: 'lifestyle',
  'd-day': 'lifestyle',
  area: 'lifestyle',
};

// 가이드 슬러그 → 자매 자체 카테고리 (콘텐츠 주제 기반 best-effort 매핑)
const GUIDE_TO_CATEGORY = {
  'tax-calendar-2026': 'tax',
  'year-end-tax-settlement': 'tax',
  'january-vehicle-tax-prepayment': 'tax',
  'february-tax-refund-tracking': 'tax',
  'march-corporate-tax': 'tax',
  'april-vat-preliminary-q1': 'tax',
  'april-comprehensive-property-tax-exclusion': 'tax',
  'may-comprehensive-income-tax': 'tax',
  'june-property-tax': 'real-estate',
  'dsr-loan-limit-tips': 'finance',
  'averaging-down-vs-loss-cut': 'finance',
  'capital-gains-tax-tips': 'tax',
  'dsr-regulation-zones': 'finance',
  'freelancer-salary-comparison': 'work',
  'jeonse-deposit-safety': 'real-estate',
  'capital-gains-tax-5-steps': 'tax',
  'salary-negotiation-take-home': 'work',
  'earned-income-tax-credit-vs-child': 'work',
};

const CATEGORIES = ['tax', 'finance', 'real-estate', 'work', 'lifestyle'];

// ─────────────────────────────────────────────────────────────
// page.tsx 메타 추출 헬퍼 (정규식 기반, 최소 의존)
// ─────────────────────────────────────────────────────────────

/**
 * page.tsx 에서 metadata.title / metadata.description / DATE_PUBLISHED /
 * DATE_MODIFIED 를 추출. 없으면 mtime fallback.
 */
function readPageMeta(relPath) {
  const fullPath = resolve(REPO_ROOT, relPath);
  if (!existsSync(fullPath)) return null;
  const src = readFileSync(fullPath, 'utf8');

  const titleMatch = src.match(/title:\s*(['"`])([^'"`]+?)\1/);
  // description 은 멀티라인 연결을 위해 description: 다음의 첫 string literal 매치
  const descMatch = src.match(/description:\s*(?:\r?\n\s*)?(['"`])([^'"`]+?)\1/);

  let datePublished = null;
  const dpConst = src.match(/const\s+DATE_PUBLISHED\s*=\s*['"](\d{4}-\d{2}-\d{2})['"]/);
  if (dpConst) datePublished = dpConst[1];
  else {
    const dp = src.match(/datePublished:\s*['"](\d{4}-\d{2}-\d{2})['"]/);
    if (dp) datePublished = dp[1];
  }

  let dateModified = null;
  const dmConst = src.match(/const\s+DATE_MODIFIED\s*=\s*['"](\d{4}-\d{2}-\d{2})['"]/);
  if (dmConst) dateModified = dmConst[1];
  else {
    const dm = src.match(/dateModified:\s*['"](\d{4}-\d{2}-\d{2})['"]/);
    if (dm) dateModified = dm[1];
  }

  const mtime = statSync(fullPath).mtime.toISOString().slice(0, 10);

  return {
    title: titleMatch ? titleMatch[2] : null,
    description: descMatch ? descMatch[2] : null,
    datePublished: datePublished ?? mtime,
    dateModified: dateModified ?? mtime,
  };
}

function truncate(str, n) {
  if (!str) return null;
  if (str.length <= n) return str;
  return str.slice(0, n - 1) + '…';
}

// 한글·영문 혼합 용어 → URL anchor 슬러그 (단순화)
function slugifyTerm(name) {
  return name
    .toLowerCase()
    .replace(/[()[\]{}]/g, '')
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ─────────────────────────────────────────────────────────────
// 페이지 빌더
// ─────────────────────────────────────────────────────────────

function buildCalculatorPosts() {
  const posts = [];
  for (const slug of CALCULATOR_SLUGS) {
    const meta = readPageMeta(`src/app/calculator/${slug}/page.tsx`);
    if (!meta) {
      console.warn(`[network-mirror] calculator/${slug}/page.tsx 없음 — 건너뜀`);
      continue;
    }
    posts.push({
      url: `${SITE}/calculator/${slug}/`,
      title: meta.title,
      category: CALCULATOR_TO_CATEGORY[slug] ?? null,
      persona: null,
      publishedAt: meta.datePublished,
      summary: truncate(meta.description, 200),
      type: 'calculator',
    });
  }
  return posts;
}

function buildGuidePosts() {
  const posts = [];
  for (const slug of GUIDE_SLUGS) {
    const meta = readPageMeta(`src/app/guide/${slug}/page.tsx`);
    if (!meta) {
      console.warn(`[network-mirror] guide/${slug}/page.tsx 없음 — 건너뜀`);
      continue;
    }
    posts.push({
      url: `${SITE}/guide/${slug}/`,
      title: meta.title,
      category: GUIDE_TO_CATEGORY[slug] ?? null,
      persona: null,
      publishedAt: meta.datePublished,
      summary: truncate(meta.description, 200),
      type: 'guide',
    });
  }
  return posts;
}

function buildGlossaryPosts() {
  const path = 'src/app/glossary/page.tsx';
  const fullPath = resolve(REPO_ROOT, path);
  if (!existsSync(fullPath)) {
    console.warn('[network-mirror] glossary/page.tsx 없음 — 용어사전 건너뜀');
    return [];
  }
  const src = readFileSync(fullPath, 'utf8');
  const pageMeta = readPageMeta(path);

  // GLOSSARY 배열 내 { name: '...', ..., description: '...' } 블록 정규식 추출.
  // alternateName / url / relatedCalculator 등은 각 term 의 옵셔널 필드라 무시.
  const termRegex =
    /\{\s*name:\s*(['"`])([^'"`]+?)\1[\s\S]*?description:\s*(['"`])([^'"`]+?)\3/g;

  const posts = [];
  const seen = new Set();
  let m;
  while ((m = termRegex.exec(src))) {
    const name = m[2];
    const description = m[4];
    if (seen.has(name)) continue;
    seen.add(name);
    posts.push({
      url: `${SITE}/glossary/#${slugifyTerm(name)}`,
      title: name,
      category: 'glossary',
      persona: null,
      publishedAt: pageMeta?.datePublished ?? null,
      summary: truncate(description, 200),
      type: 'glossary',
    });
  }
  return posts;
}

// ─────────────────────────────────────────────────────────────
// main
// ─────────────────────────────────────────────────────────────

const startedAt = Date.now();

const calculatorPosts = buildCalculatorPosts();
const guidePosts = buildGuidePosts();
const glossaryPosts = buildGlossaryPosts();
const allPosts = [...calculatorPosts, ...guidePosts, ...glossaryPosts];

const mirror = {
  site: SITE_NAME,
  siteName: SITE_NAME,
  domain: SITE,
  lastUpdated: new Date().toISOString(),
  totalPosts: allPosts.length,
  categories: CATEGORIES,
  personas: ['모든 페르소나'],
  posts: allPosts,
};

const outPath = resolve(REPO_ROOT, 'public/network-mirror.json');
writeFileSync(outPath, JSON.stringify(mirror, null, 2), 'utf8');

const elapsed = Date.now() - startedAt;
console.log(
  `[network-mirror] public/network-mirror.json 생성 완료 ` +
    `(계산기 ${calculatorPosts.length} + 가이드 ${guidePosts.length} + ` +
    `용어 ${glossaryPosts.length} = ${allPosts.length}편, ${elapsed}ms)`,
);
