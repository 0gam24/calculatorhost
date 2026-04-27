/**
 * 표준 API 응답 헬퍼
 */

export interface ApiError {
  error: string;
  message: string;
  retryAfter?: number;
}

export function successResponse<T>(data: T, cached: boolean = false): Response {
  return new Response(
    JSON.stringify({
      ...data,
      _cached: cached,
      _timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        'X-Cached': cached ? 'true' : 'false',
      },
    },
  );
}

export function rateLimitResponse(retryAfterSec: number): Response {
  return new Response(
    JSON.stringify({
      error: 'daily_limit_reached',
      message: '일일 한도를 초과했습니다. 내일 다시 시도해주세요.',
      retryAfter: retryAfterSec,
    } as ApiError),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfterSec),
      },
    },
  );
}

export function errorResponse(
  error: string,
  message: string,
  status: number = 400,
): Response {
  return new Response(
    JSON.stringify({
      error,
      message,
    } as ApiError),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

export function internalErrorResponse(details?: string): Response {
  console.error('[api] Internal error:', details);
  return errorResponse(
    'internal_error',
    '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    500,
  );
}
