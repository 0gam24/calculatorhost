// Sitemap completeness validator unit tests (renamed file to bypass vite cache).
// Verifies count parity between src/app pages and out/sitemap.xml.
import { describe, expect, it } from 'vitest';
import {
  extractPagePaths,
  extractSitemapUrls,
  diffPagesVsSitemap,
} from '../../../scripts/sitemap-validator-core.mjs';

describe('extractPagePaths()', () => {
  it('converts src/app paths to URL paths with trailing slash', () => {
    const paths = extractPagePaths([
      'src/app/page.tsx',
      'src/app/calculator/salary/page.tsx',
      'src/app/category/tax/page.tsx',
    ]);
    expect(paths).toEqual(['/', '/calculator/salary/', '/category/tax/']);
  });

  it('skips dynamic routes and api/group/private folders', () => {
    const paths = extractPagePaths([
      'src/app/page.tsx',
      'src/app/api/route.ts',
      'src/app/(group)/layout.tsx',
      'src/app/_private/page.tsx',
      'src/app/[slug]/page.tsx',
    ]);
    expect(paths).toEqual(['/']);
  });
});

describe('extractSitemapUrls()', () => {
  it('parses loc entries from sitemap.xml content', () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset>
  <url><loc>https://calculatorhost.com/</loc></url>
  <url><loc>https://calculatorhost.com/calculator/salary/</loc></url>
</urlset>`;
    const urls = extractSitemapUrls(xml, 'https://calculatorhost.com');
    expect(urls).toEqual(['/', '/calculator/salary/']);
  });
});

describe('diffPagesVsSitemap()', () => {
  it('returns missing pages and extra sitemap entries', () => {
    const result = diffPagesVsSitemap(
      ['/', '/calculator/salary/', '/category/tax/'],
      ['/', '/calculator/salary/'],
    );
    expect(result.missingFromSitemap).toEqual(['/category/tax/']);
    expect(result.extraInSitemap).toEqual([]);
  });

  it('flags sitemap-only URLs as extras', () => {
    const result = diffPagesVsSitemap(
      ['/'],
      ['/', '/orphan/'],
    );
    expect(result.missingFromSitemap).toEqual([]);
    expect(result.extraInSitemap).toEqual(['/orphan/']);
  });
});
