/** Ad Intents must see the calculator exclusion in a fresh document. */
export function isCalculatorPath(pathname: string): boolean {
  return pathname === '/calculator' || pathname.startsWith('/calculator/');
}

export function needsCalculatorDocument(fromPath: string, toPath: string): boolean {
  return isCalculatorPath(fromPath) !== isCalculatorPath(toPath);
}

interface LinkClick {
  target: EventTarget | null;
  defaultPrevented: boolean;
  button: number;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
}

/** Preserve native new-tab/download/modifier behavior and existing link handlers. */
export function calculatorDocumentDestination(event: LinkClick, currentHref: string): string | null {
  if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey ||
      event.shiftKey || event.altKey || !(event.target instanceof Element)) return null;
  const anchor = event.target.closest('a[href]');
  if (!anchor || anchor.hasAttribute('download')) return null;
  const target = anchor.getAttribute('target');
  if (target && target.toLowerCase() !== '_self') return null;
  try {
    const current = new URL(currentHref);
    const destination = new URL(anchor.getAttribute('href')!, current);
    if (!['http:', 'https:'].includes(destination.protocol) || destination.origin !== current.origin)
      return null;
    return needsCalculatorDocument(current.pathname, destination.pathname) ? destination.href : null;
  } catch {
    // Invalid links retain native behavior instead of breaking the body's click handler.
    return null;
  }
}
