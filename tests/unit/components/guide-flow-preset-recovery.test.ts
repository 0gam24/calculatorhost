// @vitest-environment jsdom
// @vitest-environment-options {"url":"https://calculatorhost.com/"}
import React, { createElement } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FreelancerCalculator } from '@/app/calculator/freelancer-tax/FreelancerCalculator';
import { SavingsCalculator } from '@/app/calculator/savings/SavingsCalculator';

// Keep actual inputs, result masking, formulas and private state; exclude navigation/chart IO.
vi.mock('@/components/calculator/NextCalculation', () => ({ NextCalculation: () => null }));
vi.mock('next/dynamic', () => ({ default: () => () => null }));
const measurement = vi.fn();
beforeEach(() => {
  sessionStorage.clear();
  measurement.mockClear();
  vi.stubGlobal('React', React);
  vi.stubGlobal(
    'fetch',
    vi.fn(() => Promise.reject(new Error('External requests forbidden'))),
  );
  window.gtag = measurement;
});
afterEach(() => {
  expect(fetch).not.toHaveBeenCalled();
  cleanup();
  delete window.gtag;
  vi.unstubAllGlobals();
});
function field(id: string) {
  return document.getElementById(id) as HTMLInputElement;
}
function draft(id: string, value: string) {
  const input = field(id);
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value } });
  fireEvent.blur(input);
  expect(input.getAttribute('aria-invalid')).toBe('true');
  expect(document.querySelector('[data-calculation-result] button')).toBeNull();
  return input;
}
function recovered(input: HTMLInputElement, value: number) {
  expect(input.getAttribute('aria-invalid')).toBe('false');
  expect(Number(input.value.replaceAll(',', ''))).toBe(value);
  expect(document.querySelector('[data-calculation-result] button')).not.toBeNull();
  expect(measurement).not.toHaveBeenCalled();
}
describe('Guide flow preset recovery in actual calculators', () => {
  it.each(['', '4..2'])('reselects unchanged freelance revenue after invalid draft %s', (value) => {
    render(createElement(FreelancerCalculator));
    const preset = screen.getByRole('button', { name: '5,000만' });
    fireEvent.click(preset);
    const input = draft('freelancer-revenue', value);
    fireEvent.click(preset);
    recovered(input, 50_000_000);
    expect(sessionStorage.getItem('calculatorhost:input:v1:freelancer-tax:annualRevenue')).toBe(
      '50000000',
    );
  });
  it.each(['', '101'])(
    'reselects unchanged freelance expense rate after invalid draft %s',
    (value) => {
      render(createElement(FreelancerCalculator));
      const input = draft('freelancer-expense-rate', value);
      fireEvent.click(screen.getByRole('button', { name: '인적용역 (기본)' }));
      recovered(input, 64.1);
    },
  );
  it.each(['', '0', '12.5', '361'])(
    'reselects unchanged savings term after invalid draft %s',
    (value) => {
      render(createElement(SavingsCalculator));
      const input = draft('term-months', value);
      fireEvent.click(screen.getByRole('button', { name: '12개월' }));
      recovered(input, 12);
      expect(sessionStorage.getItem('calculatorhost:input:v1:savings:termMonths')).toBe('12');
    },
  );
  it('keeps repeated preset clicks idempotent and preserves another valid field', () => {
    render(createElement(SavingsCalculator));
    fireEvent.change(field('monthly-deposit'), { target: { value: '500000' } });
    const input = draft('term-months', '');
    const preset = screen.getByRole('button', { name: '24개월' });
    fireEvent.click(preset);
    fireEvent.click(preset);
    recovered(input, 24);
    expect(Number(field('monthly-deposit').value.replaceAll(',', ''))).toBe(500_000);
  });
});
