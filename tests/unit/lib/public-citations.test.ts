// public-citations helper unit tests.
// Verifies formatCitation and ISO date → Korean date conversion.
import { describe, expect, it } from 'vitest';
import {
  formatCitation,
  formatCitationDateKR,
} from '@/lib/publicapi/public-citations';

describe('formatCitationDateKR()', () => {
  it('converts ISO date to YYYY-MM-DD Korean format', () => {
    expect(formatCitationDateKR('2026-04-27T04:45:03.060Z')).toMatch(/^2026-04-27$/);
    expect(formatCitationDateKR('2026-05-12')).toBe('2026-05-12');
  });

  it('handles ECOS YYYYMM format (e.g. "202501")', () => {
    expect(formatCitationDateKR('202501')).toBe('2025-01');
  });

  it('returns input unchanged on parse failure', () => {
    expect(formatCitationDateKR('invalid')).toBe('invalid');
    expect(formatCitationDateKR('')).toBe('');
  });
});

describe('formatCitation()', () => {
  it('builds short citation string with source + date', () => {
    const out = formatCitation({
      source: '한국은행 ECOS',
      label: '기준금리',
      value: '3.00',
      unit: '%',
      date: '202501',
    });
    expect(out).toContain('한국은행 ECOS');
    expect(out).toContain('3.00%');
    expect(out).toContain('2025-01');
  });

  it('omits unit when empty', () => {
    const out = formatCitation({
      source: 'KOSIS',
      label: '중위소득',
      value: '485만',
      unit: '',
      date: '2025-12-01',
    });
    expect(out).toContain('485만');
    expect(out).not.toContain('485만원'); // no double-suffix when unit empty
  });
});

// 2026-10-14: 임시값(fallback)을 공식 기관 수치처럼 보여 주지 않는다
import {
  getEcosBaseRateCitation,
  getEximUsdRateCitation,
  getKosisHouseholdIncomeCitation,
  freshnessText,
} from '@/lib/publicapi/public-citations';

describe('fallback 데이터는 출처 인용을 만들지 않는다', () => {
  it('수출입은행 환율 fallback → null, live → 인용', () => {
    const rates = { USD: 1200 };
    expect(getEximUsdRateCitation({ rates, baseDate: '2026-04-24', source: 'fallback' })).toBeNull();
    expect(getEximUsdRateCitation({ rates, baseDate: '2026-10-13', source: 'live' })?.value).toBe('1,200');
  });

  it('KOSIS 가구소득 fallback → null', () => {
    const data = { householdMonthlyIncome: 4_850_000, householdMonthlyIncomeDate: '2025-12-01' };
    expect(getKosisHouseholdIncomeCitation({ ...data, source: 'fallback' })).toBeNull();
    expect(getKosisHouseholdIncomeCitation({ ...data, source: 'live' })?.value).toBe('485만');
  });

  it('ECOS 기준금리 fallback → null, manual(발표 확인값) → 인용', () => {
    const data = { baseRate: 0.03, baseRateDate: '202608' };
    expect(getEcosBaseRateCitation({ ...data, source: 'fallback' })).toBeNull();
    expect(getEcosBaseRateCitation({ ...data, source: 'manual' })?.value).toBe('3.00');
  });
});

describe('freshnessText (정적 페이지라 상대 시각 대신 날짜)', () => {
  it('live 는 자동 수집 날짜', () => {
    expect(freshnessText({ source: '한국은행 ECOS', fetchedAt: '2026-04-27T04:45:03.060Z', status: 'live' })).toBe(
      '한국은행 ECOS 자동 수집 2026-04-27',
    );
  });
  it('manual 은 발표 확인 날짜', () => {
    expect(freshnessText({ source: '한국은행 ECOS', fetchedAt: '2026-10-14T00:00:00+09:00', status: 'manual' })).toBe(
      '한국은행 ECOS 발표 확인 2026-10-14',
    );
  });
  it('fallback 은 정적 기본값', () => {
    expect(freshnessText({ source: '한국은행 ECOS', fetchedAt: '2026-04-24T00:00:00Z', status: 'fallback' })).toBe(
      '한국은행 ECOS 정적 기본값 (실시간 갱신 대기 중)',
    );
  });
});
