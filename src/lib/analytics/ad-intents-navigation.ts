import { canLoadAdsOnPath } from './public-service-policy';

/** Ad Intents must see the calculator exclusion in a fresh document. */
export function isCalculatorPath(pathname: string): boolean {
  return pathname === '/calculator' || pathname.startsWith('/calculator/');
}

export function needsCalculatorDocument(
  fromPath: string,
  toPath: string,
  fromRobots = '',
  toRobots = '',
): boolean {
  return (
    isCalculatorPath(fromPath) !== isCalculatorPath(toPath) ||
    canLoadAdsOnPath(fromPath, fromRobots) !== canLoadAdsOnPath(toPath, toRobots)
  );
}

export function documentRobotsContent(doc: Document): string {
  return Array.from(doc.querySelectorAll<HTMLMetaElement>('meta[name="robots"]'))
    .map((meta) => meta.content)
    .join(',');
}

/** Observe metadata only; never observe or modify Google's advertisement DOM. */
export function observeDocumentRobots(doc: Document, changed: () => void): () => void {
  const Observer = doc.defaultView?.MutationObserver;
  if (!Observer || !doc.head) return () => {};
  const containsRobots = (node: Node) =>
    node instanceof Element &&
    (node.matches('meta[name="robots"]') || !!node.querySelector('meta[name="robots"]'));
  const observer = new Observer((records) => {
    if (
      records.some((record) => {
        if (record.type === 'attributes') {
          const target = record.target;
          return (
            target instanceof HTMLMetaElement &&
            (target.name === 'robots' ||
              (record.attributeName === 'name' && record.oldValue === 'robots'))
          );
        }
        return [...record.addedNodes, ...record.removedNodes].some(containsRobots);
      })
    )
      changed();
  });
  observer.observe(doc.head, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['name', 'content'],
    attributeOldValue: true,
  });
  return () => observer.disconnect();
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
export function calculatorDocumentDestination(
  event: LinkClick,
  currentHref: string,
  currentRobots = '',
): string | null {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    event.altKey ||
    !(event.target instanceof Element)
  )
    return null;
  const anchor = event.target.closest('a[href]');
  if (!anchor || anchor.hasAttribute('download')) return null;
  const target = anchor.getAttribute('target');
  if (target && target.toLowerCase() !== '_self') return null;
  try {
    const current = new URL(currentHref);
    const destination = new URL(anchor.getAttribute('href')!, current);
    if (
      !['http:', 'https:'].includes(destination.protocol) ||
      destination.origin !== current.origin
    )
      return null;
    // A current noindex document still owns its ordinary in-page anchor links.
    if (destination.pathname === current.pathname && destination.search === current.search)
      return null;
    return needsCalculatorDocument(current.pathname, destination.pathname, currentRobots)
      ? destination.href
      : null;
  } catch {
    // Invalid links retain native behavior instead of breaking the body's click handler.
    return null;
  }
}
