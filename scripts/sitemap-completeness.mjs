#!/usr/bin/env node
/**
 * Sitemap completeness validator.
 *
 * src/app/**\/page.tsx 와 out/sitemap.xml 의 URL 짝을 검증.
 * 신규 페이지 추가 시 sitemap 누락을 빌드 단계에서 차단.
 *
 * 의존성 0. CLI 호출은 가드로 분리하여 단위 테스트 가능.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * src/app/**\/page.tsx 경로를 URL 경로로 변환.
 * - /(group)/, /_private/, /[dynamic]/, /api/ 제외.
 * - 결과는 trailing slash 종결 ('/calculator/salary/').
 */
export function extractPagePaths(files) {
  const out = [];
  for (const file of files) {
    if (!file.endsWith('/page.tsx') && file !== 'src/app/page.tsx') continue;
    let route = file.replace(/^src\/app/, '').replace(/\/page\.tsx$/, '');
    if (route === '') route = '/';
    if (!route.endsWith('/')) route += '/';
    // 제외: 그룹 라우트 (괄호), private (_), 동적 ([), api
    if (/\(|_|\[|^\/api\//.test(route)) continue;
    out.push(route);
  }
  return out;
}

/**
 * sitemap.xml 의 <loc> 태그에서 URL 추출 → 호스트 제거 후 path 만 반환.
 */
export function extractSitemapUrls(xml, host) {
  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    let u = m[1].trim();
    if (host && u.startsWith(host)) u = u.slice(host.length);
    if (!u.startsWith('/')) u = '/' + u;
    urls.push(u);
  }
  return urls;
}

/**
 * 페이지 ↔ sitemap 차집합 계산.
 *  - missingFromSitemap: 페이지는 있는데 sitemap 에 없음 (색인 누락 위험)
 *  - extraInSitemap: sitemap 에는 있는데 페이지 없음 (404 위험)
 */
export function diffPagesVsSitemap(pages, sitemap) {
  const sitemapSet = new Set(sitemap);
  const pageSet = new Set(pages);
  return {
    missingFromSitemap: pages.filter((p) => !sitemapSet.has(p)),
    extraInSitemap: sitemap.filter((s) => !pageSet.has(s)),
  };
}

// ─── CLI 가드 ───────────────────────────────────────────────
function listFilesRecursive(dir, base = '') {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? path.join(base, entry.name) : entry.name;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listFilesRecursive(abs, rel));
    } else if (entry.isFile()) {
      out.push(rel.replace(/\\/g, '/'));
    }
  }
  return out;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');

const isCli = process.argv[1]
  ? fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
  : false;

if (isCli) {
  const appDir = path.join(ROOT_DIR, 'src', 'app');
  const sitemapPath = path.join(ROOT_DIR, 'out', 'sitemap.xml');

  if (!fs.existsSync(sitemapPath)) {
    console.error(`❌ ${sitemapPath} 없음. 먼저 \`npm run build\` 실행.`);
    process.exit(0);
  }

  const files = listFilesRecursive(appDir).map((f) => 'src/app/' + f);
  const pages = extractPagePaths(files);
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const sitemap = extractSitemapUrls(xml, 'https://calculatorhost.com');
  const diff = diffPagesVsSitemap(pages, sitemap);

  console.log(`\n📋 Sitemap 완성도 검증\n`);
  console.log(`  페이지: ${pages.length}개`);
  console.log(`  Sitemap: ${sitemap.length}개`);
  console.log(`  Sitemap 누락: ${diff.missingFromSitemap.length}개`);
  console.log(`  Sitemap 잉여: ${diff.extraInSitemap.length}개\n`);

  if (diff.missingFromSitemap.length > 0) {
    console.log(`❌ Sitemap 누락 페이지 (색인 위험):`);
    for (const p of diff.missingFromSitemap) console.log(`  - ${p}`);
  }
  if (diff.extraInSitemap.length > 0) {
    console.log(`⚠️  Sitemap 잉여 (404 위험):`);
    for (const u of diff.extraInSitemap) console.log(`  - ${u}`);
  }

  // 누락 1개 이상이면 exit 1 — 빌드 게이트
  process.exit(diff.missingFromSitemap.length > 0 ? 1 : 0);
}
