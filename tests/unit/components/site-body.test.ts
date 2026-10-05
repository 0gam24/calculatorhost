// @vitest-environment jsdom
import React, { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SiteBody } from '@/components/layout/SiteBody';
import { calculatorDocumentDestination, needsCalculatorDocument } from '@/lib/analytics/ad-intents-navigation';

const state = vi.hoisted(() => ({ pathname: '/' }));
vi.mock('next/navigation', () => ({ usePathname: () => state.pathname }));
beforeEach(() => { vi.stubGlobal('React', React); });

describe('calculator document exclusion', () => {
  it.each(['/calculator', '/calculator/salary/', '/calculator/loan/', '/calculator/savings/'])(
    'includes the exclusion in the initial server HTML: %s', (pathname) => {
      state.pathname = pathname;
      const html = renderToStaticMarkup(createElement(SiteBody, null, 'result'));
      expect(html).toBe('<body class="google-anno-skip">result</body>');
    },
  );
  it.each(['/', '/guide/example/', '/calculatorx/', '/category/finance/'])(
    'leaves ordinary pages eligible for Ad Intents: %s', (pathname) => {
      state.pathname = pathname;
      expect(renderToStaticMarkup(createElement(SiteBody, null, 'page'))).toBe('<body>page</body>');
    },
  );
  it('keeps calculator handoffs in the same document', () => {
    expect(needsCalculatorDocument('/calculator/salary/', '/calculator/savings/')).toBe(false);
    expect(needsCalculatorDocument('/', '/guide/example/')).toBe(false);
    expect(needsCalculatorDocument('/', '/calculator/loan/')).toBe(true);
    expect(needsCalculatorDocument('/calculator/loan/', '/#all-calculators')).toBe(true);
  });
});

function destination(href: string, attributes: Record<string, string | undefined> = {}, click = {}, current = 'https://calculatorhost.com/') {
  const anchor = document.createElement('a');
  anchor.href = href;
  for (const [name, value] of Object.entries(attributes)) if (value !== undefined) anchor.setAttribute(name, value);
  const span = document.createElement('span');
  anchor.append(span);
  return calculatorDocumentDestination({ target: span, defaultPrevented: false, button: 0,
    ctrlKey: false, metaKey: false, shiftKey: false, altKey: false, ...click }, current);
}
describe('calculator boundary link clicks', () => {
  it('preserves destination query/hash without adding input values', () => {
    expect(destination('/calculator/loan/?mode=test#result')).toBe('https://calculatorhost.com/calculator/loan/?mode=test#result');
    expect(destination('/#all-calculators', {}, {}, 'https://calculatorhost.com/calculator/loan/')).toBe('https://calculatorhost.com/#all-calculators');
  });
  it.each([{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true },
    { button: 1 }, { button: 2 }, { defaultPrevented: true }])('preserves modified/prevented clicks: %j', (click) => {
      expect(destination('/calculator/loan/', {}, click)).toBeNull();
    });
  it.each([{ target: '_blank' }, { target: 'named' }, { download: '' }])('preserves native target/download: %j', (attributes) => {
    expect(destination('/calculator/loan/', attributes)).toBeNull();
  });
  it('allows explicit self target', () => {
    expect(destination('/calculator/loan/', { target: '_self' })).toBe('https://calculatorhost.com/calculator/loan/');
  });
  it.each(['http://[', 'https://example.com/calculator/loan/', 'mailto:user@example.com', '#main-content', '/guide/example/'])(
    'does not intercept unrelated links: %s', (href) => expect(destination(href)).toBeNull(),
  );
  it('keeps calculator links and same-page hashes in the current document', () => {
    expect(destination('/calculator/savings/', {}, {}, 'https://calculatorhost.com/calculator/salary/')).toBeNull();
    expect(destination('#result', {}, {}, 'https://calculatorhost.com/calculator/loan/')).toBeNull();
  });
});
