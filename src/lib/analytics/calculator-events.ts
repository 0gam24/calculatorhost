/** Only known calculator identifiers are sent. Never pass queries or form values. */
export const CALCULATOR_SLUGS = [
  'salary',
  'severance',
  'loan',
  'loan-limit',
  'capital-gains-tax',
  'acquisition-tax',
  'property-tax',
  'comprehensive-property-tax',
  'broker-fee',
  'rent-conversion',
  'area',
  'savings',
  'deposit',
  'retirement',
  'bmi',
  'd-day',
  'freelancer-tax',
  'gift-tax',
  'inheritance-tax',
  'vehicle-tax',
  'exchange',
  'housing-subscription',
  'child-tax-credit',
  'n-jobber-insurance',
  'rental-yield',
  'inflation',
  'averaging-down',
  'split-buy',
  'split-sell',
  'vat',
  'dti',
] as const;

// A calculator inside an existing guide keeps its real, fixed guide URL.
const GUIDE_CALCULATOR_URLS: Readonly<Record<string, string>> = {
  'overtime-night-holiday-allowance-2026':
    'https://calculatorhost.com/guide/overtime-night-holiday-allowance-2026/',
};
export type CalculatorSlug =
  | (typeof CALCULATOR_SLUGS)[number]
  | 'overtime-night-holiday-allowance-2026';
const KNOWN_SLUGS = new Set<string>([
  ...CALCULATOR_SLUGS,
  ...Object.keys(GUIDE_CALCULATOR_URLS),
]);

export function isCalculatorSlug(value: unknown): value is CalculatorSlug {
  return typeof value === 'string' && KNOWN_SLUGS.has(value);
}

function emit(name: string, slugs: Record<string, string>, source?: string): void {
  if (
    typeof window === 'undefined' ||
    window.location.hostname !== 'calculatorhost.com' ||
    typeof window.gtag !== 'function'
  )
    return;
  if (!Object.values(slugs).every(isCalculatorSlug)) return;
  try {
    window.gtag('event', name, {
      ...slugs,
      // Override automatic location/referrer values with a known, input-free URL.
      page_location: source
        ? (GUIDE_CALCULATOR_URLS[source] ?? `https://calculatorhost.com/calculator/${source}/`)
        : 'https://calculatorhost.com/',
      page_referrer: '',
    });
  } catch {
    // Measurement failures must never interrupt a calculation or navigation.
  }
}

export function trackCalculatorSearch(slug?: string): void {
  if (slug !== undefined && !isCalculatorSlug(slug)) return;
  emit('calculator_search_used', slug ? { calculator_slug: slug } : {});
}

export function trackCalculationComplete(slug: string): void {
  emit('calculator_complete', { calculator_slug: slug }, slug);
}

export function trackNextCalculator(from: string, to: string): void {
  emit('calculator_next', { calculator_slug: from, next_calculator_slug: to }, from);
}
