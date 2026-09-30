export function extractPageMeta(source: string): {
  title: string | null;
  description: string | null;
  datePublished: string | null;
  dateModified: string | null;
};
export function latestMirroredModification(
  manifest: Record<string, unknown>,
  routes: string[],
): string;
