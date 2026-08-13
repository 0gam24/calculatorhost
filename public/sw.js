/**
 * calculatorhost — 최소 Service Worker
 *
 * 전략 (요청 종류별로 다름):
 *  - 페이지 이동(navigate/HTML) : **network-first**. 캐시는 오프라인 fallback 으로만 쓴다.
 *  - 해시된 정적 자산(_next/static, fonts) : cache-first (파일명이 바뀌므로 안전)
 *  - 그 밖의 같은 origin GET : stale-while-revalidate
 *
 * ⚠️ 2026-08-13 버그 수정 — HTML 을 stale-while-revalidate 로 주던 것이 원인이었다.
 * 첫 진입 시 몇 달 전 캐시된 HTML(리브랜딩 이전 보라색 테마·이모지 아이콘)이 그대로 보이고,
 * 사이트 안에서 한 번 이동했다 돌아오면(=클라이언트 라우팅) 최신 화면이 나오는 증상이 났다.
 * HTML 은 용량이 작고 신선도가 훨씬 중요하므로 network-first 가 맞다.
 *
 * 외부 리소스(AdSense·GA·구글폰트)는 캐시하지 않음 (CSP·CORS 안정성).
 */

// 캐시 무효화 키. 배포 후 화면이 낡아 보이면 이 값을 올린다.
const VERSION = '2026-08-13';
const STATIC_CACHE = `static-${VERSION}`;
const RUNTIME_CACHE = `runtime-${VERSION}`;
const OFFLINE_URL = '/offline.html';

// 설치 시 사전 캐시. HTML(`/`)은 **오프라인 대비용**일 뿐, 온라인에서는 쓰이지 않는다.
const PRECACHE_URLS = ['/', OFFLINE_URL, '/site.webmanifest', '/icon-192.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) =>
        Promise.allSettled(
          PRECACHE_URLS.map((url) =>
            fetch(url, { cache: 'reload', credentials: 'same-origin' })
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

/** 페이지 이동이거나 HTML 문서를 원하는 요청인가. */
function isNavigation(request) {
  return (
    request.mode === 'navigate' ||
    (request.destination === 'document') ||
    (request.headers.get('accept') || '').includes('text/html')
  );
}

/** 해시가 박힌 불변 자산인가 (파일명이 바뀌므로 영구 캐시해도 안전). */
function isImmutableAsset(url) {
  return url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/fonts/');
}

/** 네트워크 우선. 성공하면 캐시를 갱신하고, 실패했을 때만 캐시·오프라인 페이지로 내려간다. */
function networkFirst(request) {
  return fetch(request)
    .then((res) => {
      if (res && res.ok) {
        const clone = res.clone();
        caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, clone));
      }
      return res;
    })
    .catch(() =>
      caches
        .match(request)
        .then((cached) => cached || caches.match(OFFLINE_URL))
        .then(
          (res) =>
            res ||
            new Response('', { status: 504, statusText: 'Gateway Timeout' }),
        ),
    );
}

/** 캐시 우선 (불변 자산 전용). */
function cacheFirst(request) {
  return caches.match(request).then((cached) => {
    if (cached) return cached;
    return fetch(request).then((res) => {
      if (res && res.ok) {
        const clone = res.clone();
        caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
      }
      return res;
    });
  });
}

/** 캐시를 즉시 주고 뒤에서 갱신 (HTML 이 아닌 보조 자원 전용). */
function staleWhileRevalidate(request, event) {
  return caches.match(request).then((cached) => {
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
      event.waitUntil(networkFetch);
      return cached;
    }

    return networkFetch.then(
      (res) => res || new Response('', { status: 504, statusText: 'Gateway Timeout' }),
    );
  });
}

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // GET + 같은 origin 만 처리. 그 외는 네트워크 통과.
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (isExternalScript(url)) return;
  if (url.pathname.startsWith('/_next/data/')) return; // 데이터 청크 캐시 X

  // HTML 은 항상 네트워크 우선 — 낡은 화면이 먼저 보이는 일이 없도록.
  if (isNavigation(request)) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (isImmutableAsset(url)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request, event));
});
