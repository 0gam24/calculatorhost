// @vitest-environment jsdom
import React, { createElement, StrictMode, useState } from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { NumberInput } from '@/components/calculator/NumberInput';
import { AmountPresets } from '@/components/calculator/AmountPresets';
import { CalculatorWorkspace } from '@/components/calculator/CalculatorWorkspace';

vi.stubGlobal('React', React);
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

function PresetHarness({ debounceMs = 0 }: { debounceMs?: number }) {
  const [value, setValue] = useState(50_000_000);
  const [resetToken, setResetToken] = useState(0);
  return createElement(CalculatorWorkspace, {
    slug: 'loan',
    children: [
      createElement(NumberInput, {
        key: 'input',
        id: 'preset-principal',
        label: '대출 금액',
        unit: '원',
        value,
        onChange: setValue,
        min: 1,
        max: 1_000_000_000,
        debounceMs,
        resetToken,
        unitButtons: [{ label: '백만', value: 1_000_000 }],
      }),
      createElement(AmountPresets, {
        key: 'presets',
        label: '대출 금액 예시',
        value,
        options: [
          { label: '5천만 원', value: 50_000_000 },
          { label: '1억 원', value: 100_000_000 },
        ],
        onSelect: (amount: number) => {
          setValue(amount);
          setResetToken((token) => token + 1);
        },
      }),
      createElement(
        'output',
        { key: 'canonical', 'data-testid': 'principal-canonical' },
        String(value),
      ),
    ],
  });
}

describe('amount replacement preserves numeric input state', () => {
  it('recovers an empty and malformed draft even when the selected amount is unchanged', () => {
    render(createElement(StrictMode, null, createElement(PresetHarness)));
    const input = screen.getByLabelText('대출 금액') as HTMLInputElement;
    for (const draft of ['', '4..2']) {
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: draft } });
      expect(screen.getByRole('alert')).toBeTruthy();
      fireEvent.click(screen.getByRole('button', { name: '5천만 원' }));
      expect(screen.queryByRole('alert')).toBeNull();
      expect(input.getAttribute('aria-invalid')).not.toBe('true');
      expect(Number(input.value.replaceAll(',', ''))).toBe(50_000_000);
      expect(screen.getByTestId('principal-canonical').textContent).toBe('50000000');
    }
  });

  it('keeps the chosen display unit while replacing the canonical won amount', () => {
    render(createElement(PresetHarness));
    const units = screen.getByLabelText('대출 금액 표시 단위') as HTMLSelectElement;
    fireEvent.change(units, { target: { value: '만원' } });
    fireEvent.change(screen.getByLabelText('대출 금액'), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: '1억 원' }));
    expect(units.value).toBe('만원');
    expect(
      Number((screen.getByLabelText('대출 금액') as HTMLInputElement).value.replaceAll(',', '')),
    ).toBe(10000);
    expect(screen.getByTestId('principal-canonical').textContent).toBe('100000000');
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('cancels pending debounced typing so it cannot overwrite an explicit preset', () => {
    vi.useFakeTimers();
    render(createElement(StrictMode, null, createElement(PresetHarness, { debounceMs: 150 })));
    fireEvent.focus(screen.getByLabelText('대출 금액'));
    fireEvent.change(screen.getByLabelText('대출 금액'), { target: { value: '72000000' } });
    fireEvent.click(screen.getByRole('button', { name: '1억 원' }));
    vi.runAllTimers();
    expect(screen.getByTestId('principal-canonical').textContent).toBe('100000000');
    expect(
      Number((screen.getByLabelText('대출 금액') as HTMLInputElement).value.replaceAll(',', '')),
    ).toBe(100_000_000);
  });
});
