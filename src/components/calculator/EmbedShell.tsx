import type { ReactNode } from 'react';

interface EmbedShellProps {
  children: ReactNode;
  title: string;
  canonicalUrl: string;
}

/** Embedded calculators omit site navigation and advertisements.
 * The brand credit is qualified with nofollow; it does not solicit ranking links.
 */
export function EmbedShell({ children, canonicalUrl }: EmbedShellProps) {
  return (
    <main className="min-h-screen bg-bg-base px-3 py-4">
      <div className="mx-auto max-w-2xl">
        {children}
        <p className="mt-4 text-center text-xs text-text-tertiary">
          제공:{' '}
          <a
            href={canonicalUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="font-medium text-primary-600 underline dark:text-primary-400"
          >
            calculatorhost
          </a>
        </p>
      </div>
    </main>
  );
}
