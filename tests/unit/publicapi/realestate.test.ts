/**
 * RTMS API 클라이언트 + 모의 데이터 동작 검증 테스트
 *
 * 테스트 범위:
 * 1. 입력값 검증 (lawdCd, dealYmd)
 * 2. 503 응답 → 모의 데이터 반환
 * 3. 200 정상 응답 → zod parse + filter
 * 4. 네트워크 에러/타임아웃 → 빈 배열
 * 5. 스키마 검증 실패 → 빈 배열
 * 6. 에러 응답 (401, 429, 500) → 빈 배열
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getRtmsApartmentTrade } from '../../../src/lib/publicapi/realestate';

// 전역 fetch mock 설정
global.fetch = vi.fn();

describe('getRtmsApartmentTrade 클라이언트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('입력값 검증', () => {
    it('유효하지 않은 lawdCd (4자리) → 빈 배열 반환', async () => {
      const result = await getRtmsApartmentTrade({ lawdCd: '1111' });
      expect(result).toEqual([]);
    });

    it('유효하지 않은 lawdCd (6자리) → 빈 배열 반환', async () => {
      const result = await getRtmsApartmentTrade({ lawdCd: '111100' });
      expect(result).toEqual([]);
    });

    it('유효하지 않은 dealYmd (7자리) → 빈 배열 반환', async () => {
      const result = await getRtmsApartmentTrade({
        lawdCd: '11110',
        dealYmd: '2026043',
      });
      expect(result).toEqual([]);
    });

    it('유효한 lawdCd (5자리 숫자)', async () => {
      // mock 503 응답 설정
      (global.fetch as any).mockResolvedValueOnce({
        status: 503,
      });

      const result = await getRtmsApartmentTrade({ lawdCd: '11110' });
      // 503 → 모의 데이터 필터링 → 11110 코드만 반환
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((t) => t.lawdCd === '11110')).toBe(true);
    });
  });

  describe('503 응답 → 모의 데이터 폴백', () => {
    it('키 미설정 (503) → 모의 데이터에서 lawdCd 필터링 반환', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        status: 503,
      });

      const result = await getRtmsApartmentTrade({ lawdCd: '11110' });

      // 모의 데이터: 3개 항목 모두 lawdCd='11110'
      expect(result).toHaveLength(3);
      expect(result[0]).toMatchObject({
        dealAmount: '450000',
        dealYmd: '20260430',
        lawdCd: '11110',
        buildingName: '테스트아파트1',
      });
      expect(result[1]?.floor).toBe(12);
      expect(result[2]?.areaExclusive).toBe('59.85');
    });

    it('503 + dealYmd 파라미터 → 모의 데이터 반환 (dealYmd 필터링 없음)', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        status: 503,
      });

      const result = await getRtmsApartmentTrade({
        lawdCd: '11110',
        dealYmd: '20260430',
      });

      // dealYmd는 모의 데이터에서 필터링하지 않음 (전체 반환)
      expect(result.length).toBeGreaterThan(0);
    });

    it('503 + 다른 lawdCd → 모의 데이터 필터 후 빈 배열', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        status: 503,
      });

      // 모의 데이터에는 '99999' lawdCd가 없음
      const result = await getRtmsApartmentTrade({ lawdCd: '99999' });
      expect(result).toEqual([]);
    });
  });

  describe('200 정상 응답 → zod 검증 + 필터링', () => {
    it('{ items: [...] } 형식 응답 → parse + filter', async () => {
      const mockResponse = {
        items: [
          {
            dealAmount: '600000',
            dealYmd: '20260420',
            lawdCd: '11110',
            floor: 8,
            areaExclusive: '95.45',
            buildingName: '우리아파트',
            dealType: '매매',
          },
          {
            dealAmount: '480000',
            dealYmd: '20260415',
            lawdCd: '11140', // 다른 lawdCd
            floor: 5,
            areaExclusive: '84.12',
            buildingName: '저쪽아파트',
            dealType: '매매',
          },
        ],
        pageNo: 1,
        totalCount: 2,
        pageSize: 10,
      };

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getRtmsApartmentTrade({ lawdCd: '11110' });

      // 11110 만 필터링됨
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        dealAmount: '600000',
        lawdCd: '11110',
        buildingName: '우리아파트',
      });
    });

    it('배열 직접 전달 형식 → parse 성공', async () => {
      const mockResponse = [
        {
          dealAmount: '550000',
          dealYmd: '20260410',
          lawdCd: '11110',
          floor: 10,
          areaExclusive: '88.77',
          buildingName: '직배열아파트',
          dealType: '매매',
        },
      ];

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getRtmsApartmentTrade({ lawdCd: '11110' });

      expect(result).toHaveLength(1);
      expect(result[0]?.buildingName).toBe('직배열아파트');
    });
  });

  describe('에러 처리', () => {
    it('응답 OK 아님 (4xx/5xx) → 빈 배열', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        status: 400,
        ok: false,
        statusText: 'Bad Request',
      });

      const result = await getRtmsApartmentTrade({ lawdCd: '11110' });
      expect(result).toEqual([]);
    });

    it('타임아웃 (AbortError) → 빈 배열', async () => {
      (global.fetch as any).mockRejectedValueOnce(
        new Error('The operation was aborted'),
      );

      const result = await getRtmsApartmentTrade({ lawdCd: '11110' });
      expect(result).toEqual([]);
    });

    it('JSON parse 실패 → 빈 배열', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => {
          throw new Error('JSON.parse error');
        },
      });

      const result = await getRtmsApartmentTrade({ lawdCd: '11110' });
      expect(result).toEqual([]);
    });

    it('응답 스키마 검증 실패 (필드 누락) → 빈 배열', async () => {
      const invalidResponse = {
        items: [
          {
            dealAmount: '450000',
            // dealYmd 누락
            lawdCd: '11110',
            floor: 5,
          },
        ],
      };

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => invalidResponse,
      });

      const result = await getRtmsApartmentTrade({ lawdCd: '11110' });
      expect(result).toEqual([]);
    });

    it('응답이 배열도 객체도 아님 (null/undefined) → 빈 배열', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => null,
      });

      const result = await getRtmsApartmentTrade({ lawdCd: '11110' });
      expect(result).toEqual([]);
    });

    it('401 인증 실패 응답 (에러 응답 형식) → 빈 배열', async () => {
      const errorResponse = {
        cmmMsgHeader: {
          successYN: 'N',
          errMsg: 'Invalid authentication key',
          returnAuthMsg: 'API 인증키가 유효하지 않습니다',
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => errorResponse,
      });

      const result = await getRtmsApartmentTrade({ lawdCd: '11110' });
      expect(result).toEqual([]);
    });

    it('429 호출 한도 초과 (에러 응답 형식) → 빈 배열', async () => {
      const errorResponse = {
        cmmMsgHeader: {
          successYN: 'N',
          errMsg: 'Rate limit exceeded',
          returnAuthMsg: '일일 호출 한도를 초과했습니다',
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => errorResponse,
      });

      const result = await getRtmsApartmentTrade({ lawdCd: '11110' });
      expect(result).toEqual([]);
    });

    it('500 서버 오류 (에러 응답 형식) → 빈 배열', async () => {
      const errorResponse = {
        cmmMsgHeader: {
          successYN: 'N',
          errMsg: 'Internal server error',
          returnAuthMsg: '서버 내부 오류가 발생했습니다',
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => errorResponse,
      });

      const result = await getRtmsApartmentTrade({ lawdCd: '11110' });
      expect(result).toEqual([]);
    });
  });

  describe('통합 시나리오', () => {
    it('양도세 계산 페이지: 주소 선택 → RTMS 조회 모의 흐름', async () => {
      // 시나리오: 사용자가 "종로구" 주소 선택
      // → admCd=11110 → lawdCd=11110 매핑
      // → getRtmsApartmentTrade({ lawdCd: '11110' }) 호출
      // → 503 (키 미설정) → 모의 데이터 3개 반환
      // → UI: 최근 거래 3건 표시

      (global.fetch as any).mockResolvedValueOnce({
        status: 503,
      });

      const lawdCd = '11110'; // admCd → lawdCd 변환 완료
      const trades = await getRtmsApartmentTrade({ lawdCd });

      // 검증
      expect(trades.length).toBe(3);
      expect(trades[0]?.dealYmd).toBe('20260430'); // 최신순
      expect(trades[1]?.dealYmd).toBe('20260415');
      expect(trades[2]?.dealYmd).toBe('20260401');

      // 양도세 계산기에 자동 입력 가능한 형식
      trades.forEach((trade) => {
        expect(trade).toHaveProperty('dealAmount');
        expect(trade).toHaveProperty('dealYmd');
        expect(trade).toHaveProperty('areaExclusive');
        expect(/^\d+$/.test(trade.dealAmount)).toBe(true);
      });
    });

    it('프로덕션 키 설정 상황: 200 응답 파싱 후 필터링', async () => {
      const realResponse = {
        items: [
          {
            dealAmount: '780000',
            dealYmd: '20260430',
            lawdCd: '11110',
            floor: 15,
            areaExclusive: '120.50',
            buildingName: '강남아파트',
            dealType: '매매',
          },
          {
            dealAmount: '850000',
            dealYmd: '20260428',
            lawdCd: '11110',
            floor: 8,
            areaExclusive: '115.30',
            buildingName: '논현아파트',
            dealType: '매매',
          },
        ],
        pageNo: 1,
        totalCount: 2,
        pageSize: 10,
      };

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => realResponse,
      });

      const trades = await getRtmsApartmentTrade({ lawdCd: '11110' });

      // 양도세 계산기에 입력 가능
      expect(trades.length).toBe(2);
      expect(trades[0]?.dealAmount).toBe('780000');
      expect(trades[1]?.buildingName).toBe('논현아파트');
    });

    it('API 에러 응답 (401) vs 정상 응답: 클라이언트 견고성', async () => {
      // 첫 번째: 에러 응답
      const errorResponse = {
        cmmMsgHeader: {
          successYN: 'N',
          errMsg: 'Invalid key',
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => errorResponse,
      });

      const errorResult = await getRtmsApartmentTrade({ lawdCd: '11110' });
      expect(errorResult).toEqual([]);

      // 두 번째: 재시도 성공
      const successResponse = {
        items: [
          {
            dealAmount: '400000',
            dealYmd: '20260425',
            lawdCd: '11110',
            floor: 7,
            areaExclusive: '75.50',
            buildingName: '테스트아파트',
            dealType: '매매',
          },
        ],
      };

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => successResponse,
      });

      const retryResult = await getRtmsApartmentTrade({ lawdCd: '11110' });
      expect(retryResult).toHaveLength(1);
      expect(retryResult[0]?.buildingName).toBe('테스트아파트');
    });
  });
});
