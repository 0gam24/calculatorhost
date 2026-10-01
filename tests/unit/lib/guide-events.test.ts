import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  getGuideCalculatorHref,
  trackGuideCalculatorOpen,
  type GuideSource,
} from '@/lib/analytics/guide-events';
import type { CalculatorSlug } from '@/lib/analytics/calculator-events';

const PAIRS: [GuideSource, CalculatorSlug, string, string][] = [
  [
    'freelancer-salary-comparison',
    'salary',
    '/calculator/salary/',
    '/guide/freelancer-salary-comparison/',
  ],
  [
    'freelancer-salary-comparison',
    'freelancer-tax',
    '/calculator/freelancer-tax/',
    '/guide/freelancer-salary-comparison/',
  ],
  [
    'tax-real-estate',
    'acquisition-tax',
    '/calculator/acquisition-tax/',
    '/guide/category/tax-real-estate/',
  ],
  [
    'tax-real-estate',
    'property-tax',
    '/calculator/property-tax/',
    '/guide/category/tax-real-estate/',
  ],
  [
    'tax-real-estate',
    'capital-gains-tax',
    '/calculator/capital-gains-tax/',
    '/guide/category/tax-real-estate/',
  ],
];

function browser(hostname = 'calculatorhost.com') {
  const gtag = vi.fn();
  vi.stubGlobal('window', {
    location: {
      hostname,
      search: '?salary=fixture-private&keyword=fixture-search',
      hash: '#fixture-value',
      href: `https://${hostname}/?salary=fixture-private`,
    },
    gtag,
  });
  return gtag;
}

afterEach(() => vi.unstubAllGlobals());

describe('guide calculator navigation and input-free measurement', () => {
  it.each(PAIRS)(
    'approved pair %s → %s has query-free href and canonical payload',
    (source, target, href, canonical) => {
      const gtag = browser();
      expect(getGuideCalculatorHref(source, target)).toBe(href);
      trackGuideCalculatorOpen(source, target);
      expect(gtag).toHaveBeenCalledExactlyOnceWith('event', 'guide_calculator_open', {
        guide_slug: source,
        calculator_slug: target,
        page_location: 'https://calculatorhost.com' + canonical,
        page_referrer: '',
      });
      expect(JSON.stringify(gtag.mock.calls)).not.toMatch(
        /fixture-private|fixture-search|fixture-value|salary=/,
      );
    },
  );
  it.each([
    ['freelancer-salary-comparison', 'property-tax'],
    ['tax-real-estate', 'salary'],
    ['unknown', 'salary'],
    ['constructor', 'salary'],
    ['__proto__', 'salary'],
    ['tax-real-estate', 'toString'],
    ['tax-real-estate', 'loan?salary=fixture-private'],
    [null, 'salary'],
    ['tax-real-estate', { salary: 'fixture-private' }],
  ])('unapproved pair %s → %s emits nothing', (source, target) => {
    const gtag = browser();
    trackGuideCalculatorOpen(source, target);
    expect(gtag).not.toHaveBeenCalled();
  });
  it.each([
    'localhost',
    '127.0.0.1',
    'calculatorhost.pages.dev',
    'snapshot.calculatorhost.pages.dev',
    'other.example',
  ])('does not transmit on %s', (hostname) => {
    const gtag = browser(hostname);
    trackGuideCalculatorOpen('tax-real-estate', 'property-tax');
    expect(gtag).not.toHaveBeenCalled();
  });
  it('works during SSR with no window', () => {
    vi.stubGlobal('window', undefined);
    expect(() => trackGuideCalculatorOpen('tax-real-estate', 'property-tax')).not.toThrow();
  });
  it('missing analytics does not interrupt navigation', () => {
    vi.stubGlobal('window', { location: { hostname: 'calculatorhost.com' } });
    expect(() => trackGuideCalculatorOpen('tax-real-estate', 'property-tax')).not.toThrow();
    expect(getGuideCalculatorHref('tax-real-estate', 'property-tax')).toBe(
      '/calculator/property-tax/',
    );
  });
  it('analytics exception does not interrupt navigation', () => {
    const gtag = browser();
    gtag.mockImplementation(() => {
      throw new Error('fixture failure');
    });
    expect(() => trackGuideCalculatorOpen('tax-real-estate', 'property-tax')).not.toThrow();
  });
});
