#!/usr/bin/env node

/**
 * Ralph FAQ Suggest — Search Console 4티어 FAQ 자동 보강 시스템
 * 입력: data/search-queries.csv (Search Console export)
 * CSV 형식: query,impressions,clicks,position
 */

import fs from 'fs';
import path from 'path';

const CSV_PATH = './data/search-queries.csv';
const OUTPUT_DIR = './.claude/reports';
const POSITION_MIN = 11;
const POSITION_MAX = 30;

// 계산기 슬러그 × 키워드 매핑
const PAGE_KEYWORD_MAP = [
  { slug: 'capital-gains-tax', keywords: ['양도소득세', '양도세', '일시적2주택', '비과세'] },
  { slug: 'acquisition-tax', keywords: ['취득세', '생애최초', '85제곱'] },
  { slug: 'salary', keywords: ['연봉', '실수령액', '세후', '4대보험'] },
  { slug: 'severance', keywords: ['퇴직금', 'DC', 'DB'] },
  { slug: 'property-tax', keywords: ['재산세', '공시가격', '종부세'] },
  { slug: 'loan-limit', keywords: ['DSR', 'LTV', '대출한도'] },
  { slug: 'loan', keywords: ['대출이자', '원리금균등', '월상환'] },
  { slug: 'broker-fee', keywords: ['중개수수료', '수수료'] },
  { slug: 'rent-conversion', keywords: ['전월세', '월세', '보증금'] },
  { slug: 'apartment-subscription', keywords: ['청약가점', '청약'] },
  { slug: 'freelancer-tax', keywords: ['프리랜서', '종합소득세'] },
  { slug: 'car-tax', keywords: ['자동차세', '자동차'] },
  { slug: 'area', keywords: ['평수', '제곱미터'] },
  { slug: 'savings', keywords: ['적금', '예금', '단리'] },
];

function parseCSV(content) {
  const lines = content.trim().split('\n');
  if (lines.length < 2) return [];

  const header = lines[0].split(',').map(h => h.trim().toLowerCase());
  const queryIdx = header.indexOf('query');
  const impressionsIdx = header.indexOf('impressions');
  const positionIdx = header.indexOf('position');

  if (queryIdx === -1 || positionIdx === -1) return [];

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line.split(',').map(p => p.trim().replace(/^"|"$/g, ''));
    const query = parts[queryIdx] || '';
    const impressions = parseInt(parts[impressionsIdx] || '0', 10);
    const position = parseFloat(parts[positionIdx] || '0');

    if (query && position > 0) {
      rows.push({ query, impressions, position });
    }
  }
  return rows;
}

function loadExistingFAQs() {
  const faqMap = new Map();
  const appDir = './src/app';

  if (!fs.existsSync(appDir)) return faqMap;

  function walkDir(dir) {
    try {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          walkDir(fullPath);
        } else if (file.endsWith('.mdx') || file.endsWith('.md')) {
          const content = fs.readFileSync(fullPath, 'utf-8');
          const faqMatches = content.match(/"([^"]*\?[^"]*)"/g) || [];
          for (const match of faqMatches) {
            const q = match.replace(/"/g, '').toLowerCase();
            if (q.length > 3) faqMap.set(q, true);
          }
        }
      }
    } catch (e) {}
  }

  walkDir(appDir);
  return faqMap;
}

function isDuplicate(newQuery, existingFAQs) {
  const lower = newQuery.toLowerCase();
  for (const existing of existingFAQs.keys()) {
    if (existing.includes(lower) || lower.includes(existing)) {
      return true;
    }
  }
  return false;
}

function mapPageSlug(query) {
  const lower = query.toLowerCase();
  for (const mapping of PAGE_KEYWORD_MAP) {
    for (const keyword of mapping.keywords) {
      if (lower.includes(keyword)) return mapping.slug;
    }
  }
  return null;
}

async function main() {
  const csvContent = fs.existsSync(CSV_PATH) 
    ? fs.readFileSync(CSV_PATH, 'utf-8') 
    : '';
  
  const queries = parseCSV(csvContent);
  console.log(`[1/3] CSV 로드: ${queries.length}개 쿼리`);

  const candidates = queries.filter(q => q.position >= POSITION_MIN && q.position <= POSITION_MAX);
  console.log(`[2/3] position ${POSITION_MIN}~${POSITION_MAX} 필터: ${candidates.length}개`);

  const existingFAQs = loadExistingFAQs();
  console.log(`[3/3] 기존 FAQ 로드: ${existingFAQs.size}개`);

  const faqByPage = new Map();
  
  for (const cand of candidates) {
    if (isDuplicate(cand.query, existingFAQs)) continue;
    const slug = mapPageSlug(cand.query);
    if (!slug) continue;

    if (!faqByPage.has(slug)) faqByPage.set(slug, []);
    faqByPage.get(slug).push(cand);
  }

  const suggestions = [];
  for (const [slug, items] of faqByPage.entries()) {
    const sorted = items
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 5);
    suggestions.push({ slug, items: sorted });
  }

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const reportPath = path.join(OUTPUT_DIR, `faq-suggest-${dateStr}.md`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let report = `# Ralph FAQ Suggest — ${dateStr}\n\n`;
  report += `**실행 시간**: ${now.toISOString()}\n`;
  report += `**입력 쿼리**: ${queries.length}개\n`;
  report += `**position 11~30**: ${candidates.length}개\n`;
  report += `**중복 제외 후**: ${suggestions.reduce((s, x) => s + x.items.length, 0)}개\n\n`;

  if (suggestions.length === 0) {
    report += '**결과**: 보강할 FAQ 없음 (입력 데이터 부족 또는 모두 기존 FAQ와 중복)\n';
  } else {
    report += '## 페이지별 추가 권고 FAQ\n\n';
    
    for (const { slug, items } of suggestions) {
      report += `### /calculator/${slug}\n\n`;
      
      for (const item of items) {
        report += `- **"${item.query}"**\n`;
        report += `  - impressions: ${item.impressions}, position: ${item.position.toFixed(1)}\n`;
      }
      report += '\n';
    }

    report += '---\n\n';
    report += '## 다음 단계\n';
    report += '1. content-writer에 위 FAQ 검토 요청\n';
    report += '2. 각 페이지 MDX에 답변과 함께 추가\n';
    report += '3. 2-3주 후 효과 측정\n';
  }

  fs.writeFileSync(reportPath, report, 'utf-8');
  console.log(`\nReport: ${reportPath}`);
}

main().catch(err => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
