/**
 * Math formula MathML rendering helper
 *
 * Purpose: Server-side KaTeX → MathML rendering for AEO (Answer Engine Optimization).
 * Machine-readable formulas improve LLM citation accuracy and support accessibility.
 *
 * CWV Impact: **ZERO** — Pure build-time string generation:
 * - No KaTeX CSS loaded in browser
 * - No web fonts (Latin Modern, KaTeX Gyre Termes)
 * - No JavaScript execution on client
 * - Result is plain text MathML, CSS-inert
 * - Rendered as server component only
 *
 * Compatibility: MathML Core (Chrome 109+, Firefox, Safari 14.1+)
 * For older browsers: graceful text fallback via <annotation> or polyfill handled by consumer.
 */

import katex from 'katex';

/**
 * Render LaTeX string to MathML format
 *
 * @param latex - Valid LaTeX math string (e.g., "A = P(1+r)^n")
 * @param display - If true, render as display math (block); default inline
 * @returns MathML string with annotation element containing original LaTeX source
 * @throws Error if LaTeX is invalid (strict mode enabled)
 *
 * @example
 * // Inline formula
 * renderMathMl('A = P(1+r)^n') // → "<math>...</math>"
 *
 * @example
 * // Display formula
 * renderMathMl('DSR = \\frac{\\text{annual repayment}}{\\text{annual income}}', true)
 * // → '<math display="block">...</math>'
 */
export function renderMathMl(latex: string, display?: boolean): string {
  return katex.renderToString(latex, {
    output: 'mathml',
    displayMode: !!display,
    throwOnError: true,
    strict: true,
  });
}
