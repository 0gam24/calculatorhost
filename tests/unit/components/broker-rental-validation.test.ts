// @vitest-environment jsdom
// @vitest-environment-options {"url":"https://calculatorhost.com/"}
import React, { createElement } from 'react';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CommissionCalculator } from '@/app/calculator/broker-fee/CommissionCalculator';
import { RentalYieldCalculator } from '@/app/calculator/rental-yield/RentalYieldCalculator';

// Keep the actual calculator, pure formula, ResultCard, validity and analytics helpers.
// Navigation is outside these tests; no router, external script or real clipboard is used.
vi.mock('@/components/calculator/NextCalculation', () => ({ NextCalculation: () => null }));

const measurement = vi.fn();
const clipboard = vi.fn(async (_text: string) => undefined);
const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
const originalScroll = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollIntoView');

beforeEach(() => {
  sessionStorage.clear();
  measurement.mockClear();
  clipboard.mockClear();
  vi.stubGlobal('React', React);
  vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('External requests forbidden'))));
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })));
  window.gtag = measurement;
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: clipboard },
  });
  Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
    configurable: true,
    value: vi.fn(),
  });
});

afterEach(() => {
  expect(fetch).not.toHaveBeenCalled();
  cleanup();
  delete window.gtag;
  if (originalClipboard) Object.defineProperty(navigator, 'clipboard', originalClipboard);
  else Reflect.deleteProperty(navigator, 'clipboard');
  if (originalScroll) Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', originalScroll);
  else Reflect.deleteProperty(HTMLElement.prototype, 'scrollIntoView');
  vi.unstubAllGlobals();
});

function input(label: string) {
  return screen.getByLabelText(label) as HTMLInputElement;
}

function enter(label: string, value: string) {
  const field = input(label);
  fireEvent.focus(field);
  fireEvent.change(field, { target: { value } });
  fireEvent.blur(field);
  return field;
}

function result() {
  return screen.getByRole('region', { name: '계산 결과' });
}

function hero() {
  return result().querySelector('header p[aria-label]')?.textContent;
}

function completeEvents() {
  return measurement.mock.calls.filter((call) => call[0] === 'event' && call[1] === 'calculator_complete');
}

function expectBlockedResult() {
  expect(within(result()).queryByRole('button', { name: /결과 복사|복사했습니다/ })).toBeNull();
  expect(result().textContent).not.toMatch(/양호한 수익률|중간 수익률|저수익 물건|0\.00%/);
  measurement.mockClear();
  fireEvent.click(screen.getByRole('button', { name: '결과 확인' }));
  expect(completeEvents()).toHaveLength(0);
  expect(clipboard).not.toHaveBeenCalled();
}

function rentalFixture() {
  history.replaceState({}, '', '/calculator/rental-yield/');
  render(createElement(RentalYieldCalculator));
  enter('월세', '2000000');
}

function expectRentalFixture() {
  // Independent arithmetic: (2m * 12 * .95 - .5m * 12) = 16.8m annual net;
  // capital = 300m - 100m + 5m = 205m; ROI=8.195...%, cap=5.6%, monthly=1.4m.
  expect(hero()).toBe('8.20%');
  expect(result().textContent).toContain('205,000,000원');
  expect(result().textContent).toContain('5.60%');
  expect(result().textContent).toContain('1,400,000원');
  expect(within(result()).getByRole('button', { name: '결과 복사' })).toBeTruthy();
}

describe('broker negotiated rate draft and validation', () => {
  beforeEach(() => history.replaceState({}, '', '/calculator/broker-fee/'));

  it('restores the legacy numeric rate without deleting the original stored input', () => {
    const legacyKey = 'calculatorhost:input:v1:broker-fee:negotiatedRate';
    sessionStorage.setItem(legacyKey, '0.002');
    render(createElement(CommissionCalculator));
    expect(input('협의 요율 (선택)').value).toBe('0.2');
    expect(hero()).toBe('1,000,000원');
    expect(sessionStorage.getItem(legacyKey)).toBe('0.002');
  });

  it('respects an explicitly saved blank draft instead of replacing it with the legacy rate', () => {
    sessionStorage.setItem('calculatorhost:input:v1:broker-fee:negotiatedRate', '0.002');
    sessionStorage.setItem('calculatorhost:input:v1:broker-fee:negotiatedRateDraft', JSON.stringify(''));
    render(createElement(CommissionCalculator));
    expect(input('협의 요율 (선택)').value).toBe('');
    expect(hero()).toBe('2,000,000원');
  });

  it('keeps a restored malformed draft visible but withholds copy and completion', () => {
    sessionStorage.setItem('calculatorhost:input:v1:broker-fee:negotiatedRateDraft', JSON.stringify('4..2'));
    render(createElement(CommissionCalculator));
    expect(input('협의 요율 (선택)').value).toBe('4..2');
    expectBlockedResult();
  });

  it('keeps each decimal draft 0, 0. and 0.2 without formatting it during entry', () => {
    render(createElement(CommissionCalculator));
    const rate = input('협의 요율 (선택)');
    fireEvent.focus(rate);
    // Change events test controlled-state preservation; native keystrokes/caret are browser QA.
    for (const raw of ['0', '0.', '0.2']) {
      fireEvent.change(rate, { target: { value: raw } });
      expect(rate.value).toBe(raw);
      expect(rate.getAttribute('aria-invalid')).toBe(raw === '0.2' ? 'false' : 'true');
    }
    expect(hero()).toBe('1,000,000원');
  });

  it('accepts a decimal pasted as one change and retains it on blur', () => {
    render(createElement(CommissionCalculator));
    const rate = enter('협의 요율 (선택)', '0.2');
    expect(rate.value).toBe('0.2');
    expect(rate.getAttribute('aria-invalid')).toBe('false');
    expect(hero()).toBe('1,000,000원');
  });

  it('blocks explicit zero rather than using the statutory maximum, while blank uses that maximum', () => {
    render(createElement(CommissionCalculator));
    for (const raw of ['0', '0.']) {
      const rate = enter('협의 요율 (선택)', raw);
      expect(rate.value).toBe(raw);
      expect(screen.getByRole('alert').textContent).toContain('0%');
      expectBlockedResult();
    }
    enter('협의 요율 (선택)', '');
    expect(screen.queryByRole('alert')).toBeNull();
    expect(hero()).toBe('2,000,000원');
    fireEvent.click(screen.getByRole('button', { name: '결과 확인' }));
    expect(completeEvents()).toEqual([[
      'event', 'calculator_complete', {
        calculator_slug: 'broker-fee',
        page_location: 'https://calculatorhost.com/calculator/broker-fee/',
        page_referrer: '',
      },
    ]]);
  });

  it('rejects malformed and negative drafts without parseFloat coercion, then recovers', () => {
    render(createElement(CommissionCalculator));
    for (const raw of ['4..2', '-1', 'abc']) {
      const rate = enter('협의 요율 (선택)', raw);
      expect(rate.value).toBe(raw);
      expect(rate.getAttribute('aria-invalid')).toBe('true');
      expectBlockedResult();
    }
    enter('협의 요율 (선택)', '0.2');
    expect(screen.queryByRole('alert')).toBeNull();
    expect(hero()).toBe('1,000,000원');
  });
});

describe('rental yield decision guards and recovery', () => {
  it('shows independently calculated ROI, invested capital, cap rate and monthly income', () => {
    rentalFixture();
    expectRentalFixture();
  });

  it('withholds yield, judgment, copy and completion for zero or missing purchase price', () => {
    rentalFixture();
    for (const raw of ['0', '']) {
      enter('구매가', raw);
      expect(screen.getAllByRole('alert').length).toBeGreaterThan(0);
      expectBlockedResult();
    }
  });

  it('withholds yield and completion for zero and negative actual investment', () => {
    rentalFixture();
    for (const raw of ['305000000', '306000000']) {
      enter('받은 보증금', raw);
      expect(screen.getAllByRole('alert').length).toBeGreaterThan(0);
      expectBlockedResult();
    }
  });

  it('recovers valid numbers, copied values and a private-input-free completion event', async () => {
    rentalFixture();
    enter('받은 보증금', '305000000');
    expectBlockedResult();
    enter('받은 보증금', '100000000');
    expectRentalFixture();
    expect(screen.queryByRole('alert')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: '결과 확인' }));
    expect(completeEvents()).toEqual([[
      'event', 'calculator_complete', {
        calculator_slug: 'rental-yield',
        page_location: 'https://calculatorhost.com/calculator/rental-yield/',
        page_referrer: '',
      },
    ]]);
    fireEvent.click(within(result()).getByRole('button', { name: '결과 복사' }));
    await waitFor(() => expect(clipboard).toHaveBeenCalledTimes(1));
    const copied = clipboard.mock.calls[0]?.[0];
    expect(copied).toContain('8.20%');
    expect(copied).toContain('205,000,000원');
    expect(copied).toContain('5.60%');
    expect(copied).toContain('1,400,000원');
  });
});
