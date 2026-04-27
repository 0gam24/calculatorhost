/**
 * Phase 2 API 타입 정의
 * functions/ 엔드포인트와 동일한 스키마
 */

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

export interface AddressResult {
  roadAddr: string;
  jibunAddr: string;
  zipNo: string;
  bdNm: string;
  sigungu: string;
}

export interface AddressResponse {
  query: string;
  results: AddressResult[];
  cached: boolean;
}

export class ApiLimitError extends Error {
  constructor(message: string = '일일 한도를 초과했습니다.') {
    super(message);
    this.name = 'ApiLimitError';
  }
}

export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
