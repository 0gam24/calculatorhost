/**
 * Cloudflare Cache API 래퍼
 * TTL 기반 캐싱으로 외부 API 호출 최소화
 */

export interface CacheResult<T> {
  data: T;
  cached: boolean;
  fetchedAt: string;
}

/**
 * 캐시에서 데이터를 가져오거나 fetcher 호출
 */
export async function getCached<T>(
  cacheKey: string,
  ttlSec: number,
  fetcher: () => Promise<T>,
): Promise<CacheResult<T>> {
  try {
    const cache = (caches as unknown as { default: Cache }).default;
    const cacheUrl = new URL(`https://cache.local/${cacheKey}`);

    // 캐시에서 조회
    const cachedResponse = await cache.match(cacheUrl);

    if (cachedResponse) {
      const data = await cachedResponse.json() as T;
      return {
        data,
        cached: true,
        fetchedAt: cachedResponse.headers.get('x-cached-at') || new Date().toISOString(),
      };
    }
  } catch (e) {
    // 캐시 API 미지원 환경에서는 계속 진행
  }

  // 캐시 미스 → fetcher 호출
  const data = await fetcher();
  const fetchedAt = new Date().toISOString();

  // 응답 캐싱 시도 (실패해도 무시)
  try {
    const cache = (caches as unknown as { default: Cache }).default;
    const cacheUrl = new URL(`https://cache.local/${cacheKey}`);

    const response = new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, max-age=${ttlSec}`,
        'x-cached-at': fetchedAt,
      },
    });

    await cache.put(cacheUrl, response.clone());
  } catch (e) {
    // 캐시 저장 실패는 무시
  }

  return {
    data,
    cached: false,
    fetchedAt,
  };
}
