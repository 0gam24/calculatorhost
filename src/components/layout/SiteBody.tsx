'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  calculatorDocumentDestination,
  documentRobotsContent,
  isCalculatorPath,
} from '@/lib/analytics/ad-intents-navigation';

/** SSR outputs the supported exclusion before ads load; React owns the body class. */
export function SiteBody({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <body
      className={isCalculatorPath(pathname) ? 'google-anno-skip' : undefined}
      onClickCapture={(event) => {
        const destination = calculatorDocumentDestination(
          event,
          window.location.href,
          documentRobotsContent(document),
        );
        if (destination) {
          // A document boundary discards existing annotations without touching Google's DOM.
          // Next Link respects defaultPrevented; its user click handlers can still run.
          event.preventDefault();
          window.location.assign(destination);
        }
      }}
    >
      {children}
    </body>
  );
}
