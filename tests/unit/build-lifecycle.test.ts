import { describe, expect, it } from 'vitest';
import { SNAPSHOT_FILES, validateBuildInputs } from '../../scripts/build-inputs-core.mjs';
import { extractPageMeta, latestMirroredModification } from '../../scripts/network-mirror-core.mjs';
import {
  isCloudflarePreview,
  noindexHtml,
  PREVIEW_HEADERS,
} from '../../scripts/preview-export-core.mjs';

const pages = ['src/app/page.tsx', 'src/app/calculator/loan/page.tsx'];
function documents(): Record<string, unknown> {
  return {
    ...Object.fromEntries(SNAPSHOT_FILES.map((name) => [name, {}])),
    'date-modified-manifest.json': {
      '/': '2026-09-30',
      '/calculator/loan/': '2026-09-29T12:00:00Z',
    },
  };
}

describe('reviewed build inputs', () => {
  it('validates committed data without modifying it', () => {
    const data = documents();
    const before = JSON.stringify(data);
    expect(validateBuildInputs(data, pages)).toEqual([]);
    expect(JSON.stringify(data)).toBe(before);
  });
  for (const name of SNAPSHOT_FILES)
    it(`fails on missing ${name}`, () => {
      const data = documents();
      delete data[name];
      expect(validateBuildInputs(data, pages)).toContain(
        `Missing or invalid committed data snapshot: ${name}`,
      );
    });
  it('rejects array data and a missing manifest', () => {
    const data = documents();
    data['bok-rates.json'] = [];
    delete data['date-modified-manifest.json'];
    expect(validateBuildInputs(data, pages)).toHaveLength(2);
  });
  for (const date of ['2026-02-30', '2026-13-01', 'garbage', ''])
    it(`rejects invalid calendar date ${date}`, () => {
      const data = documents();
      data['date-modified-manifest.json'] = { '/': date, '/calculator/loan/': '2026-09-30' };
      expect(validateBuildInputs(data, pages).some((error) => error.endsWith(': /'))).toBe(true);
    });
  it('rejects missing and deleted routes; dynamic/group routes are excluded', () => {
    const data = documents();
    data['date-modified-manifest.json'] = { '/': '2026-09-30', '/deleted/': '2026-09-30' };
    expect(
      validateBuildInputs(data, [
        ...pages,
        'src/app/api/a/page.tsx',
        'src/app/[slug]/page.tsx',
        'src/app/(embed)/embed/page.tsx',
      ]),
    ).toHaveLength(2);
  });
});

describe('content dates remain truthful', () => {
  it('never substitutes a checkout date for an unknown publication', () => {
    expect(extractPageMeta("title: 'Loan', description: 'Estimate'")).toEqual({
      title: 'Loan',
      description: 'Estimate',
      datePublished: null,
      dateModified: null,
    });
  });
  it('preserves explicit dates', () => {
    expect(
      extractPageMeta("const DATE_PUBLISHED = '2026-05-03'; dateModified: '2026-09-30'")
        .datePublished,
    ).toBe('2026-05-03');
  });
  it('selects the latest reviewed date independently of route order', () => {
    const manifest = { '/': '2026-09-30T00:00:00+09:00', '/loan/': '2026-09-29T22:00:00Z' };
    expect(latestMirroredModification(manifest, ['/', '/loan/'])).toBe('2026-09-29T22:00:00.000Z');
    expect(latestMirroredModification(manifest, ['/loan/', '/'])).toBe('2026-09-29T22:00:00.000Z');
  });
  it('fails instead of fabricating a date for missing/invalid inputs', () => {
    expect(() => latestMirroredModification({}, ['/'])).toThrow();
    expect(() => latestMirroredModification({ '/': 'bad' }, ['/'])).toThrow();
    expect(() => latestMirroredModification({}, [])).toThrow();
  });
});

describe('preview isolation preserves production', () => {
  it('selects only non-main Cloudflare builds and fails closed for an unknown branch', () => {
    expect(isCloudflarePreview({ CF_PAGES: '1', CF_PAGES_BRANCH: 'codex/review' })).toBe(true);
    expect(isCloudflarePreview({ CF_PAGES: '1' })).toBe(true);
    expect(isCloudflarePreview({ CF_PAGES: '1', CF_PAGES_BRANCH: 'main' })).toBe(false);
    expect(isCloudflarePreview({})).toBe(false);
  });
  it('replaces conflicting crawler directives without changing canonical URL or body', () => {
    const html =
      '<head><meta content="index, follow" name="robots"><meta name="googlebot" content="index"><link rel="canonical" href="https://calculatorhost.com/"></head><body>Calculator</body>';
    const preview = noindexHtml(html);
    expect(preview).not.toContain('content="index');
    expect(preview).toContain('noindex, nofollow, noarchive');
    expect(preview).toContain('href="https://calculatorhost.com/"');
    expect(preview).toContain('<body>Calculator</body>');
    expect(noindexHtml(preview)).toBe(preview);
  });
  it('blocks third party connections and frames at the HTTP layer', () => {
    expect(PREVIEW_HEADERS).toContain('X-Robots-Tag: noindex');
    expect(PREVIEW_HEADERS).toContain("connect-src 'self'");
    expect(PREVIEW_HEADERS).toContain("frame-src 'none'");
    expect(PREVIEW_HEADERS).not.toContain('google');
  });
});
