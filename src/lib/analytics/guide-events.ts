import { isCalculatorSlug, type CalculatorSlug } from './calculator-events';

const GUIDE_PATHS = {
  'freelancer-salary-comparison': '/guide/freelancer-salary-comparison/',
  'tax-real-estate': '/guide/category/tax-real-estate/',
} as const;

export type GuideSource = keyof typeof GUIDE_PATHS;

const DESTINATIONS: Record<GuideSource, Partial<Record<CalculatorSlug, string>>> = {
  'freelancer-salary-comparison': {
    salary: '/calculator/salary/',
    'freelancer-tax': '/calculator/freelancer-tax/',
  },
  'tax-real-estate': {
    'acquisition-tax': '/calculator/acquisition-tax/',
    'property-tax': '/calculator/property-tax/',
    'capital-gains-tax': '/calculator/capital-gains-tax/',
  },
};

function isGuideSource(value: unknown): value is GuideSource {
  return typeof value === 'string' && Object.hasOwn(GUIDE_PATHS, value);
}

/** An approved guide/tool pair determines both navigation and measurement. */
export function getGuideCalculatorHref(
  source: GuideSource,
  target: CalculatorSlug,
): string | undefined {
  if (!isGuideSource(source) || !isCalculatorSlug(target)) return undefined;
  return DESTINATIONS[source][target];
}

/** Fixed identifiers only. Never send text, form values, query/hash or referrer. */
export function trackGuideCalculatorOpen(source: unknown, target: unknown): void {
  if (!isGuideSource(source) || !isCalculatorSlug(target)) return;
  if (!getGuideCalculatorHref(source, target)) return;
  if (
    typeof window === 'undefined' ||
    window.location.hostname !== 'calculatorhost.com' ||
    typeof window.gtag !== 'function'
  )
    return;
  try {
    window.gtag('event', 'guide_calculator_open', {
      guide_slug: source,
      calculator_slug: target,
      page_location: `https://calculatorhost.com${GUIDE_PATHS[source]}`,
      page_referrer: '',
    });
  } catch {
    // Navigation remains usable when analytics is missing or fails.
  }
}
