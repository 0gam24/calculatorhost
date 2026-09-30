import { describe, expect, it } from 'vitest';
import { canLoadAdsOnPath, canLoadNaverTracker } from '@/lib/analytics/public-service-policy';

describe('Advertising path exclusions', () => {
  it.each(['/embed', '/embed/', '/embed/capital-gains-tax/', '/embed/vat/', '/embed/savings/'])(
    'never loads advertisements in embedded calculator %s',
    (path) => {
      expect(canLoadAdsOnPath(path)).toBe(false);
    },
  );
  it.each(['/404', '/404/', '/404.html', '/_not-found', '/not-found/', '/offline.html'])(
    'excludes recognizable error/offline path %s',
    (path) => {
      expect(canLoadAdsOnPath(path)).toBe(false);
    },
  );
  it.each(['/about/', '/privacy/', '/terms', '/contact/', '/affiliate-disclosure/'])(
    'excludes policy page %s',
    (path) => {
      expect(canLoadAdsOnPath(path)).toBe(false);
    },
  );
  it.each(['/', '/calculator/salary/', '/calculator/savings/', '/guide/', '/category/finance/'])(
    'preserves existing advertising eligibility for content path %s',
    (path) => {
      expect(canLoadAdsOnPath(path)).toBe(true);
    },
  );
  it.each(['noindex', 'NOINDEX, nofollow', 'index, follow,noindex, nofollow'])(
    'blocks an unknown 404 document through robots metadata %s',
    (robots) => {
      expect(canLoadAdsOnPath('/unknown-requested-url/', robots)).toBe(false);
    },
  );
  it('keeps indexable documents eligible without matching unrelated robots directives', () => {
    expect(canLoadAdsOnPath('/calculator/salary/', 'index, follow, max-image-preview:large')).toBe(
      true,
    );
  });
});

describe('Naver location and referrer privacy', () => {
  const clean = 'https://calculatorhost.com/calculator/savings/';
  it('allows input-free production visits', () => {
    expect(canLoadNaverTracker(clean, '')).toBe(true);
    expect(canLoadNaverTracker(clean, 'https://calculatorhost.com/calculator/salary/')).toBe(true);
  });
  it.each(['?salary=50000000', '#salary=50000000'])('blocks current URL data %s', (suffix) => {
    expect(canLoadNaverTracker(clean + suffix, '')).toBe(false);
  });
  it.each(['?salary=50000000', '#salary=50000000'])(
    'blocks prior-page data %s even on a clean current URL',
    (suffix) => {
      expect(
        canLoadNaverTracker(clean, 'https://calculatorhost.com/calculator/salary/' + suffix),
      ).toBe(false);
    },
  );
  it('blocks malformed URL/referrer and local previews', () => {
    expect(canLoadNaverTracker('not-a-url', '')).toBe(false);
    expect(canLoadNaverTracker(clean, 'not-a-url')).toBe(false);
    expect(canLoadNaverTracker('http://localhost:3000/calculator/savings/', '')).toBe(false);
  });
});
