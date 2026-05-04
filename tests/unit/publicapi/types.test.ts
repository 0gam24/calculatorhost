/**
 * 국토부 실거래가 zod 스키마 단위 테스트
 *
 * 테스트 범위: zod parse만 (네트워크 호출 X)
 * 케이스: 유효값 5개 + 무효값 3개
 */

import { describe, it, expect } from 'vitest';
import {
  RtmsApartmentTradeSchema,
  RtmsRentSchema,
  RtmsApiResponseSchema,
} from '../../../src/lib/publicapi/types';
import { z } from 'zod';

describe('RtmsApartmentTradeSchema', () => {
  it('유효한 거래 정보 파싱 성공', () => {
    const input = {
      dealAmount: '450000',
      dealYmd: '20260430',
      lawdCd: '11110',
      floor: 5,
      areaExclusive: '84.12',
      buildingName: '테스트아파트',
      dealType: '매매',
    };

    const result = RtmsApartmentTradeSchema.parse(input);
    expect(result.dealAmount).toBe('450000');
    expect(result.lawdCd).toBe('11110');
    expect(result.floor).toBe(5);
  });

  it('선택 필드(buildingName) 제외 파싱 성공', () => {
    const input = {
      dealAmount: '520000',
      dealYmd: '20260415',
      lawdCd: '41113',
      floor: 12,
      areaExclusive: '102.34',
    };

    const result = RtmsApartmentTradeSchema.parse(input);
    expect(result.buildingName).toBeUndefined();
  });

  it('dealYmd YYYYMMDD 형식 검증', () => {
    const invalidInput = {
      dealAmount: '450000',
      dealYmd: '2026-04-30', // 유효하지 않은 형식
      lawdCd: '11110',
      floor: 5,
      areaExclusive: '84.12',
    };

    expect(() => RtmsApartmentTradeSchema.parse(invalidInput)).toThrow(
      z.ZodError,
    );
  });

  it('lawdCd 5자리 숫자 검증', () => {
    const invalidInputs = [
      { ...baseValid(), lawdCd: '1111' }, // 4자리
      { ...baseValid(), lawdCd: '111100' }, // 6자리
      { ...baseValid(), lawdCd: '111AB' }, // 문자
    ];

    invalidInputs.forEach((input) => {
      expect(() => RtmsApartmentTradeSchema.parse(input)).toThrow(
        z.ZodError,
      );
    });
  });

  it('floor를 문자열에서 숫자로 변환', () => {
    const input = {
      dealAmount: '450000',
      dealYmd: '20260430',
      lawdCd: '11110',
      floor: '5', // 문자열
      areaExclusive: '84.12',
    };

    const result = RtmsApartmentTradeSchema.parse(input);
    expect(typeof result.floor).toBe('number');
    expect(result.floor).toBe(5);
  });

  function baseValid() {
    return {
      dealAmount: '450000',
      dealYmd: '20260430',
      lawdCd: '11110',
      floor: 5,
      areaExclusive: '84.12',
    };
  }
});

describe('RtmsRentSchema', () => {
  it('유효한 전세/월세 정보 파싱 성공', () => {
    const input = {
      jibun: '123-45',
      lawdCd: '11140',
      dealYmd: '20260401',
      depositAmount: '300000',
      monthlyRent: 800,
      rentType: '월세',
    };

    const result = RtmsRentSchema.parse(input);
    expect(result.jibun).toBe('123-45');
    expect(result.rentType).toBe('월세');
  });

  it('rentType 열거형 검증', () => {
    const invalid = {
      jibun: '123-45',
      lawdCd: '11140',
      dealYmd: '20260401',
      depositAmount: '300000',
      monthlyRent: 800,
      rentType: '매매', // 유효하지 않음
    };

    expect(() => RtmsRentSchema.parse(invalid)).toThrow(z.ZodError);
  });
});

describe('RtmsApiResponseSchema', () => {
  it('정상 API 응답 파싱 성공', () => {
    const input = {
      items: [
        {
          dealAmount: '450000',
          dealYmd: '20260430',
          lawdCd: '11110',
          floor: 5,
          areaExclusive: '84.12',
        },
        {
          dealAmount: '520000',
          dealYmd: '20260415',
          lawdCd: '11110',
          floor: 12,
          areaExclusive: '102.34',
        },
      ],
      totalCount: 2,
      pageNo: 1,
      pageSize: 10,
    };

    const result = RtmsApiResponseSchema.parse(input);
    expect(result.items).toHaveLength(2);
    expect(result.totalCount).toBe(2);
  });

  it('빈 items 배열 허용', () => {
    const input = {
      items: [],
      totalCount: 0,
      pageNo: 1,
      pageSize: 10,
    };

    const result = RtmsApiResponseSchema.parse(input);
    expect(result.items).toHaveLength(0);
  });
});
