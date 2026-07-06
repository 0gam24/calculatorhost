// Math formula MathML rendering helper unit tests.
// Verifies KaTeX → MathML server-side rendering for AEO (machine-readable formulas).
// No CWV impact: pure build-time string generation, no browser CSS/fonts loaded.
import { describe, expect, it } from 'vitest';
import { renderMathMl } from '@/lib/seo/math-formula-helper';

describe('renderMathMl()', () => {
  it('renders simple arithmetic formula to MathML', () => {
    const result = renderMathMl('A = P(1+r)^n', false);
    expect(result).toContain('<math');
    expect(result).toContain('</math>');
  });

  it('includes annotation element with original LaTeX source', () => {
    const result = renderMathMl('A = P(1+r)^n', false);
    expect(result).toContain('<annotation');
    expect(result).toContain('A = P(1+r)^n');
  });

  it('includes display="block" attribute when display=true', () => {
    const result = renderMathMl('A = P(1+r)^n', true);
    expect(result).toContain('display="block"');
  });

  it('omits display attribute when display=false', () => {
    const result = renderMathMl('A = P(1+r)^n', false);
    expect(result).not.toContain('display="block"');
  });

  it('renders complex formula with fractions and superscripts', () => {
    const result = renderMathMl('\\frac{1}{1 + r}^{-n}', false);
    expect(result).toContain('<math');
    expect(result).toContain('frac');
  });

  it('throws error on invalid LaTeX when throwOnError=true', () => {
    expect(() => {
      renderMathMl('\\frac{', false);
    }).toThrow();
  });

  it('handles default display parameter (undefined = false)', () => {
    const result = renderMathMl('A = B');
    expect(result).toContain('<math');
    expect(result).not.toContain('display="block"');
  });

  it('preserves mathematical semantics in nested expressions', () => {
    const result = renderMathMl('DSR = \\frac{\\text{연간원리금}}{\\text{연소득}} \\times 100', true);
    expect(result).toContain('<math');
    expect(result).toContain('display="block"');
  });
});
