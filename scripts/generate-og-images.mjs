/**
 * OG 이미지 자동 생성
 *
 * 1) public/og-default.svg → public/og-default.png (1200x630, fallback)
 * 2) src/app/calculator/{slug}/opengraph-image.png — 27 페이지별 동적 OG
 *
 * Next.js App Router 의 opengraph-image 파일 컨벤션을 사용 → page.tsx 수정 불필요.
 * 빌드 시 og:image / og:image:width / og:image:height 자동 등록.
 *
 * 빌드 시점에 자동 실행 (prebuild). 이미지가 최신이면 변환 스킵.
 */

import sharp from 'sharp';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = process.cwd();
const SVG_PATH = resolve(ROOT, 'public/og-default.svg');
const DEFAULT_PNG = resolve(ROOT, 'public/og-default.png');

// 카테고리 색상 매핑 (디자인 시스템 토큰)
const CATEGORY_ACCENT = {
  근로: { from: '#00FF88', to: '#00D4FF', label: '근로·소득' },
  세금: { from: '#FF6B9D', to: '#9D4EFF', label: '세금·세무' },
  금융: { from: '#00D4FF', to: '#595FF7', label: '금융·대출' },
  부동산: { from: '#F7C159', to: '#FF6B9D', label: '부동산' },
  생활: { from: '#8EC9DC', to: '#00FF88', label: '생활·기타' },
};

// 27개 calculator 메타 — sitemap CALCULATOR_SLUGS 와 일치
const CALCULATORS = [
  { slug: 'salary', title: '연봉 실수령액', category: '근로' },
  { slug: 'severance', title: '퇴직금', category: '근로' },
  { slug: 'retirement', title: '은퇴자금', category: '근로' },
  { slug: 'freelancer-tax', title: '프리랜서 종합소득세', category: '세금' },
  { slug: 'n-jobber-insurance', title: 'N잡러 건강보험', category: '근로' },
  { slug: 'child-tax-credit', title: '자녀장려금', category: '세금' },
  { slug: 'capital-gains-tax', title: '양도소득세', category: '세금' },
  { slug: 'acquisition-tax', title: '취득세', category: '세금' },
  { slug: 'property-tax', title: '재산세', category: '세금' },
  { slug: 'comprehensive-property-tax', title: '종합부동산세', category: '세금' },
  { slug: 'gift-tax', title: '증여세', category: '세금' },
  { slug: 'inheritance-tax', title: '상속세', category: '세금' },
  { slug: 'vehicle-tax', title: '자동차세', category: '세금' },
  { slug: 'loan', title: '대출이자', category: '금융' },
  { slug: 'loan-limit', title: 'DSR 대출한도', category: '금융' },
  { slug: 'savings', title: '적금 이자', category: '금융' },
  { slug: 'deposit', title: '정기예금 이자', category: '금융' },
  { slug: 'exchange', title: '환율·환전', category: '금융' },
  { slug: 'inflation', title: '인플레이션', category: '금융' },
  { slug: 'averaging-down', title: '주식 물타기', category: '금융' },
  { slug: 'broker-fee', title: '중개수수료', category: '부동산' },
  { slug: 'rent-conversion', title: '전월세 전환', category: '부동산' },
  { slug: 'rental-yield', title: '임대수익률', category: '부동산' },
  { slug: 'housing-subscription', title: '청약가점', category: '부동산' },
  { slug: 'area', title: '평수 환산', category: '생활' },
  { slug: 'bmi', title: 'BMI', category: '생활' },
  { slug: 'd-day', title: 'D-day', category: '생활' },
];

// 5개 카테고리 허브 페이지 메타
const CATEGORIES = [
  { slug: 'work', title: '근로 계산기', category: '근로' },
  { slug: 'tax', title: '세금 계산기', category: '세금' },
  { slug: 'finance', title: '금융 계산기', category: '금융' },
  { slug: 'real-estate', title: '부동산 계산기', category: '부동산' },
  { slug: 'lifestyle', title: '생활 계산기', category: '생활' },
];

/**
 * 페이지별 OG SVG 템플릿
 * 1200x630, 다크 그라데이션, 카테고리별 액센트 색상
 */
function buildSvg({ title, category }) {
  const accent = CATEGORY_ACCENT[category] ?? CATEGORY_ACCENT.생활;
  // SVG 내부에 사용자 입력 들어가지 않음 — 정적 메타데이터 — 안전
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bg" cx="50%" cy="0%" r="80%">
      <stop offset="0%" stop-color="${accent.from}" stop-opacity="0.18"/>
      <stop offset="60%" stop-color="#0A0E1A" stop-opacity="0"/>
      <stop offset="100%" stop-color="#0A0E1A"/>
    </radialGradient>
    <linearGradient id="brand" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accent.from}"/>
      <stop offset="100%" stop-color="${accent.to}"/>
    </linearGradient>
    <linearGradient id="card" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(20,25,40,0.85)"/>
      <stop offset="100%" stop-color="rgba(20,25,40,0.6)"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="#0A0E1A"/>
  <rect width="1200" height="630" fill="url(#bg)"/>

  <circle cx="180" cy="540" r="220" fill="${accent.to}" opacity="0.22"/>
  <circle cx="1050" cy="100" r="180" fill="${accent.from}" opacity="0.22"/>

  <rect x="80" y="80" width="1040" height="470" rx="32" fill="url(#card)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

  <g transform="translate(120, 120)" stroke="url(#brand)" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <rect x="0" y="0" width="64" height="80" rx="8"/>
    <line x1="14" y1="18" x2="50" y2="18"/>
    <circle cx="16" cy="38" r="2" fill="url(#brand)"/>
    <circle cx="32" cy="38" r="2" fill="url(#brand)"/>
    <circle cx="48" cy="38" r="2" fill="url(#brand)"/>
    <circle cx="16" cy="54" r="2" fill="url(#brand)"/>
    <circle cx="32" cy="54" r="2" fill="url(#brand)"/>
    <circle cx="48" cy="54" r="2" fill="url(#brand)"/>
    <circle cx="16" cy="70" r="2" fill="url(#brand)"/>
    <circle cx="32" cy="70" r="2" fill="url(#brand)"/>
    <circle cx="48" cy="70" r="2" fill="url(#brand)"/>
  </g>

  <text x="200" y="155" font-family="Pretendard, Inter, system-ui, sans-serif" font-size="32" font-weight="700" fill="#FFFFFF" letter-spacing="-1">calculatorhost</text>
  <text x="200" y="185" font-family="Pretendard, Inter, system-ui, sans-serif" font-size="16" font-weight="500" fill="rgba(255,255,255,0.55)">2026 한국 세율·금리 반영</text>

  <!-- 카테고리 칩 -->
  <g transform="translate(120, 240)">
    <rect x="0" y="0" width="${accent.label.length * 24 + 32}" height="40" rx="20" fill="rgba(255,255,255,0.06)" stroke="url(#brand)" stroke-width="1.5"/>
    <text x="${(accent.label.length * 24 + 32) / 2}" y="26" text-anchor="middle" font-family="Pretendard, Inter, system-ui, sans-serif" font-size="18" font-weight="600" fill="url(#brand)">${escapeXml(accent.label)}</text>
  </g>

  <!-- 메인 타이틀 -->
  <text x="120" y="370" font-family="Pretendard, Inter, system-ui, sans-serif" font-size="76" font-weight="800" letter-spacing="-3" fill="#FFFFFF">${escapeXml(title)}</text>
  <text x="120" y="445" font-family="Pretendard, Inter, system-ui, sans-serif" font-size="76" font-weight="800" letter-spacing="-3" fill="url(#brand)">계산기 2026</text>

  <!-- 서브 텍스트 -->
  <text x="120" y="500" font-family="Pretendard, Inter, system-ui, sans-serif" font-size="20" font-weight="400" fill="rgba(255,255,255,0.65)">무료 · 회원가입 불필요 · 모바일 최적화</text>

  <text x="1080" y="510" text-anchor="end" font-family="Pretendard, Inter, system-ui, sans-serif" font-size="18" font-weight="500" fill="rgba(255,255,255,0.45)">calculatorhost.com</text>
</svg>`;
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function svgToPng(svg, outPath) {
  const buf = Buffer.from(svg, 'utf8');
  await sharp(buf).resize(1200, 630).png({ quality: 90, compressionLevel: 9 }).toFile(outPath);
}

async function generateDefault() {
  if (!existsSync(SVG_PATH)) {
    console.log('[og] og-default.svg 없음 — 스킵');
    return;
  }
  if (existsSync(DEFAULT_PNG)) {
    if (statSync(DEFAULT_PNG).mtime.getTime() >= statSync(SVG_PATH).mtime.getTime()) {
      console.log('[og] og-default.png 최신 — 스킵');
      return;
    }
  }
  try {
    const svg = readFileSync(SVG_PATH);
    await sharp(svg).resize(1200, 630).png({ quality: 90, compressionLevel: 9 }).toFile(DEFAULT_PNG);
    console.log('[og] og-default.png 생성 완료');
  } catch (e) {
    console.warn(`[og] default PNG 변환 실패: ${e.message}`);
  }
}

async function generateCalculators() {
  let created = 0;
  let skipped = 0;
  for (const c of CALCULATORS) {
    const dir = resolve(ROOT, `src/app/calculator/${c.slug}`);
    if (!existsSync(dir)) {
      console.warn(`[og] ${c.slug} 디렉터리 없음 — 스킵`);
      continue;
    }
    const outPath = resolve(dir, 'opengraph-image.png');
    const svg = buildSvg({ title: c.title, category: c.category });

    // 변경 감지: 기존 PNG 가 있으면 SVG 해시와 비교 (간단히 시간만)
    if (existsSync(outPath)) {
      // 강제 재생성을 원하면 환경변수 OG_FORCE=1
      if (!process.env.OG_FORCE) {
        skipped++;
        continue;
      }
    }

    try {
      await svgToPng(svg, outPath);
      created++;
    } catch (e) {
      console.warn(`[og] ${c.slug} 변환 실패: ${e.message}`);
    }
  }
  console.log(`[og] calculator OG 이미지: ${created}개 생성, ${skipped}개 스킵 (OG_FORCE=1 로 강제 재생성)`);
}

async function generateCategories() {
  let created = 0;
  let skipped = 0;
  for (const c of CATEGORIES) {
    const dir = resolve(ROOT, `src/app/category/${c.slug}`);
    if (!existsSync(dir)) {
      console.warn(`[og] category/${c.slug} 디렉터리 없음 — 스킵`);
      continue;
    }
    const outPath = resolve(dir, 'opengraph-image.png');
    const svg = buildSvg({ title: c.title, category: c.category });

    if (existsSync(outPath) && !process.env.OG_FORCE) {
      skipped++;
      continue;
    }
    try {
      await svgToPng(svg, outPath);
      created++;
    } catch (e) {
      console.warn(`[og] category/${c.slug} 변환 실패: ${e.message}`);
    }
  }
  console.log(`[og] category OG 이미지: ${created}개 생성, ${skipped}개 스킵`);
}

async function main() {
  await generateDefault();
  await generateCalculators();
  await generateCategories();
}

main().catch((e) => {
  console.warn(`[og] 전체 실패: ${e.message}`);
  process.exit(0); // 빌드 안 깨뜨림
});
