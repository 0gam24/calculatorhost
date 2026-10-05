/** General E2E uses loopback servers only. Production checks use a separate controlled harness. */
export function localQaOrigin(baseURL: string | undefined): string {
  if (!baseURL) throw new Error('QA requires an explicit loopback baseURL');
  const url = new URL(baseURL);
  if (url.protocol !== 'http:' || !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) ||
      url.username || url.password || url.search || url.hash) {
    throw new Error('QA baseURL must be a loopback HTTP server; production/preview URLs are blocked');
  }
  return url.origin;
}

export function qaRequestAction(url: string, method: string, ownOrigin: string): 'local' | 'mock-api' | 'abort' {
  try {
    const target = new URL(url);
    if (target.origin !== ownOrigin || method !== 'GET') return 'abort';
    if (target.pathname === '/api' || target.pathname.startsWith('/api/')) return 'mock-api';
    return 'local';
  } catch {
    return 'abort';
  }
}

export function localQaRequestUrl(url: string, baseURL: string): string {
  const ownOrigin = localQaOrigin(baseURL);
  const destination = new URL(url, baseURL);
  if (qaRequestAction(destination.href, 'GET', ownOrigin) !== 'local') {
    throw new Error('QA APIRequestContext only permits local static GET requests');
  }
  return destination.href;
}

// Browser preconnect/DNS and background requests are outside context.route interception.
export const QA_CHROME_ARGS = [
  '--disable-background-networking',
  '--disable-component-update',
  '--disable-sync',
  '--host-resolver-rules=MAP * 0.0.0.0, EXCLUDE localhost, EXCLUDE 127.0.0.1, EXCLUDE [::1]',
];
