/**
 * MathFormula Server Component
 *
 * Renders LaTeX math formulas as MathML for AEO and accessibility.
 * Server-side only — KaTeX is executed at build time, not in browser.
 *
 * @see src/lib/seo/math-formula-helper.ts for rendering logic
 * @see docs/design-system.md for styling context
 */

import React from 'react';
import { renderMathMl } from '@/lib/seo/math-formula-helper';

interface MathFormulaProps {
  /** Valid LaTeX math expression (e.g., "A = P(1+r)^n") */
  latex: string;
  /** If true, render as display math (block). Default: inline */
  display?: boolean;
  /** Optional CSS class for wrapper element (div/span) */
  className?: string;
}

/**
 * Render a mathematical formula as MathML.
 *
 * Server component (no 'use client').
 * Accepts LaTeX string, renders to MathML at build time.
 * Wraps in semantic <div role="math"> or <span> with original LaTeX as aria-label.
 *
 * @example
 * // Inline formula in text
 * <MathFormula latex="A = B + C" />
 *
 * @example
 * // Display formula (block, centered)
 * <MathFormula latex="DSR = \\frac{\\text{annual repayment}}{\\text{annual income}}" display={true} />
 *
 * @example
 * // With custom styling
 * <MathFormula latex="x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" className="my-4" display={true} />
 */
export function MathFormula({ latex, display, className }: MathFormulaProps): React.ReactElement {
  const mathml = renderMathMl(latex, display);
  const Wrapper = display ? 'div' : 'span';

  return (
    <Wrapper
      role="math"
      aria-label={latex}
      className={
        display
          ? `overflow-x-auto ${className || ''}`
          : `inline ${className || ''}`
      }
      dangerouslySetInnerHTML={{ __html: mathml }}
    />
  );
}
