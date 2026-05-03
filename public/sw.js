/**
 * calculatorhost — 최소 Service Worker
 *
 * 전략: stale-while-revalidate (정적 export 환경 호환)
 * - 같은 origin GET 요청만 캐시
 * - 캐시 hit 시 즉시 반환 + 백그라운드 갱신
 * - 캐시 miss 시 네트워크, 실패 시 offline 페이지 fallback
 * - HTML 응답은 짧은 TTL, 정적 자산은 영구
 *
 * 외부 리소스(AdSense·GA·구글폰트)는 캐시하지 않음 (CSP·CORS 안정성).
 */

const VERSION = '2026-05-03';
const STATIC_CACHE = `static-${VERSION}`;
const RUNTIME_CACHE = `runtime-${VERSION}`;
const OFFLINE_URL = '/offline.html';

// 설치 시 핵심 정적 자원 사전 캐시 (선택적 — 실패해도 SW 활성화)
const PRECACHE_URLS = [
  '/',
  '/offline.html',
  '/site.webmanifest',
  '/icon-192.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) =>
        Promise.allSettled(
          PRECACHE_URLS.map((url) =>
            fetch(url, { credentials: 'same-origin' })
              .then((res) => {
                if (res && res.ok) return cache.put(url, res);
              })
              .catch(() => undefined),
          ),
        ),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

function isExternalScript(url) {
  return (
    url.hostname.endsWith('googlesyndication.com') ||
    url.hostname.endsWith('googletagmanager.com') ||
    url.hostname.endsWith('google-analytics.com') ||
    url.hostname.endsWith('doubleclick.net') ||
    url.hostname.endsWith('adtrafficquality.google')
  );
}

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // GET + 같은 origin 만 처리. 그 외는 네트워크 통과.
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (isExternalScript(url)) return;
  if (url.pathname.startsWith('/_next/data/')) return; // 데이터 청크 캐시 X

  // 정적 export 청크는 immutable 캐시 우선 (cache-first)
  if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/fonts/')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((res) => {
          if (res && res.ok) {
            const clone = res.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return res;
        });
      }),
    );
    return;
  }

  // HTML/기타 — stale-while-revalidate
  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((res) => {
          if (res && res.ok) {
            const clone = res.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, clone));
          }
          return res;
        })
        .catch(() => undefined);

      if (cached) {
        // 캐시 hit: 즉시 반환 + 백그라운드 네트워크 갱신
        event.waitUntil(networkFetch);
        return cached;
      }

      // 캐시 miss: 네트워크 시도, 실패 시 offline fallback
      return networkFetch.then((res) => {
        if (res) return res;
        if (request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
        return new Response('', { status: 504, statusText: 'Gateway Timeout' });
      });
    }),
  );
});
