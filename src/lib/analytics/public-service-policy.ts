/** Exclude embeds, policy/error paths and documents explicitly marked noindex. */
const AD_EXCLUDED_PATHS = new Set([
  '/about',
  '/privacy',
  '/terms',
  '/contact',
  '/affiliate-disclosure',
  '/404',
  '/404.html',
  '/_not-found',
  '/not-found',
  '/offline.html',
]);

export function canLoadAdsOnPath(pathname: string, robotsContent = ''): boolean {
  const path = pathname.replace(/\/+$/, '') || '/';
  const noindex = robotsContent
    .toLowerCase()
    .split(/[,\s]+/)
    .includes('noindex');
  return (
    !noindex && path !== '/embed' && !path.startsWith('/embed/') && !AD_EXCLUDED_PATHS.has(path)
  );
}

/** Naver's public tracker sends document.referrer and window.location.href.
 * https://wcs.naver.net/wcslog.js — never activate it with query/hash data. */
export function canLoadNaverTracker(currentUrl: string, referrer: string): boolean {
  try {
    const current = new URL(currentUrl);
    if (current.hostname !== 'calculatorhost.com' || current.search || current.hash) return false;
    if (!referrer) return true;
    const previous = new URL(referrer);
    return !previous.search && !previous.hash;
  } catch {
    return false;
  }
}
