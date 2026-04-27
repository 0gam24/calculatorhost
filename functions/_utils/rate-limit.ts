/**
 * KV 기반 일일 레이트 리밋
 * Cloudflare KV에 카운터 저장 (24시간 TTL)
 */

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: string;
}

/**
 * KV Namespace 타입
 */
type KVNamespace = {
  get(key: string, type?: string | { type: string }): Promise<unknown>;
  put(key: string, value: unknown, options?: { expirationTtl?: number }): Promise<void>;
} | undefined;

/**
 * 일일 카운터 확인 및 증가
 * @param kv KV Namespace (context.env.RATE_LIMIT_KV)
 * @param key 카운터 키 (e.g. "counter:realtor:2026-04-27")
 * @param limit 일일 한도
 * @param windowSec 리셋 윈도우 (기본 86400 = 24시간)
 */
export async function checkAndIncrementCounter(
  kv: KVNamespace,
  key: string,
  limit: number,
  windowSec: number = 86400,
): Promise<RateLimitResult> {
  // 개발 환경: KV 미설정
  if (!kv) {
    console.warn(`[rate-limit] KV not configured, bypassing check for key: ${key}`);
    return {
      allowed: true,
      remaining: limit,
      resetAt: new Date(Date.now() + windowSec * 1000).toISOString(),
    };
  }

  try {
    const current = await kv.get(key, 'json') as { count: number } | null;
    const count = current?.count ?? 0;

    if (count >= limit) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: new Date(Date.now() + windowSec * 1000).toISOString(),
      };
    }

    // 카운터 증가
    await kv.put(key, JSON.stringify({ count: count + 1 }), {
      expirationTtl: windowSec,
    });

    return {
      allowed: true,
      remaining: limit - (count + 1),
      resetAt: new Date(Date.now() + windowSec * 1000).toISOString(),
    };
  } catch (error) {
    console.error('[rate-limit] KV operation failed:', error);
    // 오류 시 보수적으로 거부
    return {
      allowed: false,
      remaining: 0,
      resetAt: new Date(Date.now() + windowSec * 1000).toISOString(),
    };
  }
}

/**
 * 일일 카운터 키 생성 (UTC 기준)
 */
export function getDailyKey(prefix: string): string {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${prefix}:${year}-${month}-${day}`;
}
