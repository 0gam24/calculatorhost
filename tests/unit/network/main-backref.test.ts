import { describe, expect, it } from 'vitest';
import {
  MAIN_SITE_NAME,
  MAIN_SITE_URL,
  getMainCategoryUrl,
  getMainCategoryUrlForCalculatorSlug,
} from '@/lib/network/main-backref';

describe('main-backref: 메인 사이트 상수', () => {
  it('MAIN_SITE_URL 은 trailing slash 없는 origin', () => {
    expect(MAIN_SITE_URL).toBe('https://smartdatashop.kr');
  });

  it('MAIN_SITE_NAME 은 도메인과 동일 표기', () => {
    expect(MAIN_SITE_NAME).toBe('smartdatashop.kr');
  });
});

describe('getMainCategoryUrl: 자매 카테고리 → 메인 hub URL', () => {
  it('tax / finance / real-estate / work → tax-finance hub', () => {
    const expected = 'https://smartdatashop.kr/category/tax-finance/';
    expect(getMainCategoryUrl('tax')).toBe(expected);
    expect(getMainCategoryUrl('finance')).toBe(expected);
    expect(getMainCategoryUrl('real-estate')).toBe(expected);
    expect(getMainCategoryUrl('work')).toBe(expected);
  });

  it('lifestyle → stats hub', () => {
    expect(getMainCategoryUrl('lifestyle')).toBe(
      'https://smartdatashop.kr/category/stats/',
    );
  });

  it('알 수 없는 카테고리는 stats hub 로 fallback', () => {
    expect(getMainCategoryUrl('unknown')).toBe(
      'https://smartdatashop.kr/category/stats/',
    );
    expect(getMainCategoryUrl('')).toBe(
      'https://smartdatashop.kr/category/stats/',
    );
  });

  it('반환 URL 은 항상 trailing slash 종결', () => {
    expect(getMainCategoryUrl('tax').endsWith('/')).toBe(true);
    expect(getMainCategoryUrl('lifestyle').endsWith('/')).toBe(true);
    expect(getMainCategoryUrl('xyz').endsWith('/')).toBe(true);
  });
});

describe('getMainCategoryUrlForCalculatorSlug: 계산기 슬러그 → 메인 hub', () => {
  it('근로 계산기 슬러그는 tax-finance hub', () => {
    const expected = 'https://smartdatashop.kr/category/tax-finance/';
    expect(getMainCategoryUrlForCalculatorSlug('salary')).toBe(expected);
    expect(getMainCategoryUrlForCalculatorSlug('severance')).toBe(expected);
    expect(getMainCategoryUrlForCalculatorSlug('freelancer-tax')).toBe(expected);
  });

  it('세금/부동산/금융 계산기는 tax-finance hub', () => {
    const expected = 'https://smartdatashop.kr/category/tax-finance/';
    expect(getMainCategoryUrlForCalculatorSlug('capital-gains-tax')).toBe(expected);
    expect(getMainCategoryUrlForCalculatorSlug('acquisition-tax')).toBe(expected);
    expect(getMainCategoryUrlForCalculatorSlug('property-tax')).toBe(expected);
    expect(getMainCategoryUrlForCalculatorSlug('broker-fee')).toBe(expected);
    expect(getMainCategoryUrlForCalculatorSlug('loan')).toBe(expected);
    expect(getMainCategoryUrlForCalculatorSlug('loan-limit')).toBe(expected);
  });

  it('생활 계산기 슬러그는 stats hub', () => {
    const expected = 'https://smartdatashop.kr/category/stats/';
    expect(getMainCategoryUrlForCalculatorSlug('bmi')).toBe(expected);
    expect(getMainCategoryUrlForCalculatorSlug('d-day')).toBe(expected);
    expect(getMainCategoryUrlForCalculatorSlug('area')).toBe(expected);
  });

  it('매핑 누락 슬러그는 stats hub fallback (soft 404 회피)', () => {
    expect(getMainCategoryUrlForCalculatorSlug('not-a-real-slug')).toBe(
      'https://smartdatashop.kr/category/stats/',
    );
  });
});
