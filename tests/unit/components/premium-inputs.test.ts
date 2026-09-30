// @vitest-environment jsdom
import React, { createElement, StrictMode, useState } from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NumberInput } from '@/components/calculator/NumberInput';
import { CalculatorWorkspace } from '@/components/calculator/CalculatorWorkspace';
import { ResultCard } from '@/components/calculator/Result';
import { useCalculatorState } from '@/components/calculator/useCalculatorState';

vi.mock('@/components/calculator/NextCalculation', () => ({ NextCalculation: () => null }));
vi.stubGlobal('React', React);

function InputHarness({
  initial = 4.5,
  debounceMs = 0,
  money = false,
  integer = false,
}: {
  initial?: number;
  debounceMs?: number;
  money?: boolean;
  integer?: boolean;
}) {
  const [value, setValue] = useState(initial);
  return createElement(CalculatorWorkspace, {
    slug: 'loan',
    children: [
      createElement(NumberInput, {
        key: 'input',
        id: 'test-value',
        label: money ? '금액' : '금리',
        value,
        onChange: setValue,
        unit: money ? '원' : '%',
        min: 0,
        max: money ? 1e8 : 20,
        debounceMs,
        integer,
        ...(money ? { unitButtons: [{ label: '백만', value: 1e6 }] } : {}),
      }),
      createElement('output', { key: 'value', 'data-testid': 'canonical' }, String(value)),
      createElement(ResultCard, {
        key: 'result',
        title: '계산',
        heroLabel: '현재 값',
        heroValue: String(value),
        rows: [],
      }),
    ],
  });
}

beforeEach(() => {
  sessionStorage.clear();
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});
describe('premium numeric input behavior', () => {
  it('preserves decimal interest rather than stripping punctuation', () => {
    render(createElement(InputHarness));
    const input = screen.getByLabelText('금리');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '3.595' } });
    expect(screen.getByTestId('canonical').textContent).toBe('3.595');
    expect((input as HTMLInputElement).value).toBe('3.595');
  });
  it('distinguishes zero from empty and keeps invalid results masked after blur', () => {
    render(createElement(InputHarness, { initial: 0 }));
    const input = screen.getByLabelText('금리');
    expect((input as HTMLInputElement).value).toBe('0');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    expect((input as HTMLInputElement).value).toBe('');
    expect(screen.getByRole('alert').textContent).toContain('값을 입력');
    expect(screen.getByLabelText('현재 값: 입력을 확인해 주세요')).toBeTruthy();
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '0' } });
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByLabelText('현재 값: 0')).toBeTruthy();
  });
  it('rejects malformed values and range overflow without coercing them into numbers', () => {
    render(createElement(InputHarness));
    const input = screen.getByLabelText('금리');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '4..5' } });
    expect(screen.getByTestId('canonical').textContent).toBe('4.5');
    expect(screen.getByRole('alert').textContent).toContain('숫자');
    fireEvent.change(input, { target: { value: '21' } });
    expect(screen.getByRole('alert').textContent).toContain('이하');
    expect(screen.getByTestId('canonical').textContent).toBe('4.5');
  });
  it('retains a pending debounced amount when switching won to ten-thousand won', () => {
    vi.useFakeTimers();
    render(createElement(InputHarness, { initial: 50000000, money: true, debounceMs: 150 }));
    const input = screen.getByLabelText('금액');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText('금액 표시 단위'), { target: { value: '만원' } });
    expect(screen.getByTestId('canonical').textContent).toBe('123456');
    expect((input as HTMLInputElement).value).toBe('12.3456');
    fireEvent.change(screen.getByLabelText('금액 표시 단위'), { target: { value: '원' } });
    expect(screen.getByTestId('canonical').textContent).toBe('123456');
    expect((input as HTMLInputElement).value).toBe('123456');
  });
  it('rejects decimal values for integer counts', () => {
    render(createElement(InputHarness, { initial: 2, integer: true }));
    fireEvent.change(screen.getByLabelText('금리'), { target: { value: '2.5' } });
    expect(screen.getByRole('alert').textContent).toContain('정수');
    expect(screen.getByTestId('canonical').textContent).toBe('2');
  });
});

it('restores private input memory through React StrictMode without overwriting it with defaults', () => {
  sessionStorage.setItem('calculatorhost:input:v1:salary:test', '800');
  function SavedHarness() {
    const [value, setValue] = useCalculatorState('salary:test', 50);
    return createElement('button', { onClick: () => setValue(value + 1) }, String(value));
  }
  render(createElement(StrictMode, null, createElement(SavedHarness)));
  const button = screen.getByRole('button', { name: '800' });
  fireEvent.click(button);
  expect(screen.getByRole('button', { name: '801' })).toBeTruthy();
  expect(sessionStorage.getItem('calculatorhost:input:v1:salary:test')).toBe('801');
});
