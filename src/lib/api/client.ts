/**
 * 클라이언트측 API fetcher
 * Phase 2 API 엔드포인트 호출
 */

import { ApiError, ApiLimitError, RealtorResponse, AddressResponse } from './types';

const API_BASE = typeof window !== 'undefined' ? window.location.origin : '';

/**
 * 실거래가 검색
 * GET /api/realtor?q=검색어&type=apt|land|officetel
 */
export async function fetchRealtor(
  query: string,
  type: 'apt' | 'land' | 'officetel' = 'apt',
): Promise<RealtorResponse> {
  if (!query || query.trim().length < 2) {
    throw new ApiError('invalid_input', '검색어는 최소 2글자 이상이어야 합니다.');
  }

  try {
    const url = new URL('/api/realtor', API_BASE || window.location.origin);
    url.searchParams.set('q', query);
    url.searchParams.set('type', type);

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (res.status === 429) {
      throw new ApiLimitError();
    }

    if (!res.ok) {
      const error = (await res.json()) as { error?: string; message?: string };
      throw new ApiError(
        error.error || 'api_error',
        error.message || 'API 요청에 실패했습니다.',
      );
    }

    return (await res.json()) as RealtorResponse;
  } catch (error) {
    if (error instanceof ApiError || error instanceof ApiLimitError) {
      throw error;
    }
    throw new ApiError('network_error', '네트워크 오류가 발생했습니다.');
  }
}

/**
 * 도로명주소 자동완성
 * GET /api/address?q=검색어
 */
export async function fetchAddress(query: string): Promise<AddressResponse> {
  if (!query || query.trim().length < 2) {
    throw new ApiError('invalid_input', '검색어는 최소 2글자 이상이어야 합니다.');
  }

  try {
    const url = new URL('/api/address', API_BASE || window.location.origin);
    url.searchParams.set('q', query);

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (res.status === 429) {
      throw new ApiLimitError();
    }

    if (!res.ok) {
      const error = (await res.json()) as { error?: string; message?: string };
      throw new ApiError(
        error.error || 'api_error',
        error.message || 'API 요청에 실패했습니다.',
      );
    }

    return (await res.json()) as AddressResponse;
  } catch (error) {
    if (error instanceof ApiError || error instanceof ApiLimitError) {
      throw error;
    }
    throw new ApiError('network_error', '네트워크 오류가 발생했습니다.');
  }
}
