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
import {
  extractPagePaths,
  extractSitemapUrls,
  diffPagesVsSitemap,
} from './sitemap-validator-core.mjs';

// Re-export for backward compatibility (older imports)
export { extractPagePaths, extractSitemapUrls, diffPagesVsSitemap };

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

  // out/sitemap.xml 은 빌드 산출물이라 소스보다 오래되면 결과 전체가 허위가 된다.
  // (2026-08-12 감사: 3주 묵은 산출물 탓에 최신 15편이 "누락"으로 잘못 보고됨)
  const sitemapMtime = fs.statSync(sitemapPath).mtimeMs;
  const newestPageMtime = Math.max(
    ...listFilesRecursive(appDir)
      .filter((f) => f.endsWith('page.tsx'))
      .map((f) => fs.statSync(path.join(appDir, f)).mtimeMs),
  );
  if (newestPageMtime > sitemapMtime) {
    const days = Math.floor((newestPageMtime - sitemapMtime) / 86_400_000);
    console.error(
      `\n⚠️  out/sitemap.xml 이 소스보다 오래됨 (${days}일 차이).\n` +
        `   지금 비교하면 최신 페이지가 전부 "누락"으로 잘못 잡힌다.\n` +
        `   → \`npm run build\` 후 다시 실행할 것. (검증 건너뜀)\n`,
    );
    process.exit(0);
  }

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
