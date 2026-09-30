import React, { createElement } from 'react';
import { afterAll, afterEach, expect, it, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { GiftTaxCalculator } from '../../src/app/calculator/gift-tax/GiftTaxCalculator';

// Vitest's existing Node configuration uses the classic JSX transform.
vi.stubGlobal('React', React);
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));
afterEach(() => vi.useRealTimers());
afterAll(() => vi.unstubAllGlobals());

it('keeps static export text stable across a server/browser month boundary', () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-09-30T00:00:00Z'));
  const before = renderToString(createElement(GiftTaxCalculator));
  vi.setSystemTime(new Date('2026-10-01T16:00:00Z'));
  const after = renderToString(createElement(GiftTaxCalculator));
  expect(after).toBe(before);
  expect(after).toContain('2026년 1월 증여');
  expect(after).toContain('2026년 4월 30일까지');
});

it('keeps the explicit example stable across a year boundary', () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-12-31T14:59:00Z'));
  const before = renderToString(createElement(GiftTaxCalculator));
  vi.setSystemTime(new Date('2027-01-01T00:01:00Z'));
  expect(renderToString(createElement(GiftTaxCalculator))).toBe(before);
});
