// date-modified-manifest pure function tests.
// Verifies route key normalization and manifest building from git timestamps.
import { describe, expect, it } from 'vitest';
import {
  pageFileToRoute,
  buildManifest,
} from '../../../scripts/date-modified-core.mjs';

describe('pageFileToRoute()', () => {
  it('converts src/app paths to canonical routes with trailing slash', () => {
    expect(pageFileToRoute('src/app/page.tsx')).toBe('/');
    expect(pageFileToRoute('src/app/calculator/salary/page.tsx')).toBe('/calculator/salary/');
    expect(pageFileToRoute('src/app/category/tax/page.tsx')).toBe('/category/tax/');
  });

  it('returns null for non-page files or excluded routes', () => {
    expect(pageFileToRoute('src/app/api/route.ts')).toBe(null);
    expect(pageFileToRoute('src/app/(group)/page.tsx')).toBe(null);
    expect(pageFileToRoute('src/app/_private/page.tsx')).toBe(null);
    expect(pageFileToRoute('src/app/[slug]/page.tsx')).toBe(null);
    expect(pageFileToRoute('src/app/layout.tsx')).toBe(null);
  });
});

describe('buildManifest()', () => {
  it('maps route to ISO date from input pairs', () => {
    const m = buildManifest([
      { file: 'src/app/page.tsx', isoDate: '2026-05-12T10:00:00+09:00' },
      { file: 'src/app/calculator/salary/page.tsx', isoDate: '2026-05-10T10:00:00+09:00' },
    ]);
    expect(m['/']).toBe('2026-05-12T10:00:00+09:00');
    expect(m['/calculator/salary/']).toBe('2026-05-10T10:00:00+09:00');
  });

  it('skips entries with null route or empty date', () => {
    const m = buildManifest([
      { file: 'src/app/api/route.ts', isoDate: '2026-05-12T10:00:00+09:00' },
      { file: 'src/app/calculator/salary/page.tsx', isoDate: '' },
    ]);
    expect(Object.keys(m)).toHaveLength(0);
  });
});
