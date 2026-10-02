import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  trackCalculatorSearch,
  trackCalculationComplete,
  trackNextCalculator,
} from '@/lib/analytics/calculator-events';

afterEach(() => vi.unstubAllGlobals());

function setup(hostname = 'calculatorhost.com') {
  const gtag = vi.fn();
  vi.stubGlobal('window', {
    location: { hostname, href: 'https://calculatorhost.com/?salary=50000000' },
    gtag,
  });
  return gtag;
}

describe('Privacy-safe calculator events', () => {
  it('sends allowed slugs and fixed URLs without amounts or query values', () => {
    const gtag = setup();
    trackCalculatorSearch('salary');
    trackCalculationComplete('salary');
    trackNextCalculator('salary', 'savings');
    expect(gtag).toHaveBeenCalledTimes(3);
    expect(gtag.mock.calls[2]).toEqual([
      'event',
      'calculator_next',
      {
        calculator_slug: 'salary',
        next_calculator_slug: 'savings',
        page_location: 'https://calculatorhost.com/calculator/salary/',
        page_referrer: '',
      },
    ]);
    expect(JSON.stringify(gtag.mock.calls)).not.toContain('50000000');
    expect(JSON.stringify(gtag.mock.calls)).not.toContain('?');
  });

  it('rejects unknown identifiers and raw input passed accidentally', () => {
    const gtag = setup();
    trackCalculationComplete('50000000');
    trackCalculatorSearch('월급 500만원');
    trackNextCalculator('salary', 'savings?amount=3000000');
    expect(gtag).not.toHaveBeenCalled();
  });

  it('measures the guide calculator with its fixed existing URL and no wage or hours', () => {
    const gtag = setup();
    window.location.href =
      'https://calculatorhost.com/guide/overtime-night-holiday-allowance-2026/?hourlyWage=12000&hours=10';
    trackCalculationComplete('overtime-night-holiday-allowance-2026');
    expect(gtag).toHaveBeenCalledOnce();
    expect(gtag.mock.calls[0]).toEqual([
      'event',
      'calculator_complete',
      {
        calculator_slug: 'overtime-night-holiday-allowance-2026',
        page_location: 'https://calculatorhost.com/guide/overtime-night-holiday-allowance-2026/',
        page_referrer: '',
      },
    ]);
    expect(JSON.stringify(gtag.mock.calls)).not.toContain('12000');
    expect(JSON.stringify(gtag.mock.calls)).not.toContain('hours=10');
    trackCalculationComplete('overtime-night-holiday-allowance-2026?hourlyWage=12000');
    expect(gtag).toHaveBeenCalledOnce();
  });

  it.each(['localhost', '127.0.0.1', 'preview.calculatorhost.com', 'calculatorhost.pages.dev'])(
    'does not measure preview host %s',
    (hostname) => {
      const gtag = setup(hostname);
      trackCalculationComplete('salary');
      expect(gtag).not.toHaveBeenCalled();
    },
  );

  it('allows search usage measurement without recording the search term', () => {
    const gtag = setup();
    trackCalculatorSearch();
    expect(gtag).toHaveBeenCalledOnce();
    expect(gtag.mock.calls[0]?.[2]).toEqual({
      page_location: 'https://calculatorhost.com/',
      page_referrer: '',
    });
  });

  it('does not break user actions when analytics throws or is absent', () => {
    setup();
    window.gtag = () => {
      throw new Error('unavailable');
    };
    expect(() => trackCalculationComplete('salary')).not.toThrow();
    vi.unstubAllGlobals();
    expect(() => trackCalculationComplete('salary')).not.toThrow();
  });
});
