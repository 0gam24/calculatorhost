/**
 * 실거래가 검색 API 프록시
 * GET /api/realtor?q={검색어}&type={apt|land|officetel}
 *
 * 국토부 실거래가 API를 프록시하고 캐시·레이트리밋 적용
 */

import { getCached } from '../_utils/cache';
import { checkAndIncrementCounter, getDailyKey } from '../_utils/rate-limit';
import { errorResponse, internalErrorResponse, rateLimitResponse, successResponse } from '../_utils/response';

export interface RealtorResult {
  name: string;
  address: string;
  avgPrice: number; // 만원
  avgArea: number; // ㎡
  txCount: number;
  period: string;
}

export interface RealtorResponse {
  query: string;
  type: 'apt' | 'land' | 'officetel';
  results: RealtorResult[];
  fetchedAt: string;
  cached: boolean;
  fallback?: boolean;
  reason?: string;
}

const API_RATE_LIMIT = 800; // 일 800회 (무료 1,000회의 80%)
const CACHE_TTL = 3600; // 1시간

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const url = new URL(request.url);
  const query = url.searchParams.get('q')?.trim();
  const type = url.searchParams.get('type') as 'apt' | 'land' | 'officetel' | null;

  // 유효성 검사
  if (!query || query.length < 2) {
    return errorResponse('invalid_query', '검색어는 최소 2글자 이상이어야 합니다.', 400);
  }

  if (!type || !['apt', 'land', 'officetel'].includes(type)) {
    return errorResponse('invalid_type', '타입은 apt, land, officetel 중 하나여야 합니다.', 400);
  }

  // 레이트 리밋 확인
  const rateLimitKey = getDailyKey('realtor_api');
  const rateLimitCheck = await checkAndIncrementCounter(
    context.env.RATE_LIMIT_KV,
    rateLimitKey,
    API_RATE_LIMIT,
  );

  if (!rateLimitCheck.allowed) {
    return rateLimitResponse(86400); // 24시간 후 재시도
  }

  try {
    const cacheKey = `realtor:${type}:${query}`;
    const result = await getCached(
      cacheKey,
      CACHE_TTL,
      async () => {
        // 국토부 API 호출 (실제 구현)
        return await fetchFromMolitApi(query, type, context.env.MOLIT_REALTOR_API_KEY);
      },
    );

    const response: RealtorResponse = {
      query,
      type,
      results: result.data,
      fetchedAt: result.fetchedAt,
      cached: result.cached,
    };

    // 결과가 없으면 fallback 표시
    if (result.data.length === 0) {
      response.fallback = true;
      response.reason = 'no_match';
    }

    return successResponse(response, result.cached);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('[realtor] API fetch failed:', errorMsg);

    // API 실패 시 빈 결과 반환 (fallback)
    const response: RealtorResponse = {
      query,
      type,
      results: [],
      fetchedAt: new Date().toISOString(),
      cached: false,
      fallback: true,
      reason: 'api_error',
    };
    return successResponse(response);
  }
};

/**
 * 국토부 실거래가 API 호출
 * 실제 구현: 국토부 API 인증키 사용
 */
async function fetchFromMolitApi(
  query: string,
  type: 'apt' | 'land' | 'officetel',
  apiKey?: string,
): Promise<RealtorResult[]> {
  if (!apiKey) {
    console.warn('[realtor] MOLIT_REALTOR_API_KEY not configured');
    return [];
  }

  // TODO: 국토부 API 호출 로직 구현
  // 다음은 예시 구조
  // const params = new URLSearchParams({
  //   serviceKey: apiKey,
  //   searchType: type,
  //   keyword: query,
  //   pageNo: '1',
  //   numOfRows: '10',
  // });
  //
  // const res = await fetch(
  //   `https://openapi.molit.go.kr/api/GetPtrsTransactionInfo?${params}`,
  // );
  // if (!res.ok) throw new Error('MOLIT API failed');
  // const data = await res.json();
  // return parseRealtorResults(data);

  // Phase 2 MVP: 더미 응답 반환
  return [];
}

/**
 * 더미 응답 생성 (테스트용)
 */
function parseDummyResults(query: string): RealtorResult[] {
  // 이 함수는 실제 API 응답을 파싱하는 로직으로 대체될 예정
  return [
    {
      name: `${query} 아파트`,
      address: '서울시 강남구',
      avgPrice: 75000,
      avgArea: 84,
      txCount: 5,
      period: '최근 3개월',
    },
  ];
}
