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
