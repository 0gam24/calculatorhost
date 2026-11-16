/**
 * OG 이미지 자동 생성
 *
 * 1) public/og-default.svg → public/og-default.png (1200x630, fallback)
 * 2) src/app/calculator/{slug}/opengraph-image.png — 계산기별 OG
 * 3) src/app/guide/{slug}/opengraph-image.png (+ .alt.txt) — 가이드별 OG (제목 줄바꿈 템플릿)
 * 4) 단일 페이지·가이드 카테고리 OG
 *
 * Next.js App Router 의 opengraph-image 파일 컨벤션을 사용 → page.tsx 수정 불필요.
 * 빌드 시 og:image / og:image:width / og:image:height 자동 등록.
 *
 * 빌드 시점에 자동 실행 (prebuild). 이미지가 최신이면 변환 스킵.
 */

import sharp from 'sharp';
import { readFileSync, existsSync, statSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = process.cwd();
const SVG_PATH = resolve(ROOT, 'public/og-default.svg');
const DEFAULT_PNG = resolve(ROOT, 'public/og-default.png');

// 카테고리 색상 매핑 (2026-07-08 리브랜딩 — 딥 틸 그린 + 골드, docs/bundle.html 시안)
const CATEGORY_ACCENT = {
  근로: { from: '#2f9b85', to: '#8fc7ba', label: '근로·소득' },
  세금: { from: '#1f7d6b', to: '#2f9b85', label: '세금·세무' },
  금융: { from: '#14584c', to: '#1f7d6b', label: '금융·대출' },
  부동산: { from: '#c68b2c', to: '#dbab4b', label: '부동산' },
  생활: { from: '#8fc7ba', to: '#dbab4b', label: '생활·기타' },
};

// 31개 calculator 메타 — sitemap CALCULATOR_SLUGS 와 일치
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
  { slug: 'averaging-down', title: '물타기 (주식·코인)', category: '금융' },
  { slug: 'split-buy', title: '분할매수 (주식·코인)', category: '금융' },
  { slug: 'split-sell', title: '분할매도 (주식·코인)', category: '금융' },
  { slug: 'vat', title: '부가가치세(VAT)', category: '세금' },
  { slug: 'broker-fee', title: '중개수수료', category: '부동산' },
  { slug: 'rent-conversion', title: '전월세 전환', category: '부동산' },
  { slug: 'rental-yield', title: '임대수익률', category: '부동산' },
  { slug: 'housing-subscription', title: '청약가점', category: '부동산' },
  { slug: 'area', title: '평수 환산', category: '생활' },
  { slug: 'bmi', title: 'BMI', category: '생활' },
  { slug: 'd-day', title: 'D-day', category: '생활' },
  { slug: 'weekly-holiday-allowance', title: '주휴수당', category: '근로' },
  { slug: 'annual-leave', title: '연차', category: '근로' },
  { slug: 'dti', title: 'DTI', category: '금융' },
];

// 5개 카테고리 허브 페이지 메타
const CATEGORIES = [
  { slug: 'work', title: '근로 계산기', category: '근로' },
  { slug: 'tax', title: '세금 계산기', category: '세금' },
  { slug: 'finance', title: '금융 계산기', category: '금융' },
  { slug: 'real-estate', title: '부동산 계산기', category: '부동산' },
  { slug: 'lifestyle', title: '생활 계산기', category: '생활' },
];

// 가이드 전체 — 가이드 SSoT(src/app/guide/page.tsx GUIDES)의 slug·title·category 를 읽는다.
// 네이버 콘텐츠 마크업(04-02): og:image 는 문서마다 고유해야 썸네일로 쓰인다 (사이트 공통 이미지는 무시될 수 있음).
function parseGuides() {
  const source = readFileSync(resolve(ROOT, 'src/app/guide/page.tsx'), 'utf8');
  const entry = /slug:\s*'([^']+)',\s*title:\s*(['"])((?:(?!\2)[^\\]|\\.)*)\2,[\s\S]*?category:\s*'([^']+)'/g;
  const guides = [];
  let m;
  while ((m = entry.exec(source))) {
    guides.push({ slug: m[1], title: m[3].replace(/\\(.)/g, '$1'), category: m[4] });
  }
  return guides;
}

// 주요 단일 페이지 메타 — 페이지마다 고유 OG (네이버 04-02, 카톡·SNS 공유 미리보기)
const SINGLES = [
  { slug: 'updates', title: '계산기 변경 이력', label: '업데이트' },
  { slug: 'guide', title: '세금·금융·부동산 가이드 모음', label: '가이드' },
  { slug: 'glossary', title: '금융·세금·투자 용어사전', label: '용어사전' },
  { slug: 'about', title: 'calculatorhost 소개, 운영자 김준혁', label: '소개' },
  { slug: 'contact', title: 'calculatorhost 문의', label: '문의' },
  { slug: 'privacy', title: '개인정보처리방침', label: '정책' },
  { slug: 'terms', title: '이용약관', label: '정책' },
  { slug: 'feeds', title: '피드 구독, RSS·Atom·JSON Feed', label: '구독' },
  { slug: 'embed-widgets', title: '무료 계산기 위젯 삽입', label: '위젯' },
  { slug: 'affiliate-disclosure', title: '어필리에이트 공시', label: '정책' },
  { slug: 'guide/category/tax', title: '세금 가이드 모음', label: '가이드' },
  { slug: 'guide/category/tax-real-estate', title: '세금·부동산 가이드 모음', label: '가이드' },
  { slug: 'guide/category/finance', title: '금융 가이드 모음', label: '가이드' },
  { slug: 'guide/category/investment', title: '투자 가이드 모음', label: '가이드' },
  { slug: 'guide/category/work', title: '근로 가이드 모음', label: '가이드' },
];

// 가이드 카테고리 → 색상 키 (CATEGORY_ACCENT)
function accentKeyFor(category) {
  if (category.includes('부동산')) return '부동산';
  if (category.includes('세금')) return '세금';
  if (/근로|보험|연금/.test(category)) return '근로';
  if (/금융|투자|대출/.test(category)) return '금융';
  return '생활';
}

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
      <stop offset="60%" stop-color="#0f1614" stop-opacity="0"/>
      <stop offset="100%" stop-color="#0f1614"/>
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

  <rect width="1200" height="630" fill="#0f1614"/>
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

// 글자 폭 근사 (한글·한자 1em, 영문 대문자·숫자 0.62em, 소문자 0.55em, 공백 0.3em, 기호 0.45em)
function textWidth(text, size) {
  let width = 0;
  for (const ch of text) {
    const code = ch.codePointAt(0);
    if ((code >= 0xac00 && code <= 0xd7a3) || (code >= 0x3130 && code <= 0x318f) || (code >= 0x4e00 && code <= 0x9fff))
      width += size;
    else if (/[A-Z0-9]/.test(ch)) width += size * 0.62;
    else if (/[a-z]/.test(ch)) width += size * 0.55;
    else if (ch === ' ') width += size * 0.3;
    else width += size * 0.45;
  }
  return width;
}

// 제목을 maxWidth 안에 들어가게 줄바꿈. 공백 단위로 채우고, 한 단어가 넘치면 글자 단위로 자른다.
function wrapTitle(title, size, maxWidth) {
  const lines = [];
  let line = '';
  for (const word of title.split(' ')) {
    const candidate = line ? `${line} ${word}` : word;
    if (textWidth(candidate, size) <= maxWidth) {
      line = candidate;
      continue;
    }
    if (line) lines.push(line);
    line = '';
    for (const ch of word) {
      if (textWidth(line + ch, size) > maxWidth) {
        lines.push(line);
        line = '';
      }
      line += ch;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * 가이드·단일 페이지 OG 템플릿. 계산기 템플릿과 같은 다크 카드에 글 제목을 줄바꿈해 넣는다.
 * "계산기 2026" 같은 계산기 전용 문구는 넣지 않는다 (네이버 03-02 ⑤ 내용과 맞는 썸네일).
 */
function buildPageSvg({ title, label, accentKey }) {
  const accent = CATEGORY_ACCENT[accentKey] ?? CATEGORY_ACCENT.생활;
  const maxWidth = 960;
  let size = 64;
  let lines = wrapTitle(title, size, maxWidth);
  while (lines.length > 3 && size > 44) {
    size -= 6;
    lines = wrapTitle(title, size, maxWidth);
  }
  if (lines.length > 3) {
    lines = lines.slice(0, 3);
    lines[2] = `${lines[2].slice(0, -1)}…`;
  }
  const lineHeight = Math.round(size * 1.22);
  const top = 300 + Math.round((3 - lines.length) * lineHeight * 0.35);
  const chipWidth = Math.round(textWidth(label, 18) + 40);
  const titleText = lines
    .map(
      (l, i) =>
        `<text x="120" y="${top + i * lineHeight}" font-family="'Malgun Gothic', Pretendard, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif" font-size="${size}" font-weight="800" letter-spacing="-2" fill="#FFFFFF">${escapeXml(l)}</text>`,
    )
    .join('\n  ');
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bg" cx="50%" cy="0%" r="80%">
      <stop offset="0%" stop-color="${accent.from}" stop-opacity="0.18"/>
      <stop offset="60%" stop-color="#0f1614" stop-opacity="0"/>
      <stop offset="100%" stop-color="#0f1614"/>
    </radialGradient>
    <linearGradient id="brand" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accent.from}"/>
      <stop offset="100%" stop-color="${accent.to}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0f1614"/>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1050" cy="100" r="180" fill="${accent.from}" opacity="0.22"/>
  <rect x="80" y="80" width="1040" height="470" rx="32" fill="rgba(20,25,40,0.75)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <text x="120" y="150" font-family="Inter, 'Malgun Gothic', sans-serif" font-size="28" font-weight="700" fill="#FFFFFF" letter-spacing="-1">calculatorhost</text>
  <g transform="translate(120, 180)">
    <rect x="0" y="0" width="${chipWidth}" height="38" rx="19" fill="rgba(255,255,255,0.06)" stroke="url(#brand)" stroke-width="1.5"/>
    <text x="${chipWidth / 2}" y="25" text-anchor="middle" font-family="'Malgun Gothic', Pretendard, sans-serif" font-size="18" font-weight="600" fill="url(#brand)">${escapeXml(label)}</text>
  </g>
  ${titleText}
  <text x="1080" y="515" text-anchor="end" font-family="Inter, 'Malgun Gothic', sans-serif" font-size="18" font-weight="500" fill="rgba(255,255,255,0.45)">calculatorhost.com</text>
</svg>`;
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

// 페이지 OG(가이드·단일 페이지)는 한글 글꼴이 있는 로컬에서 만들어 커밋한다.
// Cloudflare 빌드 환경(CF_PAGES=1)에는 한글 글꼴이 없을 수 있어 새로 만들지 않는다.
// 빠진 이미지는 tests/unit/seo/og-images.test.ts 가 커밋 전에 잡는다.
async function generatePageImages(pages, kind) {
  if (process.env.CF_PAGES === '1') {
    console.log(`[og] ${kind} OG: Cloudflare 빌드에서는 생성하지 않음 (로컬에서 만들어 커밋)`);
    return;
  }
  let created = 0;
  let skipped = 0;
  for (const p of pages) {
    const dir = resolve(ROOT, `src/app/${p.dir}`);
    if (!existsSync(dir)) {
      console.warn(`[og] ${p.dir} 디렉터리 없음 — 스킵`);
      continue;
    }
    const outPath = resolve(dir, 'opengraph-image.png');
    if (existsSync(outPath) && !process.env.OG_FORCE) {
      skipped++;
      continue;
    }
    try {
      await svgToPng(buildPageSvg(p), outPath);
      writeFileSync(resolve(dir, 'opengraph-image.alt.txt'), p.title);
      created++;
    } catch (e) {
      console.warn(`[og] ${p.dir} 변환 실패: ${e.message}`);
    }
  }
  console.log(`[og] ${kind} OG 이미지: ${created}개 생성, ${skipped}개 스킵`);
}

async function generateGuides() {
  await generatePageImages(
    parseGuides().map((g) => ({
      dir: `guide/${g.slug}`,
      title: g.title,
      label: g.category,
      accentKey: accentKeyFor(g.category),
    })),
    'guide',
  );
}

async function generateSingles() {
  await generatePageImages(
    SINGLES.map((s) => ({ dir: s.slug, title: s.title, label: s.label, accentKey: '세금' })),
    'singles',
  );
}

async function main() {
  await generateDefault();
  await generateCalculators();
  await generateCategories();
  await generateGuides();
  await generateSingles();
}

main().catch((e) => {
  console.warn(`[og] 전체 실패: ${e.message}`);
  process.exit(0); // 빌드 안 깨뜨림
});
