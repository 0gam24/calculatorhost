/**
 * Sitemap completeness validator — pure functions only.
 * No node:fs / node:path / fileURLToPath imports → safe to import in vitest.
 *
 * Wrapped CLI lives in scripts/sitemap-completeness.mjs.
 */

export function extractPagePaths(files) {
  const out = [];
  for (const file of files) {
    if (!file.endsWith('/page.tsx') && file !== 'src/app/page.tsx') continue;
    let route = file.replace(/^src\/app/, '').replace(/\/page\.tsx$/, '');
    if (route === '') route = '/';
    if (!route.endsWith('/')) route += '/';
    if (/\(|_|\[|^\/api\//.test(route)) continue;
    out.push(route);
  }
  return out;
}

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

export function diffPagesVsSitemap(pages, sitemap) {
  const sitemapSet = new Set(sitemap);
  const pageSet = new Set(pages);
  return {
    missingFromSitemap: pages.filter((p) => !sitemapSet.has(p)),
    extraInSitemap: sitemap.filter((s) => !pageSet.has(s)),
  };
}
