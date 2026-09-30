export function isCloudflarePreview(env) {
  return env.CF_PAGES === '1' && env.CF_PAGES_BRANCH !== 'main';
}

export function noindexHtml(html) {
  return html
    .replace(/<meta\b[^>]*\bname\s*=\s*["'](?:robots|googlebot|bingbot)["'][^>]*>/gi, '')
    .replace(/<\/head>/i, '<meta name="robots" content="noindex, nofollow, noarchive"/></head>');
}

export const PREVIEW_HEADERS = `\n# Non-production preview only: no search indexing or third-party telemetry/ads.\n/*\n  X-Robots-Tag: noindex, nofollow, noarchive\n  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: blob:; connect-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'\n`;
