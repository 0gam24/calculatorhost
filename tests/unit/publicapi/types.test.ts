/**
 * 국토부 실거래가 zod 스키마 단위 테스트
 *
 * 테스트 범위: zod parse만 (네트워크 호출 X)
 * 케이스: 유효값 5개 + 무효값 3개 + XML 파싱 변환 3개
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

  it('샘플 케이스 1: 강남구 84㎡ 거래', () => {
    const input = {
      dealAmount: '850000',
      dealYmd: '20260425',
      lawdCd: '11305', // 강남구
      floor: 8,
      areaExclusive: '84.23',
      buildingName: '강남타워아파트',
      dealType: '매매',
    };

    const result = RtmsApartmentTradeSchema.parse(input);
    expect(result.lawdCd).toBe('11305');
    expect(result.areaExclusive).toBe('84.23');
    expect(result.dealType).toBe('매매');
  });

  it('샘플 케이스 2: 서초구 전세 거래', () => {
    const input = {
      dealAmount: '600000',
      dealYmd: '20260420',
      lawdCd: '11170',
      floor: 15,
      areaExclusive: '102.50',
      buildingName: '서초프라자',
    };

    const result = RtmsApartmentTradeSchema.parse(input);
    expect(result.dealYmd).toBe('20260420');
    expect(result.floor).toBe(15);
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

  it('XML 파싱 변환 샘플 1: 단순 거래', () => {
    // xmlToJson() 함수의 결과 시뮬레이션
    const xmlParsedResult = {
      items: [
        {
          dealAmount: '380000',
          lawdCd: '11110',
          dealYmd: '20260401',
          floor: 3,
          areaExclusive: '59.85',
          buildingName: '테스트아파트3',
        },
      ],
      pageNo: 1,
      totalCount: 1,
      pageSize: 10,
    };

    const result = RtmsApiResponseSchema.parse(xmlParsedResult);
    expect(result.items[0]?.dealAmount).toBe('380000');
    expect(result.items[0]?.floor).toBe(3);
  });

  it('XML 파싱 변환 샘플 2: 복수 거래', () => {
    const xmlParsedResult = {
      items: [
        {
          dealAmount: '750000',
          lawdCd: '11305',
          dealYmd: '20260425',
          floor: 10,
          areaExclusive: '84.50',
          buildingName: '강남아파트1',
        },
        {
          dealAmount: '800000',
          lawdCd: '11305',
          dealYmd: '20260410',
          floor: 20,
          areaExclusive: '102.00',
          buildingName: '강남아파트2',
        },
      ],
      pageNo: 1,
      totalCount: 127,
      pageSize: 10,
    };

    const result = RtmsApiResponseSchema.parse(xmlParsedResult);
    expect(result.items).toHaveLength(2);
    expect(result.totalCount).toBe(127);
    expect(result.items[0]?.lawdCd).toBe('11305');
  });

  it('XML 파싱 변환 샘플 3: 페이징', () => {
    const xmlParsedResult = {
      items: [
        {
          dealAmount: '450000',
          lawdCd: '41113',
          dealYmd: '20260415',
          floor: 6,
          areaExclusive: '84.00',
        },
      ],
      pageNo: 2, // 2페이지
      totalCount: 25,
      pageSize: 10,
    };

    const result = RtmsApiResponseSchema.parse(xmlParsedResult);
    expect(result.pageNo).toBe(2);
    expect(result.totalCount).toBe(25);
  });
});
