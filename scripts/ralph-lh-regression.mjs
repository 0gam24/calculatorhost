#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const lighthouseDir = path.join(projectRoot, '.lighthouse');
const reportsDir = path.join(projectRoot, '.claude', 'reports');
const baselineFile = path.join(reportsDir, 'lh-baseline.json');

function getLatestLighthouseJson() {
  if (!fs.existsSync(lighthouseDir)) {
    console.warn('[WARN] .lighthouse 없음');
    process.exit(0);
  }
  const files = fs.readdirSync(lighthouseDir)
    .filter(f => f.endsWith('.json'))
    .map(f => ({ name: f, path: path.join(lighthouseDir, f), mtime: fs.statSync(path.join(lighthouseDir, f)).mtime.getTime() }))
    .sort((a, b) => b.mtime - a.mtime);
  if (files.length === 0) {
    console.warn('[WARN] JSON 없음');
    process.exit(0);
  }
  return files[0];
}

function parseLighthouse(jsonPath) {
  return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
}

function extractCwv(data) {
  const lcp = data.audits['largest-contentful-paint'];
  const cls = data.audits['cumulative-layout-shift'];
  const perf = data.categories.performance;
  return {
    lcp: lcp?.numericValue ?? null,
    cls: cls?.numericValue ?? null,
    performance: Math.round((perf?.score ?? 0) * 100),
    measureTime: data.fetchTime || new Date().toISOString()
  };
}

function analyzeLcpElement(data) {
  const audit = data.audits['largest-contentful-paint-element'];
  if (!audit?.details?.items?.[0]) return null;
  const item = audit.details.items[0];
  return {
    element: item.node?.snippet || item.url || 'Unknown',
    type: item.node?.nodeLabel || 'text',
    url: item.url || null
  };
}

function analyzeUnusedJs(data) {
  const audit = data.audits['unused-javascript'];
  if (!audit?.details?.items) return [];
  return audit.details.items.slice(0, 5).map(item => ({
    url: item.url,
    bytes: item.wastedBytes,
    url_short: item.url.substring(Math.max(0, item.url.length - 50))
  }));
}

function analyzeRenderBlocking(data) {
  const audit = data.audits['render-blocking-resources'];
  if (!audit?.details?.items) return [];
  return audit.details.items.slice(0, 3).map(item => ({ url: item.url, ms: item.wastedMs || 0 }));
}

function loadBaseline() {
  if (fs.existsSync(baselineFile)) {
    try {
      return JSON.parse(fs.readFileSync(baselineFile, 'utf8'));
    } catch {
      return {};
    }
  }
  return {};
}

function detectRegression(current, baseline) {
  const issues = [];
  if (baseline.lcp && current.lcp && current.lcp - baseline.lcp >= 200) {
    issues.push({ metric: 'LCP', msg: `${Math.round(baseline.lcp)}ms → ${Math.round(current.lcp)}ms (+${Math.round(current.lcp - baseline.lcp)}ms)` });
  }
  if (baseline.performance && current.performance && baseline.performance - current.performance >= 5) {
    issues.push({ metric: 'Performance', msg: `${baseline.performance} → ${current.performance} (-${baseline.performance - current.performance}점)` });
  }
  if (baseline.cls && current.cls && current.cls - baseline.cls >= 0.05) {
    issues.push({ metric: 'CLS', msg: `${baseline.cls.toFixed(3)} → ${current.cls.toFixed(3)}` });
  }
  return issues;
}

function generateReport(jsonPath, current, baseline, issues, lcp, unused, blocking) {
  const date = new Date().toISOString().split('T')[0];
  const reportPath = path.join(reportsDir, `lh-regression-${date}.md`);
  let content = `# Lighthouse 회귀\n\n**파일**: ${path.basename(jsonPath)}\n**시간**: ${current.measureTime}\n\n`;
  content += `| 지표 | 현재 | 기준선 | 상태 |\n|---|---|---|---|\n`;
  content += `| LCP | ${current.lcp ? Math.round(current.lcp) + 'ms' : 'N/A'} | ${baseline.lcp ? Math.round(baseline.lcp) + 'ms' : '-'} | ${current.lcp && current.lcp <= 2500 ? '✅' : '❌'} |\n`;
  content += `| CLS | ${current.cls ? current.cls.toFixed(3) : 'N/A'} | ${baseline.cls ? baseline.cls.toFixed(3) : '-'} | ${current.cls && current.cls <= 0.1 ? '✅' : '❌'} |\n`;
  content += `| Performance | ${current.performance} | ${baseline.performance || '-'} | ${current.performance >= 90 ? '✅' : '⚠️'} |\n\n`;
  if (issues.length) {
    content += `## 회귀 감지\n\n`;
    issues.forEach(i => content += `- **${i.metric}**: ${i.msg}\n`);
    content += `\n`;
  }
  if (lcp) {
    content += `## LCP 요소\n\n${lcp.element.substring(0, 100)}\n\n`;
  }
  if (unused.length) {
    content += `## 미사용 JS\n\n`;
    unused.forEach(u => content += `- ${u.url_short}: ${(u.bytes / 1024).toFixed(1)}KB\n`);
    content += `\n`;
  }
  fs.mkdirSync(reportsDir, { recursive: true });
  fs.writeFileSync(reportPath, content, 'utf8');
  console.log(`✅ 보고서: ${reportPath}`);
  return reportPath;
}

async function main() {
  try {
    const latest = getLatestLighthouseJson();
    console.log(`📊 분석: ${latest.name}`);
    const data = parseLighthouse(latest.path);
    const current = extractCwv(data);
    const baseline = loadBaseline();
    const lcp = analyzeLcpElement(data);
    const unused = analyzeUnusedJs(data);
    const blocking = analyzeRenderBlocking(data);
    const issues = detectRegression(current, baseline);
    generateReport(latest.path, current, baseline, issues, lcp, unused, blocking);
    fs.mkdirSync(reportsDir, { recursive: true });
    fs.writeFileSync(baselineFile, JSON.stringify(current, null, 2), 'utf8');
    console.log(`✅ 베이스라인 갱신`);
    if (issues.length) {
      console.log(`\n⚠️  회귀 ${issues.length}개:\n`);
      issues.forEach(i => console.log(`  - ${i.metric}: ${i.msg}`));
      process.exit(1);
    }
    console.log(`\n✅ 회귀 없음`);
    process.exit(0);
  } catch (err) {
    console.error(`❌ ${err.message}`);
    process.exit(1);
  }
}

main();
