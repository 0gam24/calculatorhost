// date-modified helper unit tests.
// Verifies URL pathname extraction + manifest lookup for jsonld auto-matching.
import { describe, expect, it } from 'vitest';
import { getDateModifiedFromManifest } from '@/lib/seo/date-modified-helper';

describe('getDateModifiedFromManifest()', () => {
  const fakeManifest = {
    '/': '2026-05-12T10:00:00+09:00',
    '/calculator/salary/': '2026-05-10T10:00:00+09:00',
    '/category/tax/': '2026-05-08T10:00:00+09:00',
  };

  it('extracts pathname from full URL and returns manifest entry', () => {
    const out = getDateModifiedFromManifest(
      'https://calculatorhost.com/calculator/salary/',
      fakeManifest,
    );
    expect(out).toBe('2026-05-10T10:00:00+09:00');
  });

  it('handles root URL', () => {
    const out = getDateModifiedFromManifest('https://calculatorhost.com/', fakeManifest);
    expect(out).toBe('2026-05-12T10:00:00+09:00');
  });

  it('returns undefined for unmapped routes', () => {
    const out = getDateModifiedFromManifest(
      'https://calculatorhost.com/unknown/',
      fakeManifest,
    );
    expect(out).toBeUndefined();
  });

  it('returns undefined for invalid URL', () => {
    const out = getDateModifiedFromManifest('not-a-url', fakeManifest);
    expect(out).toBeUndefined();
  });

  it('falls back to undefined for empty manifest', () => {
    const out = getDateModifiedFromManifest('https://calculatorhost.com/', {});
    expect(out).toBeUndefined();
  });
});
