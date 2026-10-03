const GOOGLE_HOSTS = new Set(['google.com', 'www.google.com', 'google.co.kr', 'www.google.co.kr']);
const NAVER_HOSTS = new Set([
  'naver.com',
  'www.naver.com',
  'm.naver.com',
  'search.naver.com',
  'm.search.naver.com',
]);

/** Return a fixed search origin only. Never return any part of the supplied URL. */
export function getSearchReferrerOrigin(referrer: string): string {
  // URL() normalizes encoded hosts, credentials and some malformed URLs. Check
  // the original authority first so those forms cannot enter the allowlist.
  if (/[\u0000-\u0020\u007f\\]/.test(referrer)) return '';
  const authority = /^https?:\/\/([^/?#]+)(?:[/?#]|$)/i.exec(referrer)?.[1]?.toLowerCase();
  if (!authority || (!GOOGLE_HOSTS.has(authority) && !NAVER_HOSTS.has(authority))) return '';
  try {
    const url = new URL(referrer);
    if (url.username || url.password || url.port || url.hostname !== authority) return '';
    if (GOOGLE_HOSTS.has(authority)) return 'https://www.google.com/';
    return 'https://search.naver.com/';
  } catch {
    return '';
  }
}
