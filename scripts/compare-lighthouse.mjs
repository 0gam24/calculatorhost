#!/usr/bin/env node

/**
 * Lighthouse 결과 비교 스크립트
 * 사용: node scripts/compare-lighthouse.mjs <baseline-json> <current-json>
 * 출력: 마크다운 테이블 + exit code (차이 ≥5점이면 1)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node compare-lighthouse.mjs <baseline-json> <current-json>');
    process.exit(1);
  }
  return {
    baseline: args[0],
    current: args[1]
  };
}

function loadJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Failed to load ${filePath}:`, err.message);
    process.exit(1);
  }
}

function extractScores(results) {
  const scores = {};
  results.forEach((result, idx) => {
    const url = (result.url || `Result ${idx + 1}`)
      .replace('http://localhost:4173', '')
      .replace('https://', '');
    
    scores[url] = {
      performance: Math.round(result.categories.performance.score * 100),
      accessibility: Math.round(result.categories.accessibility.score * 100),
      bestPractices: Math.round(result.categories['best-practices'].score * 100),
      seo: Math.round(result.categories.seo.score * 100),
      // Core Web Vitals (간단 추출)
      lcp: result.audits['largest-contentful-paint']?.numericValue || null,
      inp: result.audits['interaction-to-next-paint']?.numericValue || null,
      cls: result.audits['cumulative-layout-shift']?.numericValue || null
    };
  });
  return scores;
}

function formatMs(ms) {
  return ms ? `${(ms / 1000).toFixed(2)}s` : 'N/A';
}

function compareScores(baseline, current) {
  const results = [];
  const allUrls = new Set([...Object.keys(baseline), ...Object.keys(current)]);
  
  let maxRegression = 0;
  const table = [];
  
  allUrls.forEach(url => {
    const b = baseline[url] || {};
    const c = current[url] || {};
    
    const perfDiff = (c.performance || 0) - (b.performance || 0);
    const a11yDiff = (c.accessibility || 0) - (b.accessibility || 0);
    const bpDiff = (c.bestPractices || 0) - (b.bestPractices || 0);
    const seoDiff = (c.seo || 0) - (b.seo || 0);
    
    // 성능 악화 추적
    if (perfDiff < maxRegression) maxRegression = perfDiff;
    
    const perfStr = `${c.performance || '—'}`;
    const perfStatus = perfDiff < -5 ? '🔴' : perfDiff < 0 ? '⚠️' : perfDiff > 0 ? '🟢' : '⚪';
    
    table.push({
      url,
      perf: `${perfStr} (${perfDiff >= 0 ? '+' : ''}${perfDiff})`,
      perfStatus,
      a11y: `${c.accessibility || '—'} (${a11yDiff >= 0 ? '+' : ''}${a11yDiff})`,
      bp: `${c.bestPractices || '—'} (${bpDiff >= 0 ? '+' : ''}${bpDiff})`,
      seo: `${c.seo || '—'} (${seoDiff >= 0 ? '+' : ''}${seoDiff})`
    });
  });
  
  return { table, maxRegression };
}

function main() {
  const { baseline: baselinePath, current: currentPath } = parseArgs();
  
  const baseline = extractScores(loadJson(baselinePath));
  const current = extractScores(loadJson(currentPath));
  
  const { table, maxRegression } = compareScores(baseline, current);
  
  console.log('## Lighthouse Baseline 비교\n');
  console.log('| URL | Performance | Accessibility | Best Practices | SEO |');
  console.log('|---|---|---|---|---|');
  
  table.forEach(row => {
    console.log(
      `| ${row.url} | ${row.perfStatus} ${row.perf} | ${row.a11y} | ${row.bp} | ${row.seo} |`
    );
  });
  
  console.log('\n### 분석');
  if (maxRegression <= -5) {
    console.log(`⚠️ **Performance 점수 ${Math.abs(maxRegression)}점 이상 악화 감지**`);
    console.log('배포 전 성능 개선을 권장합니다.\n');
  } else if (maxRegression < 0) {
    console.log(`⚠️ Performance 소폭 악화 (${maxRegression}점)`);
  } else {
    console.log('✅ Baseline 유지 또는 개선');
  }
  
  process.exit(maxRegression <= -5 ? 1 : 0);
}

main();
