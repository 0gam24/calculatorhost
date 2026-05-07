#!/usr/bin/env node

// Ralph A - Meta & SEO Auto-Audit
// Purpose: Scan all page.tsx files for metadata & JSON-LD violations
// Checks: title, description, canonical, JSON-LD, og:image
// Dependencies: 0 (fs/path only)
// Usage: node scripts/ralph-meta-audit.mjs [--auto-fix]

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const AUTO_FIX = process.argv.includes('--auto-fix');

// Calculate Korean string length (UTF-16 codepoint basis)
function getKoreanLength(str) {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code >= 0xac00 && code <= 0xd7a3) {
      // Korean syllables (each = 1 char)
      len += 1;
    } else if (code >= 0x3130 && code <= 0x318f) {
      len += 1;
    } else {
      // English, numbers, etc (each = 1 char)
      len += 1;
    }
  }
  return len;
}

// Read file (UTF-8)
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

// Extract metadata via regex
function extractMetadata(content) {
  const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
  const descMatch = content.match(/description:\s*['"]([^'"]+)['"]/);
  const canonicalMatch = content.match(/canonical:\s*['"]([^'"]+)['"]/);

  return {
    title: titleMatch ? titleMatch[1] : null,
    description: descMatch ? descMatch[1] : null,
    canonical: canonicalMatch ? canonicalMatch[1] : null,
  };
}

// Detect JSON-LD builder function calls
function detectJsonLd(content) {
  const jsonLdBuilders = [
    'buildSoftwareApplicationJsonLd',
    'buildWebPageJsonLd',
    'buildBreadcrumbJsonLd',
    'buildFaqPageJsonLd',
    'buildHowToJsonLd',
    'buildSpeakableJsonLd',
  ];
  const detected = jsonLdBuilders.filter(fn => content.includes(fn));
  return detected;
}

// Determine page type (calculator vs other)
function getPageType(routePath) {
  if (routePath.includes('/calculator/')) return 'calculator';
  if (routePath.includes('/category/')) return 'category';
  if (routePath.includes('/guide/')) return 'guide';
  return 'other';
}

// Validate page metadata
function validatePage(filePath, content, routePath) {
  const meta = extractMetadata(content);
  const jsonLd = detectJsonLd(content);
  const pageType = getPageType(routePath);
  const issues = [];

  // 1. Validate title (<= 60 chars)
  if (!meta.title) {
    issues.push({ severity: 'error', check: 'title', msg: 'title metadata missing' });
  } else {
    const titleLen = getKoreanLength(meta.title);
    if (titleLen > 60) {
      issues.push({
        severity: 'error',
        check: 'title',
        msg: `title ${titleLen} chars (limit 60). Current: "${meta.title.substring(0, 30)}..."`,
      });
    }
  }

  // 2. Validate description (80~155 chars)
  if (!meta.description) {
    issues.push({ severity: 'error', check: 'description', msg: 'description metadata missing' });
  } else {
    const descLen = getKoreanLength(meta.description);
    if (descLen < 80) {
      issues.push({
        severity: 'warning',
        check: 'description',
        msg: `description ${descLen} chars (recommend 80). Current: "${meta.description.substring(0, 40)}..."`,
      });
    } else if (descLen > 155) {
      issues.push({
        severity: 'warning',
        check: 'description',
        msg: `description ${descLen} chars (limit 155). Current: "${meta.description.substring(0, 40)}..."`,
      });
    }
  }

  // 3. Validate canonical
  if (!meta.canonical) {
    issues.push({ severity: 'error', check: 'canonical', msg: 'canonical URL missing' });
  } else if (!meta.canonical.startsWith('https://calculatorhost.com')) {
    issues.push({
      severity: 'error',
      check: 'canonical',
      msg: `canonical not absolute URL: "${meta.canonical}"`,
    });
  } else if (!meta.canonical.endsWith('/')) {
    issues.push({
      severity: 'error',
      check: 'canonical',
      msg: `canonical missing trailing slash: "${meta.canonical}"`,
    });
  }

  // 4. Validate JSON-LD
  if (pageType === 'calculator') {
    const required = ['SoftwareApplication', 'WebPage', 'BreadcrumbList', 'FAQPage', 'HowTo', 'Speakable'];
    const missing = required.filter(fn => !jsonLd.some(j => j.includes(fn.replace(/JsonLd/, ''))));
    if (missing.length > 0) {
      issues.push({
        severity: 'error',
        check: 'jsonld',
        msg: `calculator page, missing required JSON-LD: ${missing.join(', ')}`,
      });
    }
  } else {
    // Non-calculator requires at least WebPage + BreadcrumbList
    if (!jsonLd.some(j => j.includes('WebPage'))) {
      issues.push({ severity: 'warning', check: 'jsonld', msg: 'WebPage JSON-LD recommended' });
    }
    if (!jsonLd.some(j => j.includes('BreadcrumbList'))) {
      issues.push({ severity: 'warning', check: 'jsonld', msg: 'BreadcrumbList JSON-LD recommended' });
    }
  }

  // 5. Validate og:image
  if (!content.includes('openGraph') || !content.includes('images')) {
    issues.push({ severity: 'info', check: 'og-image', msg: 'OpenGraph images not set (recommended)' });
  }

  return { meta, jsonLd, pageType, issues };
}

// Find all page.tsx files recursively
function findAllPages(dir, pages = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      findAllPages(fullPath, pages);
    } else if (file === 'page.tsx') {
      pages.push(fullPath);
    }
  }
  return pages;
}

// Main execution
async function main() {
  console.log('Scanning with Ralph A - Meta & SEO Auto-Audit...\n');

  const appDir = path.join(ROOT, 'src', 'app');
  const pages = findAllPages(appDir);
  const results = [];
  let errors = 0;
  let warnings = 0;
  let infos = 0;

  for (const filePath of pages) {
    const content = readFile(filePath);
    if (!content) continue;

    const routePath = filePath.replace(appDir, '').replace(/\\/g, '/').replace('/page.tsx', '/');
    const validation = validatePage(filePath, content, routePath);

    if (validation.issues.length > 0) {
      validation.issues.forEach(issue => {
        if (issue.severity === 'error') errors++;
        else if (issue.severity === 'warning') warnings++;
        else infos++;
      });
    }

    results.push({
      route: routePath,
      file: filePath,
      ...validation,
    });
  }

  // Generate report
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const reportDir = path.join(ROOT, '.claude', 'reports');

  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const reportPath = path.join(reportDir, `meta-audit-${dateStr}.md`);

  let report = `# Ralph A — Meta & SEO Auto-Audit Report\n\n`;
  report += `**Date**: ${now.toLocaleString('ko-KR')}\n`;
  report += `**Pages Scanned**: ${pages.length}\n`;
  report += `**Errors**: ${errors} | **Warnings**: ${warnings} | **Info**: ${infos}\n\n`;

  if (errors === 0 && warnings === 0) {
    report += `✅ **Result**: All pages comply with rules!\n\n`;
  } else {
    report += `⚠️ **Result**: ${errors + warnings} violations found\n\n`;
  }

  // List of violating pages
  const violatingPages = results.filter(r => r.issues.length > 0);

  if (violatingPages.length > 0) {
    report += `## Violating Pages (${violatingPages.length})\n\n`;
    report += `| Path | Errors | Warnings | Info |\n`;
    report += `|---|---|---|---|\n`;

    for (const result of violatingPages) {
      const errCount = result.issues.filter(i => i.severity === 'error').length;
      const warnCount = result.issues.filter(i => i.severity === 'warning').length;
      const infoCount = result.issues.filter(i => i.severity === 'info').length;
      report += `| \`${result.route}\` | ${errCount} | ${warnCount} | ${infoCount} |\n`;
    }

    report += `\n## Detailed Violations\n\n`;

    for (const result of violatingPages) {
      report += `### ${result.route}\n`;
      report += `- **Type**: ${result.pageType}\n`;
      report += `- **File**: \`${result.file.replace(ROOT, '')}\`\n\n`;

      report += `**Issues**:\n`;
      for (const issue of result.issues) {
        const icon = issue.severity === 'error' ? '🔴' : issue.severity === 'warning' ? '🟡' : '🔵';
        report += `- ${icon} [${issue.check}] ${issue.msg}\n`;
      }

      // Remediation suggestions
      if (result.issues.some(i => i.check === 'description' && i.severity === 'warning')) {
        const desc = result.meta.description;
        const descLen = getKoreanLength(desc);
        report += `\n**Suggestion (description)**:\n`;
        if (descLen < 80) {
          const suffix = result.pageType === 'calculator'
            ? ' Free, no sign-up needed. Mobile-optimized. Latest 2026 standards.'
            : ' Free with easy explanations. Recommended calculator.';
          const proposed = desc + suffix;
          const newLen = getKoreanLength(proposed);
          report += `\`"${proposed.substring(0, 60)}..." (${newLen} chars)\`\n`;
        } else if (descLen > 155) {
          const truncated = desc.substring(0, 120);
          report += `\`"${truncated}..." (trim to 120 chars then review)\`\n`;
        }
      }

      report += `\n`;
    }
  }

  report += `## Checklist\n`;
  report += `- [x] Scanned all page.tsx files (${pages.length})\n`;
  report += `- [x] Validated title <= 60 chars\n`;
  report += `- [x] Validated description 80~155 chars\n`;
  report += `- [x] Validated canonical absolute URL + trailing slash\n`;
  report += `- [x] Validated calculator JSON-LD 6 types required\n`;
  report += `- [x] Report generated: \`${reportPath.replace(ROOT, '')}\`\n`;

  fs.writeFileSync(reportPath, report, 'utf-8');

  // Console output (summary)
  console.log(`=== Audit Results ===`);
  console.log(`${pages.length} pages scanned`);
  console.log(`✅ Pass: ${pages.length - violatingPages.length}`);
  console.log(`⚠️  Fail: ${violatingPages.length}`);
  console.log(`  - 🔴 Errors: ${errors}`);
  console.log(`  - 🟡 Warnings: ${warnings}`);
  console.log(`  - 🔵 Info: ${infos}`);
  console.log(`\n📄 Report: ${reportPath.replace(ROOT, '')}`);

  // Top 10 violating pages summary
  if (violatingPages.length > 0) {
    console.log(`\n=== Top 10 Violating Pages ===`);
    console.log('Route | Issue');
    console.log('---|---');
    violatingPages.slice(0, 10).forEach(r => {
      const issue = r.issues[0].check;
      console.log(`\`${r.route}\` | ${issue}`);
    });
  }

  // Exit code
  process.exit(errors > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(2);
});
